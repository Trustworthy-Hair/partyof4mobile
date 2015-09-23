// MainMenu.js

var React = require('react-native');

var stylingHelper = require('../../config/style.js');
var styleGuide = stylingHelper.styleGuide;
var styleExtend = stylingHelper.styleExtend;

var {
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} = React;

var MainMenu = React.createClass({

  render: function () {
    return (
      <View style={styles.innercontainer}>
        <TouchableHighlight style={styles.link} onPress={ () => { this.props.changePage('profile'); }}>
          <Text style={styles.text}>Profile</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.link} onPress={ () => { this.props.changePage('history'); }}>
          <Text style={styles.text}>Events</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.link} onPress={ () => { this.props.changePage('about'); }}>
          <Text style={styles.text}>About Us</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.link} onPress={this.props.logout}>
          <Text style={styles.text}>Logout</Text>
        </TouchableHighlight>
      </View>
    );
  }

});

var styles = StyleSheet.create({

  innercontainer: styleExtend({
    padding: 20,
    flex: 1,
  }, 'center'),

  link: styleExtend({
    margin: 7
  }, 'center', 'button'),

  text: styleExtend({
  }, 'submitfont')

});

module.exports = MainMenu;
