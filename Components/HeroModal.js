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
                            <Text style={styles.heroDescription} ellipsizeMode="tail">{this.props.heroDescricao || "Character have no descripiton"}</Text>
                        </View>
                        <View style={styles.buttonContainer}>

                            <TouchableOpacity
                                style={[styles.button, styles.cancelButton]}
                                onPress={this.props.onCancel}>

                                <Text style={styles.buttonText}>Voltar</Text>

                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.button, styles.submitButton]}
                                onPress={this.props.onAdd(this.state.newRepoText)}>

                                <Text style={styles.buttonText}>Favorite</Text>

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
        height: 70,
        width: 220,
        textAlign: 'justify',
    },
    heroDescription: {
        fontSize: 15,
        color: '#999'
    },
    boxContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        width: 280,
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

    submitButton: {
        backgroundColor: 'rgba(59, 197, 243, 1)',
        marginLeft: 5
    },

    buttonText: {
        fontWeight: 'bold',
        color: '#FFF',
        fontSize: 12
    }
})