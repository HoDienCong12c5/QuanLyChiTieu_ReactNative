import React, {Component, useState, useEffect}  from 'react';
import {Modal ,ImageBackground, ScrollView,View,FlatList, Text,Alert, TouchableOpacity, Image, StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Value } from 'react-native-reanimated';
import database from '@react-native-firebase/database';
import { TextInput, Button, Menu, Divider, Provider } from 'react-native-paper';
import Pie from 'react-native-pie'


var today=new Date(); var year=today?.getFullYear();  
var arr=[];
const arrNam = [];

for(var i=(parseInt(year)-5);i<=(parseInt(year)+5);i++){
    let temp={id:i,name:''+i}
    arr.push(temp)
    //arrNam.push(temp)
    arrNam.push(i)
}

const Statistical=({navigation, route})=>{
    const [Nam, setNam] = useState(arrNam);
    const [tenCT, settenCT] = useState('');
    const [tienCT, settienCT] = useState(0);
    const [ngayCT, setngayCT] = useState();
    const [theLoai, settheLoai] = useState('')
    const [date, setdate] = useState(new Date());
    const [data, setData]=useState([]);
    const [theoNgay, settheoNgay] = useState([]);
    const [theoThang, settheoThang] = useState([]);
    const [theoNam, settheoNam] = useState([]);
    const [theoChi, settheoChi] = useState([]);
    const [theoThuNhap, settheoThuNhap] = useState([]);
    const reference = database().ref('/DSChiTieu');
    var tt=0;
    const [cat, setcat] = useState(0)
    //modal
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);
    //
    var tongChi=0; let ngay=0; let thang=0; let nam=0; var tongThu=0;
    const [phanTramThu, setphanTramThu] = useState(50);
    const [phanTramChi, setphanTramChi] = useState(50) 
    //thử nghiệm
    const [mangthu, setmangthu] = useState([])
    const [mangchi, setmangchi] = useState([])
    ///
    const [ttChinh, setttChinh] = useState(tt)
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
                            
                            
                                if(temp.theLoai=='Chi tiêu'){
                                    //tongChi=tongChi+parseInt(temp.tienCT);
                                    mangchi.push(''+parseInt(temp.tienCT))
                                    arr.push(temp);
                                }
                                else{
                                    if(temp.theLoai=='Thu nhập'){
                                        //tongThu=tongThu+parseInt(temp.tienCT);
                                        mangthu.push(''+parseInt(temp.tienCT))
                                        arr.push(temp);
                                    }   
                                }
                            
                            
                            //arr.push(temp);
                        })
                        //mang2(tongChi);
                        //console.log('thu 2 '+tongThu);
                        ganCacBien();
                        setData(arr)
                        
                    });
                }
                catch(error){
                    Alert.alert("loi")
                }
            }
            ganCacBien();
            getdata()
        }, [])

    const [bienTheoChi, setbienTheoChi] = useState(tongChi);
    const [bienTheoThu, setbienTheoThu] = useState(tongThu);
    const [bienTheoThang, setbienThang] = useState(0);
    const [bienTheoNam, setbienTheoNam] = useState(0);
    var x;
    var tempthang ;  var tempnam;
    const chonNgayThangNam=()=>{
        if(tt==0){ tongChi=0 ; tongThu=0;}
        if(tt==1){ tongChi=0 ; tongThu=0}
        if(tt==2){ ngay=parseInt(today?.getDate()); thang=parseInt(today?.getMonth()+1); nam=parseInt(today?.getFullYear()); console.log(ngay+'/'+thang+'/'+nam) }
        console.log('trạng thái: '+tt)
        for(var i=0;i<data.length;i++){
            var catnam=parseInt(data[i].ngayCT.substr(6,9));
            var catthang=parseInt(data[i].ngayCT.substr(3,5));
            var cattngay=parseInt(data[i].ngayCT.substr(0,4));
            if(tt==0){
                if(thang==catthang){
                    //console.log('tìm thấy tháng '+i+':'+t);
                    if(data[i].theLoai=='Chi tiêu'){
                        tongChi=tongChi+parseFloat(data[i].tienCT);
                    }
                    else{
                        tongThu=tongThu+parseFloat(data[i].tienCT);
                    }
                }
            }
            if(tt==1){
                if(nam==catnam){
                    if(data[i].theLoai=='Chi tiêu'){
                        tongChi=tongChi+parseFloat(data[i].tienCT);
                    }
                    else{
                        tongThu=tongThu+parseFloat(data[i].tienCT);
                    }
                }
            }
            if(tt==2){
                if(ngay==cattngay && thang==catthang && nam==catnam){
                    if(data[i].theLoai=='Chi tiêu'){
                        tongChi=tongChi+parseFloat(data[i].tienCT);
                    }
                    else{
                        tongThu=tongThu+parseFloat(data[i].tienCT);
                    }
                }
            }
        }
        if(tongChi==0 && tongThu==0){console.log('chi: '+tongChi+'| thu: '+tongThu) ; Alert.alert('Không có hoạt động nào')}
        else{
            var ptchi=parseFloat(tongChi)/(parseFloat(tongChi)+parseFloat(tongThu));
            var ptthu=parseFloat(tongThu)/(parseFloat(tongChi)+parseFloat(tongThu));
            setbienTheoChi(ptchi);
            setbienTheoThu(ptthu);
            console.log('chi: '+tongChi+'| thu: '+tongThu)
            console.log('%chi: '+ptchi*100+' %thu: '+ptthu*100)
            setphanTramThu(parseFloat(ptthu*100));
            setphanTramChi(parseFloat(ptchi*100));
        } 
       
    }
    //chuyển và dạng tiền
    function formatCash(str) {
        return str.split('').reverse().reduce((prev, next, index) => {
            return ((index % 3) ? next : (next + ',')) + prev
        })
   }
    ////
    //console.log('xong dọc: '+mangthu+": ")
    const ganCacBien=()=>{
         var bien=0; var bien2=0;
        for(var i=0;i<mangthu.length;i++)
        {
           tongThu=tongThu+parseInt(mangthu[i]);
           //console.log('cộng mảng thử: '+bien)
        } 
        for(var i=0;i<mangchi.length;i++)
        {
           tongChi=tongChi+parseInt(mangchi[i]);
           //console.log('cộng mảng thử: '+bien2)
        }
        if(tongChi==0 && tongThu==0){
            //Alert.alert('Chưa có hoạt động nào')
        }
        else{
            var ptchi=parseFloat(tongChi)/(parseFloat(tongChi)+parseFloat(tongThu));
            var ptthu=parseFloat(tongThu)/(parseFloat(tongChi)+parseFloat(tongThu));
            console.log('% chi: '+ ptchi+' |%thu: '+ptthu)
            setphanTramThu(ptthu*100);
            setphanTramChi(ptchi*100);
        }
    }
    const mang =( )=>{
        for(var i=0;i<theoChi.length;i++)
        {
             x=parseInt(theoChi[i].tienCT);
            tongChi=tongChi+x;
        }
    }
    const mang2 =(tongChi )=>{
        console.log('mảng 2 dùng biển tongchi lần 1: '+tongChi);
        /* for(var i=0;i<theoChi.length;i++)
        {
             x=parseInt(theoChi[i].tienCT);
            tongChi=tongChi+x;
        }
        console.log('mảng 2 dùng biển tongchi lần 2: '+tongChi); */
        setbienTG(tongChi)
    }
    const [arrnam, setArrNam]=useState([]);
    const renderItemNam=(item)=>{
        return(
            <View style={{fontWeight: "bold",backgroundColor:'#fffacd',alignItems:'center' ,width:'100%', padding:10, marginTop:10, borderRadius:20}}>
                <TouchableOpacity
                onPress={()=>{ chonNgayThangNam(tt=1,nam=parseInt(item),setttChinh(1), setModalVisible2(!modalVisible2)), console.log(tt)}}>
                    <Text style={{fontWeight: "bold",color:'#2e8b57', fontSize:20}}>Năm: {item}</Text>
                </TouchableOpacity>
            </View>

        )
    }
    const renderItem=(item)=>{
        return(
      <View style={{fontWeight: "bold",backgroundColor:'#fffacd' ,width:'95%', paddingLeft:20, paddingTop:10, paddingRight:20, marginTop:10,  paddingBottom:10, borderRadius:20, borderWidth:2, borderColor:'#8b008b',}}>
                <TouchableOpacity /* onPress={()=> alert('đx nhấn: '+ item.id)} */
                                    //onLongPress={showModal}
                                    >
                <View style={{flexDirection:'row'}}>
                    
                    <View style={{marginLeft:0, width:'50%'}}>
                        <Text style={{fontWeight: "bold",color:'#2e8b57', fontSize:20}}>{item.tenCT}</Text>
                    </View>
                    <View style={{marginLeft:0, width:'50%', alignSelf:'flex-end'}}>
                        <Text style={{fontWeight: "bold",color:'#2f4f4f', alignSelf:'flex-end', fontSize:20}}>{formatCash(item.tienCT)} đ</Text>
                    </View>
                </View>
                <View style={{flexDirection:'row'}}>
                    <View style={{marginLeft:0, width:'50%'}}>
                        <Text style={{fontWeight: "bold",color:'#c71585', fontSize:17, width:200}}>Thể loại: {item.theLoai}</Text>
                    </View>   
                    <View style={{marginLeft:0, width:'50%', alignSelf:'flex-end'}}>
                        <Text style={{fontWeight: "bold",color:'#c71585', alignSelf:'flex-end', fontSize:20}}>{item.ngayCT}</Text>
                    </View>  
                </View> 
                
                </TouchableOpacity>    
            </View>
          
        )
   }
    return(
        <Provider > 
        <View style={{flex:1}}>
           
           <ImageBackground style={{height:'100%', width:'100%'}} source={require('../BackGround/BackGroundList.png')}>
                <View style={{alignItems:'center',padding:10, height:70,}}>
                    <Text style={{fontSize:30, color:'#800000',fontWeight: "bold"}}>Thống kê chi tiêu</Text>
                </View>
                <ScrollView>
                <View style={{flex:1,marginLeft:20,borderRadius:20,paddingRight:10,width:350, height:60, backgroundColor:'#FFFF66', alignItems:'center', justifyContent:'center', flexDirection:'row'}}>
                   <View>
                   <TouchableOpacity
                        style={[styles.button, styles.buttonOpen]}
                        onPress={() => {chonNgayThangNam(tt=2,)}}
                        >
                        <Text style={styles.textStyle}>Hôm nay</Text>
                    </TouchableOpacity>
                   </View>
                   <View>
                   <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        setModalVisible(!modalVisible);
                        }}
                    >
                    <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={{flexDirection:'row'}}>
                            <TouchableOpacity
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => {chonNgayThangNam(tt=0,thang=1, setModalVisible(!modalVisible))}}
                                >
                                <Text style={styles.textStyle}>Tháng 1</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => {chonNgayThangNam(tt=0,thang=2, setModalVisible(!modalVisible))}}
                                >
                                <Text style={styles.textStyle}>Tháng 2</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => {chonNgayThangNam(tt=0,thang=3, setModalVisible(!modalVisible))}}
                                >
                                <Text style={styles.textStyle}>Tháng 3</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => {chonNgayThangNam(thang=4, setModalVisible(!modalVisible))}}
                                >
                                <Text style={styles.textStyle}>Tháng 4</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <TouchableOpacity
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => {chonNgayThangNam(thang=5, setModalVisible(!modalVisible))}}
                                >
                                <Text style={styles.textStyle}>Tháng 5</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => {chonNgayThangNam(thang=6, setModalVisible(!modalVisible))}}
                                >
                                <Text style={styles.textStyle}>Tháng 6</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => {chonNgayThangNam(thang=7, setModalVisible(!modalVisible))}}
                                >
                                <Text style={styles.textStyle}>Tháng 7</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => {chonNgayThangNam(thang=8, setModalVisible(!modalVisible))}}
                                >
                                <Text style={styles.textStyle}>Tháng 8</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <TouchableOpacity
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => {chonNgayThangNam(thang=9, setModalVisible(!modalVisible))}}
                                >
                                <Text style={styles.textStyle}>Tháng 9</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => {chonNgayThangNam(thang=10, setModalVisible(!modalVisible))}}
                                >
                                <Text style={styles.textStyle}>Tháng 10</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => {chonNgayThangNam(thang=11, setModalVisible(!modalVisible))}}
                                >
                                <Text style={styles.textStyle}>Tháng 11</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => {chonNgayThangNam(thang=12, setModalVisible(!modalVisible))}}
                                >
                                <Text style={styles.textStyle}>Tháng 12</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <TouchableOpacity
                                style={{
                                    marginLeft:10,
                                    borderRadius: 20,
                                    padding: 10,
                                    elevation: 5,
                                    backgroundColor: "#009966",
                                    marginLeft:10,
                                    marginTop:10,
                                    borderColor:'#FF9999',
                                    borderWidth:3,}}
                                onPress={() => setModalVisible(!modalVisible)}
                                >
                                <Text style={styles.textStyle}>Thoát chọn tháng</Text>
                            </TouchableOpacity>
                        </View>
                    </View>       
                </View>
            </Modal>
            <TouchableOpacity
                style={[styles.button, styles.buttonOpen]}
                onPress={() => setModalVisible(true)}
            >
                <Text style={styles.textStyle}>Chọn tháng</Text>
            </TouchableOpacity>
                    </View>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible2}
                        onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        setModalVisible(!modalVisible);
                        }}
                    >
                    <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={{flexDirection:'column'}}>
                            <View style={{height:400}}>
                            <FlatList
                                data={Nam}
                                renderItem={({item})=>renderItemNam(item)}
                                keyExtractor={item => item}
                                >

                            </FlatList>
                            </View>
                            <TouchableOpacity
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => { setModalVisible2(!modalVisible2)}}
                                >
                                <Text style={styles.textStyle}>Hủy chọn năm</Text>
                            </TouchableOpacity>
                        </View>
                       
                    </View>       
                </View>
            </Modal>
                    <TouchableOpacity
                style={[styles.button, styles.buttonOpen]}
                onPress={() => setModalVisible2(true)}
            >
                <Text style={styles.textStyle}>Chọn năm</Text>
            </TouchableOpacity>
                </View>
                </ScrollView>
                <View style={{flex:4, padding:20, flexDirection:'row', alignItems:'center'}}>
                <View style={{}}>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <TouchableOpacity style={{height:30, width:30, backgroundColor:'red'}}></TouchableOpacity>
                        <Text style={{color:'#000099', fontWeight: "bold", fontSize:20}}> Tổng chi: {parseInt(phanTramChi)}%</Text>
                    </View>
                    <View style={{flexDirection:'row', alignItems:'center', paddingTop:10}}>
                        <TouchableOpacity style={{height:30, width:30, backgroundColor:'#44CD40'}}></TouchableOpacity>
                        <Text style={{color:'#000099', fontWeight: "bold", fontSize:20}}> Tổng thu: {parseInt(phanTramThu)}%</Text>
                    </View>       
                </View>
                <View style={{paddingLeft:10}}>
                    <Pie
                        radius={82}
                        innerRadius={10}
                        sections={[
                            {

                            percentage: phanTramChi,
                            color: '#C70039',
                            
                            },
                            {
                            percentage: phanTramThu,
                            color: '#44CD40',
                            },
                            
                            ]} 
                        />
                    </View>
                </View>
                <View style={{flex:8,paddingLeft:15, alignItems:'center', justifyContent:'center'}}>
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
      
        </Provider>
        
    )
}
const styles = StyleSheet.create({
    kiengThuChi:{
        
    },
    nutchon:{
        borderWidth:3,
        borderColor:'#FF99FF',
        backgroundColor:'#FF99FF',
        borderRadius:20,
        marginLeft:5,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        marginBottom: 230,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 20,
       alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        //flexDirection:'row'
      },
      button: {
        marginLeft:10,
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        borderColor:'#FF6600',
        borderWidth:2,
      },
      buttonOpen: {
        backgroundColor: "#F194FF",
      },
      buttonClose: {
        backgroundColor: "#2196F3",
        marginLeft:10,
        marginTop:10,
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      }
})
export default Statistical;