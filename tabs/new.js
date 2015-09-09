'use strict';

var Header = require('../components/header');
var React = require('react-native');
var config = require('./../config/config.js');
var SearchBar = require('react-native-search-bar');
var Dispatcher = require ('../dispatcher/dispatcher');
var UserStore = require('../stores/UserStore');

var REQUEST_URL = 'http://localhost:3000';

var {
  StyleSheet,
  ListView,
  Text,
  View
} = React;

var newTab = React.createClass({
  getInitialState: function () {
    return {
      searchQ: '',
      results: [],
      time: 0
    };
  },

  createResultsDataSource: function () {
    var dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    return dataSource.cloneWithRows(this.state.results);
  },

  renderSearch: function (location){
    return (
      <View style={styles.container}>
        <Text style={styles.description} >{location.name}</Text>
      </View>
      );
  },

  throttle: function (){
    var that = this;
    var date = new Date();
    var time = date.getTime();
    this.setState({
      time: time
    });
    setTimeout(() => {
      var date = new Date();
      var newTime = date.getTime();
      if(Math.abs(this.state.time - newTime) > 500){
        that.search(time);
      }
    }, 500)
  },

  search: function(time){
    var data = UserStore.getData();
    fetch(REQUEST_URL + '/locations?latitude='+data.location.latitude+'&longitude='+data.location.longitude+'&radius=7000'+'&q='+this.state.searchQ, {
    }).then((response) => {
      console.log('~~~~~', response);
      return response.json();
    }).then((response) => {
      if(response.locations.length > 0){
        this.setState({
          results: response.locations
        })
      }
    }).done();
    return;
  },



  render: function() {
    return (
      <View style={ styles.container }>
        <Header />
        <SearchBar
        onChangeText={(text) => {
          text = text.replace(/ /g, '%20');
          this.setState({searchQ: text});
          this.throttle();
        }}
        onPress={this.press}
        placeholder='Search' />
        <ListView 
          dataSource={this.createResultsDataSource()}
          renderRow={this.renderSearch}
          style={styles.listView}/>
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