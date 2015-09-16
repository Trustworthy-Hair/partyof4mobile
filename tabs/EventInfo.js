// EventInfo.js

var React       = require('react-native'),
    EventEdit   = require('./EventEdit'),
    EventView   = require('./EventView'),
    Dispatcher  = require ('../dispatcher/dispatcher'),
    Constants   = require('../constants/constants'),
    ActionTypes = Constants.ActionTypes,
    Back        = require('../components/common').BackButton;

var {
  View
} = React;

var EventInfo = React.createClass({

  getInitialState: function () {
    return {
      editing: false
    }
  },

  toggleEdit: function () {
    this.setState({
      editing: !this.state.editing
    });
  },

  goBack: function() {
    var payload = {};
    payload.currentView = 'list';
    Dispatcher.dispatch({
      type: ActionTypes.STORE_USER,
      payload: payload
    });
  },

  render: function () {
    if (this.state.editing) {
      return (
        <EventEdit 
          event={this.props.event}
          updateEvent={this.props.updateEvent}
          toggleEdit={this.toggleEdit} 
        />
      );
    }
    return (
      <View>
        <Back onback={this.goBack} />
        <EventView 
          event={this.props.event} 
          currentUser={this.props.currentUser}
          host={this.props.host}
          attendees={this.props.attendees} 
          pending={this.props.pending}
          toggleEdit={this.toggleEdit} 
          goToReview={this.props.goToReview} 
          joinEvent={this.props.joinEvent} 
          endEvent={this.props.endEvent}
        />
      </View>
    );
  }
});

module.exports = EventInfo;
