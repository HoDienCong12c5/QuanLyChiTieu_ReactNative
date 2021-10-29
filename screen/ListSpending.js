import React, { Component, useState, useEffect} from 'react';
import {ToastAndroid, ImageBackground,View,FlatList, Text,Alert, TouchableOpacity, Image, StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Modal, Portal, Provider, TextInput, Button } from 'react-native-paper';
import { Value } from 'react-native-reanimated';
import database from '@react-native-firebase/database';
import { useRef } from 'react';

const ListSpending=({navigation, route})=>{
    const [visible, setVisible] = React.useState(false);
    const showModal = () =>{
        
        setVisible(true);
    } 
    const hideModal = () => setVisible(false);
    let a;
    const [data, setData]=useState([]);
    const [idxoa, setidxoa] = useState('')
    const reference = database().ref('/DSChiTieu');
    useEffect(() => {
        const getdata = async () =>{
            try{
                await database().ref('/DSChiTieu').on('value', snapshot =>{
                    let arr=[];
                    snapshot.forEach(bienn=>{
                        let temp={
                            id: bienn.key,
                            tenCT: bienn.val().tenCT,
                            tienCT: bienn.val().tienCT,
                            ngayCT: bienn.val().ngayCT,
                            theLoai: bienn.val().theLoai,
                        }  
                        arr.push(temp);
                    })
                    setData(arr)
                });
            }
            catch(error){
                Alert.alert("loi")
            }
        }
        getdata()
    }, [])
    const dele=(id)=>{
        
        try {
            ToastAndroid.show('Xóa thành công',ToastAndroid.SHORT)
            //Alert.alert('sfdasfsd: '+idxoa)
          const ref= database().ref('/DSChiTieu/'+id).remove();
         
        } catch (error) {
          
        }
    }
    function formatCash(str) {
        return str.split('').reverse().reduce((prev, next, index) => {
            return ((index % 3) ? next : (next + ',')) + prev
        })
   }
    
    const renderItem=(item)=>{
        return(
            <Provider>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} >
          <Text>hhh</Text>
          <Button style={{backgroundColor:'red', width:'40%'}} onPress={()=> alert('nhận')}>nhan du</Button>
        </Modal>
      </Portal>
      <View style={{fontWeight: "bold",backgroundColor:'#fffacd' ,width:'95%', paddingLeft:20, paddingTop:10, paddingRight:20, marginTop:10,  paddingBottom:10, borderRadius:20, borderWidth:2, borderColor:'#8b008b',}}>
                <TouchableOpacity /* onPress={()=> alert('đx nhấn: '+ item.id)} */
                                    //onLongPress={showModal}
                                    >
                <View style={{flexDirection:'row'}}>
                    
                    <View style={{marginLeft:0, width:'50%'}}>
                        <Text style={{fontWeight: "bold",color:'#2e8b57', fontSize:20}}>{item.tenCT}</Text>
                    </View>
                    <View style={{marginLeft:0, width:'50%', alignSelf:'flex-end'}}>
                        <Text style={{fontWeight: "bold",color:'#2f4f4f', alignSelf:'flex-end', fontSize:20, color:item.theLoai=='Chi tiêu' ? '#c71585': '#2e8b57'}}>{formatCash(''+item.tienCT)} <Text style={{color:'red'}}>đ</Text> </Text>
                    </View>
                </View>
                <View style={{flexDirection:'row'}}>
                    <View style={{marginLeft:0, width:'50%'}}>
                        <Text style={{width:200, fontWeight: "bold",color:'#c71585', fontSize:17}}>Thể loại: <Text style={{color:item.theLoai=='Chi tiêu' ? '#2e8b57': '#2e8b57'}}>{item.theLoai}</Text></Text>
                    </View>   
                    <View style={{marginLeft:0, width:'50%', alignSelf:'flex-end'}}>
                        <Text style={{fontWeight: "bold",color:'#2e8b57', alignSelf:'flex-end', fontSize:20}}>{item.ngayCT}</Text>
                    </View>  
                </View> 
                <View style={{flexDirection:'row',paddingTop:20, width:'100%', alignItems:'center', justifyContent:'center'}}>
                   
                    <TouchableOpacity 
                        style={{padding:4,elevation:5, borderWidth:2, borderColor:'#40e0d0', backgroundColor:'#f0ffff', borderRadius:10, flexDirection:'row', justifyContent:'center', alignItems:'center'}}
                        onPress={() =>  Alert.alert(
                            'Xóa Chi Tiêu',
                            'Bạn chắc chắn muốn xóa không?', [{
                                text: 'Hủy xóa',
                                onPress: () => console.log('Cancel Pressed'),
                                style: 'cancel'
                            }, {
                                text: 'Chấp nhận',
                                onPress: () => dele(item.id)
                            }, ], {
                                cancelable: false
                            }
                         )}>
                        <Image source={require('../Anh/xoa.png')} style={{height:30, width:30}}></Image>
                        <Text> Xóa</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                         style={{padding:4,elevation:5, borderWidth:2, borderColor:'#40e0d0',marginLeft:10, backgroundColor:'#f0ffff', borderRadius:10, flexDirection:'row', justifyContent:'center', alignItems:'center'}} 
                         onPress={()=>{navigation.navigate('Cập nhật', { item })}}
                         >
                            <Image source={require('../Anh/chinhsua.png')} style={{height:30, width:30}}></Image>
                        <Text> Chỉnh sữa</Text>
                    </TouchableOpacity>
                </View>     
                </TouchableOpacity>    
            </View>
    </Provider>
          
        )
   }
    return(
        <View style={{flex:1}}>
        <ImageBackground style={{height:'100%', width:'100%'}} source={require('../BackGround/BackGroundList.png')}>
             <View style={{alignItems:'center',padding:10, height:'10%',}}>
                 <Text style={{fontSize:30, color:'#800000',fontWeight: "bold"}}>DANH SÁCH CHI TIÊU </Text>
             </View>
             <View style={{flex:6, alignItems:'center', marginLeft:'5%'}}>
                 <FlatList 
                 style={{ width:'100%', paddingTop:10}}
                     data={data}
                     renderItem={({item})=> renderItem(item)}
                     keyExtractor={item=>item.id}
                 >
                 </FlatList>
             </View>
        </ImageBackground>
     </View>
    )
}
export default ListSpending;