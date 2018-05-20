/* @flow */

import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, ScrollView, Alert } from 'react-native'
import { Calendar } from 'react-native-calendars'
import currency from 'currency.js'
import { inject } from 'mobx-react'

import metrics from '../config/metrics'

import CustomTextInput from '../components/CustomTextInput'
import CustomButton from '../components/CustomButton'

const MANDIRI = require('../../assets/rekening/mandiri.png')
const BCA = require('../../assets/rekening/bca.png')

@inject('cartStore')
export default class Payment extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Pembayaran',
    headerTintColor: metrics.PRIMARY_COLOR,
    headerStyle: {
      backgroundColor: 'white'
    }
  })

  constructor(props) {
    super(props)
    this.state = {
      markedDate: '2018-05-19'
    }
  }

  pay() {
    this.props.cartStore.cart = []
    Alert.alert('Sukses', 'Transaksi berhasil')
    this.props.navigation.goBack(null)
    setTimeout(() => this.props.navigation.goBack(null), 100)
  }

  render() {
    const total = this.props.navigation.getParam('total', 0)
    return (
      <ScrollView style={styles.container}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Ananta Pratama</Text>
        <Text style={{ marginBottom: 20 }}>+6281330747579</Text>
        <CustomTextInput placeholder={'No KTP'} keyboardType={'numeric'} />
        <Text style={{ fontWeight: 'bold', marginVertical: 5 }}>
          Tanggal Acara
        </Text>
        <Calendar
          markedDates={{ [this.state.markedDate]: { selected: true } }}
          onDayPress={(day) => this.setState({ markedDate: day.dateString })}
        />
        <CustomTextInput placeholder="Alamat" multiline={true} height={100} />
        <View
          style={{
            flexDirection: 'row',
            marginTop: 25,
            alignItems: 'center',
            borderTopWidth: 0.3,
            borderColor: metrics.GREY,
            justifyContent: 'center'
          }}
        >
          <Image
            source={BCA}
            style={{ height: 55, width: 100, resizeMode: 'contain' }}
          />
          <Text style={{ marginLeft: 20, fontSize: 18 }}>
            No. Rek : 7757475723488
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 5,
            alignItems: 'center',
            borderBottomWidth: 0.3,
            borderColor: metrics.GREY,
            justifyContent: 'center'
          }}
        >
          <Image
            source={MANDIRI}
            style={{ height: 55, width: 100, resizeMode: 'contain' }}
          />
          <Text style={{ marginLeft: 20, fontSize: 18 }}>
            No. Rek : 7757475723488
          </Text>
        </View>
        <View style={{ alignItems: 'center', marginTop: 25 }}>
          <Text>Total</Text>
          <Text
            style={{
              color: metrics.FOURTH_COLOR,
              fontSize: 25,
              fontWeight: 'bold',
              marginTop: 10
            }}
          >
            Rp. {currency(total, { separator: '.', precision: 0 }).format()}
          </Text>
          <View style={{ marginTop: 20 }} />
          <CustomButton color={metrics.FOURTH_COLOR} onPress={() => this.pay()}>
            <Text style={{ color: 'white' }}>Bayar Sekarang</Text>
          </CustomButton>
          <View style={{ marginTop: 30 }}/>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20
  }
})
