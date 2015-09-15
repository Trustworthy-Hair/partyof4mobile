// EventView.js

var React = require('react-native');

var {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} = React;


var EventView = React.createClass({

  isUserHost: function () {
    return this.props.currentUser.id === this.props.host.id;
  },

  isUserAttendee: function () {
    var isAttendee = false;
    this.props.attendees.forEach((attendee) => {
      if (this.props.currentUser.id === attendee.id) isAttendee = true;
    });
    return isAttendee;
  },

  isUserPending: function () {
    var isPending = false;
    console.log('PROPS: ', this.props);
    this.props.pending.forEach((pending) => {
      if (this.props.currentUser.id === pending.id) isPending = true;
    });
    return isPending;
  },

  render: function () {
    return (
      <View>
        <Text>Restaurant Name: {this.props.event.Location.name}</Text>
        <Text>Event Description: {this.props.event.description}</Text>
        <Text>Date/Time: {this.props.event.plannedTime}</Text>
        <Text>Status: {this.props.event.status}</Text>
        {this.renderJoinButton()}
        {this.renderEditButton()}
        {this.renderEndButton()}
      </View>
    );
  },

  renderJoinButton: function () {
    if (this.isUserHost()) {
      return null;
    } else if (this.isUserAttendee()) {
      return (
        <Text>You are attending this event!</Text>
      );
    } else if (this.isUserPending()) {
      return (
        <Text>You have requested to join this event!</Text>
      );
    } else {
      return (
        <TouchableOpacity onPress={this.props.joinEvent} >
          <Text>Join Event</Text>
        </TouchableOpacity>
      );
    }
  },

  renderEditButton: function () {
    if (this.isUserHost()) {
      return (
        <TouchableOpacity onPress={this.props.toggleEdit} >
          <Text>Edit Event</Text>
        </TouchableOpacity>
      );
    }
    return null;
  },

  renderEndButton: function () {
    if (this.isUserHost()) {
      return (
        <TouchableOpacity onPress={this.props.endEvent} >
          <Text>End Event</Text>
        </TouchableOpacity>
      );
    }
    return null;
  }

});

module.exports = EventView;
