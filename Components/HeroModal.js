import React, { Component } from 'react';
import { View, Text, StyleSheet, Modal, TextInput, TouchableOpacity,Image } from 'react-native';


export default class HeroModal extends Component {
    state = {
        newRepoText: '',
    }

    render() {
        return (
            <Modal animationType="fade" transparent={true} visible={this.props.modalVisible} onRequestClose={() => { }}>
                <View style={styles.modalBackground}>
                    <View style={styles.boxContainer}>
                        <Text style={styles.heroTitle}>{this.props.heroName}</Text>
                        <Image
                            style={styles.heroImage}
                            source={{ uri: this.props.heroImage }}
                        />

                        <View style={styles.heroInfo}>
                            <Text style={styles.heroDescription} ellipsizeMode="tail">{this.props.heroDescricao || "Character have no description"}</Text>
                        </View>
                        <View style={styles.buttonContainer}>

                            <TouchableOpacity
                                style={[styles.button, styles.cancelButton]}
                                onPress={this.props.onCancel}>

                                <Text style={styles.buttonText}>Voltar</Text>

                            </TouchableOpacity>
                        
                            <TouchableOpacity
                                style={[styles.button, this.props.heroFav === false ? styles.favorite : styles.unfavorite]}
                                onPress={this.props.onAdd}>

                                <Text style={styles.buttonText}>{this.props.heroFav === false ? 'Favorito' : 'Desmarcar'}</Text>

                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'center',
        alignItems: 'center'
        
    },
    heroImage: {
        width: 80,
        height: 80,
        marginBottom: 10,
    },
    heroInfo: {
        marginHorizontal: 10,
        width: 220,
        textAlign: 'justify',
    },
    heroDescription: {
        fontSize: 15,
        color: '#999'
    },
    boxContainer: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        width: 280,
        maxHeight: 500
    },
    heroTitle: {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'black',
        paddingBottom: 10
    },

    buttonContainer: {
        marginTop: 10,
        height: 40,
        flexDirection: 'row'
    },
    button: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
    },
    cancelButton: {
        backgroundColor: '#E25F5F',
        marginRight: 5,
    },

    favorite: {
        backgroundColor: 'rgba(59, 197, 243, 1)',
        marginLeft: 5
    },
    unfavorite: {
        backgroundColor: 'rgba(176, 189, 193, 1)',
        marginLeft: 5
    },

    buttonText: {
        fontWeight: 'bold',
        color: '#FFF',
        fontSize: 12
    }
})