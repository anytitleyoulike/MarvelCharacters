import React, { Component } from 'react';
import { View, Text, Image, StyleSheet} from 'react-native';


export default class HeroList extends Component {
      
    render() {
        return(
            <View style={styles.box}>
                <Image
                    style={styles.heroImage}
                    source={{ uri: this.props.image }}
                />

                <View style={styles.heroInfo}>
                    <Text style={styles.heroTitle}>{this.props.name}</Text>
                    <Text style={styles.heroDescription} numberOfLines={3} ellipsizeMode="tail">{this.props.description || "Character have no description"}</Text>
                </View>

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