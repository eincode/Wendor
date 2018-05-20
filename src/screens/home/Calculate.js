/* @flow */

import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Keyboard,
  FlatList,
  ActivityIndicator,
  Alert
} from 'react-native'

import { inject } from 'mobx-react'
import metrics from '../../config/metrics'
import currency from 'currency.js'

import CartItem from '../../components/CartItem'
import ProductController from '../../controller/ProductController'

const CALCULATE_ACTIVE = require('../../../assets/bottom_nav_icon/ic_developer_board_white_24dp2_active.png')
const CALCULATE_INACTIVE = require('../../../assets/bottom_nav_icon/ic_developer_board_white_24dp2.png')

@inject('cartStore')
export default class Calculate extends Component {
  static navigationOptions = {
    tabBarIcon: ({ focused }) => {
      switch (focused) {
        case true:
          return (
            <Image source={CALCULATE_ACTIVE} style={metrics.TAB_BAR_ICON} />
          )
        case false:
          return (
            <Image source={CALCULATE_INACTIVE} style={metrics.TAB_BAR_ICON} />
          )
      }
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      isGenerated: false,
      isLoading: false,
      item: [],
      budget: '',
      price: 0
    }
  }

  async generate() {
    Keyboard.dismiss()
    if (Number(this.state.budget) < 35000000) {
      Alert.alert('Pemberitahuan', 'Budget anda tidak mencukupi untuk paket apapun')
    } else {
      this.setState({ isGenerated: true, isLoading: true })
      let response = await ProductController.generatePackage(this.state.budget)
      this.setState({
        isLoading: false,
        item: response.items,
        price: response.price
      })
    }
  }

  addToCart() {
    if (this.state.item.length == 0) return
    this.props.cartStore.cart.push(...this.state.item)
    this.props.navigation.navigate('Cart')
  }

  renderLoading() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    )
  }

  renderContent() {
    return this.state.isGenerated ? (
      <FlatList
        data={this.state.item}
        renderItem={({ item }) => (
          <CartItem name={item.name} image={item.photoURL} price={item.price} vendor={item.vendor} />
        )}
        style={{ marginBottom: 75, marginTop: 10 }}
      />
    ) : (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Silahkan masukkan budget lalu tekan generate</Text>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.header, metrics.SHADOW_STYLE]}>
          <View style={{ flexDirection: 'row' }}>
            <TextInput
              placeholder={'Masukkan budget anda'}
              style={[styles.input, { flex: 2, marginHorizontal: 5 }]}
              keyboardType={'numeric'}
              onChangeText={value => this.setState({ budget: value })}
              underlineColorAndroid={'transparent'}
            />
            <TouchableOpacity
              style={styles.generateButton}
              onPress={() => this.generate()}
            >
              <Text style={{ color: 'white' }}>Generate</Text>
            </TouchableOpacity>
          </View>
        </View>
        {this.state.isLoading ? this.renderLoading() : this.renderContent()}
        <View style={[styles.footer, metrics.SHADOW_STYLE]}>
          <View>
            <Text style={{ fontWeight: 'bold' }}>Total</Text>
            <Text
              style={{
                fontWeight: 'bold',
                color: metrics.FOURTH_COLOR
              }}
            >
              Rp.{' '}
              {currency(this.state.price, {
                separator: '.',
                precision: 0
              }).format()}
            </Text>
          </View>
          <View style={{ flex: 1, alignItems: 'flex-end' }}>
            <TouchableOpacity
              style={{
                backgroundColor: metrics.FOURTH_COLOR,
                padding: 10,
                borderRadius: 5
              }}
              onPress={() => this.addToCart()}
            >
              <Text style={{ color: 'white' }}>Add to cart</Text>
            </TouchableOpacity>
          </View>
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

  header: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 5,
    alignItems: 'center'
  },

  input: {
    height: 40,
    borderColor: metrics.GREY,
    borderWidth: 0.3,
    borderRadius: 5,
    padding: 10
  },

  generateButton: {
    backgroundColor: metrics.FOURTH_COLOR,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    flex: 1
  },

  footer: {
    position: 'absolute',
    bottom: 0,
    padding: 20,
    width: metrics.DEVICE_WIDTH,
    backgroundColor: 'white',
    flexDirection: 'row'
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
