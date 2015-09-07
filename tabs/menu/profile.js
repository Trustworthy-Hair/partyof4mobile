'use strict';

var Back = require('../../components/common').BackButton;
var UserStore = require('../../store/userStore');
// var store = {
//   user: {
//     username: 'Butts Mgee',
//     interests: ['butts', 'butts', 'moreButts', 'butts', 'butts'],
//     description: 'lets go eat burritos and touch eachothers butts',
//     status: 'online',
//     profileImageUrl: 'https://pbs.twimg.com/profile_images/3778366046/631957224cdaf93b24b36370e4d8486d.jpeg'
//   }
// };

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
    return UserStore.getUser();
    // var dataSource = new ListView.DataSource({
    //   rowHasChanged: (row1, row2) => row1 !== row2,
    // });
    // return {
    //   interests: dataSource.cloneWithRows(store.user.interests)
    // };
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
        // <Text style={styles.username} >{store.user.username}</Text>
        <Image
        style={styles.profileImg}
        source={{uri: this.state.profileImageUrl}}/>
        // source={{uri: store.user.profileImageUrl}}/>
        <Text style={styles.status}>{this.state.status}</Text>
        <Text style={styles.description}>{this.state.description}</Text>
        // <Text style={styles.status}>{store.user.status}</Text>
        // <Text style={styles.description}>{store.user.description}</Text>
        <ListView 
          dataSource={this.state.interests}
          renderRow={this.renderInterests}
          style={styles.listView}
        />
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    // backgroundColor: '#F5FCFF',
    justifyContent: 'center',
    alignItems: 'center'
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