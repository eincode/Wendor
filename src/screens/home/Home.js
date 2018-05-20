/* @flow */

import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, FlatList, ActivityIndicator } from 'react-native'

import VendorController from '../../controller/VendorController'

import metrics from '../../config/metrics'
import HomeItem from '../../components/HomeItem'

export default class Home extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isTopLoading: true,
      isMostLoading: true,
      topItems: [],
      mostItems: []
    }
  }

  async componentDidMount() {
    let topVendor = await VendorController.getTopVendor()
    this.setState({ isTopLoading: false, topItems: topVendor })
    let mostUsed = await VendorController.getMostUsedVendor()
    this.setState({ isMostLoading: false, mostItems: mostUsed })
  }

  renderLoading() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    )
  }

  renderContent(data) {
    return (
      <FlatList
        horizontal
        data={data}
        renderItem={({ item }) => {
          let ratingArr = ['0', '0', '0', '0', '0']
          let rating = item.ratings
          for (let i = 0; i < Math.floor(rating); i++) {
            ratingArr[i] = '1'
          }
          return (
            <HomeItem
              onItemPress={() => this.props.navigation.navigate('Vendor', { vendor: item })}
              name={item.name}
              rating={ratingArr}
              image={item.photoURL}
            />
          )}
        }
        showsHorizontalScrollIndicator={false}
      />
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Top Rated</Text>
        {this.state.isTopLoading ? this.renderLoading() : this.renderContent(this.state.topItems)}
        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Most Used</Text>
        {this.state.isMostLoading ? this.renderLoading() : this.renderContent(this.state.mostItems)}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
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
