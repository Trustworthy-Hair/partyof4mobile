// CreateReview.js

var React        = require('react-native'),
    config       = require('../../config/config'),
    Dispatcher   = require ('../../dispatcher/dispatcher'),
    EventsStore  = require('../../stores/EventsStore'),
    UserStore    = require('../../stores/UserStore'),
    Constants    = require('../../constants/constants'),
    config       = require('../../config/config'),
    Back         = require('../../components/common').BackButton,
    Header       = require('../../components/header'),
    ReviewHeader = require('./ReviewHeader'),
    ReviewForm   = require('./ReviewForm');

var ActionTypes = Constants.ActionTypes;

var {
  StyleSheet,
  Text,
  View
} = React;

var REVIEW_URL = config.url+'/users/';

var CreateReview = React.createClass({
  getInitialState: function () {
    var userData = UserStore.getData();
    return {
      event: EventsStore.getCurrentEvent(),
      currentUser: userData.user,
      token: userData.token
    };
  },

  goBack: function() {
    var payload = {};
    payload.currentView = 'eventDetail';
    Dispatcher.dispatch({
      type: ActionTypes.STORE_USER,
      payload: payload
    });
  },

  createReview: function (subjects) {
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
        <Back onback={this.goBack}/>
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
