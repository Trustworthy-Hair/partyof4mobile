// Attendees.js

var React = require('react-native');

var UserView = require('./UserView');

var {
  Text,
  View
} = React;

var Attendees = React.createClass({

  render: function () {
    var attendees = this.props.attendeesList.map(function (attendee) {
      return (
        <UserView 
          user={attendee} 
        />
      );
    });
    return (
      <View>
        <Text>Attendees</Text>
        {attendees}
      </View>
    );
  }
});

module.exports = Attendees;
