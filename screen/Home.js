import React, { Component } from 'react';
import { StyleSheet, Text, View, Image,Alert,BackHandler, ScrollView,
   TouchableOpacity, ImageBackground } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Modal, Portal, Provider } from 'react-native-paper';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Style from '../degin/style.js';


const Stack = createStackNavigator();
const Home  =({navigation})=>{
    return (
      
          <ImageBackground style={{height:'100%', width:'100%'}} source={require('../BackGround/backgroundhome.png')}>
      <View
        style={Style.stretch}
          >
             <Image style={{height:'100%', width:'100%'}} source={require('../BackGround/dauinsert.png')} />
          </View>
      <View style={{
        height:40,
        justifyContent: 'center',
        alignItems: 'center'
      }}>

      </View>
      <View style={Style.view3}>

        <TouchableOpacity style={Style.BODER}
        onPress={()=> navigation.navigate('Thêm mới')}>
          <Image
        style={Style.anhnut}
        source={require('../Anh/nhanluong.png')} />
          <Text style={{fontWeight: "bold"}}>THÊM MỚI</Text>
        </TouchableOpacity>
        <TouchableOpacity style={Style.BODER}
        onPress={()=> navigation.navigate('Danh sách')}>
          <Image style={Style.anhnut}
            source={require('../Anh/dihoc.png')}/>
          <Text style={{fontWeight: "bold"}}>DANH SÁCH</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={Style.BODER}
          onPress={()=> navigation.navigate('Thống kê')}>
          <Image style={Style.anhnut}
        source={require('../Anh/dicho.png')}/>
          <Text style={{fontWeight: "bold"}}>THỐNG KÊ</Text>
          
        </TouchableOpacity>
       
        <TouchableOpacity

          onPress={() =>  Alert.alert(
            'Thoát ứng dụng',
            'Bạn chắc chắn muốn thoát?', [{
                text: 'Ở lại',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel'
            }, {
                text: 'Thoát',
                onPress: () => BackHandler.exitApp()
            }, ], {
                cancelable: false
            }
         )}
          style={Style.BODER}>
          <Image style={Style.anhnut}
        source={require('../Anh/Thoat.png')}/>
          <Text style={{fontWeight: "bold"}} >Thoát Hệ THỐNG</Text>
        </TouchableOpacity>

      </View>
      </ImageBackground>
    

    )  
}

export default Home;