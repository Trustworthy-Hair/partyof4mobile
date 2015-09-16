// CreateReview.js

var React = require('react-native');

var config = require('../../config/config');
var Dispatcher = require ('../../dispatcher/dispatcher');
var EventsStore = require('../../stores/EventsStore');
var UserStore = require('../../stores/UserStore');
var Constants = require('../../constants/constants');
var config     = require('../../config/config');

var Back = require('../../components/common').BackButton;
var Header = require('../../components/header');
var ReviewHeader = require('./ReviewHeader');
var ReviewForm = require('./ReviewForm');

var {
  StyleSheet,
  Text,
  View
} = React;

var REVIEW_URL = config.url+'/users/'

var CreateReview = React.createClass({
  getInitialState: function () {
    var userData = UserStore.getData();
    return {
      event: EventsStore.getCurrentEvent(),
      currentUser: userData.user,
      token: userData.token
    };
  },

  createReview: function (subjects) {
    // TODO: write the HTTP request to send the review to the server
    var userData = UserStore.getData();
    var currentEvent = EventsStore.getCurrentEvent();
    var data = {
      accessToken: userData.token,
      subjects: []
    }
    for(var i = 0; i < subjects.length; i++){
      data.subjects.push({
        starRating: subjects[i].rating, 
        text: subjects[i].text,
        subjectId: subjects[i].id,
        EventId: currentEvent.id
      })
    }
    fetch(REVIEW_URL + userData.user.id + '/reviews' , {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then((response) => {
      return response.json();
    }).then((response) => {
      console.log('@@@@@@@@@', response);
    }).done();
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
        <Back onback={() => {}}/>
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
