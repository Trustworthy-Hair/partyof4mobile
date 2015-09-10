'use strict';

var config = require('./../config/config.js'),
    Header = require('./header'),
    React  = require('react-native'),
    Signup = require('./signup'),
    styleGuide = require('../config/style.js').styleGuide;

var {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View
} = React;

var Login = React.createClass({

  getInitialState: function () {
    return {
      view: 'login'
    };
  },

  pressButton: function () {
    this.props.onLogin({
      username: this.state.username,
      password: this.state.password
    });
  },

  changeView: function (state) {
    this.setState({
      view: state
    });
  },
  
  render() {
    var current = this;
    if (this.state.view === 'login') {
      var inner = (
        <View style={ styles.innercontainer }> 
          <View style= {styles.logocontainer }>
            <Image source={require('image!logo')} style={styles.logo}/>
          </View>
          <View style={ styles.textInputContainer }>
            <TextInput 
            style={ styles.textInput }
            placeholder='username'
            onChangeText={(text) => {
              this.setState({username: text});
            }}
            value={this.state.username}/>
          </View>
          <View style={ styles.textInputContainer }>
            <TextInput 
            style={ styles.textInput }
            secureTextEntry={true}
            placeholder='password'
            onChangeText={(text) => {
              this.setState({password: text});
            }}
            value={this.state.password}/>
          </View>
          <TouchableHighlight onPress={ this.pressButton }>
            <View style={styles.login}> 
              <Text style={ styles.submit }>Log In</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={ function() {current.changeView('signup')} }> 
            <Text style={styles.text}>Sign up / Forgot your password?</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={ this.pressButton }>
            <View style={styles.login}> 
              <Text style={ styles.submit }>Sign In with Facebook</Text>
            </View>
          </TouchableHighlight>
        </View>
      );
    } else if (this.state.view === 'signup') {
      var inner = (
        <Signup onSubmit={this.changeView}/>
      );
    } else if (this.state.view === 'forgotpw') {
    }

    return (
      <View style={ styles.container }>
        <Header />
        {inner}
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
    backgroundColor: styleGuide.colors.dark,
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
    backgroundColor: styleGuide.colors.white,
    borderRadius: 15,
    width: 250,
    height: 40,
    marginBottom: 10
  },
  textInput: {
    backgroundColor: styleGuide.colors.white,
    height: 40, 
    width: 250,
    borderWidth: 0,
    textAlign: 'center',
    fontFamily: styleGuide.font, 
    fontSize: styleGuide.sizes.main
  },
  submit: {
    color: styleGuide.colors.white,
    fontSize: styleGuide.sizes.larger,
    textAlign: 'center',
    fontFamily: styleGuide.font
  },
  login: {
    overflow: 'hidden',
    width: 250,
    height: 40,
    backgroundColor: styleGuide.colors.main,
    borderRadius: 15,
    justifyContent: 'center',
    flex: 1,
    marginBottom: 10
  },
  text: {
    color: styleGuide.colors.highlight,
    marginBottom: 100,
    fontSize: 16,
    fontFamily: styleGuide.font
  }
});

module.exports = Login;