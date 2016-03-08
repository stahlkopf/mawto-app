'use strict';

var React = require('react-native');
var Line = require('./Line');

var {
  StyleSheet,
  Text,
  Image,
  View
} = React;


/**
 * Intended to be item in the Carousel
 * Displays promo text on top of the image
*/
var PromoImage = React.createClass({
  propType: {
    style: View.propTypes.style,
  },
  render: function() {
    return (
      <Image
        style={[this.props.style, styles.usecase]}
        source={this.props.image}
      >
        <View style={styles.promoView}>
          <Text style={[styles.text, styles.promoHeader]}>{this.props.header}</Text>
          <Text style={[styles.text, styles.promoDescription]}>{this.props.description}</Text>
          <Line style={{backgroundColor:'#0ea378'}} />
          <Text>{this.props.promoText}</Text>
        </View>
      </Image>
    );
  },
  renderAtoms: function(atomRows){
    console.log("CALLED ONCE");
    for(var i in atomb) {
        console.log("LOOPING");
        <Text style={[styles.text, styles.promoText]}>{atomRows[i]}</Text>
      }

  }
}
);

var styles = StyleSheet.create({
  usecase: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    flex: 1
  },
  promoView: {
    backgroundColor: 'transparent',
  },
  text: {
    color: 'white',
    textAlign: 'center'
  },
  promoHeader: {
    fontSize: 22,
    fontWeight: '300',
    textAlign: 'center'
  },
  promoDescription: {
    fontSize: 22,
    fontWeight: '300',
    width: 220,
    alignSelf: 'center',
  },
  promoText: {
    fontSize: 15,
    color: 'white',
    fontWeight: '400',
    textAlign: 'left',
  },
});

module.exports = PromoImage;
