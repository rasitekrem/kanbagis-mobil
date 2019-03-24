import React, { Component } from 'react';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import {
  StyleSheet,
  View,
  Picker
} from 'react-native';

export default class Arayan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      kangrubu: '0 Rh Pozitif',
      ilce: '',
      il: ''
    };
  }

  onApply() {
  this.props.navigator.push({
      screen: 'KanArayanlar',
      title: 'Kan Arayanlar',
      passProps: {
        kangrubu: this.state.kangrubu,
        ilce: this.state.ilce,
        il: this.state.il
      }
  });
}
  render() {
    return (
      <View style={styles.container}>
      <View>
          <FormLabel>İlçe</FormLabel>
          <FormInput onChangeText={(data) => this.setState({ ilce: data })} />
      </View>
      <View>
          <FormLabel>İl</FormLabel>
          <FormInput onChangeText={(data) => this.setState({ il: data })} />
          <FormLabel>Kan Grubu</FormLabel>
      </View>
      <View>

        <Picker
            selectedValue={this.state.kangrubu}
            style={{ height: 70, width: 320, color: 'gray' }}
            onValueChange={(data) => this.setState({ kangrubu: data })
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
      </View>
      <View>
        <Button
          large
          buttonStyle={styles.buttonStyle}
          title='Ara'
          onPress={() => this.onApply()}
        />
      </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  buttonStyle: {
    backgroundColor: '#db3d3d',
    width: 300,
    height: 50
  }
});
