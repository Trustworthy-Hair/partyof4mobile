// Pending.js

var React = require('react-native'),
    ApproveUser = require('./ApproveUser'),
    stylingHelper = require('./../config/style.js');

var styleGuide = stylingHelper.styleGuide,
    styleExtend = stylingHelper.styleExtend;

var {
  StyleSheet,
  View, 
  Text
} = React;

var Pending = React.createClass({

  getInitialState: function () {
    return {
      list: this.props.pendingList,
      userForApproval: null
    };
  },

  isUserHost: function () {
    return this.props.currentUser.id === this.props.host.id;
  },

  setUserForApproval: function (user, deleteBool) {
    if (deleteBool) {
      var previousUsers = this.state.userForApproval;
      previousUsers.shift();
    } else {
      var previousUsers = this.state.userForApproval;
      previousUsers.push(user);
    }
    this.setState({
      userForApproval: previousUsers
    });
  },

  removeFromPending: function() {
    var previousUsers = this.state.list;
    var user = previousUsers.shift();

    this.setState({
      userForApproval: previousUsers,
      userForApproval: user
    });
  },

  render: function () {
    if (!this.isUserHost()) return null;

    if (this.state.userForApproval === null && this.state.list.length > 0) {
      this.removeFromPending();
    }

    var middleSection;
    if (this.state.userForApproval) {
      middleSection = (
        <ApproveUser 
          approveOrDenyUser={this.props.approveOrDenyUser} 
          removeFromPending={this.removeFromPending}
          userForApproval={this.state.userForApproval} 
          renderProfile ={this.props.renderProfile} 
        />
      );
    } else {
      middleSection = (
        <Text style={styles.title}>No pending users!</Text>
      );
    }
    return (
      <View>
        <Text style={styles.title}>Pending Requests to Join Event</Text>
        {middleSection}
      </View>
    );
  }
});

var styles = StyleSheet.create({
  title: styleExtend({
  }, 'font')
});

module.exports = Pending;
