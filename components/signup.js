'use strict';

var Back = require('./common').BackButton;

var React  = require('react-native');

var {
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
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
  returnToLogin() {
    this.props.onSubmit('login');
  },
  showLabel: function(num, text) {
    var showLabels = this.state.showLabels;
    showLabels[num] = (text.length >num);
    this.setState({showLabels: showLabels});
  },
  checkUsername: function(text) {
    var valid = (text.length >= usernameMinLength);
    this.setState({validUsername: valid, username: text});
    this.showLabel(0, text);
  },
  checkEmail: function(text) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    if (re.test(text)) this.setState({validEmail: true, email: text});
    this.showLabel(1, text);
  },
  checkPassword: function(text) {
    var valid = (text.length >= passwordMinLength);
    if (!/.*(?=.*[a-z])(?=.*[A-Z]).*/.test(text)) valid = false;
    this.setState({validPassword: valid, validPassword2: false, password: text});
    this.showLabel(2, text);
  },
  checkPassword2: function(text) {
    var valid = (text === this.state.password);
    this.setState({validPassword2: valid, password2: text});
    this.showLabel(3, text);
  },
  isValid() {
    return (this.state.validUsername && this.state.validEmail && this.state.validPassword && this.state.validPassword2);
  },
  render: function() {
    var usernameWarning, passwordWarning, password2Warning, emailWarning, submitButton;
    var warningGenerator = (num) => {
      var text = (num === undefined) ? 'Required' : `Must be at least ${num} characters`;
      return (<Text style={styles.warning}>{text}</Text>);
    };

    if (this.isValid()) {
      submitButton = (<TouchableHighlight onPress={this.returnToLogin} style={styles.submit}>
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
      <View style={styles.container}>
        <Back onback={this.returnToLogin} />
        <Text style={styles.headingText}>Get started with PartyOf4</Text>

        {labels[0]}
        <View style={styles.textInputContainer}>
          <TextInput style={styles.textInput} placeholder='username' maxLength={usernameMaxLength} onChangeText={this.checkUsername}/>
        </View>
        {usernameWarning}

        {labels[1]}
        <View style={styles.textInputContainer}>
          <TextInput style={styles.textInput} placeholder='email' 
          onChangeText={this.checkEmail}/>
        </View>
        {emailWarning}

        {labels[2]}
        <View style={styles.textInputContainer}>
          <TextInput style={styles.textInput} secureTextEntry={true} placeholder='password' onChangeText={this.checkPassword}/>
        </View>
        {passwordWarning}

        {labels[3]}
        <View style={styles.textInputContainer}>
          <TextInput style={styles.textInput} secureTextEntry={true} placeholder='retype password' onChangeText={this.checkPassword2}/>
        </View>
        {password2Warning}

        {submitButton}
      </View>
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
  container: {
    backgroundColor: 'white',
    flexDirection: 'column',
    flex: 1,
    padding: 10,
    alignItems: 'center'
  },
  headingText: {
    fontSize: 17,
    color: '#2e6a8b'
  },
  textInputContainer: {
    width: 230,
    height: 40,
    marginBottom: 5,
    borderWidth: 1,
    borderTopColor: 'white', 
    borderRightColor: 'white',
    borderBottomColor: 'black',
    borderLeftColor: 'white',
    padding: 5
  },
  textInput: {
    height: 30, 
    width: 220,
    borderWidth: 0,
  },
  warning: {
    color: '#8f3033'
  },
  submit: {
    backgroundColor: '#2e6a8b',
    margin: 10,
    height: 40,
    width: 240,
    alignItems: 'center',
    justifyContent: 'center'
  },
  submitText: {
    color: 'white',
    fontSize: 20
  },
  label: {
    width: 250
  },
  labelText: {
    color: '#14203c',
    fontSize: 12
  }
});

module.exports = Signup;