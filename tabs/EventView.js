// EventView.js

var React  = require('react-native'),
    moment = require('moment'),
    stylingHelper = require('./../config/style.js');

var styleGuide = stylingHelper.styleGuide,
    styleExtend = stylingHelper.styleExtend;

var {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
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
    this.props.pending.forEach((pending) => {
      if (this.props.currentUser.id === pending.id) isPending = true;
    });
    return isPending;
  },

  render: function () {
    var plannedTime = moment(this.props.event.plannedTime).calendar();
    var createdTime = moment(this.props.event.createdAt).fromNow();
    var description = (this.props.event.description) ? this.props.event.description : 'No description';

    return (
      <View style={styles.container}>
        <Text style={styles.heading}>{this.props.event.Location.name}</Text>
        <Text style={styles.subheading}> Created {createdTime}</Text>
        <View style={styles.horizontal}> 
          <Text style={styles.label}>Planned for: </Text>
          <Text style={styles.text}>{plannedTime}</Text>
        </View>
        <View style={styles.horizontal}> 
          <Text style={styles.label}>Status: </Text>
          <Text style={styles.text}>{this.props.event.currentActivity}</Text>
        </View>
        <Text style={styles.text}>{description}</Text>
        {this.renderButtons()}
        
      </View>
    );
  },

  renderButtons: function() {
    if (this.props.event.completedStatus) {
      return (
        <TouchableOpacity onPress={this.props.goToReview} >
          <Text>Review Attendees</Text>
        </TouchableOpacity>
      );
    }

    return (
      <View>
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
        <Text style={styles.text}>You are attending this event!</Text>
      );
    } else if (this.isUserPending()) {
      return (
        <Text style={styles.text}>You have requested to join this event!</Text>
      );
    } else {
      return (
        <View style={styles.centerbutton}>
          <TouchableHighlight onPress={this.props.joinEvent} >
            <View style={styles.button}> 
              <Text style={styles.buttonText }>Join Event</Text>
            </View>
        </TouchableHighlight>
        </View>
      );
    }
  },

  renderGoToReviewButton: function () {
    return (
      <TouchableOpacity onPress={this.props.goToReview} >
        <Text>Review Attendees</Text>
      </TouchableOpacity>
    );
  },

  renderEditButton: function () {
    if (this.isUserHost()) {
      return (
        <View style={styles.centerbutton}>
          <TouchableOpacity onPress={this.props.toggleEdit} >
            <View style={styles.button}> 
              <Text style={styles.buttonText }>Edit Event</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    }
    return null;
  },

  renderEndButton: function () {
    if (this.isUserHost()) {
      return (
        <View style={styles.centerbutton}>
          <TouchableOpacity onPress={this.props.endEvent} >
            <View style={styles.button}> 
              <Text style={styles.buttonText }>End Event</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    }
    return null;
  }

});

var styles = StyleSheet.create({
  container: styleExtend({
  }, 'container'),

  heading: styleExtend({
    color: 'black'
  }, 'submitfont'),

  subheading: styleExtend({
    color: styleGuide.colors.highlight,
    textAlign: 'right'
  }, 'font'),

  text: styleExtend({
  }, 'font'),

  label: styleExtend({
    fontWeight: 'bold'
  }, 'font'),

  horizontal: styleExtend({
    flexDirection: 'row',
  }, 'container'),

  buttonText: styleExtend({
  }, 'submitfont'),

  button: styleExtend({
    flex: 1,
  }, 'button', 'center'),

  centerbutton: {
    alignItems: 'center'
  }
});

module.exports = EventView;
