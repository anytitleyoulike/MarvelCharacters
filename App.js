import React, { Component } from 'react';
import { FlatList, Platform, StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import Header from './Components/Header'
import Heroes from './Components/Heroes';
import { SearchBar, Icon } from 'react-native-elements';



type Props = {};
export default class App extends Component<Props> {

  state = {
    heroes: [],
  }
  componentDidMount() {
  }
 
  render() {
    return (
      <View style={styles.container}>
        <Header headerText="MARVEL Characters" />
        
        <Heroes/>
      
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  text: {
    color: "#333333"
  }
});