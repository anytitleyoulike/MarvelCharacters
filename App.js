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
  // handleSearch = (text) => {
  //   const formatQuery = text.lowercase();
  //   const data = _.filter(this.state.heroes, user => {
  //     return this.contains(user, formatQuery)
  //   });
  //   this.setState({query: formatQuery, data});
  // }

  // contains = ({name}, query) => {
  //   if(name.includes(query)) {
  //     return true;      
  //   }
  //   return false;

  // }
  render() {
    return (
      <View style={styles.container}>
        <Header headerText="MARVEL Characters" />
        {/* <SearchBar
          lightTheme
          searchIcon={<Icon name='search'/>}
          onChangeText={this.handleSearch}
          onClear={() => {}}
          placeholder='Digite aqui...' /> */}
        <Heroes/>

        {/* <View style={styles.header}>
          <Text style={styles.headerText}>ReactNative</Text>
          <TouchableOpacity onPress={() => this.setState({ modalVisible: true })}>
            <Text style={styles.headerButton}>+</Text>

          </TouchableOpacity>
			</View> */}

        {/* <ScrollView contentContainerStyle={styles.repoList}>
            { this.state.heroes === [] ? '' : this.state.heroes.map(hero => 
                <TouchableOpacity key={hero.id} onPress={() => {this.setState({modalVisible: true})}}>
                    <Heroes key={hero.id} description={hero.description} title={hero.name} image={hero.thumbnail.path + '.' + hero.thumbnail.extension} />
                </TouchableOpacity>
              ) 
            }
				</ScrollView> */}


        {/* <HeroModal modalVisible={this.state.modalVisible}
          heroName={'testee'} 
          onCancel={() => {this.setState({modalVisible: false})}}
          onAdd={() => this.fetchHeroes}
				/> */}
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