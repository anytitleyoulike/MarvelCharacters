import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList, ScrollView, AsyncStorage } from 'react-native';
import md5 from 'md5';
import HeroModal from './HeroModal';
import { SearchBar, Icon} from 'react-native-elements';
import _ from 'lodash';


export default class Heroes extends Component {

    constructor() {
        super();
        this._handleSearch = this._handleSearch.bind(this);
    }
    async componentDidMount() {
        //check if has data
        const dataStorage = JSON.parse( await AsyncStorage.getItem('@Marvel:heroes')) || [];

        if(dataStorage.length > 0) {
            this.setState({heroes: dataStorage});
            this.setState({fullData: dataStorage});
           
        } else {
            this.fetchHeroes();
        }
    }

    state = {
        modalVisible: false,
        heroes: [],
        fullData: [],
        example: {
            id: 1234,
            nome: 'A-Bomb (HAS)',
            img: 'http://i.annihil.us/u/prod/marvel/i/mg/3/20/5232158de5b16.jpg',
            descricao: `Rick Jones has been Hulk's best bud since day one, but now he's more than a friend...he's a teammate!`,
            favorite: true
        }
    }


    fetchHeroes = async () => {
        const privateKey = '6ff5c79f8348872cc1e726a9442f99fe94281cbb';
        const publicKey = '42781c78a838c70158dd3303848bb187';
        const timeStamp = Math.round(Date.now() / 1000);
        const hash = md5(timeStamp + privateKey + publicKey);


        const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${timeStamp}&apikey=${publicKey}&hash=${hash}`;
        const heroesCall = await fetch(url);
        const response = await heroesCall.json()

        this.setState({ heroes: response.data.results });
        this.setState({ fullData: response.data.results });
        
        AsyncStorage.setItem('@Marvel:heroes', JSON.stringify(this.state.heroes));
    }
    _handleSearch = (text) => {
        const query = text.toLowerCase();
        const data = _.filter(this.state.fullData, function(obj) {
             return obj.name.toLowerCase().includes(query);
        });
       
        this.setState({heroes: data});
    }

    _handleClick = () => {
       this.setState({modalVisible: true});
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
                <ScrollView style={styles.heroesList}>
                    
                <FlatList
                    data={this.state.heroes}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity key={item.id} onPress={ this._handleClick }>
                                <View style={styles.box}>
                                    <Image
                                        style={styles.heroImage}
                                        source={{ uri: item.thumbnail.path + '.' + item.thumbnail.extension }}
                                    />

                                    <View style={styles.heroInfo}>
                                        <Text style={styles.heroTitle}>{item.name}</Text>
                                        <Text style={styles.heroDescription} numberOfLines={3} ellipsizeMode="tail">{item.description || "Character have no descripiton"}</Text>
                                    </View>

                                </View>
                            </TouchableOpacity>
                        )
                    }}
                />
                </ScrollView>
                <HeroModal modalVisible={this.state.modalVisible}
                    heroName={this.state.example.nome}
                    heroImage={this.state.example.img}
                    heroDescricao={this.state.example.descricao}
                    heroFav={this.state.example.favorite}
                    
                    onCancel={() => { this.setState({ modalVisible: false }) }}
                    onAdd={() => {}}
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    box: {
        padding: 20,
        backgroundColor: '#FFF',
        marginBottom: 20,
        borderRadius: 5,
        flexDirection: 'row'
    },
    heroesList: {
        padding: 20
    },
    heroImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    heroInfo: {
        marginHorizontal: 10,
        height: 70,
        width: 220,
        textAlign: 'justify',
    },
    heroTitle: {
        fontWeight: 'bold',
        color: '#333'
    },
    heroDescription: {
        fontSize: 14,
        color: '#999'
    }
})