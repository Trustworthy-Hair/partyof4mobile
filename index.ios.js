/**
 * Party of 4 Mobile
 * https://github.com/Trustworthy-Hair/partyof4mobile
 */
'use strict';

var React       = require('react-native'),
    MapTab      = require('./tabs/map'),
    ListTab     = require('./tabs/list'),
    NewTab      = require('./tabs/new'),
    MenuTab     = require('./tabs/menu'),
    EventDetail = require('./tabs/EventDetail'),
    CreateReview = require('./tabs/CreateReview/CreateReview'),
    Login       = require('./components/login'),
    Dispatcher  = require('./dispatcher/dispatcher'),
    Constants   = require('./constants/constants'),
    UserStore   = require('./stores/UserStore');

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
  list : require('image!list'),
  new : require('image!new'),
  menu : require('image!menu')
};

var tabs = {
  map: (<MapTab />),
  list : (<ListTab />),
  new : (<NewTab />),
  menu : (<MenuTab />),
  eventDetail: (<EventDetail />),
  createReview: (<CreateReview />)
};

var partyof4mobile = React.createClass({

  getDefaultProps: function () {
    return {
      icons: ['map', 'list', 'new', 'menu']
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
    var payload = {};
    payload.currentView = tabName;
    Dispatcher.dispatch({
      type: ActionTypes.STORE_USER,
      payload: payload
    });
  },

  login: function (user, callback) {
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
      } else {
        if (callback) { callback(); }
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
    if (!this.state.token) { 
      return (
        <Login onLogin={this.login}/>
      );
    }
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

    if (icons[selectedTab]) {
      return (
        <TabBarIOS tintColor='#2e6a8b' barTintColor='white' translucent={false}>
          {tabBarItems}
        </TabBarIOS>
      );
    } else {
      return (
        <View style={styles.container}>
          {tabs[selectedTab]}
          <TabBarIOS tintColor='#2e6a8b' barTintColor='white' translucent={false}>
            {tabBarItems}
          </TabBarIOS>
        </View>
      );
    }
  }
});

var styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1
  },
});

AppRegistry.registerComponent('partyof4mobile', () => partyof4mobile);
