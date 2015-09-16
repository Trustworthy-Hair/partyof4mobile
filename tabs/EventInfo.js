// EventInfo.js

var React = require('react-native');

var EventEdit = require('./EventEdit');
var EventView = require('./EventView');

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
    );
  }
});

module.exports = EventInfo;
