// ReviewStars.js

var React = require('react-native');

var {
  StyleSheet,
  Text,
  View
} = React;

var MaxRating = 5;

var ReviewStars = React.createClass({

  setUserReview: function (rating) {
    this.props.setUserReview(this.props.subject, rating);
  },

  createOnPressCallback: function (rating) {
    return () => this.setUserReview(rating);
  },

  render: function () {
    return (
      <View>
        {this.renderStars()}
      </View>
    );
  },

  renderStars: function () {
    var stars = [];
    for (var i = 0; i < MaxRating; i++) {
      stars.push(
        <Text onPress={this.createOnPressCallback(i + 1)}>
          * 
        </Text>
      );
    }
    return stars;
  }

});

var styles = StyleSheet.create({

});

module.exports = ReviewStars;
