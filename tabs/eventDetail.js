// eventDetail.js

var React = require('react-native');
var Header = require('../components/header');
var Dispatcher = require ('../dispatcher/dispatcher');
var EventsStore = require('../stores/EventsStore');
var Constants = require('../constants/constants');

var ActionTypes = Constants.ActionTypes;

var {
  ActivityIndicatorIOS,
  StyleSheet,
  Text,
  View
} = React;

var eventDetail = React.createClass({

  getInitialState: function () {
    var event = EventsStore.getCurrentEvent();
    return event;
  },

  componentDidMount: function () {
    EventsStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function () {
    EventsStore.removeChangeListener(this._onChange);
  },

  _onChange: function () {
    var currentEvent = EventsStore.getCurrentEvent();
    this.setState(currentEvent);
  },

  render: function () {
    console.log(this.state.event);
    if (!this.state.event) return this.renderLoadingView();
    return (
      <View>
        <Header />
        <Text>Location: {this.state.event.Location.name}</Text>
        <Text>Number Of Attendees: {this.state.event.currentSize}/{this.state.event.capacity}</Text>
        <Text>Start Time: {this.state.event.plannedTime}</Text>
      </View>
    );
  },

  renderLoadingView: function() {
    return (
      <View>
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

});

var styles = StyleSheet.create({
  loading: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column'
  }
});

module.exports = eventDetail;
