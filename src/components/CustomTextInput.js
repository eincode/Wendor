/* @flow */

import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'

import metrics from '../config/metrics'

export default class CustomTextInput extends Component {
  focus = () => this.textInputRef.focus()

  render() {
    const { children, flex, height, ...otherProps } = this.props
    return (
      <View style={[styles.container, { height: height || 40 }]}>
        {children}
        <TextInput
          style={{ flex: (flex || 1) }}
          underlineColorAndroid={'transparent'}
          {...otherProps}
          ref={ref => (this.textInputRef = ref)}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 5,
    borderColor: metrics.GREY,
    borderWidth: 0.3,
    width: metrics.DEVICE_WIDTH * 0.9,
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 0,
    flexDirection: 'row',
    marginVertical: 5
  }
})
