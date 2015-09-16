var React = require('react-native');
var config = require('../config/config');
var Dispatcher = require ('../dispatcher/dispatcher');
var EventsStore = require('../stores/EventsStore');
var UserStore = require('../stores/UserStore');
var Constants = require('../constants/constants');

var Header = require('../components/header');
var EventInfo = require('./EventInfo');
var HostView = require('./HostView');
var Attendees = require('./Attendees');
var Pending = require('./Pending');

var ActionTypes = Constants.ActionTypes;

var JOIN_EVENT_REQUEST_URL = config.url + '/events/:eventId/join';
var GET_EVENT_REQUEST_URL = config.url + '/events/';
var UPDATE_EVENT_REQUEST_URL = config.url + '/events/';
var APPROVE_USER_REQUEST_URL = config.url + '/events/:eventId/approve';

var {
  StyleSheet,
  Text,
  View
} = React;

var EventDetail = React.createClass({

  getInitialState: function () {
    var userData = UserStore.getData();
    var event = EventsStore.getCurrentEvent();
    return {
      event: event,
      user: userData.user,
      token: userData.token
    };
  },

  componentDidMount: function () {
    EventsStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function () {
    EventsStore.removeChangeListener(this._onChange);
  },

  _onChange: function () {
    var currentEvent = EventsStore.getCurrentEvent();
    this.setState({
      event: currentEvent
    });
  },

  goToReview: function () {
    var payload = {};
    payload.currentView = 'createReview';
    Dispatcher.dispatch({
      type: ActionTypes.STORE_USER,
      payload: payload
    });
  },

  getEvent: function () {
    fetch(GET_EVENT_REQUEST_URL + this.state.event.id)
    .then((response) => {
      return response.json();
    })
    .then((event) => {
      var payload = event;
      Dispatcher.dispatch({
        type: ActionTypes.STORE_CURRENT_EVENT,
        payload: payload
      });
    });
  },

  joinEvent: function () {
    var requestUrl = JOIN_EVENT_REQUEST_URL.replace(':eventId', this.state.event.id);
    var queryString = '?accessToken=' + this.state.token;
    fetch(requestUrl + queryString, {
      method: 'POST'
    })
    .then(() => {
      this.getEvent();
    });
  },

  updateEvent: function (updatedEvent) {
    var requestUrl = UPDATE_EVENT_REQUEST_URL + this.state.event.id;
    var queryString = '?accessToken=' + this.state.token;
    fetch(requestUrl + queryString, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedEvent)
    })
    .then(() => {
      this.getEvent();
    });
  },

  endEvent: function () {

  },

  approveOrDenyUser: function (userId, approved) {
    var requestUrl = APPROVE_USER_REQUEST_URL.replace(':eventId', this.state.event.id);
    var queryString = '?accessToken=' + this.state.token;
    var requestBody = {};
    requestBody.user = userId;
    requestBody.approved = approved;
    fetch(requestUrl + queryString, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    })
    .then(() => {
      this.getEvent();
    });
  },

  getAttendees: function () {
    return this.state.event.Users.filter(function (user) {
      return user.UserEvents.userConfirmed;
    });
  },

  getPending: function () {
    return this.state.event.Users.filter(function (user) {
      return !user.UserEvents.userConfirmed && user.UserEvents.arrivalStatus !== 'Declined';
    });
  },


  render: function () {
    if (!this.state.event) return this.renderLoadingView();

    var hostView;
    if (this.state.user.id !== this.state.event.host.id) {
      hostView = (<HostView
        host={this.state.event.host} 
      />);
    }

    return (
      <View>
        <Header />
          <View style={styles.innercontainer}>
          <EventInfo 
            event={this.state.event}
            host={this.state.event.host} 
            attendees={this.getAttendees()} 
            pending={this.getPending()} 
            currentUser={this.state.user}
            goToReview={this.goToReview} 
            joinEvent={this.joinEvent} 
            updateEvent={this.updateEvent} 
            endEvent={this.endEvent} 
          />
          {hostView}
          <Attendees 
            attendeesList={this.getAttendees()} 
          />
          <Pending 
            pendingList={this.getPending()} 
            host={this.state.event.host}
            currentUser={this.state.user} 
            approveOrDenyUser={this.approveOrDenyUser} 
          />
          </View>
      </View>
    );
  },

  renderLoadingView: function() {
    return (
      <View>
        <Header />
        <View style={styles.loading}>
          <ActivityIndicatorIOS
            animating={true}
            color={'#808080'}
            size={'large'} />
        </View>
      </View>
    );
  }

});

var styles = StyleSheet.create({
  loading: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column'
  },

  innercontainer: {
    padding: 8
  }
});

module.exports = EventDetail;
