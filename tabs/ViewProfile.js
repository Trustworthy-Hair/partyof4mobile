// ViewProfile.js

'use strict';

var React = require('react-native');

var Back = require('../components/common').BackButton,
    UserStore = require('../stores/UserStore'),
    stylingHelper = require('../config/style.js');

var styleGuide = stylingHelper.styleGuide,
    styleExtend = stylingHelper.styleExtend;

var {
  StyleSheet,
  Image,
  ListView,
  Text,
  TouchableHighlight,
  View
} = React;

var UserProfile = React.createClass({

  countInterests: function () {
    return this.props.subject.interests ? this.props.subject.interests.length : 0;
  },

  calculateAverageRating: function () {
    var totalStars = this.props.reviews.reduce(function (total, current) {
      return total + current;
    }, 0);
    var numberOfReviews = this.props.reviews.length;
    var averageStars = numberOfReviews ? (totalStars / numberOfReviews) : null;
    if (averageStars === null) return 'No Reviews';
    return 'Star Rating: ' + averageStars;
  },

  renderEditButton: function () {
    this.props;
    if (this.props.subject.id === this.props.currentUser.id) {
      return (<Text onPress={this.props.toggleEdit}>Edit</Text>);
    }
    return null;
  },

  renderInterests: function (interest) {
    return (
      <Text style={styles.listItem}>{interest}</Text>
    );
  },

  createInterestsDataSource: function (data) {
    data = data || {};
    var dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    return dataSource.cloneWithRows(data);
  },

  render: function() {
    var subject = this.props.subject;
    return (
      <View style={styles.container}>
        <View style ={styles.top}>
          <Image style={styles.backgroundImg} source={{uri: subject.profileImageUrl}}>
            <View style={styles.transparency} />
            <Back onback={this.props.goBack} color='white' />
            {this.renderEditButton()}
            <Image style={styles.profileImg} source={{uri: subject.profileImageUrl}} />
            <Text style={styles.username}>{subject.username}</Text>
          </Image>
        </View>
        <View style={styles.bottom}>
          <Text style={styles.status}>{this.calculateAverageRating()}</Text>
          <Text style={styles.status}>{subject.status}</Text>
          <Text style={styles.description}>{subject.description}</Text>
          <View style={styles.interestarea}>
            <View style={styles.interestsHeader}>
              <Text style={styles.interests}>Interests:</Text> 
              <Text style={styles.interests}>({this.countInterests()})</Text> 
            </View>
            <ListView 
              dataSource={this.createInterestsDataSource(subject.interests)} 
              renderRow={this.renderInterests} 
            />
          </View>
        </View>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: styleExtend({
  }, 'center'),

  top: styleExtend({
    backgroundColor: styleGuide.colors.light,
  }, 'center'),

  bottom: styleExtend({
    padding: 10
  }, 'center'),

  interests:styleExtend({
    fontSize: styleGuide.sizes.larger,
  }, 'font'),

  username: styleExtend({
    fontSize: styleGuide.sizes.heading,
    color: 'white'
  }, 'font'),

  status: styleExtend({
    fontSize: styleGuide.sizes.larger,
    color: styleGuide.colors.main
  }, 'font'),

  description: styleExtend({
  }, 'font'),

  profileImg: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'grey'
  },

  backgroundImg: styleExtend({
    height: 300,
    width: 500,
  }, 'center'),

  transparency: {
    position: 'absolute',
    top: -100,
    height: 400,
    width: 500,
    opacity: 0.7,
    backgroundColor: 'grey'
  },

  listItem: styleExtend({
    width: 260,
    height: 20
  }, 'font'),

  interestarea: styleExtend({
    flex: 1,
    flexDirection: 'row',
    width: 350,
    height: 100,
    marginTop: 10,
    padding: 10,
    paddingLeft: 30,
    overflow: 'hidden'
  }, 'center'),

  interestsHeader: {
    flexDirection: 'column'
  }
});

module.exports = UserProfile;
