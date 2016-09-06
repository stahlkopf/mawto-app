'use strict';

var React = require('react-native');

var {
  AppRegistry,
  StyleSheet,
  NavigatorIOS,
} = React;

var Dashboard = require('./App/Views/Dashboard/index.ios.js');

var Mawto = React.createClass({
  render: function() {
    return (
      <NavigatorIOS
        style={styles.container}
        tintColor='#11D3BC'
        barTintColor='#537780'
        initialRoute={{
          title: 'MAWTO',
          component: Dashboard,
        }}/>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#11D3BC',
  },
});

AppRegistry.registerComponent('Mawto', () => Mawto);

module.exports = Mawto;
