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
        style={this.props.style}
        source={this.props.image}
      >
        <View>
          <Text>{this.props.promoText}</Text>
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

  },
});

module.exports = PromoImage;
