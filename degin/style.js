import React, { Component } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';

const Style = StyleSheet.create({
    view1: {
        paddingLeft: 50,
        height: 270,
      },
      view3: {
        flexDirection: 'row',
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent:'center',
      },
      view2: {
        borderColor:'black',
        borderWidth:5,
        margin: 5,
        height: 200,
      },
      BODER: {
        height: 160,
        width: 170,
        borderRadius:30,
        borderWidth: 1,
        backgroundColor:'#fffacd',
        borderColor: 'maroon',
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
      },
      stretch: {
        //marginLeft: 40,
        width:'100%',
        height: 230
      },
      backCover: {
        marginTop: 10,
      },
      anhnut:{
        height:120,
        width:120,
      },
      matcuoi: {
        height: 50,
        width: 50,
      },
      inputThem: {
        elevation:5,
        fontWeight: "bold",
        justifyContent:'center',
        marginLeft:10,
        borderBottomWidth:1,
        flex:3, 
        fontSize:20,
        backgroundColor:'#fdf5e6',
        borderTopRightRadius:15,
        borderBottomRightRadius:15,
        borderBottomLeftRadius:20,
        borderColor:'#FF6600',
        borderWidth:2,
      },
      anhinputThem: {},
      viewinputThem:{},
    }
)
export default Style;