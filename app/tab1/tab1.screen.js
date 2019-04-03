//import liraries
import React, { Component } from 'react';
import { View, Text, FlatList,Button} from 'react-native';
import { List, ListItem ,Header} from 'react-native-elements';
//import Dropdown   from '../common/Drowdown';



import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const allMinds = gql`
  query($skip:Int!,$last:Int!,$cat:String!){
    allMinds(skip:$skip,last:$last,filter:{cat:$cat}){
      id
      title
      cat
      img
      url
      meta
    }
  }`;
class tab1  extends Component {
    
  
  
async componentWillMount() {
    await Font.loadAsync({
        'MaterialIcons': require('@expo/vector-icons/fonts/MaterialIcons.ttf')
     });
}

    render() {
        
      const {navigate} = this.props.navigation;
      console.log(this.props)
      
      if(this.props.networkStatus===1){
        return (
            <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
              <Text>Loading...</Text>
            </View>
        )
      }

      if(this.props.networkStatus===2){
        return (
            <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
              <Text>Loading...</Text>
            </View>
        )
      }
      //console.log(this.props.data);
      return (
        <View>
        
        <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0,marginTop:0 }}>
         <FlatList
            
            data={this.props.allMinds}
            renderItem={({ item }) => (
               
                
              <ListItem
                
                refreshing={this.props.networkStatus === 4}
                onRefresh={() => this.props.refetch()}
                title={`${item.title}`}
                subtitle={`${item.cat}`}
                containerStyle={{ borderBottomWidth: 0 }}
                onPress={() => navigate('List1',{url:`${item.url}`})}
               
              />
            )}
            keyExtractor={item => item.id}
            onEndReachedThreshold={0.5}
            onEndReached={() => {
        // The fetchMore method is used to load new data and add it
        // to the original query we used to populate the list
        this.props.fetchMore({
          variables: { skip: this.props.allMinds.length + 10,last:10},
          updateQuery: (previousResult, { fetchMoreResult }) => {
            // Don't do anything if there weren't any new items
            //console.log(fetchMoreResult)
            if (!fetchMoreResult || fetchMoreResult.allMinds.length === 0) {
              return previousResult;
            }

            return {
              // Concatenate the new feed results after the old ones
              allMinds: previousResult.allMinds.concat(fetchMoreResult.allMinds),
            };
          },
        });
      }}
          />
        </List>
    </View>
      );
    }

    
  }



export default graphql(allMinds,{
  options: {
    
    variables:{skip:0,last:10,cat:"Behavior & Society"}
    
  },
  props: ({ ownProps, data: { loading, allMinds, refetch, fetchMore, networkStatus, updateQuery} }) => ({
    Loading: loading,
    allMinds: allMinds,
    refetch: refetch,
    fetchMore: fetchMore,
    networkStatus: networkStatus,
    updateQuer: updateQuery
  }),
}
  )(tab1);
