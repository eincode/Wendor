/* @flow weak */

import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

import metrics from '../config/metrics'

const CustomButton = ({ children, color, ...otherProps }) => (
  <TouchableOpacity
    style={[styles.container, { backgroundColor: color }]}
    {...otherProps}
  >
    {children}
  </TouchableOpacity>
)

export default CustomButton

const styles = StyleSheet.create({
  container: {
    height: 40,
    width: metrics.DEVICE_WIDTH * 0.9,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginVertical: 5
  }
})
