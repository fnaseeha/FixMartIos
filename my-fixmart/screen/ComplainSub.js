import React, { Component } from 'react';
import {
  Text,
  ScrollView,
  View,
  Image,
  ImageBackground,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ProgressViewIOS,
  AsyncStorage,
} from 'react-native';
import { TextInput } from 'react-native-paper';

import Login from './Login';
import Main from './Main';
const util = require('util');
import Icon from 'react-native-ionicons';
import Scanner from './Scanner';
import Complain from './Complain';
import NoQrCodeComplain from './NoQrCodeComplain';
//const myIcon = (<Icon name="rocket" size={30} color="#900" />)
export default class ComplainSub extends Component<Props> {
  static navigationOptions = {
    title: 'Complain Type',
    headerStyle: {
      backgroundColor: '#071a5a',
    },
    headerTintColor: '#fff',
    headerfontWeight: 'bold',
  };

  constructor(props) {
    super(props);
    this.state = {
      sing: {
        LblScanWithQr: 'පැමිණිලි  කිරීමට QR ස්කෑන් කරන්න.',
        LblScanWithoutQr: 'QR නොමැතිව පැමිණිලි කිරීම',
        LblHeader: 'පැමිණිලි වර්ගය',
      },
      tam: {
        LblScanWithQr: 'புகார் உருவாக்க QR ஐ ஸ்கேன் செய்யவும்',
        LblScanWithoutQr: 'QR இல்லாமல் புகார் செய்தல்',
        LblHeader: 'புகார் வகை',
      },
      eng: {
        LblScanWithQr: 'Scan QR to Create Complain',
        LblScanWithoutQr: 'Create Complain without QR',
        LblHeader: 'Complain Type',
      },
      mydata: {
        LblScanWithQr: 'Scan QR to Create Complain',
        LblScanWithoutQr: 'Create Complain without QR',
        LblHeader: 'Complain Type',
      },
      language: '',
      count: '0',
    };
  }
  componentWillMount() {
    if (this.props.navigation.state.params.lang != null) {
      this.setState({
        language: this.props.navigation.state.params.lang,
      });
    }
    if (this.props.navigation.state.params.UserId != null) {
      this.setState({
        language: this.props.navigation.state.params.lang,
      });
    }
  }
  getData = async () => {
    try {
      let user = await AsyncStorage.getItem('userAll');
      this.setState({
        mydata: JSON.parse(user),
      });
    } catch (Error) {
      console.log(Error);
    }
  };

  setdata() {
    if (this.state.language == 's') {
      AsyncStorage.setItem('userAll', JSON.stringify(this.state.sing));
    } else if (this.state.language == 't') {
      AsyncStorage.setItem('userAll', JSON.stringify(this.state.tam));
    } else {
      AsyncStorage.setItem('userAll', JSON.stringify(this.state.eng));
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    if (this.state.count == '0') {
      this.setdata();
      this.getData();
      this.setState({
        count: '1',
      });
    }

    return (
      <View style={styles.container}>
        <View style={styles.LoginRegisterContainer}>
          <View style={styles.backImag}>
            <TouchableOpacity
              onPress={() =>
                navigate('Scanner', { lang: this.state.language })
              }>
              <Image
                style={styles.cart}
                source={require('../img/qr_scanner.png')}
                resizeMode="contain"
              />
              <Text style={styles.ImgTxt}>
                {this.state.mydata.LblScanWithQr}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.backImag}>
            <TouchableOpacity onPress={() => navigate('NoQrCodeComplain')}>
              <Image
                style={styles.cart1}
                source={require('../img/Complain.png')}
                resizeMode="contain"
              />
              <Text style={styles.ImgTxt}>
                {this.state.mydata.LblScanWithoutQr}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

let rrr = Dimensions.get('window').width;
if (Dimensions.get('window').width > 100) {
  rrr = Dimensions.get('window').width - 100;
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  LoginRegisterContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  backImag: {
    flex: 1,
    alignItems: 'center',
    margin: 20,
    justifyContent: 'center',
    borderRadius: 4,
    borderWidth: 10,
    borderColor: '#d6d7da',
  },
  cart: {
    flex: 1,
    margin: 10,
    width: rrr,
  },
  cart1: {
    flex: 1,
    margin: 0,
    width: rrr,
  },
  ImgTxt: {
    flex: 0.5,
    fontWeight: 'bold',
    color: 'red',
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    shadowColor: 'black',
  },
});
