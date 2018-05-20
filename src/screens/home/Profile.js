/* @flow */

import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, FlatList } from 'react-native'

import metrics from '../../config/metrics'
import currency from 'currency.js'

const PROFILE_ACTIVE = require('../../../assets/bottom_nav_icon/ic_account_circle_white_24dp2_active.png')
const PROFILE_INACTIVE = require('../../../assets/bottom_nav_icon/ic_account_circle_white_24dp2.png')
const EDIT = require('../../../assets/ic_mode_edit_white_18dp.png')

export default class Profile extends Component {
  static navigationOptions = {
    tabBarIcon: ({ focused }) => {
      switch (focused) {
        case true:
          return <Image source={PROFILE_ACTIVE} style={metrics.TAB_BAR_ICON} />
        case false:
          return (
            <Image source={PROFILE_INACTIVE} style={metrics.TAB_BAR_ICON} />
          )
      }
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={{ flex: 1 }}>
            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>
              Ananta Pratama
            </Text>
            <Text style={{ color: 'white' }}>+6281330747579</Text>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: 'flex-end',
              justifyContent: 'center'
            }}
          >
            <Image style={{ height: 30, width: 30 }} source={EDIT} />
          </View>
        </View>
        <View style={[styles.title, metrics.SHADOW_STYLE]}>
          <Text style={{ fontWeight: 'bold' }}>Riwayat Transaksi</Text>
        </View>
        <FlatList
          data={HISTORY}
          renderItem={({ item }) => (
            <HistoryItem
              {...item}
            />
          )}
        />
      </View>
    )
  }
}

const HistoryItem = ({ date, price }) => (
  <View style={{ flexDirection: 'row', padding: 20, borderBottomWidth: 0.3, borderColor: metrics.GREY}}>
    <View>
      <Text>{date}</Text>
      <Text>Total</Text>
    </View>
    <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'flex-end'}}>
      <Text style={{ color: metrics.FOURTH_COLOR, fontWeight: 'bold', fontSize: 20 }}>Rp. {currency(price, { separator: '.', precision: 0 }).format()}</Text>
    </View>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },

  header: {
    backgroundColor: metrics.SECONDARY_COLOR,
    padding: 20,
    flexDirection: 'row'
  },

  title: {
    padding: 20
  }
})

const HISTORY = [
  {
    date: '10 April 2018',
    price: 50000000
  },
  {
    date: '10 Mei 2018',
    price: 78000000
  },
  {
    date: '20 Mei 2018',
    price: 112000000
  }
]
