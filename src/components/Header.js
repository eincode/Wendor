import React, { Component } from 'react'
import {
  View,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from 'react-native'
import metrics from '../config/metrics'

const CART_ICON = require('../../assets/ic_shopping_cart_white_24dp.png')
const LOGO = require('../../assets/Logo/Logo.png')

export default class Header extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image source={LOGO} style={styles.icon} />
        <TextInput
          placeholder={'Search'}
          style={styles.textInput}
          underlineColorAndroid={'transparent'}
        />
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Cart')}
          style={{ flex: 1, alignItems: 'center', height: 32 }}
        >
          <Image source={CART_ICON} style={styles.icon} />
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    width: metrics.DEVICE_WIDTH * 0.95,
    flexDirection: 'row',
    alignItems: 'center'
  },

  textInput: {
    flex: 6,
    backgroundColor: 'white',
    borderRadius: 5,
    marginHorizontal: 10,
    marginVertical: 5,
    paddingHorizontal: 10,
    paddingVertical: 0,
    height: 30
  },

  icon: {
    flex: 1,
    height: 32,
    resizeMode: 'contain'
  }
})
