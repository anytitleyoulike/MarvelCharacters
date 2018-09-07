import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';

export default class Header extends Component {
    render() {
        return (
            <View style={styles.header}>
                <Text style={styles.headerText}>{this.props.headerText}</Text>
                <TouchableOpacity onPress={() => this.setState({modalVisible: true})}>
                    <Text style={styles.headerButton}>+</Text>
                    
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        height: 60,
        padding: 20,
        backgroundColor: '#ed1d24',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white'
    },
    headerButton: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white'
    }
})