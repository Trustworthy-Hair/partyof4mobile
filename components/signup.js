'use strict';

var React  = require('react-native');

var {
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View
} = React;

var Signup = React.createClass({
  getInitialState() {
    return {
      username: '',
      password: '',
      password2: '',
      untouched: true,
      validUsername: false,
      validPassword: false,
      validPassword2: true
    };
  },
  returnToLogin() {
    this.props.onSubmit('login');
  },
  checkUsername: function(text) {
    var valid = (text.length >= 4);
    this.setState({validUsername: valid, username: text});
  },
  checkPassword: function(text) {
    var valid = (text.length >= 6);
    if (!/.*(?=.*[a-z])(?=.*[A-Z]).*/.test(text)) valid = false;
    this.setState({validPassword: valid, validPassword2: false, password: text});
  },
  checkPassword2: function(text) {
    var valid = (text === this.state.password);
    this.setState({validPassword2: valid, password2: text});
  },
  render: function() {
    var usernameWarning, passwordWarning, password2Warning, submitButton;
    var warningGenerator = (num) => {
      var text = (num === undefined) ? 'Required' : `Must be at least ${num} characters`;
      return (<Text style={styles.warning}>{text}</Text>);
    };

    if (this.state.validUsername && this.state.validPassword && this.state.validPassword2) {
      submitButton = (<Text>SUBMIT</Text>);
    } else {
      if (!this.state.validUsername) {
        usernameWarning = this.state.username === '' ? warningGenerator() : warningGenerator(4);
      }
      if (!this.state.validPassword) {
        if (this.state.password === '') { 
          passwordWarning = warningGenerator();
        } else if (this.state.password.length <6) {
          passwordWarning = warningGenerator(6);
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
        <TouchableHighlight onPress={ this.returnToLogin } style={ styles.back }>
          <Text>Back</Text>
        </TouchableHighlight>
        <Text>Sign up for PartyOf4!</Text>
        <View style={ styles.textInputContainer }>
          <TextInput style={ styles.textInput } placeholder='username' maxLength={12} onChangeText={ this.checkUsername }/>
        </View>
        {usernameWarning}

        <View style={ styles.textInputContainer }>
          <TextInput style={ styles.textInput } secureTextEntry={true} placeholder='password' onChangeText={ this.checkPassword }/>
        </View>
        {passwordWarning}

        <View style={ styles.textInputContainer }>
          <TextInput style={ styles.textInput } secureTextEntry={true} placeholder='retype password' onChangeText={ this.checkPassword2 }/>
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
    backgroundColor: '#6da7d4',
    padding: 10,
    height: 40,
    width: 100,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10
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
    color: 'red'
  }
});

module.exports = Signup;