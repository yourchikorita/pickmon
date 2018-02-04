import React from 'react';
import { StyleSheet, Text, View,Button  } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Category from './Category';
import SearchResult from './SearchResult';
import ShowMap from './ShowMap';

const ShowApp = StackNavigator({
  Category :{screen : Category},
  SearchResult:{screen : SearchResult},
  ShowMap :{screen : ShowMap},
});

export default class App extends React.Component {
  render() {
    return (
      <ShowApp />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
