// constants.js

var keyMirror = require('keymirror');

module.exports = {

  ActionTypes: keyMirror({
    STORE_USER: null,
    STORE_EVENTS: null,
    STORE_CURRENT_EVENT: null,
    LOGOUT: null
  })

};