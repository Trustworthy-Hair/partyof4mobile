'use strict';

var React = require('react-native');

var config = require('../config/config');
var UserStore = require('../stores/UserStore');
var stylingHelper = require('../config/style.js');

var ViewProfile = require('./ViewProfile');
var EditProfile = require('./EditProfile');
var Loading = require('./Loading');

var styleGuide = stylingHelper.styleGuide;
var styleExtend = stylingHelper.styleExtend;

var {
  ActivityIndicatorIOS,
  StyleSheet,
  View
} = React;

var GET_REVIEWS_REQUEST_URL = config.url + '/users/:userId/reviews';
var GET_USER_REQUEST_URL = config.url + '/users/';
var UPDATE_PROFILE_REQUEST_URL = config.url + '/users/:userId';
var token;

var UserProfile = React.createClass({

  getInitialState: function () {
    return {
      editing: false,
      subject: this.props.subject,
      reviews: null
    };
  },

  componentWillMount: function () {
    token = UserStore.getData().token;
    this.getReviews();
  },

  toggleEdit: function () {
    this.setState({
      editing: !this.state.editing
    });
  },

  goBack: function () {
    this.props.onback(this.props.lastPage);
  },

  updateProfile: function (updatedUser) {
    var requestUrl = UPDATE_PROFILE_REQUEST_URL.replace(':userId', this.props.subject.id);
    requestUrl += '?accessToken=' + token;
    fetch(requestUrl, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedUser)
    }).then(this.getSubject);
  },

  getSubject: function () {
    return fetch(GET_USER_REQUEST_URL + this.props.subject.id, {
      method: 'GET'
    }).then((response) => {
      return response.json();
    }).then((subject) => {
      this.setState({
        subject: subject
      });
    });
  },

  getReviews: function () {
    var requestUrl = GET_REVIEWS_REQUEST_URL.replace(':userId', this.props.subject.id);
    requestUrl += '?accessToken=' + token;
    fetch(requestUrl, {
      method: 'GET'
    }).then((response) => {
      return response.json();
    }).then((response) => {
      this.setState({
        reviews: response.reviews
      });
    });
  },

  render: function() {
    if (this.state.reviews === null) {
      return (
        <Loading />
      );
    }
    if (this.state.editing) {
      return (
        <EditProfile 
          subject={this.state.subject} 
          toggleEdit={this.toggleEdit} 
          updateProfile={this.updateProfile} 
        />
      );
    }
    return (
      <ViewProfile 
        subject={this.state.subject} 
        currentUser={this.props.currentUser} 
        reviews={this.state.reviews} 
        toggleEdit={this.toggleEdit} 
        goBack={this.goBack} 
      />
    );
  }

});

var styles = StyleSheet.create({
});

module.exports = UserProfile;
