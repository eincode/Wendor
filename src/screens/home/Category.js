/* @flow */

import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity
} from 'react-native'

import metrics from '../../config/metrics'

export default class Category extends Component {
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={CATEGORIES}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() =>
                this.props.navigation.navigate('CategoryDetail', {
                  category: item
                })
              }
            >
              <Text>{item}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },

  item: {
    flex: 1,
    height: 40,
    paddingHorizontal: 20,
    justifyContent: 'center',
    borderBottomWidth: 0.3,
    borderColor: metrics.GREY
  }
})

const CATEGORIES = [
  'Busana',
  'Dekorasi',
  'Entertainment',
  'Fotografi',
  'Katering',
  'Hair & Make up',
  'Venue',
  'Undangan'
]
