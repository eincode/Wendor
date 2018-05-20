import React, { Component } from 'react'
import { Image } from 'react-native'
import { StackNavigator, TabNavigator, TabBarBottom, TabBarTop } from 'react-navigation'

import metrics from './config/metrics'

import Header from './components/Header'

import Login from './screens/Login'
import Register from './screens/Register'

import Calculate from './screens/home/Calculate'
import Profile from './screens/home/Profile'

import Home from './screens/home/Home'
import Category from './screens/home/Category'
import Package from './screens/home/Package'

import CategoryDetail from './screens/Category'
import Vendor from './screens/Vendor'
import ItemDetail from './screens/ItemDetail'
import Cart from './screens/Cart'
import Payment from './screens/Payment'
import PackageDetail from './screens/PackageDetail'

const HOME_ACTIVE = require('../assets/bottom_nav_icon/ic_home_white_24dp2_active.png')
const HOME_INACTIVE = require('../assets/bottom_nav_icon/ic_home_white_24dp2.png')

type Props = {}
export default class App extends Component<Props> {
  render() {
    return <RootNav />
  }
}

const HomeNav = TabNavigator(
  {
    Home: { screen: Home },
    Kategori: { screen: Category },
    Paket: { screen: Package }
  },
  {
    tabBarComponent: props => (
      <TabBarTop {...props} indicatorStyle={{ backgroundColor: metrics.PRIMARY_COLOR }}/>
    ),
    tabBarPosition: 'top',
    animationEnabled: true,
    swipeEnabled: false,
    activeTintColor: metrics.PRIMARY_COLOR,
    tabBarOptions: {
      activeTintColor: metrics.PRIMARY_COLOR,
      inactiveTintColor: metrics.PRIMARY_COLOR,
      style: {
        backgroundColor: 'white'
      },
      pressColor: 'white',
      pressOpacity: 0.4
    },
    indicatorStyle: {
      borderBottomColor: metrics.PRIMARY_COLOR
    },
    navigationOptions: {
      tabBarIcon: ({ focused }) => {
        switch (focused) {
          case true:
            return <Image source={HOME_ACTIVE} style={metrics.TAB_BAR_ICON} />
          case false:
            return <Image source={HOME_INACTIVE} style={metrics.TAB_BAR_ICON} />
        }
      }
    }
  }
)

const TabNav = TabNavigator(
  {
    Home: { screen: HomeNav },
    Calculate: { screen: Calculate },
    Profile: { screen: Profile }
  },
  {
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
    lazy: false,
    tabBarOptions: {
      showLabel: true,
      activeTintColor: metrics.SECONDARY_COLOR,
      style: {
        borderTopWidth: 0,
        elevation: 10,
        backgroundColor: 'white',
        shadowColor: 'rgba(184, 184, 184, 0.5)',
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowRadius: 4,
        shadowOpacity: 1,
        elevation: 5,
      }
    },
    navigationOptions: ({ navigation }) => ({
      headerTitle: <Header navigation={navigation}/>,
      headerStyle: {
        backgroundColor: metrics.SECONDARY_COLOR
      },
      headerLeft: null
    }),
    cardStyle: {
      backgroundColor: '#f2f2f2'
    }
  }
)

const RootNav = StackNavigator({
  App: { screen: TabNav },
  Login: { screen: Login },
  Register: { screen: Register },
  CategoryDetail: { screen: CategoryDetail },
  Vendor: { screen: Vendor },
  ItemDetail: { screen: ItemDetail },
  Cart: { screen: Cart },
  Payment: { screen: Payment },
  PackageDetail: { screen: PackageDetail }
})
