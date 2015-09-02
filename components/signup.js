'use strict';

var React  = require('react-native');

var {
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View
} = React;

const usernameMinLength = 4;
const usernameMaxLength = 12;
const passwordMinLength = 6;

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
      validPassword2: true
    };
  },
  returnToLogin() {
    this.props.onSubmit('login');
  },
  checkUsername: function(text) {
    var valid = (text.length >= usernameMinLength);
    this.setState({validUsername: valid, username: text});
  },
  checkEmail: function(text) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    if (re.test(text)) this.setState({validEmail: true, email: text});
  },
  checkPassword: function(text) {
    var valid = (text.length >= passwordMinLength);
    if (!/.*(?=.*[a-z])(?=.*[A-Z]).*/.test(text)) valid = false;
    this.setState({validPassword: valid, validPassword2: false, password: text});
  },
  checkPassword2: function(text) {
    var valid = (text === this.state.password);
    this.setState({validPassword2: valid, password2: text});
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
                      <Text style={styles.submitText}>SUBMIT</Text></TouchableHighlight>);
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

    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={this.returnToLogin} style={styles.back}>
          <Text style={styles.backText}>&lt; Back</Text>
        </TouchableHighlight>
        <Text>Sign up for PartyOf4!</Text>
        <View style={styles.textInputContainer}>
          <TextInput style={styles.textInput} placeholder='username' maxLength={usernameMaxLength} onChangeText={this.checkUsername}/>
        </View>
        {usernameWarning}

        <View style={styles.textInputContainer}>
          <TextInput style={styles.textInput} placeholder='email' 
          onChangeText={this.checkEmail}/>
        </View>
        {emailWarning}

        <View style={styles.textInputContainer}>
          <TextInput style={styles.textInput} secureTextEntry={true} placeholder='password' onChangeText={this.checkPassword}/>
        </View>
        {passwordWarning}

        <View style={styles.textInputContainer}>
          <TextInput style={styles.textInput} secureTextEntry={true} placeholder='retype password' onChangeText={this.checkPassword2}/>
        </View>
        {password2Warning}

        {submitButton}
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
  back: {
    height: 40,
    width: 300,
    marginBottom: 10,
  },
  backText: {
    fontSize: 20
  },
  textInputContainer: {
    width: 250,
    height: 40,
    marginBottom: 10,
    borderWidth: 1,
    borderTopColor: 'white', 
    borderRightColor: 'white',
    borderBottomColor: 'black',
    borderLeftColor: 'white',
    padding: 5
  },
  textInput: {
    height: 30, 
    width: 240,
    borderWidth: 0,
  },
  warning: {
    color: '#8f3033'
  },
  submit: {
    backgroundColor: '#2e6a8b',
    margin: 20,
    height: 40,
    width: 200,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  submitText: {
    color: 'white',
    fontSize: 20
  }
});

module.exports = Signup;