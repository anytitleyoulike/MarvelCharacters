import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList, ScrollView, AsyncStorage } from 'react-native';
import md5 from 'md5';
import HeroModal from './HeroModal';
import { SearchBar, Icon} from 'react-native-elements';
import _ from 'lodash';
import HeroList from './HeroList';

export default class Heroes extends Component {

    constructor() {
        super();
        this._handleSearch = this._handleSearch.bind(this);
    }

    componentDidUpdate() {
        console.log('did update', this.state.modalHero);
    }
    async componentDidMount() {
        //check if has data
        const dataStorage = JSON.parse( await AsyncStorage.getItem('@Marvel:heroes')) || [];

        if(dataStorage.length > 0) {
            console.log('data from storage');
            this.setState({
                heroes: dataStorage,
                fullData: dataStorage
            });
           
        } else {
            console.log('data from api');
            this.fetchHeroes();
        }
    }

    state = {
        modalVisible: false,
        heroes: [],
        fullData: [],
        modalHero: {
            name: '',
            description: '',
            thumbnail: {
                path: '',
                extension: ''
            },
            favorite: false
        }
    }

    fetchHeroes = async () => {
        const privateKey = '6ff5c79f8348872cc1e726a9442f99fe94281cbb';
        const publicKey = '42781c78a838c70158dd3303848bb187';
        const timeStamp = Math.round(Date.now() / 1000);
        const hash = md5(timeStamp + privateKey + publicKey);


        const url = `https://gateway.marvel.com:443/v1/public/characters?&ts=${timeStamp}&apikey=${publicKey}&hash=${hash}`;
        const heroesCall = await fetch(url);
        const response = await heroesCall.json()

        console.log('fetch heroes');
        
        this.setState({
            heroes: response.data.results,
            fullData: response.data.results
        });
        
        AsyncStorage.setItem('@Marvel:heroes', JSON.stringify(this.state.heroes));
    }
    _handleSearch = (text) => {
        const query = text.toLowerCase();
        const data = _.filter(this.state.fullData, function(obj) {
             return obj.name.toLowerCase().includes(query);
        });
       
        this.setState({heroes: data});
    }

    _handleClick = async (id) => {
        await this._getInfoModal(id);
        this.setState({modalVisible: true});
    }

    _getInfoModal = (id) => {
        let data = this.state.heroes.find((hero) => {
            return id === hero.id;
        });
        this.setState({ modalHero: data });
    }

    _favoriteHero = () => {
        console.log('favoritou');

        // let data = this.state.heroes.filter((hero) => {
        //     return this. === hero.id;
        // });

        console.log(this.state.modalHero.id);
        // this.setState({
        //     ...this.state.hero, favorite: true
        // }); 
    }

    render() {
        return (
            <View>
                <SearchBar
                    lightTheme
                    searchIcon={<Icon name='search' />}
                    onChangeText={this._handleSearch}
                    onClear={() => { }}
                    placeholder='Digite aqui...'
                />
                <ScrollView style={styles.container}>     
                    <FlatList
                        data={this.state.heroes}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => {
                            return (
                                <TouchableOpacity key={item.id} onPress={ () => { this._handleClick(item.id)} }>
                                    <HeroList 
                                        name={item.name} 
                                        description={item.description} 
                                        image={item.thumbnail.path + '.' + item.thumbnail.extension}
                                    />
                                </TouchableOpacity>
                            )
                        }}
                    />
                </ScrollView>

                <HeroModal 
                    modalVisible={this.state.modalVisible}
                    heroName={this.state.modalHero.name}
                    heroImage={this.state.modalHero.thumbnail.path + '.' + this.state.modalHero.thumbnail.extension}
                    heroDescricao={this.state.modalHero.description}
                    heroFav={this.state.modalHero.favorite}
                    
                    onCancel={() => { this.setState({ modalVisible: false})}}
                    onAdd={() => {this._favoriteHero()}}
                />

            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        padding: 20
    },
})