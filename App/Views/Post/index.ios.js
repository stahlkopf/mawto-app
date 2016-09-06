'use strict';

var React = require('react-native');

var {
  StyleSheet,
  Text,
  AppRegistry,
  View,
  Image,
  TouchableHighlight,
  WebView
} = React;
var Carousel = require('react-native-looped-carousel');
var api = require("../../Network/api.js");
var PromoImage = require('./js/components/PromoImage');
var RefreshableListView = require("../../Components/RefreshableListView");
var Comment = require("./Elements/Comment");
var Dimensions = require('Dimensions');
var InAppUtils = require('react-native').NativeModules.InAppUtils;
var {width, height} = Dimensions.get('window');


var Web = React.createClass({
  render: function() {
    return (
      <View style={{flex: 1}}>
        <WebView  url={this.props.link} />
      </View>
    );
  }
});

module.exports = React.createClass({
  render: function(){
    var style = {};
    if(!this.props.post.top_image)
    {
      this.props.post.top_image = 'http://mawto.com/img/mdot.png';
    }
    return(
      <Image source={{uri: this.props.post.top_image}} style={styles.atomsContainer}>
    <View style={styles.promoView}>
      <RefreshableListView renderRow={(row)=>this.renderListViewRow(row)}
      renderHeader={this.renderListViewHeader}
                     onRefresh={(page, callback)=>this.listViewOnRefresh(page, callback)}
                     backgroundColor={'transparent'}
                     loadMoreText={'Load More...'}/>
    {this.renderSourceButton()}
    </View>
      </Image>

    );
  },
  renderListViewRow: function(row){
  return(
    <View>
      <View style={{backgroundColor: 'transparent'}}>
        <Text>
        {"\n"}
        </Text>
      </View>
      <View style={{backgroundColor: 'rgba(0,0,0,.4)', width: width}}>
        <Text style={{color: 'white', fontSize: 15, paddingLeft: 5, paddingRight:1}}>
         {row}
        </Text>
        </View>
    </View>
  );
},
renderListViewHeader: function(){
  return(
  <View style={styles.headerContainer}>
  <Text style={styles.atomsTitle}>
    {this.props.post.title}
  </Text>
  </View>
  );
},
renderSourceButton: function(){
    if(!this.props.post.link){
      return null;
    }
    return(
      <View style={styles.atomsSourceLabel}>
      <TouchableHighlight onPress={() => this.pushSourceWebpage()}
                          underlayColor='#F6F6EF'>
        <Text style={styles.atomsPostText}>
          (Source)
        </Text>
      </TouchableHighlight>
      </View>
    );
  },

listViewOnRefresh: function(page, callback){
    if(!this.props.post.summarylong){
      callback([], {allLoaded: true})
    }
    var atoms = [];
    if(this.props.post.summarylong){
      for(var i = 0; i < this.props.post.summarylong.length; ++i) {
        atoms.push(this.props.post.summarylong[i])
      }
    callback(atoms, {allLoaded: true})
    }
  },
pushSourceWebpage: function(){
  	this.props.navigator.push({
  		title: this.props.post.title,
  		passProps: {link: this.props.post.link},
  		component: Web
    });
  },
  fixPostText: function(str){
      return String(str).replace(/<p>/g, '\n\n')
                  .replace(/&#x2F;/g, '/')
                  .replace('<i>', '')
                  .replace('</i>', '')
                  .replace(/&#x27;/g, '\'')
                  .replace(/&quot;/g, '\"')
                  .replace(/<a\s+(?:[^>]*?\s+)?href="([^"]*)" rel="nofollow">(.*)?<\/a>/g, "$1");
  }
});

var styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'flex-start',
    paddingRight: 10,
    paddingLeft: 10,
    paddingBottom: 20,
    paddingTop: 5,
    backgroundColor: 'rgba(0,0,0,.5)',
  },
  atomsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    flex: 1,
    width: null,
    height: null,
  },
  atomsTitle:{
    fontSize: 20,
    textAlign: 'center',
    color: '#11D3BC',
  },
  atomsBackground:{
    backgroundColor: 'rgba(0,0,0,.4)',
    margin: 5,
  },
  atomsPostText:{
    backgroundColor: 'rgba(0,0,0,.5)',
    color: 'white',
    fontSize: 15,
  },
  atomsSourceLabel:{
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
  },
promoView: {
  backgroundColor: 'transparent',
  width: width,
  height: height,
},
})
