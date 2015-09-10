
'use strict';

var React  = require('react-native');

var {
  StyleSheet
} = React;

var styleGuide = {  
  buttonHeight: 40,
  font: 'Avenir Next',
  fonts: { main : 'Avenir Next',
           extra : ''},
  colors: { main : '#2e6a8b',
            dark : '#14203c',
            highlight : '#a9e2d6',
            light : '#f5efe2',
            white : '#ffffff'},
  sizes: { main : 18,
           larger : 22,
           heading : 28}
  };

var common = StyleSheet.create({

});

module.exports = {
  common : common,
  styleGuide : styleGuide
};