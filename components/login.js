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
  ScrollView,
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

  scrollUp: function(field) {
    if (field === 'username') {
      this.refs['usernameinput'].focus();
    } else if (field === 'password') {
      this.refs['passwordinput'].focus();
    }

    this.refs['scrollview'].scrollTo(120);
  },

  scrollDown: function() {
    setTimeout(() => {
      if (!(this.refs['usernameinput'].isFocused() || this.refs['passwordinput'].isFocused())) {
        this.refs['scrollview'].scrollTo(0);
      }
    }, 200);
  },
  
  render() {
    if (this.state.view === 'login') {
      var inner = (
        <ScrollView ref='scrollview' contentContainerStyle={styles.innercontainer} 
                    style={styles.scroll} showsVerticalScrollIndicator={true} scrollEnabled={false}>
          <View style= {styles.logocontainer }>
            <Image source={require('image!logo')} style={styles.logo}/>
          </View>
          <View style={ styles.textInputContainer }>
            <TextInput 
            ref='usernameinput'
            style={ styles.textInput }
            placeholder='username'
            onChangeText={(text) => {
              this.setState({username: text});
            }}
            value={this.state.username}
            onBlur={this.scrollDown}
            onFocus={() => this.scrollUp('username')}/>
          </View>
          <View style={ styles.textInputContainer }>
            <TextInput 
            ref = 'passwordinput'
            style={ styles.textInput }
            secureTextEntry={true}
            placeholder='password'
            onChangeText={(text) => {
              this.setState({password: text});
            }}
            value={this.state.password}
            onBlur={this.scrollDown}
            onFocus={() => this.scrollUp('password')}/>
          </View>
          <TouchableHighlight onPress={ this.pressButton }>
            <View style={styles.login}> 
              <Text style={ styles.submit }>Log In</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={ () => this.changeView('signup') }> 
            <Text style={styles.text}>Sign up</Text>
          </TouchableHighlight>
        </ScrollView>
      );
    } else if (this.state.view === 'signup') {
      var inner = (
        <Signup onSubmit={this.changeView}/>
      );
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
  container: styleExtend({
    backgroundColor: styleGuide.colors.dark,
  }, 'container'),

  scroll: styleExtend({
    backgroundColor: styleGuide.colors.dark,
    height: 1500
  }, 'container'),

  innercontainer: styleExtend({
    backgroundColor: styleGuide.colors.dark,
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