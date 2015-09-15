// Pending.js

var React = require('react-native');

var ApproveUser = require('./ApproveUser');
var PendingList = require('./PendingList');

var {
  StyleSheet
} = React;

var Pending = React.createClass({

  getInitialState: function () {
    return {
      userForApproval: null
    };
  },

  isUserHost: function () {
    return this.props.currentUser.id === this.props.host.id;
  },

  setUserForApproval: function (user) {
    this.setState({
      userForApproval: user
    });
  },

  render: function () {
    if (!this.isUserHost()) return null;
    if (this.state.userForApproval) {
      return (
        <ApproveUser 
          approveOrDenyUser={this.props.approveOrDenyUser} 
          setUserForApproval={this.setUserForApproval}
          userForApproval={this.state.userForApproval} 
        />
      );
    }
    return (
      <PendingList 
        pendingList={this.props.pendingList} 
        setUserForApproval={this.setUserForApproval} 
      />
    );
  }
});

var styles = StyleSheet.create({
});

module.exports = Pending;
