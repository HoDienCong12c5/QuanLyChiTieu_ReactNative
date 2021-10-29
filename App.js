import * as React from 'react';
import { StyleSheet, Text, View, Image,Alert,BackHandler, 
	ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Button, FAB } from 'react-native-paper';

import Home from './screen/Home';
import Insert from './screen/Insert';
import StyleTab from './degin/StyleTab';
import ListInsert from './screen/ListInsert';
import Statistical from './screen/Statistical';
import Login from './screen/Login';
import About from './screen/About';
import ListSpending from './screen/ListSpending';
import UpdateCT from './screen/UpdateCT';



const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Homes=({navigation}) =>{
  return (
	
	  <Tab.Navigator 
		tabBarOptions={{style:{height:70},
		labelStyle:{fontSize:15, height:25}}}>
			<Tab.Screen 
				options={{ headerRight: ()=> 
					<Button onPress={()=> {}}>Đăng xuất</Button> ,
					tabBarIcon:()=>
						<Image source={require('./AnhBottom/house.png')}
						style={StyleTab.anhtab}/> 
					}}
			name="Home" component={Home} >
			</Tab.Screen>
			<Tab.Screen name="Thêm mới" component={Insert}
					options={{ headerRight:()=>{<Button style={{backgroundColor:'red'}}>đasa</Button>} , tabBarIcon:()=>
						<Image source={require('./AnhBottom/insert.png')}
						style={StyleTab.anhtab}/>}}/>
			<Tab.Screen name="Thống kê" component={Statistical}
						
						options={{tabBarIcon:()=>
							
							<Image onPress={()=>alert('dsds')} source={require('./AnhBottom/thongke.png')}
							style={StyleTab.anhtab}  />     }} />	
			<Tab.Screen name="Danh sách" component={ListSpending}
				options={{tabBarIcon:()=>
					<Image source={require('./Anh/danhsach.png')}
					 style={StyleTab.anhtab}/>}}/>	
	  	</Tab.Navigator>
		

  );
}


const MyStack = ({navigation, route}) => {
	var bien=0;
	console.log('trangj thais: '+bien)
	const nhan=(navigation, route)=>{
		if(bien==0){

		}
		else{
			navigation.replace('Login');

		}
	}
	return (
	  <NavigationContainer>
		<Stack.Navigator>
		<Stack.Screen name="Login" component={Login}/>
		  <Stack.Screen name="Quản lý chi tiêu" 
		   /* 	options={{
				headerRight: () => 
				 <Button onPress={()=> {}}>Đăng xuất</Button>  
			}} */
		  component={Homes} />
		  <Stack.Screen name="Home" component={Home}/>
		  <Stack.Screen name="Insert" component={Insert} />
		  
		  <Stack.Screen name="statistical" component={Statistical}/>
		  <Stack.Screen name="Cập nhật" component={UpdateCT}/>
		  <Stack.Screen name="Danh sách" component={ListSpending}/>
		 
		</Stack.Navigator>
	  </NavigationContainer>
	);
  };
export default MyStack;
