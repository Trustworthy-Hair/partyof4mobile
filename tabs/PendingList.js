// PendingList.js

var React = require('react-native'),
    UserView = require('./UserView');

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
        <UserView 
          user={pendingUser} 
          renderProfile={this.props.renderProfile} 
        />
      );
    });
    return (
      <View style={{flex:1, flexDirection:'row'}}>
        {pending}
      </View>
    );
  }

});

module.exports = PendingList;
