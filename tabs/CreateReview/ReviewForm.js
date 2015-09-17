// ReviewForm.js

var React = require('react-native');

var ReviewSubjectRow = require('./ReviewSubjectRow');

var {
  ListView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} = React;

var ReviewForm = React.createClass({

  getInitialState: function () {
    return {
      subjects: this.addHostToAttendees()
    };
  },

  createReview: function () {
    // TODO: write the the function to pass the data to the CreateReview component
    this.props.createReview(this.state.subjects)
  },

  addHostToAttendees: function () {
    return [this.props.host].concat(this.props.attendees).filter((attendee) => {
      return attendee.id !== this.props.currentUser.id;
    });
  },

  createSubjectsDataSource: function () {
    var dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    return dataSource.cloneWithRows(this.state.subjects);
  },

  setUserReview: function (user, rating) {
    // Change the state using setState
    // Define the new state with a function
    this.setState((previousState) => {
      previousState.subjects.forEach((subject) => {
        if (subject.id === user.id) subject.rating = rating;
      });
      return previousState;
    });
  },

  renderSubject: function (subject) {
    return (
      <View>
        <ReviewSubjectRow 
          subject={subject} 
          setUserReview={this.setUserReview} 
        />
      </View>
    );
  },

  render: function () {
    return (
      <View>
        <ListView 
          dataSource={this.createSubjectsDataSource()} 
          renderRow={this.renderSubject} 
        />
        <TouchableOpacity onPress={this.createReview} >
          <Text>Submit Reviews</Text>
        </TouchableOpacity>
      </View>
    );
  }

});

var styles = StyleSheet.create({

});

module.exports = ReviewForm;
