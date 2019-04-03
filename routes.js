/* eslint-disable react/prop-types */
import React from 'react';
import {Image} from 'react-native';
import {
  StackNavigator,
  TabNavigator,
  TabBarBottom,
  NavigationActions,
} from 'react-navigation';
import { Icon } from 'react-native-elements';


import { colors } from './app/utils';
//import { translate } from 'utils';
import {list1} from './app/tab1';
import tab1 from './app/tab1/tab1.screen';
import tab2 from './app/tab2/tab2.screen';
import {list2 } from './app/tab2';
import {tab3,list3 } from './app/tab3';
import {tab4,list4 } from './app/tab4';

import SplashScreen  from './app/auth/splash.screen';
import LoginScreen  from './app/auth/login.screen';
// tab1

  

  

// const sharedRoutes = {
//   RepositoryList: {
//     screen: RepositoryListScreen,
//     navigationOptions: ({ navigation }) => ({
//       title: navigation.state.params.title,
//     }),
//   },
//   StarredRepositoryList: {
//     screen: StarredRepositoryListScreen,
//     navigationOptions: ({ navigation }) => ({
//       title: navigation.state.params.title,
//     }),
//   }
//   };

const HomeStackNavigator = StackNavigator(
  {
    Home: {
      screen: tab1,
      navigationOptions: {
        headerTitle: 'Behavior',
      },
    },
    List1: {
        screen: list1,
        navigationOptions: {
          headerTitle: 'Detail',
        },
      },
    
  },
  {
    headerMode: 'screen',
  }
);

const AboutStackNavigator = StackNavigator(
    {
      About: {
        screen: tab2,
        navigationOptions: {
          headerTitle: 'Congnition',
        },
      },
      List1: {
          screen: list1,
          navigationOptions: {
            headerTitle: 'Detail',
          },
        },
      
    },
    {
      headerMode: 'screen',
    }
  );

  const ContactStackNavigator = StackNavigator(
    {
      Contact: {
        screen: tab3,
        navigationOptions: {
          headerTitle: 'NeuronScience',
        },
      },
      List1: {
          screen: list1,
          navigationOptions: {
            headerTitle: 'Detail',
          },
        },
      
    },
    {
      headerMode: 'screen',
    }
  );
  const MoreStackNavigator = StackNavigator(
    {
      More: {
        screen: tab4,
        navigationOptions: {
          headerTitle: 'Tab4',
        },
      },
      List1: {
          screen: list1,
          navigationOptions: {
            headerTitle: 'Detail',
          },
        },
      
    },
    {
      headerMode: 'screen',
    }
  );

  const  MainTabNavigator=TabNavigator({
    Behavior: {
      screen: HomeStackNavigator,
      navigationOptions: {
        tabBarLabel: 'Behavior',
        tabBarIcon: ({ tintColor, focused }) => (
          <Image  source={focused?require('./app/assets/tabs/tab-icon1/active.png'):require('./app/assets/tabs/tab-icon1/default.png')} />
        ),header: null,
  
      },
    },
    Congnition:{
      screen :AboutStackNavigator,
        navigationOptions: {
        tabBarLabel: 'Congnition',
        tabBarIcon: ({ tintColor, focused }) => (
          <Image  source={focused?require('./app/assets/tabs/tab-icon2/active.png'):require('./app/assets/tabs/tab-icon2/default.png')} />
        ),header: null,
      },
    },
    'Neuron&Science':{
      screen :ContactStackNavigator,
        navigationOptions: {
        tabBarLabel: 'NeuronScience',
        tabBarIcon: ({ tintColor, focused }) => (
          <Image  source={focused?require('./app/assets/tabs/tab-icon5/active.png'):require('./app/assets/tabs/tab-icon5/default.png')} />
        ),header: null,
      },
    },
    NeuronHealth:{
      screen :MoreStackNavigator,
        navigationOptions: {
        tabBarLabel: 'NeuronHealth',
        tabBarIcon: ({ tintColor, focused }) => (
          <Image  source={focused?require('./app/assets/tabs/tab-icon3/active.png'):require('./app/assets/tabs/tab-icon3/default.png')} />
        ),header: null,
      },
    },
    
  }, {
    tabBarPosition: 'bottom',
    animationEnabled: false,
    tabBarOptions: {
      activeTintColor: '#e91e63',
    },
  })

export const GitPoint = StackNavigator(
  {
    Splash: {
      screen: SplashScreen,
      navigationOptions: {
        header: null,
      },
    },
    Login: {
      screen: LoginScreen,
      navigationOptions: {
        header: null,
      },
    },
    Main: {
      screen: MainTabNavigator,
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    headerMode: 'screen',
    URIPrefix: 'gitpoint://',
    cardStyle: {
      backgroundColor: '#c397d8',
    },
  }
);
