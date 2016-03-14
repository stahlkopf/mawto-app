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
          <Text style={[styles.text, styles.promoHeader]}>
          {this.props.header}
          </Text>
          <Text style={[styles.text, styles.promoDescription]}>{this.props.description}</Text>
          <Line style={{backgroundColor:'#0ea378'}} />
          {this.props.promoText}
          {this.props.source}
        </View>
      </Image>
    );
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
    textAlign: 'center',
  },
  textBG: {
    color: 'white',
    fontSize: 22,
    fontWeight: '300',
    alignSelf: 'center',
  },
  promoHeader: {
    marginTop: 50,
    backgroundColor: 'rgba(0,0,0,.6)',
    color: 'white',
    fontSize: 22,
    fontWeight: '300',
    alignSelf: 'center',
  },
  promoDescription: {
    fontSize: 22,
    fontWeight: '300',
    width: 220,
    alignSelf: 'center',
  },
  promoText: {
    marginLeft: 5,
    paddingLeft: 5,
    marginRight: 5,
    paddingRight: 5,
  },
});

module.exports = PromoImage;
