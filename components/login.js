'use strict';

var config = require('./../config/config.js'),
    Header = require('./header'),
    React  = require('react-native');

var {
  Image,
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
          <View style= {styles.logocontainer }>
            <Image source={require('image!logo')} style={styles.logo}/>
          </View>
          <View style={ styles.textInputContainer }>
            <TextInput style={ styles.textInput } placeholder='username'/>
          </View>
          <View style={ styles.textInputContainer }>
            <TextInput style={ styles.textInput } secureTextEntry={true} placeholder='password'/>
          </View>
          <TouchableHighlight onPress={ this.pressButton }>
            <View style={styles.login}> 
              <Text style={ styles.submit }>Log In</Text>
            </View>
          </TouchableHighlight>
          <Text style={styles.text}>Sign up / Forgot your password?</Text>

          <TouchableHighlight onPress={ this.pressButton }>
            <View style={styles.login}> 
              <Text style={ styles.submit }>Sign In with Facebook</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
  },
  innercontainer: {
    backgroundColor: '#14203c',
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logocontainer: {
    marginBottom: 30,
    alignItems: 'center'
  },
  logo: {
    width: 90,
    height: 90,
    paddingBottom: 10
  },
  textInputContainer: {
    overflow: 'hidden',
    backgroundColor: 'white',
    borderRadius: 15,
    width: 250,
    height: 40,
    marginBottom: 10
  },
  textInput: {
    backgroundColor: 'white',
    height: 40, 
    width: 250,
    borderWidth: 0,
    textAlign: 'center'
  },
  submit: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center'
  },
  login: {
    overflow: 'hidden',
    width: 250,
    height: 40,
    backgroundColor: '#2e6a8b',
    borderRadius: 15,
    justifyContent: 'center',
    flex: 1,
    marginBottom: 10
  },
  text: {
    color: '#a9e2d6',
    marginBottom: 100
  }
});

module.exports = Login;