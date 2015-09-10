'use strict';

var Header = require('../components/header');
var React = require('react-native');
var config = require('./../config/config.js');
var SearchBar = require('react-native-search-bar');
var Dispatcher = require ('../dispatcher/dispatcher');
var UserStore = require('../stores/UserStore');
var Back = require('../components/common').BackButton;
var Button = require('react-native-button');

var REQUEST_URL = 'http://localhost:3000';

var {
  StyleSheet,
  ListView,
  Text,
  TextInput,
  View,
  DatePickerIOS
} = React;

var newTab = React.createClass({

  getDefaultProps: function () {
     return {
       date: new Date(),
       timeZoneOffsetInHours: (-1) * (new Date()).getTimezoneOffset() / 60,
     };
   },

  getInitialState: function () {
    return {
      searchQ: '',
      results: [],
      location: {},
      time: 0,
      date: this.props.date,
      today: new Date(),
      timeZoneOffsetInHours: this.props.timeZoneOffsetInHours,
      capacity: 0,
      filledSeats: 0,
      description: '',
      event: {}
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
    var date = new Date();
    var time = date.getTime();
    this.setState({
      time: time
    });
    setTimeout(() => {
      var date = new Date();
      var newTime = date.getTime();
      if(Math.abs(this.state.time - newTime) > 500){
        this.search(time);
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

 onDateChange: function(date) {
    this.setState({date: date});
  },

  createEvent: function(){
    this.setState({
      event: {
        location: this.state.location,
        description: this.state.description,
        capacity: this.state.capacity,
        filledSeats: this.state.filledSeats,
        date: this.state.date
      }
    })

  },


  render: function() {

    if(this.state.location.name && !this.state.event.description){
      return (
        <View style={styles.container} >
          <Header />
          <Back onback={() =>{
            this.setState({location: {}})
          }}/>
          <Text style={styles.title} >{this.state.location.name}</Text>
          <View>
            <View style={styles.listContainer}>
              <Text style={styles.title} >How many people? </Text>
              <TextInput keyboardType="numeric" style={styles.numInput} onChangeText={(filledSeats) => {
                this.setState({filledSeats : filledSeats});
              }} />
              <Text> / </Text>
              <TextInput keyboardType="numeric" style={styles.numInput} onChangeText={(capacity) => {
                this.setState({capacity: capacity});
              }} />
            </View>
            <View>
              <Text style={styles.title} >Description:  </Text>
              <TextInput style={styles.desInput} onChangeText={(description) =>{
                this.setState({description: description});
              }} />
            </View>
            <Text style={styles.title} >When?</Text>
            <View>
              <DatePickerIOS
              date={this.state.date}
              minimumDate={this.state.today}
              mode="datetime"
              timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
              onDateChange={this.onDateChange} />
            </View>
            <Button style={{color: 'green'}} onPress={this.createEvent}>
              Create Event
            </Button>
          </View>
        </View>
        )
    }else if(this.state.event.description){
      var des = this.state.event.description;
      return (
        <View>
        <Header />
        <Text>{des}</Text>
        </View>
        );
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
  desInput: {
    height: 50,
    padding: 5,
    borderColor: 'gray',
    borderWidth: 1,
  },
  numInput: {
    height: 25,
    width: 25,
    padding: 5,
    borderColor: 'gray',
    borderWidth: 1,
  },
  container: {
    backgroundColor: '#F5FCFF',
    flex: 1,
  },
  listView: {
    marginBottom: 50
  },
  listContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10
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