// ReviewSubjectRow.js

var React = require('react-native');

var UserView = require('../UserView');
var ReviewStars = require('./ReviewStars');

var {
  StyleSheet,
  View
} = React;

var ReviewSubjectRow = React.createClass({

  render: function () {
    return (
      <View style={styles.container}>
        <UserView 
          user={this.props.subject} 
        />
        <ReviewStars 
          subject={this.props.subject} 
          setUserReview={this.props.setUserReview} 
        />
      </View>
    );
  }

});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  }

});

module.exports = ReviewSubjectRow;
