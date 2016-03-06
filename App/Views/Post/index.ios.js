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
    return(
        <RefreshableListView renderRow={(row)=>this.renderListViewRow(row)}
        					           renderHeader={this.renderListViewHeader}
                             onRefresh={(page, callback)=>this.listViewOnRefresh(page, callback)}
                             backgroundColor={'#F6F6EF'}
                             loadMoreText={'Load More...'}/>
    );
  },

  renderListViewRow: function(row){
  	if(row.count==this.props.post.kids.length){
      return(
        <View style={{paddingBottom: 20}}>
          <Comment data={row}/>
        </View>
      );
    }
    return(
  		<Comment data={row}/>
  	);
  },
  renderListViewHeader: function(){
    var atom = this.props.post.summarylong;
    var style = {};
    var pages = [<PromoImage
                  key="promo1"
                  image={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
                  header="Be aware"
                  description="of everything that happens to your flight"
                  promoText="Get Text messages or Push for every flight status change"
                  style={styles.pageStyle}
                />];
    return(
		<View style={styles.headerContainer}>
      {pages}
		</View>
    );
  },
  renderPostText: function(){
    var output = [];
    if(!this.props.post.summarylong){
      return null;
    }
    for(var i = 0; i < this.props.post.summarylong.length; i++) {
      output.push(this.props.post.summarylong[i]+"\r\n"+"\r\n");
    }
    return(
      <Text style={styles.headerPostText}>
        {output}
      </Text>
    );
  },
  renderSourceButton: function(){
    if(!this.props.post.link){
      return null;
    }
    return(
      <TouchableHighlight onPress={() => this.pushSourceWebpage()}
                          underlayColor='#F6F6EF'>
        <Text style={styles.headerSourceLabel}>
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
  headerContainer: {
    flex:1,
    backgroundColor: '#F6F6EF',
    flexDirection: 'column',
    paddingRight: 10,
    paddingLeft: 10,
    alignItems: 'stretch',
  },
  pageStyle: {
    width: width,
    height: height
  },
  headerTitle:{
    fontSize: 20,
    textAlign: 'left',
    marginTop: 10,
    marginBottom: 10,
    color: '#FF6600',
  },
  headerPostText:{
    fontSize: 14,
    marginBottom: 3,
    paddingBottom: 10,
  },
  headerSourceLabel:{
    fontSize: 15,
    textAlign: 'left',
    color: '#0089FF',
    paddingBottom: 10,
  },
  headerPostDetailsLine: {
    fontSize: 12,
    marginBottom: 10,
    color: 'gray',
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
  },
  headerCommentTitle: {
    color: 'gray',
    marginTop: 10
  },
  image: {
  flex: 1
},
});
