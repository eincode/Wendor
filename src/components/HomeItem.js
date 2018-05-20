/* @flow weak */

import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native'

import metrics from '../config/metrics'

const PLACEHOLDER = require('../../assets/placeholder.png')
const STAR_ACTIVE = require('../../assets/star/ic_star_rate_active_18dp.png')
const STAR_INACTIVE = require('../../assets/star/ic_star_rate_white_18dp.png')

const HomeItem = ({ onVendorPress, onItemPress, name, rating, image }) => (
  <TouchableOpacity style={styles.listContainer} onPress={onItemPress}>
    <Image source={{ uri: metrics.BASE_URL+image }} style={styles.image} />
    <View style={{ width: metrics.DEVICE_WIDTH * 0.25, marginTop: 5 }}>
      <Text style={{ fontSize: 15, marginBottom: 5 }}>{name}</Text>
    </View>
    <View style={{ height: 20, flexDirection: 'row' }}>
      <Image
        source={rating[0] == '1' ? STAR_ACTIVE : STAR_INACTIVE}
        style={{ width: 15, height: 15 }}
      />
      <Image
        source={rating[1] == '1' ? STAR_ACTIVE : STAR_INACTIVE}
        style={{ width: 15, height: 15 }}
      />
      <Image
        source={rating[2] == '1' ? STAR_ACTIVE : STAR_INACTIVE}
        style={{ width: 15, height: 15 }}
      />
      <Image
        source={rating[3] == '1' ? STAR_ACTIVE : STAR_INACTIVE}
        style={{ width: 15, height: 15 }}
      />
      <Image
        source={rating[4] == '1' ? STAR_ACTIVE : STAR_INACTIVE}
        style={{ width: 15, height: 15 }}
      />

    </View>
  </TouchableOpacity>
)

export default HomeItem

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  listContainer: {
    width: metrics.DEVICE_WIDTH * 0.25,
    margin: 10
  },

  image: {
    width: metrics.DEVICE_WIDTH * 0.25,
    height: metrics.DEVICE_WIDTH * 0.25,
    borderWidth: 1,
    borderColor: metrics.GREY
  }
})

const STARS = ['1', '1', '1', '1', '1']
