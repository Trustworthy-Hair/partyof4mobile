'use strict';

var Header = require('../components/header');
var React = require('react-native');
var config = require('./../config/config.js');
var SearchBar = require('react-native-search-bar');
var Dispatcher = require ('../dispatcher/dispatcher');
var UserStore = require('../stores/UserStore');

var {
  StyleSheet,
  ListView,
  Text,
  View
} = React;

var newTab = React.createClass({
  getInitialState: function () {
    return {
      searchQ: []
    };
  },

  createInterestsDataSource: function () {
    var dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    return dataSource.cloneWithRows(this.state.searchQ);
  },

  renderSearch: function (location){
    console.log('~~~~~~~~', this.state.searchQ);
    return (
      <View style={styles.container}>
        <Text style={styles.description} >{location.name}</Text>
      </View>
      );
  },

  search: function (){
    console.log('asdfasdfasfasdfasdfasdf');
    var data = UserStore.getData();

    fetch('http://localhost:3000/locations?latitude='+data.location.latitude+'&longitude='+data.location.longitude+'&q='+this.state.searchQ+'&radius=7000', {
    }).then((response) => {
      return response.json();
    }).then((response) => {
      // console.log(response.locations);
      this.setState({
        searchQ: response.locations
      })
    }).done();
    return;
  },



  render: function() {
    return (
      <View style={ styles.container }>
        <Header />
        <SearchBar
        onChangeText={(text) => {
          this.setState({searchQ: text});
          this.search();
        }}
        onPress={this.press}
        placeholder='Search' />
        <ListView 
          dataSource={this.createInterestsDataSource()}
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