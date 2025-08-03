import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  AsyncStorage,
  Alert,
  StatusBar,
} from 'react-native';

import Register from './Register';
import Login from './Login';
import Complain from './Complain';
import Scanner from './Scanner';
import ComplainSub from './ComplainSub';
import History from './History';
import Button from 'apsl-react-native-button';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Main extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      language1: '',
      language: '',
      sing: {
        selectLanguage: 'භාෂාව තෝරන්න',
        LblComplain: 'පැමිණිලි',
        LblHistory: 'ඉතිහාසය',
        lbLogout: 'S Do you want to logout',
      },
      tam: {
        selectLanguage: 'ஒரு மொழியைத் தேர்ந்தெடுங்கள்',
        LblComplain: 'புகார்',
        LblHistory: 'வரலாறு',
        lbLogout: 't Do you want to logout',
      },
      eng: {
        selectLanguage: 'Select a Language',
        LblComplain: 'Complain',
        LblHistory: 'History',
        lbLogout: 'Do you want to logout',
      },
      mydata: {
        selectLanguage: 'Select a Language',
        LblComplain: 'Complain',
        LblHistory: 'History',
        lbLogout: 'Do you want to logout',
      },
      count: '0',
      UserId: '-1',
    };
  }
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;

    return {
      title: 'Home',
      headerStyle: {
        backgroundColor: '#153f84',
      },
      headerLeft: null,
      headerTintColor: '#fff',
      headerfontWeight: 'bold',
      headerRight: (
        <Icon
          name="sign-out"
          size={28}
          color="#072b63"
          onPress={() =>
            Alert.alert(
              'Logout',
              'Do you want to logout',
             
              { cancelable: false }
            )
          }
          style={{ color: 'white', marginRight: 10 }}
        />
      ),
    };
  };

  onFormSubmit = () => {
    this.props.navigation.navigate('Login', { lang: this.state.language });
  };
  componentDidMount() {
    const { navigation } = this.props;

    navigation.setParams({
      onFormSubmit: this.onFormSubmit,
    });
  }
  getData = async () => {
    try {
      let user = await AsyncStorage.getItem('userAll');
      this.setState({
        mydata: JSON.parse(user),
      });
    } catch (Error) {
      console.log('errro ' + Error);
    }
  };
  logout() {
    Alert.alert('logout');
  }
  componentWillMount() {
    console.log('componentWillMount');

    this.setState({
      UserId: this.props.navigation.state.params.UserI,
    });
    this.setdata();
  }
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

    console.log('language ' + this.state.language);
    console.log('UserId ' + this.state.UserId);
    if (this.state.count == '0') {
      this.setdata();
      this.getData();
      this.setState({
        count: '1',
      });
    }

    // this.props.navigation.state.params.lang

    return (
      <ImageBackground
        source={require('../img/backs.jpg')}
        style={styles.container}>
        <StatusBar barStyle="light-content" />
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
              <Text style={styles.selectLanguage}>
                {this.state.mydata.selectLanguage == null
                  ? 'Select a Language'
                  : this.state.mydata.selectLanguage}
              </Text>
            </View>
            <View style={styles.LanguagesContainer}>
              <View style={styles.Language}>
                <TouchableOpacity>
                  <Text
                    style={styles.Texts}
                    onPress={() =>
                      this.setState({ language: 's', count: '0' })
                    }>
                    සිංහල
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.Language}>
                <TouchableOpacity style={styles.TamilLanguage}>
                  <Text
                    style={styles.TextTamil}
                    onPress={() =>
                      this.setState({ language: 't', count: '0' })
                    }>
                    தமிழ்
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.Language}>
                <TouchableOpacity>
                  <Text
                    style={styles.TextEnglish}
                    onPress={() => this.setState({ language: '', count: '0' })}>
                    English
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.LoginRegisterContainer}>
          <View style={styles.backImag}>
            <TouchableOpacity
              onPress={() =>
                navigate('ComplainSub', {
                  lang: this.state.language,
                  UserId: this.state.UserId,
                })
              }>
              <Image
                style={styles.cart}
                source={require('../img/Complain.png')}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                navigate('ComplainSub', {
                  lang: this.state.language,
                  UserId: this.state.UserId,
                })
              }>
              <Text style={styles.ImgTxt}>
                {' '}
                {this.state.mydata.LblComplain == null
                  ? 'Complain'
                  : this.state.mydata.LblComplain}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.backImag}>
            <TouchableOpacity
              onPress={() =>
                navigate('History',{
                  lang: this.state.language,
                  UserId: this.state.UserId,
                })
              }>
              <Image
                style={styles.cart}
                source={require('../img/History.png')}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                navigate('History',{
                  lang: this.state.language,
                  UserId: this.state.UserId,
                })
              }>
              <Text style={styles.ImgTxt}>
                {this.state.mydata.LblHistory == null
                  ? 'History'
                  : this.state.mydata.LblHistory}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  ImgTxt: {
    fontWeight: 'bold',
    color: 'red',
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
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
    marginTop: 0,
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
