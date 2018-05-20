import { observable } from 'mobx'

class CartStore {
  @observable cart = []
}

export default new CartStore()
