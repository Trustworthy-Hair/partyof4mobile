'use strict';

var Back = require('../../components/common').BackButton;

var React = require('react-native');
var {
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} = React;

var aboutTab = React.createClass({

  getInitialState: function () {
    return {
      count: 0
    };
  },

  goBack: function () {
    this.props.onback(this.props.lastPage);
  },

  increment: function () {
    this.setState({
      count: this.state.count + 1
    });
  },

  fizzBuzz: function () {
    var count = this.state.count;
    if (count % 15 === 0) return 'FizzBuzz';
    if (count % 3 === 0) return 'Fizz';
    if (count % 5 === 0) return 'Buzz';
    return count;
  },

  render: function() {
    return (
      <View>
        <Back onback={this.goBack} />
        <Text>{this.fizzBuzz()}</Text>
        <Text onPress={this.increment}>Increment</Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({

});

module.exports = aboutTab;