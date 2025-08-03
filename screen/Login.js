import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  ImageBackground,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  AsyncStorage,
  BackHandler,
  StatusBar,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from 'apsl-react-native-button';
import Register from './Register';
import Main from './Main';
import SweetAlert from 'react-native-sweet-alert';
import AwesomeAlert from 'react-native-awesome-alerts';
//const myIcon = (<Icon name="rocket" size={30} color="#900" />)
export default class Login extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      password: '',
      showAlert: false,
      server_name: 'http://203.81.101.197:9096/Service1.svc/',
      // language :this.props.navigation.state.params.lang,
      language: '',

      sing: {
        LblUsername: 'පරිශීලක නාමය',
        LblPassword: 'මුරපදය',
        LblLogin: 'ඇතුල් වන්න',
        textLogin: 'ඇතුල් වන්න',
        LblRegister: 'ලියාපදිංචි වන්න',
      },
      tam: {
        LblUsername: 'பயனர்பெயர்',
        LblPassword: 'கடவுச்சொல்',
        LblLogin: 'உள்நுழைக',
        textLogin: 'உள்நுழைக',
        LblRegister: 'பதிவு செய்க',
      },
      eng: {
        LblUsername: 'UserName',
        LblPassword: 'Password',
        LblLogin: 'LOGIN',
        textLogin: 'Login',
        LblRegister: 'Register',
      },
      mydata: {
        LblUsername: 'UserName',
        LblPassword: 'Password',
        LblLogin: 'LOGIN',
        textLogin: 'Login',
        LblRegister: 'Register',
      },
      GetResponse: {},
      ServerId: '',
    };
    this.okButtonPress = this.okButtonPress.bind(this);
  }

  send() {
    return (
      <View style={styles.RegContent}>
        <ActivityIndicator size="large" color="#ff0000" />
      </View>
    );
  }
  getData = async () => {
    try {
      let user = await AsyncStorage.getItem('userAll');
      this.setState({
        mydata: JSON.parse(user),
      });
    } catch (Error) {
      console.log('Error logiin ' + Error);
    }
  };

  static navigationOptions = {
    header: null,
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
    this.setdata();
    this.getData();

    return (
      <ImageBackground
        source={require('../img/back.jpg')}
        style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.Logincontainer}>
          <View style={styles.Imagecontainer}>
            <Image
              resizeMode="contain"
              source={require('../img/logo.png')}
              style={styles.fixmartImg}
              fadeDuration={2}
            />
          </View>
          <View>
            <Text style={styles.loginText}>{this.state.mydata.textLogin}</Text>
          </View>
          <View style={styles.LoginBody}>
            <View style={styles.InputText}>
              <Icon name="user-circle" size={28} color="#072b63" />
              <TextInput
                style={styles.NameInputStyle}
                label={this.state.mydata.LblUsername}
                value={this.state.name}
                onChangeText={name => this.setState({ name })}
              />
            </View>
            <View style={styles.InputText}>
              <Icon
                name="lock"
                size={30}
                color="#072b63"
                style={styles.IconStyle}
              />
              <TextInput
                style={styles.NameInputStyle}
                label={this.state.mydata.LblPassword}
                value={this.state.password}
                secureTextEntry={true}
                onChangeText={password => this.setState({ password })}
              />
            </View>
            <View style={styles.InputBox}>
              <TouchableOpacity onPress={() => this.login()}>
                <Text style={styles.ButtonloginText}>
                  {this.state.mydata.LblLogin}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.RegisterBox}>
              <TouchableOpacity
                onPress={() =>
                  navigate('Register', { lang: this.state.language })
                }>
                <Text style={styles.ButtonloginText1}>
                  {this.state.mydata.LblRegister}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    );
  }
  okButtonPress = () => {
    console.log('Okkaaay');
    this.props.navigator.push('Main', { lang: this.state.language });
  };

  showAlert = () => {
    this.setState({
      showAlert: true,
    });
  };

  hideAlert = () => {
    this.setState({
      showAlert: false,
    });
  };
  login() {
    const { navigate } = this.props.navigation;
    const { showAlert } = this.state;
    let result = 1;

    if (this.state.name == '' && this.state.password == '') {
      Alert.alert('username and password  is empty');
      result = -3;
    } else if (this.state.name == '' && this.state.password != '') {
      Alert.alert('username is empty');
      result = -1;
    } else if (this.state.name != '' && this.state.password == '') {
      Alert.alert('password is empty');
      result = -2;
    }
    /**.then(response => {
    console.log(JSON.stringify(response, null, 4))
    return response.json())
} */
    if (result > 0) {
      let url =
        this.state.server_name +
        'GetCompanyLogin?username=' +
        this.state.name +
        '&password=' +
        this.state.password +
        '&type=U';
      console.log('url ' + url);
      fetch(url, {
        method: 'GET',
      })
        .then(response => response.json())
        .then(responseJson => {
          console.log(responseJson.ID);
          this.setState({
            GetResponse: JSON.parse(responseJson.Data),
          });
          if (responseJson.ID == 300) {
            Alert.alert('Login Failed');
          } else if (responseJson.ID == 200) {
            this.props.navigation.navigate('Main', {
              UserI: this.state.GetResponse.UserId,
            });
          }else if(responseJson.ID == 250){
             Alert.alert('User is not approved. Please Contact your Admin');
          }
          console.log(this.state.GetResponse);
        })
        .catch(error => {
          console.error('error ' + error);
        });
    }
  }
}
//envelope-o envelope-open -o photo picture-o user-circle-o
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
  },
  Logincontainer: {
    flexDirection: 'column',
    flex: 0.6,
    width: Dimensions.get('window').width - 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  Imagecontainer: {
    flexDirection: 'column',
    flex: 1,
    width: Dimensions.get('window').width - 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  LoginBody: {
    flexDirection: 'column',
    flex: 2.5,
    width: Dimensions.get('window').width - 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  InputBox: {
    flexDirection: 'column',
    flex: 1,
    width: Dimensions.get('window').width - 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  RegisterBox: {
    flexDirection: 'column',
    flex: 1,
    width: Dimensions.get('window').width - 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  InputText: {
    flex: 1,
    backgroundColor: 'rgba(246,241,248,0)',
    flexDirection: 'row',
    width: Dimensions.get('window').width - 20,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  NameInputStyle: {
    width: Dimensions.get('window').width - 100,
    backgroundColor: 'rgba(246,241,248,0)',
  },
  fixmartImg: {
    tintColor: 'rgba(218, 40, 40, 1)',
    width: 150,
    height: '100%',
    alignItems: 'center',
  },
  loginText: {
    color: 'rgba(218, 40, 40, 1)',
    alignItems: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  ButtonloginText: {
    color: 'white',
    alignItems: 'center',
    fontSize: 16,
    justifyContent: 'center',
    fontWeight: 'bold',
    paddingBottom: 10,
    paddingTop: 10,
    paddingLeft: 40,
    paddingRight: 40,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: 'blue',
  },
  ButtonloginText1: {
    color: 'red',
    alignItems: 'center',
    fontSize: 20,
    justifyContent: 'center',
    fontWeight: 'bold',
  },
});
