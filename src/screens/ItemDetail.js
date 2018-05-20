/* @flow */

import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  ImageBackground,
  Alert
} from 'react-native'

import { inject } from 'mobx-react'

import currency from 'currency.js'

import metrics from '../config/metrics'

const PLACEHOLDER = require('../../assets/placeholder.png')

@inject('cartStore')
export default class ItemDetail extends Component {
  static navigationOptions = {
    title: 'Detail Item',
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: metrics.SECONDARY_COLOR,
      borderBottomWidth: 0
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      qty: ''
    }
  }

  buy(item) {
    if (this.state.qty == '') {
      Alert.alert('Error', 'Mohon masukkan jumlah barang')
      return
    }
    item.price = item.price * Number(this.state.qty)
    this.props.cartStore.cart.push(item)
    Alert.alert('Pemberitahuan', 'Barang berhasil ditambahkan')
  }

  render() {
    const {
      name,
      category,
      price,
      specifications,
      vendor,
      photoURL
    } = this.props.navigation.getParam('item', null)
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', margin: 20 }}>
          <View style={{ flex: 1, alignItems: 'flex-end' }}>
            <ImageBackground source={PLACEHOLDER} style={styles.image}>
              <Image source={{ uri: metrics.BASE_URL+photoURL }} style={styles.image} />
            </ImageBackground>
          </View>
          <View style={{ flex: 1.5, padding: 10 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{name}</Text>
            <Text>{category}</Text>
            <Text style={styles.price}>
              Rp. {currency(price, { separator: '.', precision: 0 }).format()}
            </Text>
          </View>
        </View>
        <View style={{ paddingLeft: 30 }}>
          <TouchableOpacity
            style={{
              backgroundColor: metrics.TERTIARY_COLOR,
              borderRadius: 5,
              padding: 10,
              alignSelf: 'flex-start'
            }}
            onPress={() => this.props.navigation.navigate('Vendor')}
          >
            <Text style={{ color: 'white' }}>{vendor.name}</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{ flexDirection: 'row', marginTop: 20, marginHorizontal: 30 }}
        >
          <View>
            <TextInput
              placeholder={'Qty'}
              keyboardType={'numeric'}
              style={styles.input}
              onChangeText={(value) => this.setState({ qty: value })}
            />
          </View>
          <View style={{ flex: 1, alignItems: 'flex-end' }}>
            <TouchableOpacity style={styles.buyButton} onPress={() => this.buy(this.props.navigation.getParam('item', null))}>
              <Text style={{ color: 'white' }}>Buy</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            borderTopWidth: 0.3,
            borderColor: metrics.GREY,
            padding: 15,
            marginTop: 20,
            marginBottom: 5,
            width: metrics.DEVICE_WIDTH * 0.9,
            alignSelf: 'center'
          }}
        >
          <Text style={{ fontWeight: 'bold' }}>Deskripsi</Text>
        </View>
        <View style={{ flex: 1, paddingHorizontal: 35 }}>
          <FlatList
            data={specifications}
            renderItem={({ item }) => <Text>-  {item}</Text>}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },

  image: {
    width: metrics.DEVICE_WIDTH * 0.3,
    height: metrics.DEVICE_WIDTH * 0.3,
    borderWidth: 0.3,
    borderColor: metrics.GREY
  },

  price: {
    color: metrics.FOURTH_COLOR,
    position: 'absolute',
    bottom: 10,
    left: 10,
    fontWeight: 'bold'
  },

  input: {
    borderWidth: 0.3,
    borderColor: metrics.GREY,
    padding: 10,
    width: 75
  },

  buyButton: {
    padding: 10,
    paddingHorizontal: 30,
    backgroundColor: metrics.FOURTH_COLOR,
    borderRadius: 5
  }
})
