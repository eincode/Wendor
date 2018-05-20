/* @flow */

import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator
} from 'react-native'

import CategoryItem from '../components/CategoryItem'

import VendorController from '../controller/VendorController'

const STAR_ACTIVE = require('../../assets/star/ic_star_rate_active_18dp.png')
const STAR_INACTIVE = require('../../assets/star/ic_star_rate_white_18dp.png')

import metrics from '../config/metrics'

export default class Vendor extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('vendor', null).name,
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: metrics.SECONDARY_COLOR,
      borderBottomWidth: 0
    }
  })

  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      rating: 0,
      items: [],
      name: ''
    }
  }

  async componentDidMount() {
    let response = await VendorController.getItemsFromVendor(this.props.navigation.getParam('vendor', null).id)
    this.setState({ items: response.items, rating: response.rating, isLoading: false, name: response.name })
  }

  renderLoading() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    )
  }

  renderContent(name) {
    let ratingArr = ['0', '0', '0', '0', '0']
    let rating = this.state.rating
    for (let i = 0; i < Math.floor(rating); i++) {
      ratingArr[i] = '1'
    }
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row' }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              paddingLeft: 20,
              flexDirection: 'row'
            }}
            >
              <FlatList
                data={ratingArr}
                renderItem={({ item }) => (
                  <Image
                    source={item == '1' ? STAR_ACTIVE : STAR_INACTIVE}
                    style={{ width: 20, height: 20, alignSelf: 'center' }}
                  />
                )}
                horizontal
              />
            </View>
            <View style={{ flex: 1 }}>
              <TouchableOpacity style={styles.reviewButton}>
                <Text style={{ color: 'white' }}>Review</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              borderBottomWidth: 0.3,
              borderTopWidth: 0.3,
              borderColor: metrics.GREY,
              padding: 15
            }}
            >
              <Text style={{ fontWeight: 'bold' }}>Item</Text>
            </View>
            <FlatList
              data={this.state.items}
              numColumns={2}
              renderItem={({ item }) => {
                item.vendor = {
                  name: this.state.name
                }
                return (
                  <CategoryItem
                    name={item.name}
                    price={item.price}
                    vendor={{ name: name }}
                    image={item.photoURL}
                    onItemPress={() => this.props.navigation.navigate('ItemDetail', { item: item })}
                  />
                )
              }}
              showsVerticalScrollIndicator={false}
            />
      </View>
    )
  }

  render() {
    const { id, name, phone, address } = this.props.navigation.getParam('vendor', null)
    return (
      <View style={styles.container}>
        <View style={[styles.header, metrics.SHADOW_STYLE]}>
          <View style={styles.header}>
            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>
              {name}
            </Text>
            <Text style={{ color: 'white', marginTop: 10 }}>
              {phone}
            </Text>
            <Text style={{ color: 'white' }}>{address}</Text>
          </View>
        </View>
        {
          this.state.isLoading ? (
            this.renderLoading()
          ) : (
            this.renderContent(name)
          )
        }
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
    backgroundColor: metrics.SECONDARY_COLOR,
    padding: 20
  },

  reviewButton: {
    backgroundColor: metrics.FOURTH_COLOR,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    margin: 10
  }
})

const STARS = ['1', '1', '1', '0', '0']
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
