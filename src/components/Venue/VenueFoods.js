import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

const styles = {
  wrapper: {
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E6ECF1',
    backgroundColor: 'white',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 6,
  },
  title: {
    color: '#9FABB4',
    fontSize: 14,
    padding: 10,
  },
  foodWrapper: {
    padding: 10,
    borderColor: 'rgba(230, 236, 241, 0.5)',
    borderWidth: 0.5,
    borderStyle: 'dashed'
  },
  foodTitleWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  foodTitle: {
    color: '#637786',
    fontSize: 13
  },
  foodPrice: {
    color: '#637786',
    fontSize: 13
  },
  foodDescription: {
    color: '#637786',
    fontSize: 13
  },
  loadMoreSecton: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  loadMoreText: {
    fontSize: 13,
    color: '#637786'
  }
}

export default VenueFoods = ({foods, category}) => (
  <View style={styles.wrapper}>
    <Text style={styles.title}>
      {category}
    </Text>
    {foods.map((val, key) => (
      <View style={styles.foodWrapper} key={key}>
        <View style={styles.foodTitleWrapper}>
          <Text style={styles.foodTitle}>{val.name}</Text>
          <Text style={styles.foodPrice}>{val.price}</Text>
        </View>
        <Text style={styles.foodDescription}>
          {val.description}
        </Text>
      </View>
    ))}
    <TouchableOpacity style={styles.loadMoreSecton}>
      <Text style={styles.loadMoreText}>
        Load More
      </Text>
    </TouchableOpacity>
  </View>
)