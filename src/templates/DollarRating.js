import React from 'react';
import {
  View,
  Text,
} from 'react-native';

const DollarRating = ({rating, highlight, disabled, fontSize}) => {
  var numColor = (rating < 0 ? 0 : (rating >= 5 ? 5 : rating));
  var coloredString = new Array(numColor + 1).join('$');
  var nonString = new Array(5 - numColor + 1).join('$');
  return(
    <View style={{flexDirection: 'row'}}>
      <Text style={{fontSize: fontSize?fontSize:12, color: highlight?highlight:"rgb(169, 94, 206)"}}>{coloredString}</Text>
      <Text style={{fontSize: fontSize?fontSize:12, color: disabled?disabled:"rgb(151, 151, 151)"}}>{nonString}</Text>
    </View>
  );
}

export default DollarRating;