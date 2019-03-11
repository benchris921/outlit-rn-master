import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import NavBar from '../templates/NavBar'

const styles = {
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center'
  },
  navBarContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: 78,
    width: '100%',
  },
}

class SearchVenues extends Component {
  render() {
    return (
      <View style={styles.mainContainer}>
        <Text>Search Venues</Text>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  searchKey: state.search.searchKey,
  venues: state.venues.venues,
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(SearchVenues)