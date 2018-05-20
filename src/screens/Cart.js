/* @flow */

import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity
} from 'react-native'

import currency from 'currency.js'
import { inject } from 'mobx-react'
import metrics from '../config/metrics'
import CartItem from '../components/CartItem'

@inject('cartStore')
export default class Cart extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Keranjang',
    headerTintColor: metrics.PRIMARY_COLOR,
    headerStyle: {
      backgroundColor: 'white'
    }
  })

  constructor(props) {
    super(props)
    this.state = {
      total: this.countTotal()
    }
  }

  countTotal() {
    let items = this.props.cartStore.cart
    let price = 0
    for (const item of items) {
      price += item.price
    }
    return price
  }

  render() {
    const ITEMS = this.props.cartStore.cart
    return (
      <View style={styles.container}>
        <FlatList
          data={ITEMS}
          renderItem={({ item }) => (
            <CartItem
              name={item.name}
              price={item.price}
              image={item.photoURL}
              vendor={item.vendor}
            />
          )}
          style={{ marginBottom: metrics.DEVICE_HEIGHT * 0.12 }}
        />
        <View style={[styles.footer, metrics.SHADOW_STYLE]}>
          <View>
            <Text>Total Belanja</Text>
            <Text
              style={{
                color: metrics.FOURTH_COLOR,
                fontSize: 20,
                fontWeight: 'bold',
                marginTop: 5
              }}
            >
              Rp. {currency(this.countTotal(), { separator: '.', precision: 0 }).format()}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              style={styles.buyButton}
              onPress={() => this.props.navigation.navigate('Payment', { total: this.state.total })}
            >
              <Text style={{ color: 'white' }}>Bayar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  footer: {
    backgroundColor: 'white',
    borderTopWidth: 0.3,
    borderColor: metrics.GREY,
    position: 'absolute',
    bottom: 0,
    width: metrics.DEVICE_WIDTH,
    padding: 20,
    alignItems: 'center',
    flexDirection: 'row',
    height: metrics.DEVICE_HEIGHT * 0.12
  },

  buyButton: {
    backgroundColor: metrics.FOURTH_COLOR,
    padding: 10,
    borderRadius: 5,
    alignSelf: 'flex-end'
  }
})

const CATEGORIES = [
  'Busana',
  'Dekorasi',
  'Entertain',
  'Fotografi',
  'Katering',
  'Hair & Make up',
  'Venue',
  'Undangan'
]
