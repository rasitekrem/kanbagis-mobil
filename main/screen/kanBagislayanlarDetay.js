import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import {
  Container,
  Content,
  Button,
  Icon,
  SwipeRow,
  Text,
  View,
  Toast,
  Card,
  CardItem,
  Body,
  Left,
  Right,
  Thumbnail
} from 'native-base';
import { Popup } from 'react-native-map-link';

const cover = require('../img/logo.png');
const marker = require('../img/marker.png');
const profile = require('../img/profile.png');
const phone = require('../img/phone.png');
const mail = require('../img/mail.png');
const map = require('../img/map.png');

export default class KanBagislayanlarDetay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: props._id,
      isVisible: false,
      lat: '',
      lng: '',
      adres: '',
      data: []
    };
  }
  UNSAFE_componentWillMount() {
    const data = {
          id: this.state._id
    };

    fetch('http://18.220.64.118:3000/getDetail', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(
    data
  ),
  }).then((response) => response.json())
    .then((responseJson) => {
      const responseData = [];
      responseData.push(responseJson);
      console.log(responseData);
      this.setState({ data: responseData });
      console.log(this.state);
    })
    .catch((error) => {
      console.error(error);
    });
  }
  goMap() {
      this.state.data.map((result, index) => (
        fetch('https://maps.googleapis.com/maps/api/geocode/json?&address=' + result.adres + '+' + result.ilce + '+' + result.il, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      }).then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);
          this.setState({ isVisible: true })
          this.setState({ lat: responseJson.results[0].geometry.location.lat, lng: responseJson.results[0].geometry.location.lng });
          this.setState({ adres: responseJson.results[0].formatted_address })
        })
        .catch((error) => {
          console.error(error);
        })
    ));
  }
  render() {
    return (
              <Container style={styles.container}>
                      <Content>
                          {this.state.data.map((result, index) => (
                            <Card style={styles.mb}>
                                        <CardItem header bordered>
                                        <Thumbnail small source={profile} style={styles.mb10} />
                                        <Text>{result.nameSurname}</Text>
                                        </CardItem>
                                        <CardItem>
                                          <Thumbnail small source={phone} style={styles.mb10} />
                                            <Text>
                                            +90{result.phoneNumber}
                                            </Text>
                                            </CardItem>
                                        <CardItem>
                                        <Thumbnail small source={cover} style={styles.mb10} />
                                            <Text>
                                               {result.kanGrubu}
                                            </Text>
                                        </CardItem>
                                        <CardItem>
                                        <Thumbnail small source={mail} style={styles.mb10} />
                                            <Text>
                                              {result.mail}
                                            </Text>
                                        </CardItem>
                                        <TouchableOpacity onPress={() => this.goMap()}>
                                        <CardItem>
                                          <Thumbnail small square source={map} style={styles.mb10} />
                                            <Text>
                                              {result.adres}
                                            </Text>
                                        </CardItem>
                                        <CardItem footer>
                                        <Right>
                                            <Text>
                                              {result.ilce}/{result.il.toUpperCase()}
                                            </Text>
                                          </Right>
                                        </CardItem>
                                          </TouchableOpacity>
                                      </Card>

                          ))}
                      </Content>
                      <Popup
                       isVisible={this.state.isVisible}
                       onCancelPressed={() => this.setState({ isVisible: false })}
                       onAppPressed={() => this.setState({ isVisible: false })}
                       onBackButtonPressed={() => this.setState({ isVisible: false })}
                       options={{
                         title: this.state.adres,
                         latitude: this.state.lat,
                         longitude: this.state.lng,
                         dialogTitle: 'Haritada Göster',
                         dialogMessage: 'Uygulamayı seç',
                         cancelText: 'İptal'
                       }}
                      />
                    </Container>
    );
  }

}
const styles = StyleSheet.create({
  container: {
   flex: 1,
   backgroundColor: '#FFF'
  },
  mb: {
    marginTop: 50,
    marginBottom: 50,
  },
  mb10: {
    marginRight: 5
  }
});
