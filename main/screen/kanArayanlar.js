import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';
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
  Card,
  CardItem,
  Body
} from 'native-base';

export default class KanArayanlar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      kangrubu: props.kangrubu,
      ilce: props.ilce,
      il: props.il,
      test: '',
      data: []
    };
  }
  UNSAFE_componentWillMount() {
    let data = {
        data: {
          kanGrubu: this.state.kangrubu,
          il: this.state.il,
          ilce: this.state.ilce
        }
      };
    fetch('http://18.220.64.118:3000/kanarayanlar', {
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
        screen: 'KanArayanlarDetay',
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
  width: 420,
  height: 480
  },
  buttonStyle: {
    backgroundColor: '#db3d3d',
    width: 200,
    height: 30
  },
  title: {
  fontSize: 12
},
cardStyle: {
  width: 100,
  height: 300
},
item: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 10,
      margin: 2,
      borderColor: '#2a4944',
      borderWidth: 1,
      backgroundColor: 'white'
   }
});
