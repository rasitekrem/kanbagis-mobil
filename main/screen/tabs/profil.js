import React, { Component } from 'react';
import {
  Container,
  Button,
  Content,
  Text,
  Input,
  Item,
  Label,
  Root,
  Form,
  Grid,
  Col,
  Body,
  ListItem,
  CheckBox,
  Toast
} from 'native-base';
import { Picker } from 'react-native';
import firebase from 'firebase';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      kangrubu: '0 Rh Pozitif',
      ilce: '',
      il: '',
      adSoyad: '',
      telefon: '',
      adres: '',
      checkbox: false
    };
  }
  componentWillMount() {
    firebase.database().ref(`usersdata/${firebase.auth().currentUser.uid}/infos`).once('value')
  .then((user) => {
    const data = user.val();
    let check = false;
    if (data.visibility === 'true') {
      check = true;
    }
    this.setState({
        kangrubu: data.kanGrubu,
        ilce: data.ilce,
        il: data.il,
        adres: data.adres,
        adSoyad: data.nameSurname,
        telefon: data.phoneNumber,
        checkbox: check
      });
      this.render();
  });
  }
  profilKaydet() {
    let check = 'false';
    if (this.state.checkbox) {
      check = 'true';
    }
    firebase.database().ref(`usersdata/${firebase.auth().currentUser.uid}/infos`).update({
          phoneNumber: this.state.telefon,
          nameSurname: this.state.adSoyad,
          kanGrubu: this.state.kangrubu,
          ilce: this.state.ilce,
          il: this.state.il,
          adres: this.state.adres,
          visibility: check
        })
        .then(() => (
            Toast.show({
              text: 'Profil Güncellendi',
              buttonText: 'Tamam'
            })
          ))
          .catch((err) => (
              Toast.show({
                text: err.message,
                buttonText: 'Tamam'
              })
            ));
  }
  toggleSwitch1() {
    this.setState({
      checkbox: !this.state.checkbox
    });
  }

  render() {
    return (
      <Root>
      <Container>
      <Content>
      <Form>
        <Item floatingLabel>
          <Label>Ad Soyad</Label>
          <Input
          onChangeText={(adSoyad) => this.setState({ adSoyad })}
          value={this.state.adSoyad}
          />
        </Item>
        <Item inlineLabel>
          <Label>+90</Label>
          <Input
          onChangeText={(telefon) => this.setState({ telefon })}
          value={this.state.telefon}
          />
        </Item>
        <Item inlineLabel>
        <Label> Kan Grubu </Label>
        <Picker
            style={{
              width: 250,
              height: 70
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
        <Item floatingLabel last>
          <Label>Adres</Label>
          <Input
          onChangeText={(adres) => this.setState({ adres })}
          value={this.state.adres}
          />
        </Item>
        <Grid>
            <Col>
            <Item floatingLabel last>
              <Label> İlçe </Label>
              <Input
              onChangeText={(ilce) => this.setState({ ilce })}
              value={this.state.ilce}
              />
            </Item>
            </Col>
            <Col>
                <Item floatingLabel last>
                    <Label> İl </Label>
                    <Input
                    onChangeText={(il) => this.setState({ il })}
                    value={this.state.il}
                    />
                </Item>
            </Col>
        </Grid>
        <ListItem last button onPress={() => this.toggleSwitch1()}>
          <CheckBox
            checked={this.state.checkbox}
            onPress={() => this.toggleSwitch1()}
          />
        <Body>
          <Text>Aramalarda Gözükmek istiyor musunuz?</Text>
        </Body>
      </ListItem>
      </Form>
      <Button
        block
        bordered
        success
        style={{ margin: 15, marginTop: 10 }}
        onPress={() => this.profilKaydet()}
      >
        <Text>Kaydet</Text>
      </Button>
      </Content>
      </Container>
      </Root>
    );
  }
}
