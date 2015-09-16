// CreateReview.js

var React = require('react-native');

var config = require('../../config/config');
var Dispatcher = require ('../../dispatcher/dispatcher');
var EventsStore = require('../../stores/EventsStore');
var UserStore = require('../../stores/UserStore');
var Constants = require('../../constants/constants');

var Header = require('../../components/header');
var ReviewHeader = require('./ReviewHeader');
var ReviewForm = require('./ReviewForm');

var {
  StyleSheet,
  Text,
  View
} = React;

var CreateReview = React.createClass({
  getInitialState: function () {
    var userData = UserStore.getData();
    return {
      event: EventsStore.getCurrentEvent(),
      currentUser: userData.user,
      token: userData.token
    };
  },

  createReview: function (data) {
    // TODO: write the HTTP request to send the review to the server
    console.log(data);
  },

  getAttendees: function () {
    return this.state.event.Users.filter(function (user) {
      return user.UserEvents.userConfirmed;
    });
  },

  render: function () {
    return (
      <View>
        <Header />
        <ReviewHeader 
          event={this.state.event} 
        />
        <ReviewForm 
          event={this.state.event} 
          currentUser={this.state.currentUser} 
          host={this.state.event.host} 
          attendees={this.getAttendees()} 
          createReview={this.createReview} 
        />
      </View>
    );
  }

});

var styles = StyleSheet.create({

});

module.exports = CreateReview;
