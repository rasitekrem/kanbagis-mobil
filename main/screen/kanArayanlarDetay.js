import React, { Component } from 'react';
import {
  StyleSheet
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

const cover = require('../img/logo.png');
const marker = require('../img/marker.png');
const profile = require('../img/profile.png');
const phone = require('../img/phone.png');
const mail = require('../img/mail.png');
const comment = require('../img/comment.png');

export default class KanArayanlarDetay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: props._id,
      data: []
    };
  }
  UNSAFE_componentWillMount() {
    const data = {
          id: this.state._id
    };

    fetch('http://18.220.64.118:3000/ilangetir', {
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
  render() {
    return (
<Container style={styles.container}>
        <Content>
            {this.state.data.map((result, index) => (
              <Card style={styles.mb}>
                          <CardItem header>
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
                          <Thumbnail small source={marker} style={styles.mb10} />
                              <Text>
                                {result.ilce}/{result.il.toUpperCase()}
                              </Text>
                          </CardItem>
                          <CardItem>
                          <Thumbnail small source={mail} style={styles.mb10} />
                              <Text>
                                {result.mail}
                              </Text>
                          </CardItem>
                          <CardItem footer bordered>
                          <Thumbnail small source={comment} style={styles.mb10} />
                              <Text>
                                {result.aciklama}
                              </Text>
                          </CardItem>
                        </Card>
            ))}
        </Content>
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
