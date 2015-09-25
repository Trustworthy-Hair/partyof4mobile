// Attendees.js

var React = require('react-native');

var UserView = require('../user/UserView'),
    stylingHelper = require('./../../config/style.js');

var styleGuide = stylingHelper.styleGuide,
    styleExtend = stylingHelper.styleExtend;

var {
  Text,
  View,
  StyleSheet
} = React;

var Attendees = React.createClass({

  render: function () {
    var attendees = this.props.attendeesList.map((attendee) => {
      return (
        <UserView
          user={attendee} 
          renderProfile={this.props.renderProfile}
        />
      );
    });

    if (this.props.attendeesList.length === 0) {
      var attendees = (
        <Text style={styles.font}>No current attendees</Text>
      );
    }

    return (
      <View style={{alignItems: 'center'}}>
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
    fontWeight: 'bold'
  }, 'font'),

  font: styleExtend({
  }, 'font'),
});

module.exports = Attendees;
