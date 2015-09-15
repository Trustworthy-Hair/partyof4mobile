// EventEdit.js

var React = require('react-native');

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
        <Text>Restaurant Name: </Text>
        <Text>{this.props.event.Location.name}</Text>
        <Text>Event Description: </Text>
        <TextInput
          onChangeText={(description) => this.setState({description})}
          value={this.state.description}
        />
        <Text>Date/Time: </Text>
        <TextInput></TextInput>
        <Text>Current Activity: </Text>
        <TextInput
          onChangeText={(currentActivity) => this.setState({currentActivity})}
          value={this.state.currentActivity}
        />
        <TouchableOpacity onPress={this.updateEvent}>
          <Text>Update Event</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.props.toggleEdit}>
          <Text>Cancel</Text>
        </TouchableOpacity>
      </View>
    );
  }
});

module.exports = EventEdit;
