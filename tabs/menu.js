'use strict';

var React = require('react-native');
var config = require('../config/config');

var UserStore = require('../stores/UserStore');
var Dispatcher = require('../dispatcher/dispatcher');
var Constants = require('../constants/constants');
var ActionTypes = Constants.ActionTypes;

var stylingHelper = require('./../config/style.js');
var styleGuide = stylingHelper.styleGuide;
var styleExtend = stylingHelper.styleExtend;

var Header = require('../components/header');
var MainMenu = require('./menu/MainMenu');
var Profile = require('./UserProfile');
var History = require('./menu/history');
var About = require('./menu/about');

var {
  AsyncStorage,
  ScrollView,
  StyleSheet,
  View
} = React;

var LOGOUT_REQUEST_URL = config.url + '/logout'

var menuTab = React.createClass({
  getInitialState: function () {
    var userData = UserStore.getData();
    return {
      currentPage: 'menu',
      currentUser: userData.user,
      token: userData.token
    };
  },

  logout: function () {
    fetch(LOGOUT_REQUEST_URL, {
      method: 'GET'
    }).then(function () {
      AsyncStorage.multiRemove(['userId', 'token']);
      Dispatcher.dispatch({
        type: ActionTypes.LOGOUT
      });
    });
  },

  changePage: function(name) {
    name = name || 'menu';
    this.setState({currentPage: name});
  },

  render: function() {
    var displayTab;

    if (this.state.currentPage === 'menu') {
      displayTab = (
        <MainMenu 
          changePage={this.changePage} 
          logout={this.logout} 
        />
      );
    } else if (this.state.currentPage === 'profile') {
      displayTab = (
        <Profile 
          subject={this.state.currentUser} 
          currentUser={this.state.currentUser} 
          lastPage={'menu'} 
          onback={this.changePage} 
        />
      );
    } else if (this.state.currentPage === 'history') {
      displayTab = (
        <History 
          subject={this.state.currentUser} 
          currentUser={this.state.currentUser} 
          lastPage='menu' 
          onback={this.changePage}/>
      );
    } else if (this.state.currentPage === 'about') {
      displayTab = (
        <About 
          lastPage='menu' 
          onback={this.changePage} 
        />
      );
    }

    return (
      <View style={ styles.container }>
        <Header />
        <ScrollView contentContainerStyle={styles.innercontainer}>
          {displayTab}
        </ScrollView>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: styleExtend({
  }, 'container'),
  innercontainer: styleExtend({
  }, 'center')
});

module.exports = menuTab;