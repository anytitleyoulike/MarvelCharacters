import React, { Component } from 'react';
import { View, Text, StyleSheet, Modal, TextInput, TouchableOpacity,Image } from 'react-native';


export default class HeroModal extends Component {
    state = {
        newRepoText: '',
    }
    
    render() {
        return (
            <Modal animationType="fade" transparent={true} visible={this.props.modalVisible} onRequestClose={() => { }}>
                <View style={styles.modalContainer}>
                    <View style={styles.boxContainer}>
                        <Text style={styles.boxTitle}>{this.props.heroName}</Text>
                        <Image
                            style={styles.heroImage}
                            source={{ uri: this.props.image }}
                        />

                        <View style={styles.heroInfo}>
                            <Text style={styles.author} ellipsizeMode="tail">{this.props.heroDescricao || "Character have no descripiton"}</Text>
                        </View>
                        <View style={styles.buttonContainer}>

                            <TouchableOpacity
                                style={[styles.button, styles.cancelButton]}
                                onPress={this.props.onCancel}>

                                <Text style={styles.buttonText}>Cancelar</Text>

                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.button, styles.submitButton]}
                                onPress={this.props.onAdd(this.state.newRepoText)}>

                                <Text style={styles.buttonText}>Adicionar</Text>

                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    heroImage: {
    },
    boxContainer: {
        padding: 20,
        backgroundColor: 'rgba(194, 194, 79, 1)',
        borderRadius: 10,
        alignItems: 'center',
        width: 280,
    },
    boxTitle: {
        fontWeight: 'bold',
        fontSize: 20
    },
    boxInput: {
        alignSelf: 'stretch',
        marginTop: 10,
        paddingVertical: 0,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: '#DDD',
        height: 40,
        borderRadius: 3
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
        backgroundColor: '#70bd85',
        marginLeft: 5
    },

    buttonText: {
        fontWeight: 'bold',
        color: '#FFF',
        fontSize: 12
    }
})