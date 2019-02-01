import React, { Component } from 'react';
import { 
  Text, 
  View, 
  StyleSheet, 
  Alert,
  Dimensions,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image } from 'react-native';
import { Constants, BarCodeScanner, Permissions } from 'expo';
import Complain from './Complain';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Dropdown } from 'react-native-material-dropdown';

import Button from 'apsl-react-native-button';
import { TextInput } from 'react-native-paper';

import ImagePicker from 'expo';

  const options = {
    title: "b",
      takePhotoButtonTitle: '拍照',
      chooseFromLibraryButtonTitle: '相册',
      cancelButtonTitle: "a",
  };

export default class test extends Component {

  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      AppId: '2',
      isLoading: false,
      dataSource: null,
      myData:{areaId:'3'},
      myDatas: [],
      Items: [],
      ItemDetails :[],
      ServerId: '500',
      myItemData:[{value:"Tap"},{value:"Clock"},{value:"Air"}],
      selectedItem:'',
      AllItemDetails:[],
      selectedItemId:'',
      SendData:null,
      imageSource:null,
      image: null,
    };
     this.onChangeText = this.onChangeText.bind(this);
  }
 
submit (){ }

_pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  }
  
  componentDidMount() {
    let id = this.state.AppId; }
 
 onChangeText(text) {
      this.setState({selectedItem: text });

    }

  selectPhoto(){
   ImagePicker.showImagePicker(options, (response) => {
     console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = { uri: response.uri };

        this.setState({
          imageSource: source,
        });
      }
    });
  }
  render() {   
 let { image } = this.state;
       
        return(
          <View style = {styles.Container}>
          	 <View style = {styles.EmptyContent}>
          
            </View>
            
              <View style = {styles.EmptyContent1}>

              <View style={styles.mybox}>
                <View style= {styles.InsideText}>
                   <Text style={styles.text1Style}>Location </Text>
                   <Text style={styles.text2Style}>Building </Text>
                   
                  
                  </View>  
                </View>

              <View style={styles.mybox}>
              <View style= {styles.InsideText}>
                  <Text style={styles.text1Style}>Item</Text>
                  <Dropdown
                      label='Select Items'
                      data={this.state.myItemData}
                      onChangeText={this.onChangeText}
                      pickerStyle = {styles.dropDownStyle}
                      containerStyle = {styles.dropDownContainer} />
                </View> 
                
              </View>

              <View style={styles.mybox}>
                <View style= {styles.InsideText}>
                  <Text style={styles.text1Style}>Contact Number</Text>
                  <TextInput style={styles.NameInputStyle} 
                  label='Enter mobile number for get alerts'
								  value={this.state.phone}
        					onChangeText={phone => this.setState({ phone })} />
                </View>  
              </View>

              <View style={styles.mybox}>
                <View style= {styles.InsideText}>
                  <Text style={styles.text1Style}>Image</Text>
                  <TouchableOpacity >
                    <Text 
                    style={styles.text2Style} 
                    onPress = {this.selectPhoto.bind(this)}>Please Capture an Image</Text>
                  </TouchableOpacity>
                </View>  
              </View>

               <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Button
                  title="Pick an image from camera roll"
                  onPress={this._pickImage}
                />
                {image &&
                  <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
              </View>

           </View>

            
        
        <View style = {styles.EmptyContent3}>
          
          <Button 
           style = {styles.btnAddComplain}
           textStyle={styles.btnText} 
           onPress={()=>this.submit()}>MAKE COMPLAIN</Button>
        </View>
           
        </View>
        
        );
   
   
  }
}


const styles = StyleSheet.create({
 Container:{
    marginTop:50,
		alignItems:'center',
    flexDirection:'column',
    flex:1,
		fontSize:20,
		fontWeight:'bold',
	},
  EmptyContent:{
    flex:0.1,
    alignSelf:'stretch',
  },
  EmptyContent1:{
    flex:3,
    alignSelf:'stretch',
  },
  InsideText:{
    marginLeft:20,
    flexDirection:'column',
    justifyContent:'space-around',
  },
  EmptyContent3:{
    flex:0.4,
    flexDirection:'column',
    alignSelf:'stretch',
  },
  btnAddComplain:{
    justifyContent:'flex-end',
    backgroundColor:'red',
  },
  btnText:{
    color:'white',
    fontWeight:'bold'
  },
  mybox:{
    flex:1,
    alignSelf:'stretch',
    padding:10,
    marginLeft:15,
    marginRight:15,
    marginTop:25,
    marginBottom:5,
    flexDirection:'row',
    borderColor:'black',
    borderWidth:'2'
  },
  text1Style:{
     color:'black',
    fontWeight:'bold',
    fontSize:18,
  },
   text2Style:{
     color:'#4db8ff',
    fontWeight:'bold',
    fontSize:16,
  },
   NameInputStyle:{

  	width:Dimensions.get('window').width-100,
  	height:60,
    backgroundColor: 'rgba(246,241,248,0)',
    colors: {
      primary: '#3399ff',
      accent: "#3399ff",
      background: "transparent",
      text: '#3399ff'
      }
  },
  dropDownStyle:{
     backgroundColor: 'white',
  },
  dropDownContainer:{
    backgroundColor: 'rgba(246,241,248,0)',
    	width:Dimensions.get('window').width-100,
      height:60,
      color:'#4db8ff',
  }
});