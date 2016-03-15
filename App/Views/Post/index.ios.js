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



    return(
      <RefreshableListView renderRow={(row)=>this.renderListViewRow(row)}
        					           renderHeader={this.renderListViewHeader}
                             onRefresh={(page, callback)=>this.listViewOnRefresh(page, callback)}
                             loadMoreText={'Load More...'}/>

    );
  },
  renderListViewRow: function(row){
  console.log(row);
  console.log("FUCK YOU");
  return(
    <Text style={styles.rowTitle}>
        {row}
    </Text>
  );
},
renderListViewHeader: function(){
  var pages = [<PromoImage
                key="mawto"
                image={{uri: this.props.post.top_image}}
                header={this.props.post.title}
                description=""
                promoText={this.renderAtoms()}
                source={this.renderSourceButton()}
                style={styles.pageStyle}
              />];
   return(
     <View style={styles.main}>
     {pages}
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
  renderAtoms: function(){

    if(!this.props.post.summarylong){
      return null;
    }
    var atoms = [];
    if(this.props.post.summarylong){
      for(var i in this.props.post.summarylong) {
        atoms.push(
                <View key={this.props.post.id+"-"+i} >
                  <View style={{backgroundColor: 'rgba(0,0,0,.6)', width: width}}>
                    <Text style={{color: 'white', fontSize: 15, paddingLeft: 5, paddingRight:1}}>

                    </Text>
                    </View>
                    <View style={{backgroundColor: 'transparent'}}>
                      <Text>
                      {"\n"}
                      </Text>
                    </View>
                </View>
                );

              }

          }
          return atoms;

  },
  listViewOnRefresh: function(page, callback){
    if(!this.props.post.summarylong){
      callback([], {allLoaded: true})
    }
    var atoms = [];
    if(this.props.post.summarylong){
      for(var i in this.props.post.summarylong) {
        atoms.push(this.props.post.summarylong[i])
      }
    }
    callback(atoms, {allLoaded: true})

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
    textAlign: 'center',
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
    flex:1,

    alignSelf: 'flex-end',
  },
  image: {
  flex: 1
},
});
