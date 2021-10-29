import React, { Component, useState} from 'react';
import { ToastAndroid, ScrollView, Alert,ImageBackground,View, Text, BackHandler, TouchableOpacity, Image, StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Button , TextInput} from 'react-native-paper';
import  database from '@react-native-firebase/database'
import { Icon } from 'react-native-paper/lib/typescript/components/Avatar/Avatar';


const Login=({navigation, route})=>{
    const [users, setUsers] = useState([]);
    const [pass, setPass] = useState("");
    const [bien, setbien] = useState(0)
    const [name, setName] = useState("");
    const [n, setN] = useState(0);
    const kt=()=>{
        if(name=='123' && pass=='123'){
            navigation.replace('Quản lý chi tiêu',{name, pass, bien })
            ToastAndroid.showWithGravity(
                "Đăng nhập thành công",
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM
              );
        }
        else{
           // navigation.replace('Homes',{name, pass })
            Alert.alert('Sai tài khoản hoặc mật khẩu')
        }
    }
    return(
       
            <View>
            <ImageBackground 
            source={require('../BackGround/bacgroundDN.png')} style={{height:'100%', width:'100%'}}>
               <View style={{justifyContent:'center', alignItems:'center', height:'40%'}}>
               </View>
               <View style={{justifyContent:'center', alignItems:'center', borderRadius:20}}>
                    <View style={{width:'100%', alignItems:'center'}}>
                        <Text style={{color:'#336600', fontSize:30, fontWeight: "bold"}} >Đăng Nhập</Text>
                       <TextInput 
                            left={
                                <TextInput.Icon
                                    name={() => <Image source={require('../Anh/username.png') } style={{height:30, width:30}}></Image>}
                                />
                            }
                            style={{marginTop:10, overflow:'hidden', height:60, width:'80%', borderTopRightRadius:20, borderBottomRightRadius:20, borderBottomLeftRadius:20, backgroundColor:'#FF9966', borderColor:'red', borderWidth:2}}
                            label='Nhập tên đăng nhập...'
                         
                            
                            onChangeText={(value)=>{setName(value)}}
                        />
                    </View>

                    <View style={{width:'100%', alignItems:'center'}}>
                    
                        <TextInput 
                            style={{marginTop:10, overflow:'hidden', height:60, width:'80%', borderTopRightRadius:20, borderBottomRightRadius:20, borderBottomLeftRadius:20, backgroundColor:'#FF9966', borderColor:'red', borderWidth:2}}
                            left={
                                <TextInput.Icon
                                    name={() => <Image source={require('../Anh/pass.png') } style={{height:30, width:30}}></Image>}
                                />
                            }
                            label='Nhập mật khẩu...'
                            secureTextEntry={true}
                            underlineColorAndroid='transparent' 
                            onChangeText={(value)=>{setPass(value)}}
                        />
                    </View>
                    
               </View>
               <View style={{flexDirection:'row', justifyContent:'center', marginTop:35, height:'35%'}}>
                    <TouchableOpacity 
                        style={{flexDirection:'row', padding:10, height:60, alignItems:'center',borderColor:'red', borderWidth:2, justifyContent:'center', backgroundColor:'#990000', elevation:5, borderRadius:10}}
                        onPress={kt}>
                        <Image source={require('../Anh/login2.png')} style={{height:40, width:45, }}></Image>
                        <Text style={{fontWeight: "bold", marginLeft:10, color:'#EEEEEE'}}>Đăng nhập</Text>
                    </TouchableOpacity>
                    {/* <Button 
                         style={{height:40,backgroundColor:'yellow', marginLeft:10, borderColor:'red', borderWidth:2, elevation:5, borderRadius:10}}
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
                    >Hủy</Button>   */}                 
               </View>
               {/* <View  style={{alignItems:'center', paddingTop:10}}>
                    <Button  style={{width:190,backgroundColor:'yellow'}}>Tạo tài khoản</Button>
               </View> */}
            </ImageBackground>
            
            </View>
        
    )
}
export default Login;