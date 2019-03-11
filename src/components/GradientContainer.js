import React from 'react'
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';


const styles = {
  flex: 1,
  paddingTop: 20,
}
export default GradientContainer = ({children}) => (
  <LinearGradient
    start={{x: 0.8, y: -0.5}} end={{x: 0.4, y: 1.1}}
    colors={['#c86dd7', '#8b4fc6', '#3023ae']}
    style={styles}
  >
    {children}
  </LinearGradient>
)