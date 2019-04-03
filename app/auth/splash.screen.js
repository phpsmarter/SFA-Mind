import React, { Component } from 'react'

import { StyleSheet, View, Image } from 'react-native'
//import { colors } from '../config'
//import { resetNavigationTo } from '../utils'
const styles = StyleSheet.create({
  logoContainer: {
    backgroundColor: '#f0ffff',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    width: 100,
    height: 100
  }
})

class SplashScreen extends Component {
  componentDidMount () {
    const isAuthenticated = true;
    const navigation=this.props;

    if (isAuthenticated) {
        this.props.navigation.navigate('Main', navigation)
    } else {
        this.props.navigation.navigate('Login', navigation)
    }
  }

  render () {
    return (
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require('../assets/logo-black.png')}
        />
      </View>
    )
  }
};

export default  SplashScreen
