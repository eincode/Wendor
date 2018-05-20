/* @flow */

import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'
import currency from 'currency.js'

import metrics from '../config/metrics'

import CustomButton from '../components/CustomButton'
import CartItem from '../components/CartItem'

const PACKAGE = require('../../assets/paket/Group_389.png')

export default class PackageDetail extends Component {
  static navigationOptions = {
    title: 'Detail Paket',
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: metrics.SECONDARY_COLOR,
      borderBottomWidth: 0
    }
  }

  render() {
    const items = this.props.navigation.getParam('items', null)
    const paket = this.props.navigation.getParam('paket', null)
    return (
      <ScrollView style={styles.container}>
        <Image source={PACKAGE} style={styles.image} />
        <View
          style={{
            paddingVertical: 10,
            borderBottomWidth: 0.3,
            borderColor: metrics.GREY,
            alignItems: 'center'
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{paket.name}</Text>
          <Text style={{ marginTop: 10 }}>500 Undangan</Text>
          <Text
            style={{
              marginTop: 25,
              color: metrics.FOURTH_COLOR,
              fontWeight: 'bold',
              fontSize: 25
            }}
          >
            Rp. {currency(paket.price, { separator: '.', precision: 0 }).format()}
          </Text>
          <CustomButton color={metrics.FOURTH_COLOR}>
            <Text style={{ color: 'white' }}>Buy</Text>
          </CustomButton>
        </View>
        <View
          style={{
            borderBottomWidth: 0.3,
            borderColor: metrics.GREY,
            padding: 15
          }}
        >
          <Text style={{ fontWeight: 'bold' }}>Item</Text>
        </View>
        {items.map(item => (
          <CartItem
            name={item.name}
            image={item.photoURL}
            price={item.price}
            vendor={item.vendor}
          />
        ))}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },

  image: {
    width: metrics.DEVICE_WIDTH,
    height: 150
  }
})

const ITEMS = [
  {
    id: 1,
    name: 'Set Busana Pengantin',
    category: 'Busana',
    price: 15000000,
    photoURL: null,
    specifications: [
      'Gaun Putih',
      'Jas Hitam',
      'Jas Putih',
      'Kebaya',
      'Sepatu Heels Wanita',
      'Sepatu Pantofel Pria'
    ],
    vendor: {
      id: 1,
      name: 'Evelingunawijaya',
      phone: '081213141516',
      address: 'Jl. Alamatnya Evelingunawijaya',
      photoURL: null,
      createdAt: '2018-05-18T09:24:00.000Z',
      updatedAt: '2018-05-18T09:24:00.000Z'
    }
  },
  {
    id: 2,
    name: 'Set Busana Pengantin Wanita',
    category: 'Busana',
    price: 25000000,
    photoURL: null,
    specifications: ['Gaun Putih', 'Kebaya', 'Sepatu Heels Wanita'],
    vendor: {
      id: 2,
      name: 'Vivi Valencia',
      phone: '081213141516',
      address: 'Jl. Alamatnya Vivi Valencia',
      photoURL: null,
      createdAt: '2018-05-18T09:24:00.000Z',
      updatedAt: '2018-05-18T09:24:00.000Z'
    }
  },
  {
    id: 3,
    name: 'Set Busana Pengantin',
    category: 'Busana',
    price: 15000000,
    photoURL: null,
    specifications: [
      'Gaun Putih',
      'Jas Hitam',
      'Jas Putih',
      'Kebaya',
      'Sepatu Heels Wanita',
      'Sepatu Pantofel Pria'
    ],
    vendor: {
      id: 1,
      name: 'Evelingunawijaya',
      phone: '081213141516',
      address: 'Jl. Alamatnya Evelingunawijaya',
      photoURL: null,
      createdAt: '2018-05-18T09:24:00.000Z',
      updatedAt: '2018-05-18T09:24:00.000Z'
    }
  },
  {
    id: 4,
    name: 'Set Busana Pengantin Wanita',
    category: 'Busana',
    price: 25000000,
    photoURL: null,
    specifications: ['Gaun Putih', 'Kebaya', 'Sepatu Heels Wanita'],
    vendor: {
      id: 2,
      name: 'Vivi Valencia',
      phone: '081213141516',
      address: 'Jl. Alamatnya Vivi Valencia',
      photoURL: null,
      createdAt: '2018-05-18T09:24:00.000Z',
      updatedAt: '2018-05-18T09:24:00.000Z'
    }
  }
]
