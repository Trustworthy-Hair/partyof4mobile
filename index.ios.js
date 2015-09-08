/**
 * Party of 4 Mobile
 * https://github.com/Trustworthy-Hair/partyof4mobile
 */
'use strict';

var MapTab     = require('./tabs/map'),
    SearchTab  = require('./tabs/search'),
    ListTab    = require('./tabs/list'),
    NewTab     = require('./tabs/new'),
    MenuTab    = require('./tabs/menu'),
    Login      = require('./components/login'),
    React      = require('react-native'),
    Dispatcher = require('./dispatcher/dispatcher'),
    Constants  = require('./constants/constants'),
    UserStore  = require('./stores/UserStore');

var ActionTypes = Constants.ActionTypes;

var LOGIN_REQUEST_URL = 'http://localhost:3000/users/login';
var GET_USER_REQUEST_URL = 'http://localhost:3000/users/';

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TabBarIOS,
  StatusBarIOS,
  AsyncStorage
} = React;

var partyof4mobile = React.createClass({
  getInitialState: function () {
    return {
      token: null,
      user: null,
      tabs: ['map', 'search','list', 'new', 'menu'],
      selectedTab: 'map'
    };
  },

  componentWillMount: function () {
    var token;
    AsyncStorage.multiGet(['token', 'userId']).then((data) => {
      token = data[0][1];
      return this.getUser(data[1][1]);
    }).then((user) => {
      return user.json();
    }).then((user) => {
      Dispatcher.dispatch({
        type: ActionTypes.STORE_USER,
        user: user,
        token: token
      });
    });
  },

  componentDidMount: function () {
    UserStore.addChangeListener(this._onChange);
  },

  changeTab: function (tabName) {
    StatusBarIOS.setStyle(tabName === 'map' ? 1 : 0);
    this.setState({
      selectedTab: tabName
    });
  },

  login: function (user) {
    fetch(LOGIN_REQUEST_URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    }).then((response) => {
      console.log('asdf', response);
      return response.json();
    }).then((response) => {
      console.log('!!!!!!!!!', response);
      if (response.token && response.user) {
        AsyncStorage.multiSet([
          ['token', response.token],
          ['userId', response.user.id.toString()]
        ]);
        console.log('asdf', response);
        Dispatcher.dispatch({
          type: ActionTypes.STORE_USER,
          user: response.user,
          token: response.token
        });
      }
    }).done();
  },

  getUser: function (userId) {
    return fetch(GET_USER_REQUEST_URL + userId, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
  },

  _onChange: function () {
    this.setState({
      token: UserStore.getData().token
    });
  },

  render: function() {
    // FOR TESTING, login page is being bypassed
    // To visit the login page, change to if (this.state.loggedIn)
    if (this.state.token) { 
      var current = this;
      var selectedTab = this.state.selectedTab;
      var icons = {
        map: require('image!map'),
        search : require('image!search'),
        list : require('image!list'),
        new : require('image!new'),
        menu : require('image!menu')
      };
      var tabs = {
        map: (<MapTab />),
        search : (<SearchTab />),
        list : (<ListTab />),
        new : (<NewTab />),
        menu : (<MenuTab />)
      }

      var tabBarItems = this.state.tabs.map(function(tabBarItem) {
        return (
          <TabBarIOS.Item key={'tabBar'+tabBarItem}
            title={tabBarItem}
            icon={icons[tabBarItem]}
            onPress={ () => current.changeTab(tabBarItem) }
            selected={ selectedTab === tabBarItem }>
            {tabs[tabBarItem]}
          </TabBarIOS.Item>
        );
      });

      return (
        <TabBarIOS tintColor='#2e6a8b' barTintColor='white' translucent={false}>
          {tabBarItems}
        </TabBarIOS>
      );
    } else {
      return (
        <Login onLogin={this.login}/>
      );
    }
  }
});

var styles = StyleSheet.create({
});

AppRegistry.registerComponent('partyof4mobile', () => partyof4mobile);
