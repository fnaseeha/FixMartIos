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
  ProgressViewIOS,
  AsyncStorage,
  StatusBar,
  Animated,
  UIManager,
  TextInput,
  Keyboard,
} from 'react-native';

import Button from 'apsl-react-native-button';
import Login from './Login';
import Main from './Main';
import Icon from 'react-native-vector-icons/FontAwesome';
import SweetAlert from 'react-native-sweet-alert';

const util = require('util');
const { State: TextInputState } = TextInput;

export default class Register extends Component<Props> {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      data: '',
      servername: 'http://203.81.101.197:9096/Service1.svc/',
      // language :this.props.navigation.state.params.lang,
      language: '',

      sing: {
        LblFirstname: 'මුල් නම',
        LblPassword: 'මුරපදය',
        LblConfirmPassword: 'මුරපදය තහවුරු කරන්න',
        LblNIC: 'හැඳුනුම්පත් අංකය',
        LblEmail: 'විද්යුත් තැපෑල',
        RegisterHeader: 'ලියාපදිංචි කිරීම',
        BtnRegister: 'ලියාපදිංචි වන්න',
      },
      tam: {
        LblFirstname: 'முதல் பெயர்',
        LblPassword: 'கடவுச்சொல்',
        LblConfirmPassword: 'கடவுச்சொல் உறுதி செய்க',
        LblNIC: 'அடையாள அட்டை எண்',
        LblEmail: 'மின்னஞ்சல் முகவரி ',
        RegisterHeader: 'பதிவு செய்தல் ',
        BtnRegister: 'பதிவு செய்க ',
      },
      eng: {
        LblFirstname: 'First Name',
        LblPassword: 'Password',
        LblConfirmPassword: 'Confirm Password',
        LblNIC: 'NIC Number',
        LblEmail: 'Email',
        RegisterHeader: 'Registration',
        BtnRegister: 'Register',
      },
      mydata: {
        LblFirstname: 'First Name',
        LblPassword: 'Password',
        LblConfirmPassword: 'Confirm Password',
        LblNIC: 'NIC Number',
        LblEmail: 'Email',
        RegisterHeader: 'Registration',
        BtnRegister: 'Register',
      },
      shift: new Animated.Value(0),
      hasFocus: false,
      FirstnameError: '',
      PasswordError: '',
      ConfirmPasswordError: '',
      NICError: '',
      EmailError: '',
      firstname: '',
      password: '',
      c_password: '',
      nic: '',
      email: '',
      canSubmit: 'yes',
      responseId: '',
    };
    this.ChangeFirstName = this.ChangeFirstName.bind(this);
    this.ChangePassword = this.ChangePassword.bind(this);
    this.ChangeConfirmPassword = this.ChangeConfirmPassword.bind(this);
    this.ChangeNIC = this.ChangeNIC.bind(this);
    this.ChangeEmail = this.ChangeEmail.bind(this);
  }

  ChangeEmail(text) {
    this.setState({ email: text });
    //,FirstnameError :'ERR'

    if (text == '' || !text) {
      this.setState({
        EmailError: 'Email is required',
      });
    } else {
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (re.test(this.state.email)) {
        this.setState({
          EmailError: '',
        });
      } else {
        this.setState({
          EmailError: 'Invalid Email',
        });
      }
    }
  }
  ChangeNIC(text) {
    this.setState({ nic: text });
    //,FirstnameError :'ERR'

    if (text == '' || !text) {
      this.setState({
        NICError: 'NIC is required',
      });
    } else {
      //.matches("^[0-9]{9}[vVxX]$"))
      if (text.length == 12) {
        let re = '^[0-9]{12}';
        if (String(text).match(re)) {
          if (this.state.email == '') {
            this.setState({
              EmailError: 'Email is required',
            });
          }
          this.setState({
            NICError: '',
          });
        } else {
          this.setState({
            NICError: 'Invalid NIC',
          });
        }
      } else if (text.length == 10) {
        let re = '^[0-9]{9}[vVxX]$';

        if (String(text).match(re)) {
          if (this.state.email == '') {
            this.setState({
              EmailError: 'Email is required',
            });
          }

          this.setState({
            NICError: '',
          });
        } else {
          this.setState({
            NICError: 'Invalid NIC',
          });
        }
      } else {
        this.setState({
          NICError: 'NIC is Invalid',
        });
      }
    }
  }
  ChangePassword(text) {
    this.setState({ password: text });
    //,FirstnameError :'ERR'

    if (text == '' || !text) {
      this.setState({
        PasswordError: 'Password is required',
      });
    } else {
      if (this.state.c_password == '') {
        this.setState({
          ConfirmPasswordError: 'Confirm Password is required',
        });
      }
      this.setState({
        PasswordError: '',
      });
    }
  }
  ChangeConfirmPassword(text) {
    this.setState({ c_password: text });
    //,FirstnameError :'ERR'

    if (text == '' || !text) {
      this.setState({
        ConfirmPasswordError: 'Confirm Password is required',
      });
    } else {
      if (this.state.password != '') {
        if (this.state.password == text) {
          if (this.state.nic == '') {
            this.setState({
              NICError: 'NIC is required',
            });
          }
          this.setState({
            ConfirmPasswordError: '',
          });
        } else {
          this.setState({
            ConfirmPasswordError: 'Password is not Match',
          });
        }
      } else {
        this.setState({
          PasswordError: 'Password is required',
          c_password: '',
        });
      }
    }
  }
  ChangeFirstName(text) {
    this.setState({ firstname: text });
    //,FirstnameError :'ERR'

    if (text == '' || !text) {
      this.setState({
        FirstnameError: 'FirstName is required',
      });
    } else {
      if (this.state.password == '') {
        this.setState({
          PasswordError: 'Password is required',
        });
      }
      this.setState({
        FirstnameError: '',
      });
    }
  }
  componentWillUnmount() {
    this.keyboardDidShowSub.remove();
    this.keyboardDidHideSub.remove();
  }
  componentWillMount() {
    if (this.state.language == 's') {
      AsyncStorage.setItem('userLang', JSON.stringify(this.state.sing));
    } else if (this.state.language == 't') {
      AsyncStorage.setItem('userLang', JSON.stringify(this.state.tam));
    } else {
      AsyncStorage.setItem('userLang', JSON.stringify(this.state.eng));
    }
    this.keyboardDidShowSub = Keyboard.addListener(
      'keyboardDidShow',
      this.handleKeyboardDidShow
    );
    this.keyboardDidHideSub = Keyboard.addListener(
      'keyboardDidHide',
      this.handleKeyboardDidHide
    );
  }

  getData = async () => {
    try {
      let userlang = await AsyncStorage.getItem('userLang');
      this.setState({
        mydata: JSON.parse(userlang),
      });
    } catch (Error) {
      console.log(Error);
    }
  };

  submit(text) {
    /**firstname: '',
      password: '',
      c_password: '',
      nic: '',
      email: '', */
    //  let result = true;
    if (this.state.firstname == '') {
      this.setState({
        FirstnameError: 'FirstName is required',
        canSubmit: 'no',
      });
      // result = false;
    }
    if (this.state.password == '') {
      this.setState({
        PasswordError: 'Password is required',
        canSubmit: 'no',
      });
    }
    if (this.state.c_password == '') {
      this.setState({
        ConfirmPasswordError: 'Confirm Password is required',
        canSubmit: false,
      });
      //  result = false;
    }
    if (this.state.nic == '') {
      this.setState({
        NICError: 'NIC is required',
        canSubmit: 'no',
      });
      //  result = false;
    }
    if (this.state.email == '') {
      this.setState({
        EmailError: 'Email is required',
        canSubmit: 'no',
      });
      //   result = false;
    }

    let result = true;
    if (this.state.firstname == null) {
      console.log('Inside Firstname');
      result = false;
    }
    if (this.state.password == null) {
      console.log('Inside Password');
      result = false;
    }
    if (this.state.email == null) {
      console.log('Inside Email');
      result = false;
    }
    if (this.state.nic == null) {
      console.log('Inside NIC');
      result = false;
    }
    if (this.state.c_password == null) {
      console.log('Inside Conf password');
      result = false;
    }
    console.log(this.state.canSubmit);
    // console.log(this.state.FirstnameError);
    // console.log(this.state.PasswordError);
    // console.log(this.state.ConfirmPasswordError);
    // console.log(this.state.EmailError);
    // console.log(this.state.NICError);
    console.log('result is ' + this.state.canSubmit);
    console.log('text iss ' + text);

    if (this.state.canSubmit == 'yes') {
      console.log('success');

      let url =
        this.state.servername +
        'SaveCompanyLogin?username=' +
        this.state.name +
        '&password=' +
        this.state.password +
        '&firstname=' +
        this.state.firstname +
        '&emailAddress=' +
        this.state.email;
      fetch(url, {
        method: 'GET',
      })
        .then(response => response.json())
        .then(responseJson => {
          this.setState({
            responseId: responseJson.ID,
          });
          console.log(this.state.responseId);
          if (this.state.responseId == 200) {
            console.log('Successfully Registered');
             //alert('Successfully Registered');
              this.props.navigation('Login');
            // Alert.alert('Success', 'Successfully Registered', {
            //   text: 'OK',
            //   onPress: () => this.props.navigation('Main'),
            // });
          } else if (this.state.responseId == 320) {
            console.log('User Already exists');
            alert('User Already exists');
          } else {
            alert('Registration Failed');
            //
            // onPress:()=>{this.props.navigation.navigate('Main')}
            // Alert.alert(
            //   'Error',
            //   'Registration Failed.',
            //   { text: 'OK' },
            //   { cancelable: false }
            // );
          }
        })
        .catch(error => {
          //values.ids.includes(text)
          if (error.includes('Network request failed ')) {
            console.log('Network request failed');
            Alert.alert(
              'Error',
              'Connection Failed..',
              { text: 'OK' },
              { cancelable: false }
            );
          }
          console.error(error); //
        });
    } else {
      Alert.alert(
        'Error',
        'Please Fill All Fields.',
        { text: 'OK' },
        { cancelable: false }
      );
    }
  }

  setFocus(hasFocus) {
    this.setState({
      hasFocus,
    });
  }
  render() {
    this.getData();

    const { shift } = this.state;

    return (
      <ImageBackground
        source={require('../img/back_reg.png')}
        style={styles.container}>
        <StatusBar barStyle="light-content" />

        <View style={styles.ImgContainer}>
          <Image
            resizeMode="contain"
            source={require('../img/logo.png')}
            style={styles.fixmartImg}
            fadeDuration={2}
          />
        </View>
        <Animated.View
          style={[
            styles.NotImgContainer,
            { transform: [{ translateY: shift }] },
          ]}>
          <View style={styles.NotImgContainer}>
            <View style={styles.RegisterContainer}>
              <View style={styles.RegisterHead}>
                <Text style={styles.txtRegHead}>
                  {this.state.mydata.RegisterHeader}
                </Text>
              </View>

              <View style={styles.RegisterBody}>
                <View style={styles.InputText}>
                  <View style={styles.IconStyleNew}>
                    <Icon name="user" size={30} color="#072b63" />
                  </View>
                  <View style={styles.AllInputText}>
                    <TextInput
                      placeholderTextColor="#454647"
                      style={styles.NameInputStyle}
                      placeholder={this.state.mydata.LblFirstname}
                      value={this.state.firstname}
                      onChangeText={this.ChangeFirstName}
                      returnKeyType="done"
                      underlineColorAndroid="transparent"
                      onFocus={this.setFocus.bind(this, true)}
                      onBlur={this.setFocus.bind(this, false)}
                    />
                    <Text style={styles.errorTextStyle}>
                      {this.state.FirstnameError}
                    </Text>
                  </View>
                </View>

                <View style={styles.InputText}>
                  <View style={styles.IconStyleNew}>
                    <Icon
                      name="lock"
                      size={30}
                      color="#072b63"
                      style={styles.IconStyle}
                    />
                  </View>
                  <View style={styles.AllInputText}>
                    <TextInput
                      placeholderTextColor="#454647"
                      style={styles.NameInputStyle}
                      placeholder={this.state.mydata.LblPassword}
                      value={this.state.password}
                      secureTextEntry={true}
                      onChangeText={this.ChangePassword}
                      returnKeyType="done"
                      underlineColorAndroid="transparent"
                    />
                    <Text style={styles.errorTextStyle}>
                      {this.state.PasswordError}
                    </Text>
                  </View>
                </View>

                <View style={styles.InputText}>
                  <View style={styles.IconStyleNew}>
                    <Icon
                      name="lock"
                      size={30}
                      color="#072b63"
                      style={styles.IconStyle}
                    />
                  </View>
                  <View style={styles.AllInputText}>
                    <TextInput
                      placeholderTextColor="#454647"
                      style={styles.NameInputStyle}
                      placeholder={this.state.mydata.LblConfirmPassword}
                      secureTextEntry={true}
                      value={this.state.c_password}
                      onChangeText={this.ChangeConfirmPassword}
                      returnKeyType="done"
                      underlineColorAndroid="transparent"
                    />
                    <Text style={styles.errorTextStyle}>
                      {this.state.ConfirmPasswordError}
                    </Text>
                  </View>
                </View>

                <View style={styles.InputText}>
                  <View style={styles.IconStyleNew}>
                    <Icon name="id-card-o" size={28} color="#072b63" />
                  </View>
                  <View style={styles.AllInputText}>
                    <TextInput
                      placeholderTextColor="#454647"
                      style={styles.NameInputStyle}
                      placeholder={this.state.mydata.LblNIC}
                      value={this.state.nic}
                      onChangeText={this.ChangeNIC}
                      underlineColorAndroid="transparent"
                    />
                    <Text style={styles.errorTextStyle}>
                      {this.state.NICError}
                    </Text>
                  </View>
                </View>

                <View style={styles.InputText}>
                  <View style={styles.IconStyleNew}>
                    <Icon name="envelope" size={28} color="#072b63" />
                  </View>
                  <View style={styles.AllInputText}>
                    <TextInput
                      placeholderTextColor="#454647"
                      style={styles.NameInputStyle}
                      placeholder={this.state.mydata.LblEmail}
                      value={this.state.email}
                      onChangeText={this.ChangeEmail}
                      returnKeyType="done"
                      underlineColorAndroid="transparent"
                    />
                    <Text style={styles.errorTextStyle}>
                      {this.state.EmailError}
                    </Text>
                  </View>
                </View>

                <View style={styles.btnRegister}>
                  <TouchableOpacity>
                    <Text
                      style={styles.txtRegister}
                      onPress={() => this.submit(this.state.canSubmit)}>
                      {this.state.mydata.BtnRegister}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Animated.View>
        <View style={styles.EmptyContainer} />
      </ImageBackground>
    );
  }

  handleKeyboardDidShow = event => {
    const { height: windowHeight } = Dimensions.get('window');
    const keyboardHeight = event.endCoordinates.height;
    const currentlyFocusedField = TextInputState.currentlyFocusedField();
    UIManager.measure(
      currentlyFocusedField,
      (originX, originY, width, height, pageX, pageY) => {
        const fieldHeight = height;
        const fieldTop = pageY;
        const gap = windowHeight - keyboardHeight - (fieldTop + fieldHeight);
        if (gap >= 0) {
          return;
        }
        Animated.timing(this.state.shift, {
          toValue: gap,
          duration: 1000,
          useNativeDriver: true,
        }).start();
      }
    );
  };

  handleKeyboardDidHide = () => {
    Animated.timing(this.state.shift, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };
}
//envelope-o envelope-open -o photo picture-o user-circle-o
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  ImgContainer: {
    marginTop: 10,
    flex: 0.7,
    alignItems: 'center',
  },
  NotImgContainer: {
    flex: 3,
  },
  EmptyContainer: {
    flex: 0.5,
  },
  RegisterContainer: {
    flex: 1,
    margin: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  RegisterHead: {
    justifyContent: 'center',
    flex: 0.7,
    backgroundColor: '#a50404',
  },
  InputText: {
    flex: 1,
    backgroundColor: 'rgba(246,241,248,0)',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 10,
  },
  btnRegister: {
    flex: 1,
    backgroundColor: '#a50404',
    flexDirection: 'row',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 40,
    marginBottom: 20,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 10,
    overflow: 'hidden',
  },
  InputText1: {
    flex: 1,
    backgroundColor: 'rgba(246,241,248,0)',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: 3,
  },
  InputText2: {
    flex: 1,
    backgroundColor: 'rgba(246,241,248,0)',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  RegisterBody: {
    flex: 5,
    backgroundColor: 'rgba(246,241,248,0)',
  },
  txtRegHead: {
    alignItems: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: 20,
  },
  fixmartImg: {
    tintColor: 'rgba(218, 40, 40, 1)',
    width: 100,
    height: '100%',
    alignItems: 'center',
  },

  NameInputStyle: {
    width: Dimensions.get('window').width - 100,
    backgroundColor: 'rgba(246,241,248,0)',
    color: 'black',
    fontSize: 15,
    borderBottomWidth: 0.6,
  },
  AllInputText: {
    flexDirection: 'column',
    flex: 1,
    marginLeft: 5,
  },
  IconStyleNew: {
    flex: 0.2,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtRegister: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  errorTextStyle: {
    color: 'red',
  },
});
