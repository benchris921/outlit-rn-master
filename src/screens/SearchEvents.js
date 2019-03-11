import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import KeyboardSpacer from 'react-native-keyboard-spacer'

import SearchEventTemplate from '../templates/SearchEvent'

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

class SearchEvents extends Component {
  render() {
    return (
      <View style={styles.mainContainer}>
        <SearchEventTemplate
          events={this.props.events}
          searchKey={this.props.searchKey}
        />
        <KeyboardSpacer />
      </View>
    )
  }
}

const mapStateToProps = state => ({
  searchKey: state.search.searchKey,
  events: state.events.events,
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(SearchEvents)