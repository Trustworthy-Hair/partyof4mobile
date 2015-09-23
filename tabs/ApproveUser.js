// ApproveUser.js

var React = require('react-native'),
    UserView = require('./UserView'),
    stylingHelper = require('./../config/style.js');

var styleGuide = stylingHelper.styleGuide,
    styleExtend = stylingHelper.styleExtend;

var {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} = React;

var ApproveUser = React.createClass({

  approveUser: function () {
    this.props.approveOrDenyUser(this.props.userForApproval.id, true);
    this.props.removeFromPending();
  },

  denyUser: function () {
    this.props.approveOrDenyUser(this.props.userForApproval.id, false);
    this.props.removeFromPending();
  },

  render: function () {
    return (
      <View style={styles.container}>
        <UserView user={this.props.userForApproval} 
                  renderProfile={this.props.renderProfile} 
        />
        <View style={styles.center}>
          <TouchableOpacity onPress={this.approveUser} >
            <Text style={styles.font}>Approve</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.denyUser} >
            <Text style={styles.font}>Decline</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  
});

var styles = StyleSheet.create({
  container: styleExtend({
    flex: 1,
    flexDirection: 'row'
  }, 'center'),

  center: {
    justifyContent: 'center',
    width: 200
  },

  font: styleExtend({},'font')
});

module.exports = ApproveUser;
