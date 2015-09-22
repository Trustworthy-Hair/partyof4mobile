// login.js

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
      view: 'login', 
      badLogin: false
    };
  },

  pressButton: function () {
    if (this.state.username !== undefined && this.state.password !== undefined) {
      this.props.onLogin({
        username: this.state.username,
        password: this.state.password
      }, () => {
        this.setState({ badLogin: true });
      });
    }
  },

  changeView: function (state) {
    this.setState({
      view: state
    });
  },

  scrollUp: function(field) {
    // NOTE: Workaround for a ScrollView/TextInput fix that is in React Native 0.11.1
    var fieldname = field+'input'; 
    this.refs[fieldname].focus();

    this.refs['scrollview'].scrollTo(100);
    this.setState({ badLogin: false });
  },

  scrollDown: function() {
    setTimeout(() => {
      if (!(this.refs['usernameinput'].isFocused() || this.refs['passwordinput'].isFocused())) {
        this.refs['scrollview'].scrollTo(0);

      // NOTE: Workaround for the scrollview/touchablehighlight problem where the scrollview
      //       always becomes the responder and users cannot press the login button until
      //       the keyboard is hidden 
        this.pressButton();
      }
    }, 200);
  },
  
  render() {
    if (this.state.view === 'login') {
      var loginWarning;
      if (this.state.badLogin) loginWarning = (<Text style={styles.warning} > Invalid login </Text>);

      var inner = (
        <ScrollView ref='scrollview' contentContainerStyle={styles.innercontainer} 
                    style={styles.scroll} scrollEnabled={false}>
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
          {loginWarning}
          <Text style={styles.text} onPress={ () => this.changeView('signup') }>Sign up</Text>
          <View style={styles.space}/>
        </ScrollView>
      );
    } else if (this.state.view === 'signup') {
      var inner = (
        <Signup onSubmit={this.changeView} onLogin={this.props.onLogin}/>
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
  }, 'container'),

  innercontainer: styleExtend({
    backgroundColor: styleGuide.colors.dark,
  }, 'container', 'center'),

  logocontainer: styleExtend({
    marginBottom: 20
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
  }, 'font'),

  warning: styleExtend({
    color: 'red',
    fontSize: styleGuide.sizes.larger,
  }, 'font'),

  space: {
    height: 40
  }
});

module.exports = Login;