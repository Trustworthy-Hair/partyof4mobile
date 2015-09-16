// Pending.js

var React = require('react-native'),
    ApproveUser = require('./ApproveUser'),
    PendingList = require('./PendingList'),
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

    var middleSection;
    if (this.state.userForApproval) {
      middleSection = (
        <ApproveUser 
          approveOrDenyUser={this.props.approveOrDenyUser} 
          setUserForApproval={this.setUserForApproval}
          userForApproval={this.state.userForApproval} 
        />
      );
    } else {
      middleSection = (
        <PendingList 
          pendingList={this.props.pendingList} 
          setUserForApproval={this.setUserForApproval} 
        />
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
