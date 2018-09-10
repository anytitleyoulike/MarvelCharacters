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
        // console.log('did update', this.state.modalHero);
    }
    async componentDidMount() {
        //check if has data
        const dataStorage = JSON.parse( await AsyncStorage.getItem('@Marvel:heroes')) || [];
 
        if(dataStorage.length > 0) {
            console.log('data from storage');
            this.setState({
                heroes: dataStorage,
                fullData: dataStorage,
                heroList: dataStorage
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
            favorite: ''
        }
    }

    fetchHeroes = async () => {
        const privateKey = '6ff5c79f8348872cc1e726a9442f99fe94281cbb';
        const publicKey = '42781c78a838c70158dd3303848bb187';
        const timeStamp = Math.round(Date.now() / 1000);
        const hash = md5(timeStamp + privateKey + publicKey);


        const url = `https://gateway.marvel.com:443/v1/public/characters?&ts=${timeStamp}&apikey=${publicKey}&hash=${hash}`;
        const heroesData = await fetch(url);
        const response = await heroesData.json()

        console.log('fetch heroes');
        
        let data = response.data.results.map(i =>{ 
           return  obj = {
                id: i.id,
                name: i.name,
                description: i.description,
                thumbnail: {
                    path: i.thumbnail.path,
                    extension: i.thumbnail.extension
                },
                favorite: false
            }
        })

        this.setState({
            heroes: data,
            fullData: data,
            heroList: data
        });
        
        AsyncStorage.setItem('@Marvel:heroes', JSON.stringify(this.state.heroes));
    }
    _handleSearch = (text) => {
        const query = text.toLowerCase();
        const data = _.filter(this.state.fullData, function(obj) {
             return obj.name.toLowerCase().includes(query);
        });
       
        this.setState({heroList: data});
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

    _clickFavorite = async (id) => {
        let hero = this.state.heroes.filter((hero) => {
            return id === hero.id;
        });
        
        let index = this.state.heroes.findIndex((item) => {
            return item.id == id;
        });
        
        let data = Object.assign({}, hero[0]);

        if(!data.favorite) {
            data = Object.assign(data, { favorite: true })
            console.log('favoritou');
        } else {
            data = Object.assign(data, { favorite: false })
            console.log('removeu fav');
        }
    
        let previousState = this.state.heroes;
        previousState[index] = data;

        this.setState({
            modalHero: data,
            heroes: previousState,
        });

        await AsyncStorage.setItem('@Marvel:heroes', JSON.stringify(this.state.heroes));
    
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
                        data={this.state.heroList}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => {
                            return (
                                <TouchableOpacity key={item.id} onPress={ () => this._handleClick(item.id) }>
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
                    
                    onCancel={() => { this.setState({ modalVisible: false}); }}
                    onAdd={() => {this._clickFavorite(this.state.modalHero.id)}}
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