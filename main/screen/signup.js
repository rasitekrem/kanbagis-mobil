import React, { Component } from 'react';
import { StyleSheet, Picker } from 'react-native';
import {
  Container,
  Content,
  Button,
  Item,
  Label,
  Input,
  Body,
  CheckBox,
  Form,
  Text,
  Grid,
  Col,
  ListItem,
  Root,
  Toast,
  Spinner
} from 'native-base';
import firebase from 'firebase';

export default class Signup extends Component {
  constructor(props) {
  super(props);
  this.state = {
    checkbox1: false,
    mail: '',
    password: '',
    passwordAgain: '',
    adres: '',
    ilce: '',
    il: '',
    telefon: '',
    kangrubu: '0 Rh Pozitif',
    adSoyad: '',
    loading: false
  };
}
toggleSwitch1() {
  this.setState({
    checkbox1: !this.state.checkbox1
  });
}
signUp() {
  if (this.state.mail === '' || this.state.password === ''
  || this.state.passwordAgain === '' || this.state.adres === ''
  || this.state.ilce === '' || this.state.il === ''
  || this.state.telefon === '' || this.state.adSoyad === ''
) {
  return (
    Toast.show({
      text: 'Boş alan var',
      buttonText: 'Tamam'
    })
  );
}
if (this.state.password === this.state.passwordAgain) {
  if (this.state.password.toString().length < 6) {
    return (
      Toast.show({
        text: 'Parola en az 6 karakter olmalı',
        buttonText: 'Tamam'
      })
    );
  }
  let check = 'false';
  if (this.state.checkbox1) {
      check = 'true';
  }
  const newUserInfo = {
                                nameSurname: this.state.adSoyad,
                                mail: this.state.mail,
                                phoneNumber: this.state.telefon,
                                kanGrubu: this.state.kangrubu,
                                adres: this.state.adres,
                                ilce: this.state.ilce,
                                il: this.state.il,
                                visibility: check
                              };
  this.setState({ loading: true });
firebase.auth().createUserWithEmailAndPassword(this.state.mail, this.state.password)
.then(() => {
  console.log(' success');

firebase.auth().signInWithEmailAndPassword(this.state.mail, this.state.password)
  .then(() => {
        firebase.database().ref(`usersdata/${firebase.auth().currentUser.uid}/infos`).set(newUserInfo);
        this.props.navigator.resetTo({
            screen: 'Home',
            title: 'Ana Sayfa',
            navigatorButtons: {
            rightButtons: [
              {
                id: 'dragMenu', //Butonumuzun kendine özel idsi
                //Menülerde kullanılabilir.
                icon: require('../img/drag.png'),
              },
            ]
          }
        });
  })
  .catch((err) => {
    this.setState({ loading: false });
    console.log(err.message);
    return (
      Toast.show({
        text: err.message,
        buttonText: 'Tamam'
      })
    );
  });
})
.catch((err) => {
  console.log(err.message);
  this.setState({ loading: false });
  return (
    Toast.show({
      text: err.message,
      buttonText: 'Tamam'
    })
  );
});
} else {
  this.setState({ loading: false });
  return (
    Toast.show({
      text: 'Parolalar Uyuşmuyor',
      buttonText: 'Tamam'
    })
  );
}
}
renderButton() {
  if (this.state.loading) {
     return (
              <Button block style={{ margin: 15, marginTop: 30 }}>
                 <Spinner color='white' />
               </Button>
             );
  }
  return (
    <Button full style={{ margin: 15, marginTop: 20 }} onPress={() => this.signUp()}>
      <Text>Kayıt Ol</Text>
    </Button>
  );
}
  render() {
    return (
      <Root>
      <Container style={styles.container}>
        <Content>
          <Form>
            <Item >
              <Input placeholder='Mail Adresiniz' onChangeText={(mail) => this.setState({ mail })} />
            </Item>
            <Grid>
                <Col>
                  <Item >
                    <Input placeholder='Parola' secureTextEntry onChangeText={(password) => this.setState({ password })} />
                  </Item>
                </Col>
                <Col>
                  <Item >
                    <Input placeholder='Parola Yeniden' secureTextEntry onChangeText={(passwordAgain) => this.setState({ passwordAgain })} />
                  </Item>
                </Col>
            </Grid>
            <Item >
              <Input placeholder='Ad Soyad' onChangeText={(adSoyad) => this.setState({ adSoyad })} />
            </Item>
            <Item inlineLabel>
              <Label>+90</Label>
              <Input keyboardType='numeric' maxLength={10} placeholder='(5__) ___ __ __' data-mask="(000) 000-0000" onChangeText={(telefon) => this.setState({ telefon })} />
            </Item>
            <Item>
              <Input placeholder='Adres' onChangeText={(adres) => this.setState({ adres })} />
            </Item>
            <Grid>
                <Col>
                <Item>
                  <Input placeholder='İlçe' onChangeText={(ilce) => this.setState({ ilce })} />
                </Item>
                </Col>
                <Col>
                    <Item >
                        <Input placeholder='İl' onChangeText={(il) => this.setState({ il })} />
                    </Item>
                </Col>
            </Grid>
            <Item inlineLabel>
            <Label> Kan Grubu </Label>
            <Picker
                style={{
                  width: 250,
                  height: 50
                }}
                selectedValue={this.state.kangrubu}
                onValueChange={(kangrubu) => this.setState({ kangrubu })
              }
            >
                <Picker.Item label="0 Rh+" value="0 Rh Pozitif" />
                <Picker.Item label="0 Rh-" value="0 Rh Negatif" />
                <Picker.Item label="A Rh+" value="A Rh Pozitif" />
                <Picker.Item label="A Rh-" value="A Rh Negatif" />
                <Picker.Item label="B Rh+" value="B Rh Pozitif" />
                <Picker.Item label="B Rh-" value="B Rh Negatif" />
                <Picker.Item label="AB Rh+" value="AB Rh Pozitif" />
                <Picker.Item label="AB Rh-" value="AB Rh Negatif" />
              </Picker>
            </Item>
            <ListItem last button onPress={() => this.toggleSwitch1()}>
  <CheckBox
    checked={this.state.checkbox1}
    onPress={() => this.toggleSwitch1()}
  />
  <Body>
    <Text>Aramalarda Gözükmek istiyor musunuz?</Text>
  </Body>
</ListItem>
          </Form>
          {this.renderButton()}
        </Content>
      </Container>
      </Root>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   backgroundColor: 'white'
  }
});
