import { Alert } from 'react-native'

import Controller from './Controller'

class ProductController extends Controller {

  getItemsFromCategory = async (category, onFailure) => {
    try {
      let response = await this.api.get(`/items?category=${category.toLowerCase()}`)
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

  getPackages = async (onFailure) => {
    try {
      let response = await this.api.get('/packages')
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

  generatePackage = async (budget, onFailure) => {
    try {
      let response = await this.api.get(`/suggest/${budget}`)
      if (response.ok) {
        response = await response.json()
        return response.data
      } else {
        response = await response.json()
        return null
      }
    } catch (err) {
      onFailure()
    }
  }

}

export default new ProductController()
