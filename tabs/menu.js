'use strict';

var React = require('react-native'),
    Header = require('../components/header'),
    Profile = require('./menu/profile'),
    History = require('./menu/history'),
    About = require('./menu/about'),
    Dispatcher = require('../dispatcher/dispatcher'),
    Constants = require('../constants/constants');

var ActionTypes = Constants.ActionTypes;

var {
  AsyncStorage,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} = React;

var LOGOUT_REQUEST_URL = 'http://localhost:3000/logout'

var menuTab = React.createClass({
  getInitialState: function () {
    return {
      currentPage: 'menu'
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
    if (name === undefined) {
      var name = 'menu';
    }
    this.setState({currentPage: name});
  },

  render: function() {
    var displayTab;
    if (this.state.currentPage ==='menu') {
      displayTab = (
        <View style={styles.innercontainer}>
          <TouchableHighlight style={styles.link} onPress={ () => { this.changePage('profile'); }}>
              <View > 
                <Text >View Your Profile</Text>
              </View>
          </TouchableHighlight>
          <TouchableHighlight style={styles.link} onPress={ () => { this.changePage('history'); }}>
              <View > 
                <Text >View Your History</Text>
              </View>
          </TouchableHighlight>
          <TouchableHighlight style={styles.link} onPress={ () => { this.changePage('about'); }}>
              <View > 
                <Text >About Us</Text>
              </View>
          </TouchableHighlight>
          <TouchableHighlight style={styles.link} onPress={ () => { this.logout(); }}>
              <View > 
                <Text >Logout</Text>
              </View>
          </TouchableHighlight>
        </View>
      );
    } else if (this.state.currentPage === 'profile') {
      displayTab = (
        <Profile onback={this.changePage}/>
      );
    } else if (this.state.currentPage === 'history') {
      displayTab = (
        <History onback={this.changePage}/>
      );
    } else if (this.state.currentPage === 'about') {
      displayTab = (
        <About onback={this.changePage}/>
      );
    }

    return (
      <View style={ styles.container }>
        <Header />
        {displayTab}
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    flexDirection: 'column',
    flex: 1
  },
  innercontainer: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  link: {
    backgroundColor: '#f5efe2',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    width: 300,
    height: 50,
    margin: 7
  }
});

module.exports = menuTab;