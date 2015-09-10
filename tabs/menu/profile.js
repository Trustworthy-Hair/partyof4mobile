'use strict';

var Back = require('../../components/common').BackButton;
var UserStore = require('../../stores/UserStore');

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
      <View style={styles.container}>
        <Text style={styles.description} >{interest}</Text>
      </View>
    );
  },

  render: function() {
    return (
      <View style={styles.container}>
        <Back onback={this.props.onback}/>
        <Text style={styles.username} >{this.state.username}</Text>
        <Image
        style={styles.profileImg}
        source={{uri: this.state.profileImageUrl}}/>
        <Text style={styles.status}>{this.state.status}</Text>
        <Text style={styles.description}>{this.state.description}</Text>
        <Text style={styles.interests}>Interests: </Text>
        <ListView 
          dataSource={this.createInterestsDataSource()}
          renderRow={this.renderInterests}
          style={styles.listView}
        />
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  interests:{
    fontSize: 20,
  },
  username: {
    fontSize: 30,
    marginBottom: 8,
    textAlign: 'center',
  },
  status: {
    fontSize: 20,
    color: 'green'
  },
  description: {
    fontSize: 15,
    textAlign: 'center'
  },
  listView: {
    paddingTop: 20,
  },
  profileImg: {
    width: 150,
    height: 200,
    justifyContent: 'center'
  },
});

module.exports = profileTab;