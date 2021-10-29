import React, {Component, useState, useEffect} from 'react';
import {ToastAndroid,Alert,FlatList,View, StyleSheet, Text, Image,TouchableOpacity, ToolbarAndroidComponent, ImageBackground} from 'react-native';
import database from '@react-native-firebase/database';
import { TextInput, Button } from 'react-native-paper';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { RadioButton } from 'react-native-paper';


const UpdateCT=({navigation, route})=>{

    
    const {item } = route.params;
    let temp;
    if(item.theLoai=='Chi tiêu'){
        temp='first';
    }
    else{
        temp='second';
    }
    const [checked, setChecked] = React.useState(''+temp);
    const [tenCT, setTenCT] = useState(item.tenCT);
    const [tienCT, setTienCT]=useState(item.tienCT);
    const [ngayCT, setNgayCT]= useState(item.ngayCT);
    const [theLoai, settheLoai] = useState('Chi tiêu')
    const [data, setData]=useState([]);
    //datetimepicker
    const [show, setshow] = useState(false);
    const [date, setDate]= useState(new Date());

    const [biendate, setBienDate]=useState(''+ngayCT);
    const [ngay, setNgay] = useState();
    const [thang, setThang] = useState();
    const [nam, setNam] = useState();
    const showDatePicker = (date) => {
        setshow(true);
      };
    
      const hideDatePicker = () => {
        setshow(false);
      };
     
      const handleConfirm = (date) => {
        if(date?.getDate()<10 ){
            if(date?.getMonth()<10){
                setNgayCT('0'+date?.getDate()+'/0'+(date?.getMonth()+1)+'/'+date?.getFullYear());
            }
            else{
                setNgayCT('0'+date?.getDate()+'/'+(date?.getMonth()+1)+'/'+date?.getFullYear());
            }
        }
        else{
            if(date?.getMonth()<10){
                setNgayCT(date?.getDate()+'/0'+(date?.getMonth()+1)+'/'+date?.getFullYear());
            }else{
                setNgayCT(date?.getDate()+'/'+(date?.getMonth()+1)+'/'+date?.getFullYear());
            }
        }
        hideDatePicker();
      };
      //Cập nhật dữ liệu
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
  const update=()=>{
      try {
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
            if(checked=='first'){
                settheLoai('Chi tiêu')
            } 
            else{
                settheLoai('Thu nhập')
            }
            const ref= database().ref('/DSChiTieu/'+item.id);
                ref.update(
                    {
                    
                    ngayCT: ngayCT,
                    tenCT: tenCT,
                    tienCT: tienCT,
                    theLoai: theLoai,
                    }
                
                )
                ToastAndroid.showWithGravity(
                    "Cập nhật thành công",
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM
                  );
          }
         
        
        /* const ref= database().ref('/DSChiTieu/'+item.id);
        ref.update(
                {
                   
                   ngayCT: ngayCT,
                   tenCT: tenCT,
                   tienCT: tienCT,
                   theLoai: theLoai,
                }
            
        )
        ToastAndroid.showWithGravity(
            "Cập nhật thành công",
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM
          ); */
      } catch (error) {
          Alert.alert('Lỗi cập nhật dữ liệu!')
      }
  }

    return(
        <View style={{flex:1, }}>
            <ImageBackground style={{height:'100%', width:'100%'}} source={require('../BackGround/BackGroundList.png')}>
            <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                <Text style={{fontSize:30, color:'#FF00CC',fontWeight: "bold"}}>Chỉnh sữa chi tiêu</Text>
            </View>
            <View style={{flex:4,padding:30}}>
                <View style={{flexDirection:'row'}}>
                <Image style={{height:60, width:60,flex:1,  }} source={require('../AnhInsert/name.png')} />
                    <TextInput 
                        placeholder='Mời bạn nhập tên...'
                        style={styles.inputThem}
                        value={tenCT}
                        onChangeText={(text)=>setTenCT(text)}/>
                </View>
                <View style={{flexDirection:'row',marginTop:10}}>
                    <Image style={{height:60, width:60,flex:1 }} source={require('../AnhInsert/tien.png')} />
                    <TextInput 
                        placeholder='Mời bạn nhập số tiền...'
                        style={styles.inputThem}
                        value={tienCT}
                        //value = {state.MyNumber}
                        onChangeText={(number)=>setTienCT(number)}/>
                </View>
                <View style={{paddingTop:10,  flexDirection:'row'}}>
                    <View style={{padding:3}}>
                        <Image style={{height:60, width:60, marginRight:9 }} source={require('../AnhInsert/note.png')} />
                    </View>
                    <View style={{
                                borderColor:'#770000',
                                borderWidth:2,
                                paddingLeft:10,
                                flex:4, 
                                justifyContent:'center',
                                flexDirection:'row', 
                                backgroundColor:'#FFFFFF', 
                                borderTopRightRadius:15,
                                borderBottomRightRadius:15,
                                borderBottomLeftRadius:20, }}>
                        <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center',paddingLeft:0, marginLeft:0}}>
                            <Text style={{fontSize:18,}}>Chi tiêu </Text>
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
                <View style={{marginTop:10, alignItems:'center'}}>
                    <TouchableOpacity style={{flexDirection:'row'}}
                    onPress={showDatePicker}>
                        <Image style={{height:60, width:60, flex:1}} source={require('../AnhInsert/datetime.png')} />
                        <DateTimePickerModal
                                isVisible={show}
                                mode={date}
                                onConfirm={handleConfirm}
                                onCancel={hideDatePicker}
                            />
                        <TextInput
                            style={styles.inputThem} 
                            editable={false}>{ngayCT}</TextInput>
                    </TouchableOpacity>
                </View> 
                <View style={{flexDirection:'row', alignItems:'center', paddingTop:20, justifyContent:'center'}}>
                    <TouchableOpacity style={styles.nutthem}
                        onPress={update}>
                        <Image source={require('../Anh/iconupdate.png')} style={{height:50, width:50}} ></Image>
                        <Text style={{width:80,fontWeight: "bold"}}>Cập nhật chỉnh sữa</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.nutthoat}
                        onPress={()=> navigation.goBack()}
                        //onPress={()=> alert('ngày lấy: '+biendate)}
                    >
                        <Image source={require('../Anh/exit.png')} style={{height:50, width:50}} ></Image>
                        <Text style={{fontWeight: "bold",width:80, justifyContent:'center'}} >Hủy chỉnh sữa</Text>
                    </TouchableOpacity>
                </View> 
                    
            </View>
            </ImageBackground>
        </View>
    );
}
const styles = StyleSheet.create({
    inputThem: {
        elevation:5,
        fontWeight: "bold",
        justifyContent:'center',
        marginLeft:10,
        paddingLeft:10,
        borderBottomWidth:1, 
        flex:4, 
        //fontSize:20, 
        backgroundColor:'#FFFFFF',
        borderTopRightRadius:15,
        borderBottomRightRadius:15,
        borderBottomLeftRadius:25,
        borderColor:'#770000',
        borderWidth:2,
    },
    nutthem:{
        fontWeight: "bold",
        flexDirection: 'row',
        padding:10,
        height:65,
        width:130,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#FFFF99',
        borderRadius:10,
        borderColor:'#33FF00',
        borderWidth:2,
        elevation:5
    },
    nutthoat:{
        flexDirection: 'row',
        height:65,
        width:140,
        marginLeft:50,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#CCFFFF',
        borderRadius:10,
        padding:10,
        borderColor:'#FFCC00',
        borderWidth:2,
        elevation:5
    },
})
export default UpdateCT;