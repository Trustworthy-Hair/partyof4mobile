// EventSummary.js 

var React         = require('react-native'),
    stylingHelper = require('./../../config/style.js');

var styleGuide = stylingHelper.styleGuide,
    styleExtend = stylingHelper.styleExtend;

var {
  StyleSheet,
  Image,
  Text,
  View,
  TouchableHighlight
} = React;

var EventSummary = React.createClass({
  render: function() {
    var event = this.props.event;

    var people = [];
    for (var i = 0; i< event.currentSize; i++) {
      people.push((<Image style={styles.personTaken} source={{uri:'http://i.imgur.com/4izv6mx.png'}} />));
    }

    var openpeople = [];
    for (var i = 0; i< (event.capacity - event.currentSize); i++) {
      openpeople.push((<Image style={styles.personOpen} source={{uri: 'http://i.imgur.com/C1MqnOr.png'}} />));
    }

    return (
      <TouchableHighlight onPress={this.props.onPressCB}>
        <View style={styles.innercontainer}>
          <View style={styles.iconBox}>
            <Image
              style={styles.icon}
              source={require('image!restaurant')} />
          </View>
          <View style={styles.rightContainer}> 
            <Text style={styles.location}>{event.Location.name}</Text>
            <View style={styles.rightBottomContainer}>
              <View style={styles.words}>
                <Text style={styles.info}>{event.currentActivity}</Text>
                <Text style={styles.info}>{(event.distance/1609).toFixed(2) + 'mi'}</Text>
              </View>
              <View style={styles.peopleContainer}>
                <View style={styles.people}>{openpeople}</View>
                <View style={styles.people}>{people}</View>
              </View>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  },

});

var styles = StyleSheet.create({
  innercontainer: {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: styleGuide.colors.light,
    borderStyle: 'solid',
    justifyContent: 'center',
    height: 74
  },

  rightContainer: styleExtend({
  }, 'container'),

  rightBottomContainer: {
    flex: 1,
    flexDirection: 'row'
  },

  people: styleExtend({
    flexDirection: 'row',
  }, 'container', 'center'),

  peopleContainer: styleExtend({
  }, 'container', 'center'),

  words: {
    width: 160,
  },

  location: styleExtend({
    fontWeight: 'bold',
    textAlign: 'left',
    color: styleGuide.colors.dark
  }, 'font'),

  info: styleExtend({
    fontSize: 14,
    textAlign: 'left'
  }, 'font'),

  icon: {
    width: 64,
    height: 64,
    tintColor: styleGuide.colors.main,
    opacity: 0.5
  },

  iconBox: {
    padding: 5
  },

  personTaken: {
    width: 14,
    height: 14,
    tintColor: 'black',
  },

  personOpen: {
    width: 14,
    height: 14,
  }
});

module.exports = EventSummary;