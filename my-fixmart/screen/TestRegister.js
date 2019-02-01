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
import Button from 'apsl-react-native-button';
import Login from './Login';
import Main from './Main';
const util = require('util');
import Icon from 'react-native-ionicons';

//const myIcon = (<Icon name="rocket" size={30} color="#900" />)
export default class TestRegister extends Component<Props> {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      c_password: '',
      name: '',
      email: '',
    };
  }

  submit() {}
  render() {
    const { navigate } = this.props.navigation;
    if (this.props.navigation.state.params != null) {
      console.log(this.props.navigation.state.params.lang);
      this.setState({
        language1: this.props.navigation.state.params.lang,
      });
    }
    return (
      <ImageBackground
        source={require('../img/backs.jpg')}
        style={styles.container}>
        <View style={styles.GovImgContainer}>
          <Image
            resizeMode="contain"
            source={require('../img/logo_gov.png')}
            style={styles.cart1}
          />
        </View>
        <View style={styles.FimartImgContainer}>
          <Image
            resizeMode="cover"
            style={styles.FimartImg}
            source={require('../img/logo.png')}
          />
        </View>
        <View style={styles.BoxContainer2}>
          <View style={styles.laguageContainer}>
            <View style={styles.SelectLanguageContainer}>
              <Text style={styles.selectLanguage}>Select a Language</Text>
            </View>
            <View style={styles.LanguagesContainer}>
              <View style={styles.Language}>
                <TouchableOpacity>
                  <Text
                    style={styles.Texts}
                    onPress={() => navigate('Login', { lang: 's' })}>
                    සිංහල
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.Language}>
                <TouchableOpacity style={styles.TamilLanguage}>
                  <Text
                    style={styles.TextTamil}
                    onPress={() => navigate('Login', { lang: 't' })}>
                    தமிழ்
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.Language}>
                <TouchableOpacity>
                  <Text
                    style={styles.TextEnglish}
                    onPress={() => navigate('Scanner')}>
                    English
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.LoginRegisterContainer}>
          <View style={styles.backImag}>
            <Image
              style={styles.cart}
              source={require('../img/Complain.png')}
              resizeMode="contain"
            />
            <Text
              style={styles.ImgTxt}
              onPress={() => navigate('Login', { lang: 't' })}>
              Complain
            </Text>
          </View>
          <View style={styles.backImag}>
            <Image
              style={styles.cart}
              source={require('../img/History.png')}
              resizeMode="contain"
            />
            <Text
              style={styles.ImgTxt}
              onPress={() => navigate('Login', { lang: 't' })}>
              History
            </Text>
          </View>
        </View>
      </ImageBackground>
    );
  }
}
//envelope-o envelope-open -o photo picture-o user-circle-o
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: 'blue',
  },
  ImgTxt: {
    fontWeight: 'bold',
    color: 'red',
    fontSize: 20,
    textAlign: 'center',
    margin:10,
  },
  GovImgContainer: {
    flex: 0.4,
    alignItems: 'flex-end',
    marginRight: 50,
    marginTop: 10,
  },
  FimartImgContainer: {
    flex: 0.6,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'black',
    shadowOpacity: '5',
  },
  FimartImg: {
    width: '60%',
    height: '80%',
    alignItems: 'center',
  },
  selectLanguage: {
    color: '#488cf2',
    fontSize: 23,
    marginTop: 10,
    textAlign: 'center',
    shadowColor: 'black',
    shadowOpacity: '20',
  },
  BoxContainer2: {
    flex: 0.3,
    justifyContent: 'center',
  },
  LoginRegisterContainer: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  LanguagesContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  Language: {
    flex: 1,
  },
  laguageContainer: {
    marginLeft: 20,
    marginRight: 20,
    flex: 1,
    backgroundColor: '#021f4f',
    shadowColor: 'black',
    shadowOpacity: '20',
  },
  SelectLanguageContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  Texts: {
    color: '#f7f9fc',
    fontSize: 21,
    textAlign: 'center',
    shadowColor: 'black',
    shadowOpacity: '20',
  },
  TextEnglish: {
    color: '#f7f9fc',
    fontSize: 23,
    textAlign: 'center',
    shadowColor: 'black',
    shadowOpacity: '20',
  },
  TextTamil: {
    color: '#f7f9fc',
    fontSize: 23,
    textAlign: 'center',
    shadowColor: 'black',
    shadowOpacity: '20',
    marginTop:3,
  },
  cart: {
    marginTop: 20,
    width: 100,
    height: 100,
  },
   cart1: {
    marginTop: 20,
    width: 100,
    height: 100,
     shadowColor: '#527ac9',
    shadowOpacity: '0.8',
  },
  backImag: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    margin: 20,
    justifyContent: 'center',
    shadowColor: 'black',
    shadowOpacity: '50',
  },
  TamilLanguage: {
    marginRight: 2,
  },
});
