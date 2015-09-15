'use strict';

var Header = require('../components/header'),
    React = require('react-native'),
    config = require('../config/config.js'),
    Dispatcher = require('../dispatcher/dispatcher'),
    EventsStore = require('../stores/EventsStore'),
    UserStore = require('../stores/UserStore'),
    Constants = require('../constants/constants'),
    stylingHelper = require('./../config/style.js');

var styleGuide = stylingHelper.styleGuide,
    styleExtend = stylingHelper.styleExtend;

var ActionTypes = Constants.ActionTypes;

var GET_NEARBY_EVENTS_REQUEST_URL = config.url + '/events';

var {
  ActivityIndicatorIOS,
  Image,
  ListView,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} = React;

var listTab = React.createClass({
  getInitialState: function() {
    return {
      events: [],
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      userLocation: UserStore.getData().location,
      loaded: false
    };
  },

  getDataFromServer: function() {
    var queryString = [
      'latitude=' + this.state.userLocation.latitude,
      'longitude=' + this.state.userLocation.longitude
    ].join('&');

    fetch(GET_NEARBY_EVENTS_REQUEST_URL + '?' + queryString)
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({
        events: responseData,
        dataSource: this.state.dataSource.cloneWithRows(responseData),
        loaded: true
      });
    })
    .catch((error) => console.warn(error))
    .done();
  },

  componentDidMount: function() {
    this.getDataFromServer();
  },

  render: function() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }
    return (
      <View style={ styles.container }>
        <Header />
        <View style={ styles.innercontainer }>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderEvent}
            style={styles.listView}
          />
        </View>
      </View>
    );
   },

  renderLoadingView: function() {
    return (
      <View style={ styles.container }>
        <Header />
        <View style={styles.loading}>
          <ActivityIndicatorIOS
            animating={true}
            color={'#808080'}
            size={'large'} />
        </View>
      </View>
    );
  },

  renderEvents: function() {
    return (
      <View style={ styles.container }>
        <Header />
        <ListView
          dataSource={this.state.events}
          renderRow={this.renderEvent}
        />
      </View>
    );
  },

  renderEvent: function(event) {
    var people = [];
    for (var i = 0; i< event.currentSize; i++) {
      people.push((<Image style={styles.personTaken} source={{uri:'http://i.imgur.com/4izv6mx.png'}} />));
    }

    var openpeople = [];
    for (var i = 0; i< (event.capacity - event.currentSize); i++) {
      openpeople.push((<Image style={styles.personOpen} source={{uri: 'http://i.imgur.com/C1MqnOr.png'}} />));
    }

    return (
      <TouchableHighlight onPress={() => this.setCurrentEvent(event)}>
        <View style={styles.innercontainer}>
          <View style={styles.iconBox}>
            <Image
              style={styles.icon}
              source={require('image!restaurant')} />
          </View>
          <View style={styles.rightContainer}> 
            <Text style={styles.location}>{event.Location.name}</Text>
            <View style={styles.rightBottomContainer}>
              <View style={styles.words}>
                <Text style={styles.info}>{event.currentActivity}</Text>
                <Text style={styles.info}>{(event.distance/1609).toFixed(2) + 'mi'}</Text>
              </View>
              <View style={styles.peopleContainer}>
                <View style={styles.people}>{openpeople}</View>
                <View style={styles.people}>{people}</View>
              </View>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  },

  setCurrentEvent: function (event) {
    var payload = event;
    Dispatcher.dispatch({
      type: ActionTypes.STORE_CURRENT_EVENT,
      payload: payload
    });
    payload = {};
    payload.currentView = 'eventDetail';
    Dispatcher.dispatch({
      type: ActionTypes.STORE_USER,
      payload: payload
    });
  }

});

var styles = StyleSheet.create({
  container: styleExtend({
  }, 'container'),

  innercontainer: {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: styleGuide.colors.light,
    borderStyle: 'solid',
    justifyContent: 'center',
    height: 74
  },

  rightContainer: styleExtend({
  }, 'container'),

  rightBottomContainer: {
    flex: 1,
    flexDirection: 'row'
  },

  people: styleExtend({
    flexDirection: 'row',
  }, 'container', 'center'),

  peopleContainer: styleExtend({
  }, 'container', 'center'),

  words: {
    width: 160,
  },

  location: styleExtend({
    fontWeight: 'bold',
    textAlign: 'left',
    color: styleGuide.colors.dark
  }, 'font'),

  info: styleExtend({
    fontSize: 14,
    textAlign: 'left'
  }, 'font'),

  icon: {
    width: 64,
    height: 64,
    tintColor: styleGuide.colors.main,
    opacity: 0.5
  },

  iconBox: {
    padding: 5
  },

  loading: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column'
  },

  personTaken: {
    width: 14,
    height: 14,
    tintColor: 'black',
  },

  personOpen: {
    width: 14,
    height: 14,
  }
});

module.exports = listTab;
