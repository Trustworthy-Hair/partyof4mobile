// Attendees.js

var React = require('react-native');

var UserView = require('./UserView'),
    stylingHelper = require('./../config/style.js');

var styleGuide = stylingHelper.styleGuide,
    styleExtend = stylingHelper.styleExtend;

var {
  Text,
  View,
  StyleSheet
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
      <View >
        <Text style={styles.title}>Attendees</Text>
          <View style={styles.container}>
            {attendees}
          </View>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  },

  title: styleExtend({
  }, 'font')
});

module.exports = Attendees;
