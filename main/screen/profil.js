import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import {
  Container,
  Tabs,
  Tab,
  Button,
  Text,
  Footer,
  FooterTab,
  Toast,
  Root,
  Grid,
  Col
} from 'native-base';
import firebase from 'firebase';
import Account from './tabs/account';
import Profile from './tabs/profil';

export default class Profil extends Component {
  constructor(props) {
    super(props);
    this.state = {
        modalVisible: false
    };
  }
  hesapSil() {
    const user = firebase.auth().currentUser;
    user.delete().then(() => {
      firebase.database().ref(`usersdata/${user.uid}`).remove()
        .then(() => {
          this.props.navigator.resetTo({
              screen: 'Login',
              title: 'Kan Bağış Uygulaması'
          });
        })
          .catch((error) => {
              console.log(error.message);
              return (
                Toast.show({
                  text: error.message,
                  buttonText: 'Tamam'
                })
              );
            });
  }).catch((error) => {
    console.log(error.message);
    return (
      Toast.show({
        text: error.message,
        buttonText: 'Tamam'
      })
    );
    });
  }
  setModalVisible(visible) {
  this.setState({ modalVisible: visible });
}
  render() {
    return (
      <Root>
      <Container>
          <Tabs >
            <Tab heading="Hesap Ayarları">
              <Account />
            </Tab>
            <Tab heading="Profil Ayarları">
              <Profile />
            </Tab>
          </Tabs>
          <Footer>
    <FooterTab>
      <Button active onPress={() => this.setModalVisible(true)}>
        <Text>Hesabı Sil</Text>
      </Button>
    </FooterTab>
  </Footer>
  <Modal
  animationType="slide"
  isVisible={this.state.modalVisible}
  >
  <View style={styles.modelContent}>
  <Text>Hesap Silinsin mi?</Text>
  <Grid>
      <Col
      style={{
        padding: 12,
        margin: 16,
      }}
      >
      <Button
        danger
        block
        onPress={() => {
          this.hesapSil(!this.state.modalVisible);
        }}
      >
        <Text>Evet</Text>
      </Button>
      </Col>
      <Col
        style={{
          padding: 12,
          margin: 16,
        }}
      >
            <Button
              danger
              block
              onPress={() => {
                this.setModalVisible(!this.state.modalVisible);
              }}
            >
              <Text>Hayır</Text>
            </Button>
      </Col>
  </Grid>


  </View>
</Modal>
      </Container>
      </Root>
    );
  }
}
const styles = StyleSheet.create({
  modelContent: {
    height: 200,
    backgroundColor: 'white',
    padding: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)'
  }
});
