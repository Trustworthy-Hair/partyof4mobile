'use strict';

var config = require('./../config/config.js'),
    Header = require('./header'),
    React  = require('react-native'),
    Signup = require('./signup'),
    stylingHelper = require('./../config/style.js');

var styleGuide = stylingHelper.styleGuide,
    styleExtend = stylingHelper.styleExtend;

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
            <Text style={styles.text}>Sign up</Text>
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
  container: styleExtend({}, 'container'),

  innercontainer: styleExtend({
    backgroundColor: styleGuide.colors.dark
  }, 'container', 'center'),

  logocontainer: styleExtend({
    marginBottom: 30
  }, 'center'),

  logo: {
    width: 90,
    height: 90,
    paddingBottom: 10
  },

  textInputContainer: styleExtend({
    backgroundColor: styleGuide.colors.white
  }, 'button'),

  textInput: styleExtend({
    height: 40, 
    width: 250,
  }, 'font'),

  submit: styleExtend({
  }, 'submitfont'),

  login: styleExtend({
    justifyContent: 'center',
    flex: 1,
  }, 'button'),

  text: styleExtend({
    color: styleGuide.colors.highlight,
    fontSize: 16,
  }, 'font')
});

module.exports = Login;