
'use strict';

var React  = require('react-native');

var {
  StyleSheet
} = React;

var styleGuide = {  
  buttonHeight: 40,
  font: 'Avenir Next',
  fonts: { extra : '' },
  colors: { main : '#2e6a8b',
            dark : '#14203c',
            highlight : '#a9e2d6',
            light : '#f5efe2',
            white : '#ffffff' },
  sizes: { main : 18,
           larger : 22,
           heading : 28 }
  };

var common = {
  container: {
    backgroundColor: styleGuide.colors.white,
    flexDirection: 'column',
    flex: 1,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    backgroundColor: styleGuide.colors.main,
    width: 250,
    overflow: 'hidden',
    borderRadius: 15,
    height: 40,
    marginBottom: 10
  },
  font: {
    textAlign: 'center',
    fontFamily: styleGuide.font,
    fontSize: styleGuide.sizes.main,
    backgroundColor: 'rgba(0,0,0,0)'
  },
  submitfont: {
    textAlign: 'center',
    fontFamily: styleGuide.font,
    fontSize: styleGuide.sizes.larger,
    color: styleGuide.colors.white
  }
};

var styleExtend = function(obj) {
  for (var i = 1; i<arguments.length; i++) {
    var style = arguments[i];
    var styleObj = common[style] || {};

    for (var key in styleObj) {
      obj[key] = obj[key] ? obj[key] : styleObj[key];
    }
  }
  return obj;
};

module.exports = {
  styleExtend: styleExtend,
  styleGuide : styleGuide
};