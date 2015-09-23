// ReviewStars.js

var React = require('react-native'),
    stylingHelper = require('./../../config/style.js');

var styleGuide = stylingHelper.styleGuide,
    styleExtend = stylingHelper.styleExtend;

var {
  StyleSheet,
  Text,
  View
} = React;

var MaxRating = 5;

var ReviewStars = React.createClass({
  getInitialState: function() { 
    return { selectedStar: false };
  },

  setUserReview: function (rating) {
    this.setState({selectedStar: rating-1});
    this.props.setUserReview(this.props.subject, rating);
  },

  createOnPressCallback: function (rating) {
    return () => this.setUserReview(rating);
  },

  render: function () {
    return (
      <View style={styles.container}>
        {this.renderStars()}
      </View>
    );
  },

  renderStars: function () {
    var stars = [];
    for (var i = 0; i < MaxRating; i++) {
      if (i === this.state.selectedStar) {
        stars.push(
          <Text style={styles.star} onPress={this.createOnPressCallback(i + 1)}>
            * 
          </Text>
        );
      } else {
        stars.push(
          <Text style={styles.selectedStar} onPress={this.createOnPressCallback(i + 1)}>
            * 
          </Text>
        );
      }
    }
    return stars;
  }

});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  },

  star: styleExtend({
    color: styleGuide.colors.main,
    fontSize: styleGuide.sizes.heading
  }, 'submitfont'),

  selectedStar: styleExtend({
    color: 'black',
    fontSize: styleGuide.sizes.heading
  }, 'submitfont'),
});

module.exports = ReviewStars;
