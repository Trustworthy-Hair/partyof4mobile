'use strict';

var React      = require('react-native'),
    Header     = require('../components/header'),
    config     = require('./../config/config.js'),
    SearchBar  = require('react-native-search-bar'),
    Dispatcher = require ('../dispatcher/dispatcher'),
    UserStore  = require('../stores/UserStore'),
    Back       = require('../components/common').BackButton,
    Constants   = require('../constants/constants'),
    stylingHelper = require('./../config/style.js');

var styleGuide = stylingHelper.styleGuide,
    styleExtend = stylingHelper.styleExtend;

var ActionTypes = Constants.ActionTypes;

var REQUEST_URL = config.url;

var {
  StyleSheet,
  ListView,
  Text,
  TextInput,
  View,
  DatePickerIOS,
  TouchableHighlight
} = React;

var newEventTab = React.createClass({

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
      currentSize: 0,
      description: '',
      event: {}
    };
  },
  goToMap: function(){
    var payload = {};
    payload.currentView = 'map';
    Dispatcher.dispatch({
      type: ActionTypes.STORE_USER,
      payload: payload
    });
  },

  createResultsDataSource: function () {
    var dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    return dataSource.cloneWithRows(this.state.results);
  },

  renderSearch: function (location){
    var price = '';
    for (var i = 0; i < location.price; i++) {
      price = price + '$';
    }
    var distance = (location.distance/1609).toFixed(2) + 'mi';

    return (
      <TouchableHighlight onPress={() => {this.setState({location: location});}}>
        <View style={styles.innerContainer}>
          <Text style={styles.location}>{location.name.substring(0, 35)}</Text>
          <View style={styles.itemBottomContainer}>
            <View style={styles.words}>
              <Text style={styles.info}>{location.tags ? location.tags[0] : 'Unknown'}, {distance}</Text>
            </View>
            <Text>{price}</Text>
          </View>
        </View>
      </TouchableHighlight>
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
      if(Math.abs(this.state.time - newTime) > 450){
        this.search(false, time);
      }
    }, 500)
  },

  search: function(reset, time){
    var queryPart = reset ? '' : '&q='+this.state.searchQ;
    var data = UserStore.getData();
    fetch(REQUEST_URL + '/locations?latitude='+data.location.latitude+'&longitude='+data.location.longitude+'&radius=2000'+queryPart, {
    // fetch(REQUEST_URL + '/locations?latitude=37.7837209&longitude=-122.4090445&radius=2000'+queryPart, {
    }).then((response) => {
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

  onDateChange: function(date) {
    this.setState({date: date});
  },

  createEvent: function(){
    var data = {
      hostId: UserStore.getData().user.id,
      locationId: this.state.location.locationId,
      description: this.state.description,
      capacity: this.state.capacity,
      currentSize: this.state.currentSize,
      plannedTime: this.state.date,
      accessToken: UserStore.getData().token
    };
    fetch(REQUEST_URL + '/events', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then((response) => {
      return response.json();
    }).then((response) => {
      delete response.token;
      this.setState({event: response});
    }).done();
    this.goToMap();
    this.setState({event: {}})
  },

  componentDidMount: function(){
    this.search(true);
  },

  render: function() {
    if (this.state.location.name && !this.state.event.description) {
      return (
        <View style={styles.container} >
          <Header />
          <View style={styles.formContainer}>
            <Back onback={() =>{this.setState({location: {}})}}/>
            <Text style={styles.location} >{this.state.location.name}</Text>
            <View>
              <View style={styles.listContainer}>
                <Text style={styles.title}>How many people are there? </Text>
                <TextInput keyboardType="numeric" style={styles.numInput} onChangeText={(currentSize) => {
                  this.setState({currentSize : currentSize});
                }} />
              </View>
              <View style={styles.listContainer}>
                <Text style={styles.title}>How many open seats? </Text>
                <TextInput keyboardType="numeric" style={styles.numInput} onChangeText={(openSeats) => {
                  this.setState({capacity: +openSeats+ +this.state.currentSize});
                }} />
              </View>
              <View style={styles.colContainer}>
                <Text style={styles.title}>Description:  </Text>
                <TextInput style={styles.desInput} onChangeText={(description) =>{
                  this.setState({description: description});
                }} />
              </View>
              <DatePickerIOS
                date={this.state.date}
                minimumDate={this.state.today}
                mode="datetime"
                timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
                onDateChange={this.onDateChange} />
              <View style={styles.colContainer}>
                <TouchableHighlight onPress={ this.createEvent }>
                  <View style={styles.login}> 
                    <Text style={ styles.submit }>Create Event</Text>
                  </View>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Header />
          <SearchBar
            onChangeText={(text) => {
              text = text.replace(/ /g, '%20');
              this.setState({searchQ: text});
              this.throttle();
            }}
            onCancelButtonPress={() => {
              this.search(true);
            }}
            placeholder='Search' />
          <ListView 
            dataSource={this.createResultsDataSource()}
            renderRow={this.renderSearch}
            style={{marginBottom: 40}}/>
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
    flex: 1,
  },

  colContainer: styleExtend({
    alignItems: 'center'
  }, 'container'),

  listContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 10
  },

  innerContainer: styleExtend({
    borderBottomWidth: 1,
    borderBottomColor: styleGuide.colors.light,
    borderStyle: 'solid',
    justifyContent: 'center',
    height: 55,
    marginLeft: 20
  }, 'container'),

  itemBottomContainer: {
    flex: 1,
    flexDirection: 'row'
  },

  words: {
    width: 300,
  },

  location: styleExtend({
    fontWeight: 'bold',
    textAlign: 'left',
    color: styleGuide.colors.main
  }, 'font'),

  formContainer: styleExtend({
    marginLeft: 20,
    marginRight: 20
  }, 'container'),

  info: styleExtend({
    fontSize: 14,
    textAlign: 'left'
  }, 'font'),

  title: styleExtend({
  }, 'font'),

  submit: styleExtend({
  }, 'submitfont'),

  login: styleExtend({
    justifyContent: 'center',
  }, 'button'),

});

module.exports = newEventTab;
