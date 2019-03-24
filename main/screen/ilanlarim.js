import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import {
  Container,
  Content,
  Button,
  Icon,
  SwipeRow,
  Text,
  View,
  Toast
} from 'native-base';
import firebase from 'firebase';

export default class Ilanlarim extends Component {
  constructor(props) {
    super(props);
    this.state = { silinecekId: '', infoId: '', data: [], dbulref: null };
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }
  componentWillMount() {
      const dbref = firebase.database().ref(`usersdata/${firebase.auth().currentUser.uid}/ilanlar`);
      this.setState({ dbulref: dbref });
      dbref.on('value', (snapshot) => {
        if (snapshot.val()) {
          console.log(snapshot.val());
          this.setState({ data: snapshot.val() });
          this.render();
        }
});
  }
  componentDidUnMount() {
        this.state.dbulref.off('value');
}

  onNavigatorEvent(event) {
          //Gelen event buton tiklamami onu kontrol ediyoruz.
          if (event.type === 'NavBarButtonPress') {
                      //Sonra hangi butonumuz onu kontrol ediyoruz. Bu event.id app.jsde verildi.
                      if (event.id === 'addButton') { // app sinifindaki butonun idsi
                        this.props.navigator.push({
                            screen: 'Add',
                            title: 'İlan Ekle'
                        });
                      }
                  }
            }
  info(id) {
    this.props.navigator.push({
        screen: 'Info',
        title: 'İlan Detayı',
        passProps: {
          id: id.key
        }
    });
  }
  delete(id) {
    console.log(id.key);
    firebase.database().ref(`usersdata/${firebase.auth().currentUser.uid}/ilanlar/${id.key}`).remove()
      .then(() => {
        this.componentWillMount();
        this.render();
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
  }
  render() {
    const data = this.state.data;
    return (
      <Container style={styles.container}>
        <Content scrollEnabled={false}>
        {Object.keys(data).map((key, index) =>
          <SwipeRow
            leftOpenValue={75}
            rightOpenValue={-75}
            left={
              <Button success onPress={() => this.info({ key })}>
                <Icon active name="information-circle" />
              </Button>
            }
            right={
              <Button danger onPress={() => this.delete({ key })}>
                <Icon active name="trash" />
              </Button>
            }
            body={
              <View style={{ paddingLeft: 20 }}>
                <Text>{data[key].ilce}/{data[key].il.toUpperCase()} -- {data[key].kanGrubu}</Text>
              </View>
            }
          />
          )
        }
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF'
  },
});
