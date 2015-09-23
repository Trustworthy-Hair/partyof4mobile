// ReviewForm.js

var React            = require('react-native'),
    ReviewSubjectRow = require('./ReviewSubjectRow'),
    stylingHelper    = require('./../../config/style.js');

var styleGuide = stylingHelper.styleGuide,
    styleExtend = stylingHelper.styleExtend;

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
    if (this.state.subjects.length === 0) {
      return (
        <Text style={styles.text}>No one to review!</Text>
      );
    }

    return (
      <View style={styles.container}>
        <ListView 
          dataSource={this.createSubjectsDataSource()} 
          renderRow={this.renderSubject} 
        />
        <View style={styles.centerbutton}>
          <TouchableOpacity onPress={this.createReview} >
            <View style={styles.button}> 
              <Text style={styles.buttonText }>Submit Reviews</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

});

var styles = StyleSheet.create({
  container: styleExtend({
  }, 'container'),

  buttonText: styleExtend({
  }, 'submitfont'),

  button: styleExtend({
    flex: 1,
  }, 'button', 'center'),

  centerbutton: {
    alignItems: 'center'
  },

  text: styleExtend({
  }, 'font')
});

module.exports = ReviewForm;
