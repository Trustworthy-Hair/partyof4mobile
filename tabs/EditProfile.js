// EditProfile.js

'use strict';

var React = require('react-native');

var Back = require('../components/common').BackButton,
    UserStore = require('../stores/UserStore'),
    stylingHelper = require('../config/style.js');

var styleGuide = stylingHelper.styleGuide,
    styleExtend = stylingHelper.styleExtend;

var {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} = React;

var EditProfile = React.createClass({


  getInitialState: function () {
    // These props just initialize the state. Props and state don't need to stay in sync.
    var subject = this.props.subject;
    return {
      profileImgUrl: subject.profileImageUrl,
      email: subject.email,
      status: subject.status
    };
  },

  updateProfile: function () {
    this.props.updateProfile(this.state);
    this.props.toggleEdit();
  },

  render: function() {
    var subject = this.props.subject;
    return (
      <View style={styles.container}>
        <Back onback={this.props.toggleEdit} />
        <View style={styles.container}>
          <Text style={styles.label}>E-Mail</Text>
          <View style={styles.container}>
            <TextInput 
              style={styles.input}
              onChangeText={(email) => this.setState({email})}
              value={this.state.email}
            />
          </View>
          <Text style={styles.label}>Profile Image URL: </Text>
          <View style={styles.container}>
            <TextInput 
              style={styles.input}
              onChangeText={(profileImageUrl) => this.setState({profileImageUrl})}
              value={this.state.profileImageUrl}
            />
          </View>
          <Text style={styles.label}>Status: </Text>
          <View style={styles.center}>
            <TextInput
              style={styles.input}
              onChangeText={(status) => this.setState({status})}
              value={this.state.status}
            />
          </View>
          <TouchableOpacity onPress={this.updateProfile} >
            <View style={styles.button}> 
              <Text style={styles.buttonText}>Update Profile</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: styleExtend({
    alignItems: 'center'
  }, 'container'),

  input: styleExtend({
    width: 300,
    height: 40,
    borderWidth: 1,
    padding: 5
  }, 'font'),

  label: styleExtend({
  }, 'font'),

  buttonText: styleExtend({
  }, 'submitfont'),

  button: styleExtend({
    flex: 1,
    margin: 10
  }, 'button', 'center'),
});

module.exports = EditProfile;
