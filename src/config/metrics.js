import { Dimensions, StyleSheet } from 'react-native'

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
  tabBarIcon: {
    width: 25,
    height: 25
  },

  shadow: {
    shadowColor: 'rgba(184, 184, 184, 0.5)',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 4,
    shadowOpacity: 1,
    elevation: 5,
  }

})

export default {
  DEVICE_WIDTH: width,
  DEVICE_HEIGHT: height,
  PRIMARY_COLOR: '#008BA3',
  SECONDARY_COLOR: '#00BCD4',
  TERTIARY_COLOR: '#10B809',
  FOURTH_COLOR: '#FE7A21',
  GREY: '#B0B0B0',
  SHADOW_COLOR: 'rgba(184, 184, 184, 0.5)',
  TAB_BAR_ICON: styles.tabBarIcon,
  SHADOW_STYLE: styles.shadow,
  BASE_URL: 'https://5d219f04.ngrok.io'
}
