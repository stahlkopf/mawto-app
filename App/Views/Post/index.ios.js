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
        <WebView source={{uri: this.props.url}}/>
      </View>
    );
  }
});

module.exports = React.createClass({
  render: function(){
    var style = {};
    var atoms = [];
    if(this.props.post.summarylong){
      for(var i in this.props.post.summarylong) {
        atoms.push(
                <View key={this.props.post.id+"-"+i} style={{backgroundColor: 'rgba(0,0,0,.6)', justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    flex: 1,}}>
                <Text style={{color: 'white', fontSize: 15}}>
                {this.props.post.summarylong[i]}
                </Text>
                </View>
                );
            atoms.push(
                <Text key={"blankline"+"-"+i}>
                {"\r\n"}
                {"\r\n"}
                </Text>
                );
              }
          }
    var pages = [<PromoImage
                  key="mawto"
                  image={{uri: this.props.post.top_image}}
                  header={this.props.post.title}
                  description=""
                  promoText={atoms}
                  style={styles.pageStyle}
                />];

    return(
      <View>
        {pages}
      </View>
    );
  },
  renderPostText: function(){
    var atoms = []
    if(!this.props.post.summarylong){
      return null;
    }
    for(var i in this.props.post.summarylong) {
      atoms.push(
          <View key={this.props.post.id+"-"+i} style={styles.atomsBackground}>
          <Text style={{color: 'white', fontSize: 15,}}>
          {this.props.post.summarylong[i]}
          </Text>
          </View>
          );
      atoms.push(
          <Text key={"blankline"+"-"+i} style={styles.main}>
          {"\r\n"}
          {"\r\n"}
          </Text>
          );
    }
    return atoms;
  },
  renderSourceButton: function(){
    if(!this.props.post.link){
      return null;
    }
    return(
      <TouchableHighlight onPress={() => this.pushSourceWebpage()}
                          underlayColor='#F6F6EF'>
        <Text style={styles.atomsSourceLabel}>
          (Source)
        </Text>
      </TouchableHighlight>
    );
  },
  listViewOnRefresh: function(page, callback){
    if(!this.props.post.kids){
      callback([], {allLoaded: true})
    }
    else if(page!=1){
      this.fetchCommentsUsingKids(this.props.post.kids, this.state.lastIndex, 3, callback);
    }
    else{
  	 this.fetchCommentsUsingKids(this.props.post.kids, 0, 3, callback);
    }
  },
  fetchCommentsUsingKids: function(kids, startIndex, amountToAdd, callback){
    var rowsData = [];
    var endIndex = (startIndex + amountToAdd) < kids.length ? (startIndex + amountToAdd) : kids.length;
    function iterateAndFetch(){
        if (startIndex < endIndex){
            fetch(api.HN_ITEM_ENDPOINT+kids[startIndex]+".json")
            .then((response) => response.json())
            .then((item) => {
                item.count = startIndex+1;
                if(!item.deleted){
                  rowsData.push(item);
                }
                startIndex++;
                iterateAndFetch();
            })
            .done();
        }
        else {
            callback(rowsData, {allLoaded: endIndex==kids.length});
            return;
        }
    }
    iterateAndFetch();
    this.setState({lastIndex: endIndex});
  },
  pushSourceWebpage: function(){
  	this.props.navigator.push({
  		title: this.props.post.title,
  		passProps: {url: this.props.post.link},
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
  main: {
    flex: 1
  },
  atomsContainer: {
    flex:1,
    backgroundColor: 'transparent',
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  pageStyle: {
    width: width,
    height: height
  },
  atomsTitle:{
    fontSize: 20,
    textAlign: 'left',
    marginTop: 10,
    marginBottom: 10,
    color: '#FF6600',
  },
  atomsBackground:{
    backgroundColor: 'rgba(0,0,0,.6)',
    margin: 5,
  },
  atomsPostText:{
    color: 'white',
    fontSize: 15,
  },
  atomsSourceLabel:{
    fontSize: 15,
    textAlign: 'left',
    color: '#0089FF',
    paddingBottom: 10,
  },
  image: {
  flex: 1
},
});
