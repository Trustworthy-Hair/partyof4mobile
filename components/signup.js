'use strict';

var Back = require('./common').BackButton,
    stylingHelper = require('./../config/style.js');

var styleGuide = stylingHelper.styleGuide,
    styleExtend = stylingHelper.styleExtend;

var React  = require('react-native');
var UserStore   = require('../stores/UserStore');
var Dispatcher  = require('../dispatcher/dispatcher');
var Constants   = require('../constants/constants');
var config = require('../config/config')
var ActionTypes = Constants.ActionTypes;
var SIGNUP_REQUEST_URL = config.url + '/users/signup';

var {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  StatusBarIOS,
  AsyncStorage,
  View
} = React;


var usernameMinLength = 4;
var usernameMaxLength = 12;
var passwordMinLength = 6;

var Signup = React.createClass({
  getInitialState() {
    return {
      username: '',
      email: '',
      password: '',
      password2: '',
      validUsername: false,
      validEmail: false,
      validPassword: false,
      validPassword2: true,
      showLabels: [false,false,false,false]
    };
  },
  showLabel: function(num, valid) {
    var showLabels = this.state.showLabels;
    showLabels[num] = valid;
    this.setState({showLabels: showLabels});
  },
  checkUsername: function(text) {
    var valid = (text.length >= usernameMinLength);
    this.setState({validUsername: valid, username: text});
    this.showLabel(0, valid);
  },
  checkEmail: function(text) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    var valid = re.test(text)
    this.setState({validEmail: valid, email: text});
    this.showLabel(1, valid);
  },
  checkPassword: function(text) {
    var valid = (text.length >= passwordMinLength);
    if (!/.*(?=.*[a-z])(?=.*[A-Z]).*/.test(text)) valid = false;
    this.setState({validPassword: valid, password: text, validPassword2: (text === this.state.password2)});
    this.showLabel(2, valid);
    this.showLabel(3, valid);
  },
  checkPassword2: function(text) {
    var valid = (text === this.state.password);
    this.setState({validPassword2: valid, password2: text});
    this.showLabel(3, valid);
  },
  isValid() {
    return (this.state.validUsername && this.state.validEmail && this.state.validPassword && this.state.validPassword2);
  },
  signUp: function(){
    var user = {
      username: this.state.username,
      password: this.state.password,
      email: this.state.email
    }
    fetch(SIGNUP_REQUEST_URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    }).then((response) => {
      return response.json();
    }).then((response) => {
      this.props.onLogin({
        username: this.state.username,
        password: this.state.password
      }, () => {
        this.setState({ badLogin: true });
      });
    }).done();
  },
  changeTab: function (tabName) {
    StatusBarIOS.setStyle(tabName === 'map' ? 1 : 0);
    var payload = {};
    payload.currentView = tabName;
    Dispatcher.dispatch({
      type: ActionTypes.STORE_USER,
      payload: payload
    });
  },
  scrollUp: function(field) {
    var fieldname = field + 'input'; 
    this.refs[fieldname].focus();

    var scrollDistance;
    if (field === 'username') {
      scrollDistance = 20;
    } else if (field === 'email') {
      scrollDistance = 40;
    } else if (field === 'password') {
      scrollDistance = 60;
    } else if (field === 'password2') {
      scrollDistance = 80;
    }

    this.refs['scrollview'].scrollTo(scrollDistance);
  },
  scrollDown: function() {
    setTimeout(() => {
      if (!(this.refs['usernameinput'].isFocused() || this.refs['emailinput'].isFocused() ||
            this.refs['passwordinput'].isFocused() || this.refs['password2input'].isFocused())) {
        this.refs['scrollview'].scrollTo(0);
      }
    }, 200);
  },
  render: function() {
    var usernameWarning, passwordWarning, password2Warning, emailWarning, submitButton;
    var warningGenerator = (num) => {
      var text = (num === undefined) ? 'Required' : `Must be at least ${num} characters`;
      return (<Text style={styles.warning}>{text}</Text>);
    };

    if (this.isValid()) {
      submitButton = (<TouchableHighlight onPress={this.signUp} style={styles.submit}>
                      <Text style={styles.submitText}>SIGN UP</Text></TouchableHighlight>);
    } else {
      if (!this.state.validUsername) {
        usernameWarning = this.state.username === '' ? warningGenerator() : warningGenerator(usernameMinLength);
      }
      if (!this.state.validEmail) {
        emailWarning = this.state.email === '' ? warningGenerator() : (<Text style={styles.warning}>Please enter a valid email</Text>);
      }
      if (!this.state.validPassword) {
        if (this.state.password === '') { 
          passwordWarning = warningGenerator();
        } else if (this.state.password.length < passwordMinLength) {
          passwordWarning = warningGenerator(passwordMinLength);
        } else {
          passwordWarning = (<Text style={styles.warning}>Must contain uppercase/lowercase characters</Text>);
        }
      }
      if (!this.state.validPassword2) {
        password2Warning = (<Text style={styles.warning}>Must match password</Text>); 
      }
    }

    var fields = ['username','email','password','retype password'];
    var labels = [];
    this.state.showLabels.forEach(function(showLabel, index) {
      if (showLabel) labels[index] = (<SignupLabel text={fields[index]}/>);
    });

    return (
      <ScrollView ref='scrollview' contentContainerStyle={styles.container} style={styles.scroll} scrollEnabled={false}>
        <Back onback={this.returnToLogin} />
        <Text style={styles.headingText}>Get started with PartyOf4</Text>
        {labels[0]}
        <View style={styles.textInputContainer}>
          <TextInput ref='usernameinput' style={styles.textInput} placeholder='username' maxLength={usernameMaxLength} 
          onChangeText={this.checkUsername} onFocus={() => this.scrollUp('username')} onBlur={this.scrollDown}/>
        </View>
        {usernameWarning}

        {labels[1]}
        <View style={styles.textInputContainer}>
          <TextInput ref='emailinput' style={styles.textInput} placeholder='email' 
          onChangeText={this.checkEmail} onFocus={() => this.scrollUp('email')} onBlur={this.scrollDown}/>
        </View>
        {emailWarning}

        {labels[2]}
        <View style={styles.textInputContainer}>
          <TextInput ref='passwordinput' style={styles.textInput} secureTextEntry={true} placeholder='password' 
          onChangeText={this.checkPassword} onFocus={() => this.scrollUp('password')} onBlur={this.scrollDown}/>
        </View>
        {passwordWarning}

        {labels[3]}
        <View style={styles.textInputContainer}>
          <TextInput ref='password2input' style={styles.textInput} secureTextEntry={true} placeholder='retype password' 
          onChangeText={this.checkPassword2} onFocus={() => this.scrollUp('password2')} onBlur={this.scrollDown}/>
        </View>
        {password2Warning}

        {submitButton}
      </ScrollView>
    );
  }
});

