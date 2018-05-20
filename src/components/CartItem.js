/* @flow weak */

import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'

import currency from 'currency.js'

import metrics from '../config/metrics'

const PLACEHOLDER = require('../../assets/placeholder.png')

const CartItem = ({ name, image, price, vendor }) => (
  <View style={styles.container}>
    <Image source={{ uri: metrics.BASE_URL+image }} style={styles.image} />
    <View style={{ marginLeft: 20, marginTop: 5 }}>
      <Text>{name}</Text>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          width: metrics.DEVICE_WIDTH * 0.3
        }}
      >
        <Text style={{ color: metrics.FOURTH_COLOR, fontWeight: 'bold' }}>
          Rp. {currency(price, { separator: '.', precision: 0 }).format()}
        </Text>
        <View
          style={{
            padding: 5,
            marginTop: 5,
            borderRadius: 5,
            backgroundColor: metrics.TERTIARY_COLOR,
            alignSelf: 'flex-start'
          }}
        >
          <Text style={{ color: 'white' }}>{vendor.name}</Text>
        </View>
      </View>
    </View>
  </View>
)

export default CartItem

const styles = StyleSheet.create({
  container: {
    width: metrics.DEVICE_WIDTH,
    borderBottomWidth: 0.3,
    borderColor: metrics.GREY,
    padding: 15,
    backgroundColor: 'white',
    flexDirection: 'row'
  },

  image: {
    width: metrics.DEVICE_WIDTH * 0.23,
    height: metrics.DEVICE_WIDTH * 0.23,
    borderColor: metrics.GREY,
    borderWidth: 0.3
  },
})
