import React from 'react'
import { View, Image, TouchableOpacity, Dimensions } from 'react-native'
import Carousel from 'react-native-snap-carousel'

const {width} = Dimensions.get('screen');

function renderItem({item, index}) {
  return (
    <TouchableOpacity key={index} style={{marginHorizontal: 5}}>
      <Image
        style={{
          width: 85,
          height: 85,
          borderRadius: 4,
          overflow: 'hidden'
        }}
        resizemode="cover"
        source={{uri: item.source}}
      />
    </TouchableOpacity>
  );
}

export default VenueImages = ({items}) => (
  <View
    style={{
      padding: 10,
      borderBottomColor: 'rgba(230, 236, 241, 50)',
      borderBottomWidth: 1
    }}
  >
    <Carousel
      data={items}
      renderItem={renderItem}
      sliderWidth={width-40}
      itemWidth={105}
      itemHeight={85}
      sliderHeight={105}
      enableSnap={true}
      loop={true}
      autoplay={true}
      autoplayDelay={5000}
      autoplayInterval={5000}
      inactiveSlideScale={1}
      inactiveSlideOpacity={1}
    />
  </View>
)