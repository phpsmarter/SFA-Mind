import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {GitPoint} from './routes'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient, HttpLink, InMemoryCache} from 'apollo-client-preset'


const httpLink = new HttpLink({ uri: 'https://api.graph.cool/simple/v1/cjdcrl3sl351201460qwi1f1w'

})

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
  
})

export default class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <GitPoint/>
      </ApolloProvider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#af7dff',
  }
  
})
