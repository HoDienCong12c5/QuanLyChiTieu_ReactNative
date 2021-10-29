import React, { Component, useState} from 'react';
import {ToastAndroid, ImageBackground,View,Alert, TextInput, Button, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Style from '../degin/style.js';
import ListInsert from '../screen/ListInsert'
import database from '@react-native-firebase/database';
import { RadioButton } from 'react-native-paper';


const Insert =({navigation, route})=>{
    //const {item}=route.params;
    //radios
    const [checked, setChecked] = React.useState('first');
    var a=0;
    const [tienCT, setTienCT] = useState(a);
    const [tenCT, setTenCT] = useState('');
    const [ngay, setNgay] = useState('');
    const [thang, setThang] = useState(0);
    const [nam, setNam] = useState(2000);
    const [theLoai, settheLoai] = useState('Chi tiêu')
    var today=new Date();
    if(today?.getDate()<10){
        if(today?.getMonth()<9){
            var temp='0'+today?.getDate()+'/0'+(today?.getMonth()+1)+'/'+today?.getFullYear();
        }
        else{
            var temp='0'+today?.getDate()+'/'+(today?.getMonth()+1)+'/'+today?.getFullYear();
        }
    }
    else{
        if(today?.getMonth()<9){
            var temp=today?.getDate()+'/0'+(today?.getMonth()+1)+'/'+today?.getFullYear();
        }
        else{
            var temp=today?.getDate()+'/'+(today?.getMonth()+1)+'/'+today?.getFullYear();
        }
    }
    const [ngayCT, setNgayCT] = useState(temp);
    //datetimepicker
    const [show, setshow] = useState(false);
    const [date, setDate]= useState(new Date());
    ////
  const showDatePicker = (date) => {
    setshow(true);
  };

  const hideDatePicker = () => {
    setshow(false);
  };
 
  const handleConfirm = (date) => {
    if(date?.getDate()<10 ){
        if(date?.getMonth()<9){
            setNgayCT('0'+date?.getDate()+'/0'+(date?.getMonth()+1)+'/'+date?.getFullYear());
        }
        else{
            setNgayCT('0'+date?.getDate()+'/'+(date?.getMonth()+1)+'/'+date?.getFullYear());
        }
    }
    else{
        if(date?.getMonth()<9){
            setNgayCT(date?.getDate()+'/0'+(date?.getMonth()+1)+'/'+date?.getFullYear());
        }else{
            setNgayCT(date?.getDate()+'/'+(date?.getMonth()+1)+'/'+date?.getFullYear());
        }
    }
    hideDatePicker();
  };
    const kk=()=>{
        var temp2=''+tienCT;
        var temp1=''+Number.parseInt(tienCT)
        var count=temp1.length;
        var count2=temp2.length;
            if(Number.parseInt(tienCT)){        
               if( count<count2){
                    Alert.alert('Tiền phải là số');
                    return false;
                }
            }
            else{
                if(tienCT=='')
                {
                    Alert.alert('Bạn chưa nhập tiền');
                    return false;
                }
                else{
                    Alert.alert('Tiền phải là số');
                    return false;
                }
                
            }
            
    }
    const isert=()=>{
    
        if( tenCT==''&& tienCT==''&& tenCT==''){
            ToastAndroid.show('Bạn chưa nhập thông tin',ToastAndroid.SHORT)
        }
        else{
            if(tenCT==''){
                ToastAndroid.show('Bạn chưa nhập tên chi tiêu',ToastAndroid.SHORT)
                return;
            }
            if(tienCT==''){
                ToastAndroid.show('Bạn chưa nhập tiền chi tiêu',ToastAndroid.SHORT)
                return;
            }
            if(kk()==false){
                return;
            }
            
             try {
                const ref= database().ref('/DSChiTieu/').push({
                    ngayCT: ngayCT,
                    tenCT: tenCT,
                    tienCT: tienCT,
                    theLoai: theLoai,  
                });
                ToastAndroid.showWithGravity(
                  "Thêm dữ liệu thành công",
                  ToastAndroid.SHORT,
                  ToastAndroid.BOTTOM
                );
              } catch (error) {
                  Alert.alert('loi')
              } 
              return;
        }
        
      
    }
    return(
        
        <View style={{flex:1}}>
            <ImageBackground source={require('../BackGround/BackGroundInsert.png')} style={{flex:1}}>
                <View style={{flex:1}}>
                    <Image style={{height:'180%', width:'100%'}} source={require('../BackGround/dauinsert.png')} />
                </View>
                <View style={{flex:4, padding:20, paddingTop:100}}>
                    <View style={{padding:3}}>
                        <TouchableOpacity style={{flexDirection:'row'}}
                            onPress={() => {}}>
                            <Image style={{height:60, width:60}} source={require('../AnhInsert/name.png')} />
                            <TextInput
                               style={Style.inputThem}
                               value={tenCT}
                                placeholder='Mời bạn nhập tên chi tiêu...'
                                onChangeText={(text)=>setTenCT(text)}
                                
                            ></TextInput>
                        </TouchableOpacity>
                    </View>
                    <View style={{padding:3}}>
                        <TouchableOpacity style={{flexDirection:'row'}}>
                            <Image style={{height:60, width:60}} source={require('../AnhInsert/tien.png')} />
                            <TextInput
                               style={Style.inputThem}
                                placeholder='Mời bạn nhập số tiền...'
                                value={tienCT}
                                onChangeText={(text)=>setTienCT(text)}
                                
                            ></TextInput>
                        </TouchableOpacity>
                    </View>
                   <View style={{padding:3, }}>
                       <View style={{flexDirection:'row',}}>
                       <Image style={{height:60, width:60, marginRight:10 }} source={require('../AnhInsert/note.png')} />
                           <View style={{
                                        borderColor:'#FF6600',
                                        borderWidth:2,
                                        flex:4, 
                                        flexDirection:'row', 
                                        backgroundColor:'#fdf5e6', 
                                        paddingLeft:10,
                                        borderTopRightRadius:15,
                                        borderBottomRightRadius:15,
                                        borderBottomLeftRadius:20,
                                        }}>
                               <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center',paddingLeft:0, marginLeft:0}}>
                                   <Text style={{fontSize:20,}}>Chi tiêu </Text>
                                   <RadioButton
                                        value="first"
                                        status={ checked === 'first' ? 'checked' : 'unchecked' }
                                        onPress={() => {settheLoai('Chi tiêu'), setChecked('first')}}
                                    />
                               </View>
                               <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                                   <Text style={{fontSize:20,}}>Thu nhập </Text>
                                   <RadioButton
                                        value="second"
                                        status={ checked === 'second' ? 'checked' : 'unchecked' }
                                        onPress={() => {settheLoai('Thu nhập'), setChecked('second')}}
                                    />
                               </View>
                           </View>
                       </View>
                        
                           
                       
                    </View> 
                    <View style={{padding:3}}>
                        <TouchableOpacity style={{flexDirection:'row'}}
                                onPress={showDatePicker}>              
                            <Image style={{height:60, width:60}} source={require('../AnhInsert/datetime.png')} />
                            <DateTimePickerModal
                                isVisible={show}
                                mode={date}
                                onConfirm={handleConfirm}
                                onCancel={hideDatePicker}
                            />
                            <TextInput
                               style={Style.inputThem}   
                               editable={false}
                            >{ngayCT}</TextInput>
                        </TouchableOpacity>
                    </View>   
                    <View style={{paddingTop:30,justifyContent:'center', flexDirection:'row'}}>
                        <TouchableOpacity
                            style={styles.nutthem}
                            onPress={isert}
                           >
                                
                             <Image style={{height:40, width:40}} source={require('../AnhInsert/ok.png')} />
                            <Text style={{fontWeight: "bold",width:80, justifyContent:'center', alignItems:'center'}}>
                                Thêm chi tiêu
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.nutthoat}
                        onPress={()=> {
                            setTenCT('');
                            setTienCT('');
                            setNgayCT(temp);
                            navigation.goBack();
                            }}>
                            <Text style={{width:50, fontWeight: "bold"}}>Thoát</Text>
                            <Image style={{height:40, width:40, marginTop:0}} source={require('../AnhInsert/back.png')} />
                        </TouchableOpacity>
                    </View>                
                </View>
                
            </ImageBackground>
        </View>
        
    );
};
const styles = StyleSheet.create({
    nutthem:{
        flexDirection: 'row',
        height:65,
        width:130,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#FFCC99',
        borderRadius:10,
        borderColor:'#FF6600',
        borderWidth:3,
    },
    nutthoat:{
        flexDirection: 'row',
        height:65,
        width:130,
        marginLeft:50,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#FFCC99',
        borderRadius:10,
        borderColor:'#FF6600',
        borderWidth:3,
    },
})
export default Insert;