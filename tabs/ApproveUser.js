// ApproveUser.js

var React = require('react-native');

var UserView = require('./UserView');

var {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} = React;

var ApproveUser = React.createClass({

  approveUser: function () {
    this.props.approveOrDenyUser(this.props.userForApproval.id, true);
    this.props.setUserForApproval(null);
  },

  denyUser: function () {
    this.props.approveOrDenyUser(this.props.userForApproval.id, false);
    this.props.setUserForApproval(null);
  },

  render: function () {
    return (
      <View>
        <UserView user={this.props.userForApproval} />
        <TouchableOpacity onPress={this.approveUser} >
          <Text>Approve</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.denyUser} >
          <Text>Decline</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
});

var styles = StyleSheet.create({
});

module.exports = ApproveUser;
