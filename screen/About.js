import React, { Component, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Button} from 'react-native-paper';

const About = ({navigation, route})=>{
    const [k, setK]= useState(route.params.name);
    const {pass}= route.params.pass;
    return(
        <View style={{flex:1}}>
            <View style={{flex:1}}></View>
            <View style={{flex:4}}>
                <Text>{k}</Text>
                <Text></Text>
            </View>
        </View>
    );
}
export default About;