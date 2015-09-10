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
  TextInput,
  View
} = React;

var newTab = React.createClass({
  getInitialState: function () {
    return {
      searchQ: '',
      results: [],
      location: {},
      time: 0
    };
  },

  pickRestaurant: function(){
    console.log('picked: ', this.state.location)
  },

  createResultsDataSource: function () {
    var dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    return dataSource.cloneWithRows(this.state.results);
  },

  renderSearch: function (location){
    var price = '';
    for(var i = 0; i < location.price; i++){
      price = price + '$'
    }
    return (
      <View style={styles.listContainer}>
        <View>
          <Text onPress={() => {
            console.log('@@@@@@', location);
            this.setState({location: location});
            this.pickRestaurant();
          }} style={styles.title} >{location.name}</Text>
        </View>
        <View>
          <Text style={styles.price} >{price}</Text>
        </View>
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
      return response.json();
    }).then((response) => {
      if(response.locations.length > 0){
        console.log('~~~~~', response.locations);
        this.setState({
          results: response.locations
        })
      }
    }).done();
    return;
  },



  render: function() {

    if(this.state.location.name){
      return (
        <View style={styles.container} >
          <Header />
          <Text>{this.state.location.name}</Text>
          <Text>How many people</Text>
          <View style={styles.listContainer} >
            <TextInput keyboardType="numeric" style={styles.input}></TextInput>
            <Text> / </Text>
            <TextInput keyboardType="numeric" style={styles.input}></TextInput>
          </View>
        </View>
        )
    }else{
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

  }
});

var styles = StyleSheet.create({
  input: {
    height: 20,
    width: 20,
    borderColor: 'gray',
    borderWidth: 1,
  },
  container: {
    backgroundColor: '#F5FCFF',
    flex: 1
  },
  listView: {
    marginBottom: 50
  },
  listContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'left'
  },
  price: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'right'
  }
});

module.exports = newTab;