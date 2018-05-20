/* @flow */

import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native'
import currency from 'currency.js'
import metrics from '../../config/metrics'

import ProductController from '../../controller/ProductController'

const PACKAGE_1 = require('../../../assets/paket/Group_389.png')
const PACKAGE_2 = require('../../../assets/paket/Group_390.png')
const PACKAGE_3 = require('../../../assets/paket/Group_391.png')

export default class Package extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      items: [],
      isRetrying: false
    }
  }

  async componentDidMount() {
    let response = await ProductController.getPackages(() => {
      this.setState({ isRetrying: true })
      this.componentDidMount()
    })
    this.setState({ items: response, isLoading: false })
  }

  renderLoading() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
        {this.state.isRetrying ? (
          <Text>Poor connection detected, retrying...</Text>
        ) : null}
      </View>
    )
  }

  renderContent() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.items}
          renderItem={({ item, index }) => {
            let picture = [PACKAGE_1, PACKAGE_2, PACKAGE_3]
            let image = picture[index]
            return (
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('PackageDetail', {
                    items: item.items,
                    paket: item
                  })
                }
              >
                <ImageBackground source={image} style={styles.image}>
                  <Text
                    style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}
                  >
                    {item.name}
                  </Text>
                  <Text style={{ color: 'white' }}>500 Undangan</Text>
                  <Text
                    style={{
                      color: 'white',
                      textDecorationLine: 'line-through',
                      marginTop: 15
                    }}
                  >
                    Rp.{' '}
                    {currency(item.price + 1000000, {
                      separator: '.',
                      precision: 0
                    }).format()}
                  </Text>
                  <Text
                    style={{
                      color: metrics.FOURTH_COLOR,
                      fontSize: 20,
                      fontWeight: 'bold'
                    }}
                  >
                    Rp.{' '}
                    {currency(item.price, {
                      separator: '.',
                      precision: 0
                    }).format()}
                  </Text>
                </ImageBackground>
              </TouchableOpacity>
            )
          }}
        />
      </View>
    )
  }

  render() {
    if (this.state.isLoading) {
      return this.renderLoading()
    }
    return this.renderContent()
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },

  image: {
    width: metrics.DEVICE_WIDTH,
    height: 150,
    marginVertical: 5,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

const PACKAGES = [PACKAGE_1, PACKAGE_2, PACKAGE_3]
