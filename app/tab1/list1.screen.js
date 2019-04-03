//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet , WebView} from 'react-native';

// create a component
export  class list1 extends Component {

    render() {
        const url=this.props.navigation.state.params.url
        console.log(url)
        return (
            
                <WebView
                    
                    ref="_webView"
                    source={{uri:url}}//获取url参数
                    automaticallyAdjustContentInsets={true}
                    
                />
           
        );
    }
}


