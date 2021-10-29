import React, { Component, useState} from 'react';
import {Alert,ImageBackground,View, Text, BackHandler, TouchableOpacity, Image, StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button , TextInput} from 'react-native-paper';
const CreateLogin=({navigation})=>{
    return(
        <View style={{flex:1}}>
            <ImageBackground source={require('../BackGround/backgroundLogin.png')} style={{height:'100%', width:'100%'}}>
                <View style={{flex:1}}>
                    <TextInput style={{}}/>
                    <TextInput style={{}}/>
                    <TextInput style={{}}/>
                    <TextInput style={{}}/>
                </View>
                <View style={{flexDirection:'row'}}>
                    <Button>đăng ký</Button>
                    <Button>Hủy đăng ký</Button>
                </View>
            </ImageBackground>
        </View>
    )
}
export default CreateLogin;