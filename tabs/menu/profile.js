'use strict';

var Back = require('../../components/common').BackButton,
    UserStore = require('../../stores/UserStore'),
    stylingHelper = require('./../../config/style.js');

var styleGuide = stylingHelper.styleGuide,
    styleExtend = stylingHelper.styleExtend;

var React = require('react-native');
var {
  StyleSheet,
  Image,
  ListView,
  Text,
  TouchableHighlight,
  View
} = React;

var profileTab = React.createClass({

  getInitialState: function(){
    var user = UserStore.getData().user;
    user.numInterests = user.interests ? user.interests.length : 0;
    return user;
  },

  createInterestsDataSource: function () {
    var dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    return dataSource.cloneWithRows(this.state.interests || {});
  },

  renderInterests: function(interest){
    return (
      <Text style={styles.listItem} >{interest}</Text>
    );
  },

  render: function() {
    return (
      <View style={styles.container}>
        <View style ={styles.top}>
          <Image style = {styles.backgroundImg} source={{uri: this.state.profileImageUrl}}>
            <View style={styles.transparency}/>
            <Back onback={this.props.onback} color='white'/>
            <Image style={styles.profileImg} source={{uri: this.state.profileImageUrl}}/>
            <Text style={styles.username} >{this.state.username}</Text>
          </Image>
        </View>
        <View style={styles.bottom}> 
          <Text style={styles.status}>{this.state.status}</Text>
          <Text style={styles.description}>{this.state.description}</Text>
          <View style={styles.interestarea}>
            <Text style={styles.interests}>Interests: {"\n"} ({this.state.numInterests})</Text>
            <ListView 
              dataSource={this.createInterestsDataSource()}
              renderRow={this.renderInterests}/>
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
    height: 300,
    width: 500,
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
});

module.exports = profileTab;