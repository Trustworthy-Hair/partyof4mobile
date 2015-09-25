var React       = require('react-native'),
    config      = require('../../config/config'),
    Dispatcher  = require ('../../dispatcher/dispatcher'),
    EventsStore = require('../../stores/EventsStore'),
    UserStore   = require('../../stores/UserStore'),
    Constants   = require('../../constants/constants');

var Header    = require('../../components/header'),
    EventInfo = require('./EventInfo'),
    HostView  = require('./HostView'),
    Attendees = require('./Attendees'),
    Pending  = require('../Pending'),
    Profile = require('../user/UserProfile'),
    Back = require('../../components/common').BackButton;

var ActionTypes = Constants.ActionTypes;

var JOIN_EVENT_REQUEST_URL   = config.url + '/events/:eventId/join',
    GET_EVENT_REQUEST_URL    = config.url + '/events/',
    UPDATE_EVENT_REQUEST_URL = config.url + '/events/',
    APPROVE_USER_REQUEST_URL = config.url + '/events/:eventId/approve';

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
      token: userData.token,
      renderProfile: false,
      subject: {}
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
    var requestUrl = UPDATE_EVENT_REQUEST_URL + this.state.event.id;
    var queryString = '?accessToken=' + this.state.token;
    fetch(requestUrl + queryString, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({completedStatus: true})
    })
    .then(() => {
      this.getEvent();
    });
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
    return this.state.event.Users.filter((user) => {
      if (user.id === this.state.user.id && user.id === this.state.event.host.id) {
        return false;
      } else {
        return !user.UserEvents.userConfirmed && user.UserEvents.arrivalStatus !== 'Declined';
      }
    });
  },

  onback: function(){
    this.setState({renderProfile: false})
  },

  renderProfile: function(user){
    this.setState({
      subject: user,
      renderProfile: true
    })
  },

  render: function () {
    if (!this.state.event) return this.renderLoadingView();

    var hostView;
    if (this.state.user.id !== this.state.event.host.id) {
      hostView = (<HostView
        renderProfile={this.renderProfile}
        host={this.state.event.host} 
      />);
    }
    if(!this.state.renderProfile){
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
              onback={this.onback} 
              attendeesList={this.getAttendees()}
              renderProfile={this.renderProfile} 
            />
            <Pending 
              pendingList={this.getPending()} 
              host={this.state.event.host}
              currentUser={this.state.user} 
              approveOrDenyUser={this.approveOrDenyUser} 
              renderProfile={this.renderProfile} 
            />
          </View>
        </View>
      );
    }else{
      return (
        <Profile 
          onback={this.onback}
          currentUser={this.state.user}
          subject={this.state.subject}
        />
      );
    }
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
