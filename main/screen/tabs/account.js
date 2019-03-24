import React, { Component } from 'react';
import {
  Container,
  Button,
  Content,
  Text,
  Form,
  Label,
  Input,
  Item,
  Root,
  Toast,
  Grid,
  Col,
  Footer,
  FooterTab
} from 'native-base';
import firebase from 'firebase';

export default class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
        oldpassword: '',
        newpassword: '',
        newpasswordagain: ''
    };
  }
  parolaKaydet() {
    if (this.state.oldpassword === '' ||
        this.state.newpassword === '' ||
        this.state.newpasswordagain === '') {
          return (
            Toast.show({
              text: 'Boş Alan Var',
              buttonText: 'Tamam'
            })
          );
    }
    if (this.state.newpassword !== this.state.newpasswordagain) {
      return (
        Toast.show({
          text: 'Yeni parolalar uyuşmuyor',
          buttonText: 'Tamam'
        })
      );
    }
    if (this.state.newpassword.toString().length < 6) {
      return (
        Toast.show({
          text: 'Yeni parola en az 6 karakter olmalı',
          buttonText: 'Tamam'
        })
      );
    }
    firebase.auth().currentUser.reauthenticateWithCredential(firebase.auth.EmailAuthProvider.credential(firebase.auth().currentUser.email, this.state.oldpassword))
    .then(() => {
      firebase.auth().currentUser.updatePassword(this.state.newpassword).then(() => {
        this.setState({ oldpassword: '', newpassword: '', newpasswordagain: '' });
        return (
          Toast.show({
            text: 'Parola değiştirildi',
            buttonText: 'Tamam'
          })
        );
        })
      .catch((err) => (
        Toast.show({
          text: err.message,
          buttonText: 'Tamam'
        })
      ));
    })
    .catch((err) => (
        Toast.show({
          text: err.message,
          buttonText: 'Tamam'
        })
      ));
  }
  render() {
    return (
    <Root>
      <Container>
      <Content>
          <Form>
            <Item floatingLabel>
              <Label>Eski Parola</Label>
              <Input
              secureTextEntry
              onChangeText={(oldpassword) => this.setState({ oldpassword })}
              value={this.state.oldpassword}
              />
            </Item>
            <Item floatingLabel>
              <Label>Yeni Parola</Label>
              <Input
              secureTextEntry
              onChangeText={(newpassword) => this.setState({ newpassword })}
              value={this.state.newpassword}
              />
            </Item>
            <Item floatingLabel>
              <Label>Yeni Parola Yeniden</Label>
              <Input
              secureTextEntry
              onChangeText={(newpasswordagain) => this.setState({ newpasswordagain })}
              value={this.state.newpasswordagain}
              />
            </Item>
          </Form>

          <Button
            block
            bordered
            success
            style={{ margin: 15, marginTop: 50 }}
            onPress={() => this.parolaKaydet()}
          >
            <Text>Kaydet</Text>
          </Button>
        </Content>
      </Container>
    </Root>
    );
  }
}
