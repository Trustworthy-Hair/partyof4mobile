// UserView.js

var React = require('react-native'),
    stylingHelper = require('./../config/style.js');

var styleGuide = stylingHelper.styleGuide,
    styleExtend = stylingHelper.styleExtend;

var {
  TouchableHighlight,
  Image,
  StyleSheet,
  Text,
  View
} = React;

var UserView = React.createClass({

  render: function () {
    return (
      <View style={styles.user}>
      <TouchableHighlight onPress={() => {
        this.props.renderProfile(this.props.user)
      }}>
        <View>
          <Text style={styles.username} >{this.props.user.username}</Text>
          <Image 
            source={{uri: this.props.user.profileImageUrl}} 
            style={styles.avatar} 
          />
        </View>
      </TouchableHighlight>
      </View>
    );
  }

});

var styles = StyleSheet.create({
  user: styleExtend({
    width: 80,
    margin: 5,
    alignItems: 'center'
  }, 'container'),

  username: styleExtend({
    fontSize: 15
  },'font'),

  avatar: {
    width: 70,
    height: 70,
    borderRadius: 10
  },
});

module.exports = UserView;
