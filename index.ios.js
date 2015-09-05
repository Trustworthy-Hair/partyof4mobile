/**
 * Party of 4 Mobile
 * https://github.com/Trustworthy-Hair/partyof4mobile
 */
'use strict';

var MapTab    = require('./tabs/map'),
    // store     = require('./store/userStore'),
    SearchTab = require('./tabs/search'),
    ListTab   = require('./tabs/list'),
    NewTab    = require('./tabs/new'),
    MenuTab   = require('./tabs/menu'),
    Login     = require('./components/login'),
    React     = require('react-native');

var store = {};

var REQUEST_URL = 'https://localhost:3000/users/login';

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TabBarIOS,
  StatusBarIOS
} = React;

var partyof4mobile = React.createClass({
  getInitialState() {
    return {
      token: null,
      user: null,
      tabs: ['map', 'search', 'list','new','menu'],
      selectedTab: 'map'
    };
  },
  changeTab(tabName) {
    StatusBarIOS.setStyle(tabName === 'map' ? 1 : 0);
    this.setState({
      selectedTab: tabName
    });
  },
  login: function() {
 
     //  fetch(requestURL, {
     //   method: 'POST',
     //   headers: {
     //    'Accept': 'application/json',
     //    'Content-Type': 'application/json'
     //   },
     //   body: JSON.stringify({
     //    username: store.username,
     //    password: store.passowrd
     //   })
     //  }).then((responseData) => {
     //   // this.setState({
     //   //   token: responseData.token,
     //   //   user: responseData.user
     //   // });
     //    store.user = responseData.user;
     //    store.token = responseData.token;
     //    store.password = null;
     // })
     // .done();

    this.setState({
      loggedIn: true,
      token: true
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
