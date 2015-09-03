'use strict';

var Header = require('../components/header'),
    Profile = require('./menu/profile'),
    History = require('./menu/history'),
    About = require('./menu/about');

var React = require('react-native');
var {
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} = React;

var menuTab = React.createClass({
  getInitialState() {
    return {
      currentPage: 'menu'
    };
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
          <TouchableHighlight style={styles.link} onPress={ function() { current.changePage('profile') }}>
              <View > 
                <Text >edit your profile</Text>
              </View>
          </TouchableHighlight>
          <TouchableHighlight style={styles.link} onPress={ function() { current.changePage('history') }}>
              <View > 
                <Text >view your history</Text>
              </View>
          </TouchableHighlight>
          <TouchableHighlight style={styles.link} onPress={ function() { current.changePage('about') }}>
              <View > 
                <Text >learn about us</Text>
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

    var current = this;
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