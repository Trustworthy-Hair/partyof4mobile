// signup.js

var Back          = require('./common').BackButton,
    stylingHelper = require('./../config/style.js'),
    React         = require('react-native'),
    UserStore     = require('../stores/UserStore'),
    Dispatcher    = require('../dispatcher/dispatcher'),
    Constants     = require('../constants/constants'),
    config        = require('../config/config');

var styleGuide = stylingHelper.styleGuide,
    styleExtend = stylingHelper.styleExtend;

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

/* CONSTANTS */
var usernameMinLength = 4;
var usernameMaxLength = 12;
var passwordMinLength = 6;


var Signup = React.createClass({
  getInitialState() {
    return {
      fields: { username: ['', false],
                email: ['', false],
                password: ['', false],
                password2: ['', true]},
      badSignup: false
    };
  },

  setFields: function(key, text, valid) {
    var oldFields = this.state.fields;
    oldFields[key] = [text, valid];
    this.setState({oldFields});
  },

  checkUsername: function(text) {
    var valid = (text.length >= usernameMinLength);
    this.setFields('username', text, valid);
  },

  checkEmail: function(text) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    var valid = re.test(text)
    this.setFields('email', text, valid);
  },

  checkPassword: function(text) {
    var valid = (text.length >= passwordMinLength);
    if (!/.*(?=.*[a-z])(?=.*[A-Z]).*/.test(text)) valid = false;
    this.setFields('password', text, valid);
    this.setFields('password2', this.state.fields.password2[0], text === this.state.fields.password2[0]);
  },

  checkPassword2: function(text) {
    var valid = (text === this.state.fields.password[0]);
    this.setFields('password2', text, valid);
  },

  isValid() {
    return this.state.fields.username[1] && this.state.fields.email[1] && this.state.fields.password[1] && this.state.fields.password2[1];
  },

  signUp: function(){
    var user = {
      username: this.state.fields.username[0],
      password: this.state.fields.password[0],
      email: this.state.fields.email[0]
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
        username: this.state.fields.username[0],
        password: this.state.fields.password[0]
      }, () => {
        var fields = '';
        for (var key in response.fields) {
          fields += key
        }
        this.setState({ badSignup: response.message + ' on: ' + fields});
      });
    }).done();
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
    var usernameWarning, passwordWarning, password2Warning, emailWarning, signupWarning, submitButton;

    // creates the warnings for invalid inputs
    var warningGenerator = (num) => {
      var text = (num === undefined) ? 'Required' : `Must be at least ${num} characters`;
      return (<Text style={styles.warning}>{text}</Text>);
    };

    if (this.isValid()) {
      submitButton = (<TouchableHighlight onPress={this.signUp} style={styles.submit}>
                      <Text style={styles.submitText}>SIGN UP</Text></TouchableHighlight>);
    } else {
      if (!this.state.fields.username[1]) {
        usernameWarning = this.state.fields.username[0] === '' ? warningGenerator() : warningGenerator(usernameMinLength);
      }
      if (!this.state.fields.email[1]) {
        emailWarning = this.state.fields.email[0] === '' ? warningGenerator() : (<Text style={styles.warning}>Please enter a valid email</Text>);
      }
      if (!this.state.fields.password[1]) {
        if (this.state.fields.password[0] === '') { 
          passwordWarning = warningGenerator();
        } else if (this.state.fields.password[0].length < passwordMinLength) {
          passwordWarning = warningGenerator(passwordMinLength);
        } else {
          passwordWarning = (<Text style={styles.warning}>Must contain uppercase/lowercase characters</Text>);
        }
      }
      if (!this.state.fields.password2[1]) {
        password2Warning = (<Text style={styles.warning}>Must match password</Text>); 
      }
    }

    // creates the label above fields
    var labels = {};
    for (key in this.state.fields) {
      if (this.state.fields[key][0].length > 0) {
        var labelTitle = (key === 'password2') ? 'retype password' : key;
        labels[key] = (<SignupLabel text={labelTitle}/>);
      }
    }

    // adds warning for why signup failed 
    if (this.state.badSignup) {
      signupWarning = (<Text style={styles.warning}>{this.state.badSignup}</Text>);
    }

    // renders the screen
    return (
      <ScrollView ref='scrollview' contentContainerStyle={styles.container} style={styles.scroll} scrollEnabled={false}>
        <Back onback={this.returnToLogin} />
        <Text style={styles.headingText}>Get started with PartyOf4</Text>
        {labels.username}
        <View style={styles.textInputContainer}>
          <TextInput ref='usernameinput' style={styles.textInput} placeholder='username' maxLength={usernameMaxLength} 
          onChangeText={this.checkUsername} onFocus={() => this.scrollUp('username')} onBlur={this.scrollDown}/>
        </View>
        {usernameWarning}

        {labels.email}
        <View style={styles.textInputContainer}>
          <TextInput ref='emailinput' style={styles.textInput} placeholder='email' 
          onChangeText={this.checkEmail} onFocus={() => this.scrollUp('email')} onBlur={this.scrollDown}/>
        </View>
        {emailWarning}

        {labels.password}
        <View style={styles.textInputContainer}>
          <TextInput ref='passwordinput' style={styles.textInput} secureTextEntry={true} placeholder='password' 
          onChangeText={this.checkPassword} onFocus={() => this.scrollUp('password')} onBlur={this.scrollDown}/>
        </View>
        {passwordWarning}

        {labels.password2}
        <View style={styles.textInputContainer}>
          <TextInput ref='password2input' style={styles.textInput} secureTextEntry={true} placeholder='retype password' 
          onChangeText={this.checkPassword2} onFocus={() => this.scrollUp('password2')} onBlur={this.scrollDown}/>
        </View>
        {password2Warning}

        {signupWarning}
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