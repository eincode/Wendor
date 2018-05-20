/* @flow */

import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import CustomTextInput from '../components/CustomTextInput'
import CustomButton from '../components/CustomButton'

import metrics from '../config/metrics'

const LOGO = require('../../assets/Logo/Logo.png')
const CAPTION = require('../../assets/Logo/Logo3.png')

export default class Login extends Component {
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props)
    this.state = {
      isLoggingIn: false
    }
  }

  login() {
    this.props.navigation.navigate('App')
  }

  render() {
    return (
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <Image source={LOGO} style={{ width: 50, height: 50 }} />
        <Image
          source={CAPTION}
          style={{ height: 50, resizeMode: 'contain', marginVertical: 20 }}
        />
        <CustomTextInput
          placeholder={'Email'}
          keyboardType={'email-address'}
          ref={ref => (this.emailRef = ref)}
          onSubmitEditing={() => this.passwordRef.focus()}
          returnKeyType={'next'}
        />
        <CustomTextInput
          placeholder={'Password'}
          secureTextEntry={true}
          ref={ref => (this.passwordRef = ref)}
          returnKeyType={'done'}
        />
        <CustomButton color={metrics.TERTIARY_COLOR} onPress={() => this.login()}>
          {
            this.state.isLoggingIn ? (
              <ActivityIndicator color={'white'} />
            ) : (
              <Text style={{ color: 'white' }}>Login</Text>
            )
          }
        </CustomButton>
        <Text
          style={{ color: 'white', fontWeight: 'bold', marginVertical: 20 }}
        >
          OR
        </Text>
        <CustomButton
          color={metrics.FOURTH_COLOR}
          onPress={() => this.props.navigation.navigate('Register')}
        >
          <Text style={{ color: 'white' }}>Register</Text>
        </CustomButton>
      </KeyboardAwareScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: metrics.DEVICE_HEIGHT * 0.2,
    backgroundColor: metrics.PRIMARY_COLOR
  }
})
