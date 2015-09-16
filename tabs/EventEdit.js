// EventEdit.js

var React = require('react-native'),
    Back = require('../components/common').BackButton,
    stylingHelper = require('./../config/style.js');

var styleGuide = stylingHelper.styleGuide,
    styleExtend = stylingHelper.styleExtend;

var {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} = React;

var EventEdit = React.createClass({

  getInitialState: function () {
    // These props just initialize the state. Props and state don't need to stay in sync.
    return {
      description: this.props.event.description,
      plannedTime: this.props.event.plannedTime,
      currentActivity: this.props.event.currentActivity
    };
  },

  updateEvent: function () {
    this.props.updateEvent(this.state);
    this.props.toggleEdit();
  },

  render: function () {
    return (
      <View>
        <Back onback={this.props.toggleEdit} />
        <View style={styles.container}>
          <Text style={styles.label}>Event Description: </Text>
          <View style={styles.container}>
            <TextInput 
              style={styles.input}
              onChangeText={(description) => this.setState({description})}
              value={this.state.description}
            />
          </View>
          <Text style={styles.label}>Current Activity: </Text>
          <View style={styles.center}>
            <TextInput
              style={styles.input}
              onChangeText={(currentActivity) => this.setState({currentActivity})}
              value={this.state.currentActivity}
            />
          </View>
          <TouchableOpacity onPress={this.updateEvent} >
            <View style={styles.button}> 
              <Text style={styles.buttonText }>Update Event</Text>
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

module.exports = EventEdit;
