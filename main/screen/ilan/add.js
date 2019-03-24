import React, { Component } from "react";
import { StyleSheet, Picker } from 'react-native'
import {
  Container,
  Content,
  Button,
  Input,
  Item,
  Form,
  Label,
  Grid,
  Col,
  Text
} from 'native-base';
import firebase from 'firebase';

export default class Add extends Component {
  constructor(props) {
    super(props);
    this.state = {
      kangrubu: '0 Rh Pozitif',
      il: '',
      ilce: '',
      aciklama: ''
    };
  }

  add() {
    firebase.database().ref(`usersdata/${firebase.auth().currentUser.uid}/infos`).once('value')
.then((result) => {
  const user = result.val();
  const data = {
    mail: user.mail,
    phoneNumber: user.phoneNumber,
    nameSurname: user.nameSurname,
    kanGrubu: this.state.kangrubu,
    ilce: this.state.ilce,
    il: this.state.il,
    aciklama: this.state.aciklama
  };
  firebase.database().ref(`usersdata/${firebase.auth().currentUser.uid}/ilanlar`).push(data)
    .then(() => {
              this.props.navigator.pop();
    })
    .catch((err) => {
      console.log(err.message);
    });
})
.catch((err) => {
  console.log(err.message);
});
  }
  render() {
    return (
      <Container style={styles.container}>
        <Content padder style={{ marginTop: 40 }}>
          <Form>
          <Item floatingLabel>
            <Label>İlçe</Label>
            <Input
            onChangeText={(ilce) => this.setState({ ilce })}
            value={this.state.ilce}
            />
          </Item>
          <Item floatingLabel>
            <Label>İl</Label>
            <Input
            onChangeText={(il) => this.setState({ il })}
            value={this.state.il}
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
            <Item floatingLabel>
            <Label>Açıklama</Label>
              <Input
              onChangeText={(aciklama) => this.setState({ aciklama })}
              value={this.state.aciklama}
              multiline
              numberOfLines={3}
              style={{ height: 150 }}
              />
            </Item>
          </Form>
          <Button block success bordered onPress={() => this.add()}>
            <Text> Ekle </Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF'
  }
});
