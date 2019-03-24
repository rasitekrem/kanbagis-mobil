import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import {
  Container,
  Content,
  Button,
  Text,
  Card,
  CardItem
} from 'native-base';

export default class KanBagislayanlar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      kangrubu: props.kangrubu,
      ilce: props.ilce,
      il: props.il,
      data: []
    };
    console.log(props);
  }
  UNSAFE_componentWillMount() {
    const data = {
      data: {
        kanGrubu: this.state.kangrubu,
        il: this.state.il,
        ilce: this.state.ilce,
        visibility: 'true'
      }

      };
    fetch('http://18.220.64.118:3000/search', {
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
      console.log(responseJson);
      this.setState({ data: responseJson });
    })
    .catch((error) => {
      console.error(error);
    });
  }
  onApply(id, adSoyad) {
    this.props.navigator.push({
        screen: 'KanBagislayanlarDetay',
        title: adSoyad,
        passProps: {
          _id: id
        }
    });
  }
  render() {
    return (
      <Container style={styles.container}>
              <Content padder>
              {this.state.data.map((result, index) =>
                <Card style={{ marginBottom: 15, alignItems: 'center', justifyContent: 'center' }}>
                  <CardItem header>
                    <Text>{result.nameSurname}</Text>
                  </CardItem>
                  <CardItem >
                      <Text>
                          {result.ilce}/{result.il.toUpperCase()}
                      </Text>
                  </CardItem>
                  <CardItem footer>
                  <Button
                    bordered
                    info
                    full
                    onPress={() => this.onApply(result._id, result.nameSurname)}
                  >
                  <Text> Detaylı Bilgi </Text>
                  </Button>
                  </CardItem>
                </Card>
                )}
              </Content>
            </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   justifyContent: 'center',
   backgroundColor: 'white'
  }
});
