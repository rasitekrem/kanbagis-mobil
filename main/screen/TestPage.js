import React, { Component } from 'react';
import firebase from 'firebase';
import { Button, Text } from 'native-base';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
        user: firebase.auth().currentUser.email
    };
    //this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    //this.setState({ user: firebase.auth().currentUser.email });
  }
  signOut() {

  }

  render() {
    return (
        <Button danger onPress={() => this.signOut()} >
        <Text> {this.state.user} </Text>
        </Button>
    );
  }
}
