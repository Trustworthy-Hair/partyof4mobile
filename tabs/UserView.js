// UserView.js

var React = require('react-native');

var {
  Image,
  StyleSheet,
  Text,
  View
} = React;

var UserView = React.createClass({

  render: function () {
    return (
      <View>
        <Text style={styles.username} >{this.props.user.username}</Text>
        <Image 
          source={{uri: this.props.user.profileImageUrl}} 
          style={styles.avatar} 
        />
      </View>
    );
  }

});

var styles = StyleSheet.create({
  username: {

  },

  avatar: {
    width: 70,
    height: 70,
    borderRadius: 10
  },
});

module.exports = UserView;
