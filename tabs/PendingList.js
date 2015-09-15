// PendingList.js

var React = require('react-native');

var UserView = require('./UserView');

var {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} = React;

var PendingList = React.createClass({

  render: function () {
    var pending = this.props.pendingList.map((pendingUser) => {
      return (
        <TouchableOpacity onPress={() => this.props.setUserForApproval(pendingUser)} >
          <UserView 
            user={pendingUser} 
          />
        </TouchableOpacity>
      );
    });
    return (
      <View>
        <Text>Pending Requests to Join Event</Text>
        {pending}
      </View>
    );
  }

});

module.exports = PendingList;
