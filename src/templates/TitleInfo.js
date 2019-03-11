import React from 'react'
import {
  View,
  Text,
  TouchableHighlight
} from 'react-native';
import PropTypes from 'prop-types';
import DollarRating from './DollarRating';

const TitleInfo = ({type, name, distance, cost}) => {
  return(
    <View style={styles.mainContainer}>
      <View style={styles.secondaryContainer}>
        <Text style={{fontSize: 12}}>{type}</Text>
      </View>
      <View style={styles.titleContainer}>
        <Text style={{fontSize: 28, }}>{name}</Text>
      </View>

      <View style={styles.costContainer}>
        <View style={{flexDirection: 'row'}}>
          <Text style={{fontSize: 12}}>{distance} mi  </Text>
          <View style={{width: 2, height: 2, borderRadius: 1, backgroundColor: 'black', alignSelf: 'center'}}/>
          <Text>  </Text>
          <DollarRating rating={cost}/>
        </View>
      </View>
    </View>
  )
}

const styles = {
  mainContainer: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center'
  },
  secondaryContainer: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'flex-end',
  },
  costContainer: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'flex-start',
  },
  titleContainer: {
    alignSelf: 'stretch',
    justifyContent: 'flex-end',
  }
}

TitleInfo.propTypes = {type: PropTypes.string,
                       name: PropTypes.string,
                       distance: PropTypes.number,
                       cost: PropTypes.number};
TitleInfo.defaultProps = {type: 'NO TYPE', name: 'UN NAMED', distance: -1, cost: -1}
export default TitleInfo;