var SignupLabel = React.createClass({
  render() {
    return (
      <View style={styles.label}>
        <Text style={styles.labelText}>{this.props.text}</Text>
      </View>
    ); 
  }
});

var styles = StyleSheet.create({
  scroll: styleExtend({
    backgroundColor: styleGuide.colors.white,
  }, 'container'),

  container: styleExtend({
    alignItems: 'center'
  }, 'container'),

  headingText: styleExtend({
    fontSize: styleGuide.sizes.larger,
    color: styleGuide.colors.main,
  }, 'font'),

  textInputContainer: {
    width: 230,
    height: 40,
    marginBottom: 5,
    borderWidth: 1,
    borderTopColor: styleGuide.colors.white, 
    borderRightColor: styleGuide.colors.white,
    borderLeftColor: styleGuide.colors.white,
    borderBottomColor: 'black',
    padding: 5
  },

  textInput: {
    height: 30, 
    width: 220,
    borderWidth: 0,
    fontFamily: styleGuide.font
  },

  warning: {
    color: '#8f3033',
    fontFamily: styleGuide.font
  },

  submit: styleExtend({
    marginTop: 10,
  }, 'center', 'button'),

  submitText: styleExtend({
  }, 'submitfont'),

  label: {
    width: 250
  },
  
  labelText: {
    color: styleGuide.colors.dark,
    fontSize: 15,
    fontFamily: styleGuide.font
  }
});

module.exports = Signup;