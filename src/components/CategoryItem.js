/* @flow weak */

import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground } from 'react-native'
import currency from 'currency.js'

import metrics from '../config/metrics'

const PLACEHOLDER = require('../../assets/placeholder.png')

const CategoryItem = ({ name, price, vendor, onVendorPress, onItemPress, image }) => (
  <TouchableOpacity style={styles.listContainer} onPress={onItemPress}>
    <ImageBackground source={PLACEHOLDER} style={styles.image}>
      <Image source={{ uri: metrics.BASE_URL+image }} style={styles.image} />
    </ImageBackground>
    <View style={{ width: metrics.DEVICE_WIDTH * 0.37, marginTop: 10 }}>
      <Text style={{ fontSize: 18, marginBottom: 5 }}>{name}</Text>
      <Text style={{ color: metrics.FOURTH_COLOR, fontWeight: 'bold' }}>
        Rp. {currency(price, { separator: '.', precision: 0 }).format()}
      </Text>
      <TouchableOpacity
        style={{
          backgroundColor: metrics.TERTIARY_COLOR,
          borderRadius: 5,
          alignSelf: 'flex-start',
          padding: 5,
          marginTop: 5
        }}
        onPress={onVendorPress}
      >
        <Text style={{ color: 'white' }}>{vendor.name}</Text>
      </TouchableOpacity>
    </View>
  </TouchableOpacity>
)

export default CategoryItem

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  listContainer: {
    width: metrics.DEVICE_WIDTH * 0.5,
    height: metrics.DEVICE_HEIGHT * 0.37,
    padding: 20,
    alignItems: 'center',
  },

  image: {
    width: metrics.DEVICE_WIDTH * 0.37,
    height: metrics.DEVICE_WIDTH * 0.37,
    borderWidth: 1,
    borderColor: metrics.GREY
  }
})
