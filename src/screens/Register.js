/* @flow */

import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  Alert
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import CustomTextInput from '../components/CustomTextInput'
import CustomButton from '../components/CustomButton'

import metrics from '../config/metrics'

const LOGO = require('../../assets/Logo/Logo.png')
const CAPTION = require('../../assets/Logo/Logo3.png')

export default class Register extends Component {
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props)
    this.state = {
      isRegistering: false,
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: ''
    }
  }

  register() {
    if (this.state.password == this.state.confirmPassword) {
      this.setState({ isRegistering: !this.state.isRegistering })
    } else {
      Alert.alert('Error', 'Password tidak sama')
    }
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
          placeholder={'Nama Lengkap'}
          autoCapitalize={'words'}
          ref={ref => (this.nameRef = ref)}
          onSubmitEditing={() => this.emailRef.focus()}
          returnKeyType={'next'}
          onChangeText={value => this.setState({ name: value })}
        />
        <CustomTextInput
          placeholder={'Email'}
          keyboardType={'email-address'}
          ref={ref => (this.emailRef = ref)}
          onSubmitEditing={() => this.phoneRef.focus()}
          returnKeyType={'next'}
          onChangeText={value => this.setState({ email: value })}
        />
        <CustomTextInput
          placeholder={'No. Telepon'}
          keyboardType={'numeric'}
          ref={ref => (this.phoneRef = ref)}
          onSubmitEditing={() => this.passwordRef.focus()}
          returnKeyType={'next'}
          onChangeText={value => this.setState({ phone: value })}
        />
        <CustomTextInput
          placeholder={'Password'}
          secureTextEntry={true}
          autoCapitalize={'none'}
          ref={ref => (this.passwordRef = ref)}
          onSubmitEditing={() => this.confirmPasswordRef.focus()}
          returnKeyType={'next'}
          onChangeText={value => this.setState({ password: value })}
        />
        <CustomTextInput
          placeholder={'Konfirmasi Password'}
          secureTextEntry={true}
          autoCapitalize={'none'}
          ref={ref => (this.confirmPasswordRef = ref)}
          returnKeyType={'done'}
          onChangeText={value => this.setState({ confirmPassword: value })}
        />
        <CustomButton
          color={metrics.FOURTH_COLOR}
          onPress={() => this.register()}
        >
          {this.state.isRegistering ? (
            <ActivityIndicator color={'white'} />
          ) : (
            <Text style={{ color: 'white' }}>Register</Text>
          )}
        </CustomButton>
      </KeyboardAwareScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: metrics.PRIMARY_COLOR
  }
})
