'use strict';

var config = require('./../config/config.js'),
    Header = require('./header'),
    React  = require('react-native');

var {
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View
} = React;

var Login = React.createClass({
  pressButton: function() {
    // TO-DO: Implement authentication
    this.props.onLogin();
  },
  render: function() {
    return (
      <View style={ styles.container }>
        <Header />
        <View style={ styles.innercontainer }> 
          <Text>Username</Text>
          <TextInput style={ styles.textInput }/>
          <Text>Password</Text>
          <TextInput style={ styles.textInput } secureTextEntry={true}/>
          <TouchableHighlight onPress={ this.pressButton }>
            <Text style={ styles.submit }>Login</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1
  },
  innercontainer: {
    padding: 20
  },
  textInput: {
    height: 40, 
    borderColor: 'gray', 
    borderWidth: 1
  },
  submit: {
    fontSize: 30,
    textAlign: 'center'
  }
});

module.exports = Login;