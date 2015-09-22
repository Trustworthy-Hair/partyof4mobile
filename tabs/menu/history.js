// history.js

var Back = require('../../components/common').BackButton,
    React = require('react-native'),
    Dispatcher = require('../../dispatcher/dispatcher'),
    EventsStore = require('../../stores/EventsStore'),
    UserStore = require('../../stores/UserStore'),
    Constants = require('../../constants/constants'),
    config = require('./../../config/config.js'),
    stylingHelper = require('./../../config/style.js'),
    EventSummary = require('./../event/EventSummary');

var styleGuide = stylingHelper.styleGuide,
    styleExtend = stylingHelper.styleExtend;

var ActionTypes = Constants.ActionTypes;

var {
  StyleSheet,
  Text,
  ListView,
  View
} = React;

var historyTab = React.createClass({
  getInitialState: function() {
    return {
      events: [],
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => { return row1 !== row2},
      }),
      loaded: false
    };
  },

  getDataFromServer: function() {
    var GET_HISTORY_REQUEST_URL = config.url + '/users/'+UserStore.getData().user.id+'/history';

    fetch(GET_HISTORY_REQUEST_URL)
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({
        events: responseData,
        dataSource: this.state.dataSource.cloneWithRows(responseData),
        loaded: true
      });
    })
    .catch((error) => console.warn(error))
    .done();
  },

  componentDidMount: function() {
    this.getDataFromServer();
  },

  render: function() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    } 
    return this.renderEvents();
  },

  renderLoadingView: function() {
    return (
      <View> 
        <Back onback={this.props.onback}/>
        <Text style={styles.heading}> History</Text>
      </View>
    );
  },

  renderEvents: function() {
    return (
      <View style={styles.container}> 
        <Back onback={this.props.onback}/>
        <Text style={styles.heading}> History</Text>
        <View style={ styles.innercontainer }>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderEvent}
            style={{marginBottom: 40}}
          />
        </View>
      </View>
    );
  },

  renderEvent: function(event) {
    return (
      <EventSummary event={event} type='history' onPressCB={() => this.setCurrentEvent(event)}/>
    );
  },

  setCurrentEvent: function (event) {
    var payload = event;
    Dispatcher.dispatch({
      type: ActionTypes.STORE_CURRENT_EVENT,
      payload: payload
    });
    payload = {};
    payload.currentView = 'eventDetail';
    Dispatcher.dispatch({
      type: ActionTypes.STORE_USER,
      payload: payload
    });
  }
});

var styles = StyleSheet.create({
  container: styleExtend({
    paddingLeft: 5
  }, 'container'),

  innercontainer: {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: styleGuide.colors.light,
    borderStyle: 'solid',
    justifyContent: 'center',
    height: 74
  },

  heading: styleExtend({
  }, 'font')
});

module.exports = historyTab;
