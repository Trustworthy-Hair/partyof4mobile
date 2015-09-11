'use strict';

var Header = require('../components/header'),
    React = require('react-native'),
    config = require('../config/config.js'),
    Dispatcher = require('../dispatcher/dispatcher'),
    EventsStore = require('../stores/EventsStore'),
    UserStore = require('../stores/UserStore'),
    Constants = require('../constants/constants');

var ActionTypes = Constants.ActionTypes;

var GET_NEARBY_EVENTS_REQUEST_URL = 'http://localhost:3000/events';

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
          style={styles.listView}
        />
      </View>
    );
  },

  renderEvent: function(event) {
    return (
      <TouchableHighlight onPress={() => this.setCurrentEvent(event)}>
        <View style={styles.innercontainer}>
          <View style={styles.iconBox}>
            <Image
              style={styles.icon}
              source={require('image!restaurant')} />
          </View>
          <View style={styles.words}>
            <Text style={styles.location}>{event.Location.name}</Text>
            <Text style={styles.event}>{event.currentActivity}</Text>
          </View>
          <View style={styles.rightContainer}>
            <Text style={styles.right}>Current: {event.currentSize}</Text>
            <Text style={styles.right}>Total: {event.capacity}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  },

  setCurrentEvent: function (event) {
    var payload = {};
    payload.event = event;
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
  container: {
    flexDirection: 'column',
    flex: 1
  },
  innercontainer: {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#2e6a8b',
    borderStyle: 'solid',
    justifyContent: 'center',
    height: 74
  },
  listView: {
    paddingTop: 5,
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 5,
    backgroundColor: '#F5FCFF',
  },
  rightContainer: {
    flex: 1,
    padding: 5
  },
  words: {
    width: 150,
    padding: 5
  },
  location: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  event: {
    fontSize: 12,
    color: 'gray'
  },
  right: {
    textAlign: 'right',
    color: 'gray',
    fontSize: 12
  },
  icon: {
    flex: 0,
    backgroundColor: '#2e6a8b',
    borderRadius: 3,
    width: 64,
    height: 64
  },
  iconBox: {
    padding: 5
  },
  loading: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column'
  }
});

module.exports = listTab;
