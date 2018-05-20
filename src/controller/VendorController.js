import { Alert } from 'react-native'

import Controller from './Controller'

class VendorController extends Controller {
  getItemsFromVendor = async (id, onFailure) => {
    try {
      let response = await this.api.get(`/vendors/${id}`)
      if (response.ok) {
        response = await response.json()
        return response.data
      } else {
        response = await response.json()
        Alert.alert('Error', response.errors[0].message)
      }
    } catch (err) {
      onFailure()
    }
  }

  getTopVendor = async (onFailure) => {
    try {
      let response = await this.api.get('/vendors/top')
      if (response.ok) {
        response = await response.json()
        return response.data
      } else {
        response = await response.json()
        Alert.alert('Error', response.errors[0].message)
      }
    } catch (err) {
      onFailure()
    }
  }

  getMostUsedVendor = async (onFailure) => {
    try {
      let response = await this.api.get('/vendors/mostUsed')
      if (response.ok) {
        response = await response.json()
        return response.data
      } else {
        response = await response.json()
        Alert.alert('Error', response.errors[0].message)
      }
    } catch (err) {
      onFailure()
    }
  }
}

export default new VendorController()
