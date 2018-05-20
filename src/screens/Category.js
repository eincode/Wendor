/* @flow */

import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, Image, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native'
import GridList from 'react-native-grid-list'

import metrics from '../config/metrics'
import CategoryItem from '../components/CategoryItem'

import ProductController from '../controller/ProductController'

const SEARCH = require('../../assets/ic_search_black_24dp2.png')

export default class Category extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('category', 'Kategori'),
    headerTintColor: metrics.PRIMARY_COLOR,
    headerStyle: {
      backgroundColor: 'white'
    }
  })

  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      items: [],
      isRetrying: false
    }
  }

  async componentDidMount() {
    let category = this.props.navigation.getParam('category', 'busana')
    if (category == 'Hair & Make up') {
      category = 'hairmakeup'
    }
    let response = await ProductController.getItemsFromCategory(category, () => {
      this.setState({ isRetrying: true })
      this.componentDidMount()
    })
    this.setState({ items: response, isLoading: false })
  }

  renderLoading() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator />
        {
          this.state.isRetrying ? (
            <Text>Poor network condition detected, retrying</Text>
          ) : null
        }
      </View>
    )
  }

  renderContent() {
    return (
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: 'white',
            alignItems: 'center',
            paddingHorizontal: 10,
            borderBottomWidth: 0.3,
            borderColor: metrics.GREY
          }}
        >
          <Image source={SEARCH} style={{ width: 20, height: 20 }} />
          <TextInput
            style={styles.textInput}
            placeholder={'Search Vendor...'}
          />
        </View>
        <FlatList
          data={this.state.items}
          numColumns={2}
          renderItem={({ item }) => (
            <CategoryItem
              image={item.photoURL}
              name={item.name}
              price={item.price}
              vendor={item.vendor}
              onVendorPress={() => this.props.navigation.navigate('Vendor', { vendor: item.vendor })}
              onItemPress={() => this.props.navigation.navigate('ItemDetail', { item: item })}
            />
          )}
          showsVerticalScrollIndicator={false}
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

  textInput: {
    height: 40,
    flex: 1,
    marginLeft: 10
  },
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
