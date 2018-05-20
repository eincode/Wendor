import React, { Component } from 'react'

import { observer, Provider } from 'mobx-react'

import AppNavigator from './src/AppNavigator'
import CartStore from './src/store/cartStore'

@observer
class App extends Component {

  render() {
    return(
      <Provider cartStore={CartStore}>
        <AppNavigator />
      </Provider>
    )
  }

}

export default App
