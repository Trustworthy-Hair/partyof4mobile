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
    // EventView  = require('./tabs/eventDetail'),
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
};

var partyof4mobile = React.createClass({

  getDefaultProps: function () {
    return {
      icons: ['map', 'search', 'list', 'new', 'menu']
    };
  },

  getInitialState: function () {
    return {
      token: null,
      user: null
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
      var payload = {
        user: user,
        token: token,
        currentView: 'map'
      };
      Dispatcher.dispatch({
        type: ActionTypes.STORE_USER,
        payload: payload
      });
    });
  },

  componentDidMount: function () {
    UserStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function () {
    UserStore.removeChangeListener(this._onChange);
  },

  changeTab: function (tabName) {
    StatusBarIOS.setStyle(tabName === 'map' ? 1 : 0);
    this.setState({
      currentView: tabName
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
      return response.json();
    }).then((response) => {
      if (response.token && response.user) {
        AsyncStorage.multiSet([
          ['token', response.token],
          ['userId', response.user.id.toString()]
        ]);
        var payload = {
          user: response.user,
          token: response.token,
          currentView: 'map'
        };
        Dispatcher.dispatch({
          type: ActionTypes.STORE_USER,
          payload: payload
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
    var data = UserStore.getData();
    this.setState(data);
  },

  render: function() {
    // FOR TESTING, login page is being bypassed
    // To visit the login page, change to if (this.state.loggedIn)
    if (this.state.token) { 
      var selectedTab = this.state.currentView;

      var tabBarItems = this.props.icons.map((tabBarItem) => {
        return (
          <TabBarIOS.Item key={'tabBar'+tabBarItem}
            title={tabBarItem}
            icon={icons[tabBarItem]}
            onPress={ () => this.changeTab(tabBarItem) }
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
