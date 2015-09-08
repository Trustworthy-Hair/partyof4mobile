'use strict';

var Header = require('../components/header');
var React = require('react-native');

var SearchBar = require('react-native-search-bar');
var UserStore = require('../stores/UserStore');

var {
  StyleSheet,
  Text,
  View
} = React;

var newTab = React.createClass({
  
  render: function() {
    var data = UserStore.getData();
    console.log('data: ', data);
    return (
      <View style={ styles.container }>
        <Header />
        <SearchBar
        onChange={this.change}
        placeholder='Search'/>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1
  }
});

module.exports = newTab;