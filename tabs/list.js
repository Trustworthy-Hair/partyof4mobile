'use strict';

var Header = require('../components/header'),
    React = require('react-native'),
    config = require('../config/config.js'),
    Dispatcher = require('../dispatcher/dispatcher'),
    EventsStore = require('../stores/EventsStore'),
    UserStore = require('../stores/UserStore'),
    Constants = require('../constants/constants'),
    stylingHelper = require('./../config/style.js'),
    EventSummary = require('./event/EventSummary');

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
  View
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
    return this.renderEvents();
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
        <View style={ styles.innercontainer }>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderEvent}
            style={{marginBottom: 40}}
          />
        </View>
      </View>
    );
  },

  renderEvent: function(event) {
    return (
      <EventSummary event={event} onPressCB={() => this.setCurrentEvent(event)}/>
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

  loading: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column'
  }
});

module.exports = listTab;
