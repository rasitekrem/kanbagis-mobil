import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Container,
  Content,
  Button,
  Item,
  Label,
  Input,
  Toast,
  Spinner,
  Form,
  Text,
  Root,
  Thumbnail
} from 'native-base';
import firebase from 'firebase';

const logo = require('../img/logo.png');
const ico = require('../img/drag.png');

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mail: '',
      password: '',
      error: '',
      visible: false,
       showToast: false
    };
    //this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }
  componentWillMount() {
    if (firebase.auth().currentUser) {
      this.props.navigator.resetTo({
          screen: 'Home',
          title: 'Ana Sayfa',
          navigatorButtons: {
          rightButtons: [
            {
              id: 'dragMenu', //Butonumuzun kendine özel idsi
              //Menülerde kullanılabilir.
              icon: ico,
            },
          ]
        }
      });
    }
  }
    onLogin() {
        const { mail, password } = this.state;
        this.setState({ loading: true });
        firebase.auth().signInWithEmailAndPassword(mail, password)
          .then(() => {
            this.setState({ error: '', loading: false });
                 this.props.navigator.resetTo({
                     screen: 'Home',
                     title: 'Ana Sayfa',
                     navigatorButtons: {
                     rightButtons: [
                       {
                         id: 'dragMenu', //Butonumuzun kendine özel idsi
                         //Menülerde kullanılabilir.
                         icon: ico,
                       },
                     ]
                   }
                 });
          })
            .catch((err) => {
                  this.setState({ loading: false });
                  console.log(err.code);
                  if (err.code === 'auth/wrong-password') {
                      this.setState({ error: 'Parola ya da Mail adresi hatalı' });
                  } else if (err.code === 'auth/invalid-email') {
                      this.setState({ error: 'Geçersiz Mail Adresi' });
                  } else {
                    this.setState({ error: 'Bir Hata oluştu' });
                  }
                  return (
                    Toast.show({
                      text: this.state.error,
                      buttonText: 'Tamam'
                    })
                  );
            });
    }
    goHome() {
      this.props.navigator.push({
          screen: 'Home',
          title: 'Ana Sayfa'
      });
    }
    goSignup() {
      this.props.navigator.push({
          screen: 'Signup',
          title: 'Kayıt ol',
      });
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
      <Button block style={{ margin: 15, marginTop: 30 }} onPress={() => this.onLogin()} >
        <Text>Giriş Yap</Text>
      </Button>
    );
  }
  render() {
    return (
      <Root>
      <Container style={styles.container}>
        <Content>
        <View style={{ alignItems: 'center', marginTop: 30 }}>
          <Thumbnail large source={logo} />
        </View>
          <Form>
            <Item floatingLabel>
              <Label>Mail</Label>
              <Input
              onChangeText={(mail) => this.setState({ mail })}
              value={this.state.mail}
              />
            </Item>
            <Item floatingLabel last>
              <Label>Parola</Label>
              <Input
              secureTextEntry
              onChangeText={(password) => this.setState({ password })}
              value={this.state.password}
              />
            </Item>
          </Form>
          {this.renderButton()}
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Button full danger style={{ margin: 15, marginTop: 30 }} onPress={() => this.goSignup()} >
            <Text>Kayıt Ol</Text>
          </Button>
          <Button full danger style={{ margin: 15, marginTop: 30 }} onPress={() => this.goHome()} >
            <Text>Giriş Yapmadan Devam Et</Text>
          </Button>
          </View>
        </Content>
      </Container>
      </Root>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
   backgroundColor: 'white'
  },
  buttonContainer: {
    margin: 10
  },
  alternativeLayoutButtonContainer: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  stretch: {
  width: 400,
  height: 440
  },
  loginButton: {
    backgroundColor: '#4286f4',
    height: 50,
    margin: 5
  },
  buttonStyle: {
    backgroundColor: '#db3d3d',
    height: 50,
    margin: 5
  }
});
