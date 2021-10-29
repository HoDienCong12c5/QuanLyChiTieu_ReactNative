import React, { Component, useState} from 'react';
import {ImageBackground,View, TextInput, Button, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Style from '../degin/style.js';

const ListInsert=({navigation})=>{
    return(
        <View style={{flex:1}}>
            <ImageBackground style={{height:'100%', width:'100%'}} source={require('../BackGround/BackGroundList.png')}>
              
            </ImageBackground>
        </View>
    )
}
export default ListInsert;