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
  ImageBackground,
  StatusBar,
  Animated,
  Keyboard,
  UIManager,
  TextInput,
} from 'react-native';
import { Constants, BarCodeScanner, Permissions } from 'expo';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Dropdown } from 'react-native-material-dropdown';
import Button from 'apsl-react-native-button';

import ProgressCircle from 'react-native-progress-circle';
import KeyboardShift from '../components/KeyboardShift';

const { State: TextInputState } = TextInput;

export default class NoQrCodeComplain extends Component {
  static navigationOptions = {
    title: 'Add Complain',
    headerStyle: {
      backgroundColor: '#071a5a',
    },
    headerTintColor: '#fff',
    headerfontWeight: 'bold',
  };

  constructor(props) {
    super(props);
    this.state = {
      // AppId :this.props.navigation.state.params.scannerId,
      phone: '',
      AppId: '2',
      isLoading: true,
      myData: { areaId: '3' },
      ServerId: '500',
      SendData: null,
      servername: 'http://203.81.101.197:9096/Service1.svc/',

      DivisionCount: '0',
      DivisionAll: null,
      Divisionsw: [],
      Division: [],
      selectedDivision: '',
      selectedDivisionId: '',
      DivisionAllId: [],

      floorCount: '1',
      floorAll: null,
      floorsw: [],
      floor: [],
      selectedfloor: '',
      selectedfloorId: '',
      floorAllId: [],

      areaCount: '0',
      areaAll: null,
      areasw: [],
      area: [],
      selectedarea: '',

      selectedareaId: '',
      areaAllId: [],

      ItemCount: '0',
      ItemAll: null,
      Itemsw: [],
      Item: [],
      SelectedItem: '',
      SelectedItemId: '',
      ItemAllId: [],

      ItemCountNew: '0',
      ItemswNew: [],
      ItemAllNew: [],
      ShowDropDown: true,
      ItemNew: [],
      SelectedItemIdNew: '',
      ItemAllIdNew: [],

      ItemCountCategory: '0',
      ItemswCategory: [],
      ItemAllCategory: [],
      ItemCategory: [],
      SelectedItemIdCategory: '',
      ItemAllIdCategory: [],

      ItemCountSubCategory: '0',
      ItemswSubCategory: [],
      ItemAllSubCategory: [],
      ItemSubCategory: [],
      SelectedItemIdSubCategory: '',
      ItemAllIdSubCategory: [],
      PhoneError:'',

      UserId: '1037',
      subCategory: '',
      myText: 'ggg',
      shift: new Animated.Value(0),
      gotData: false,
      remark:'',
    };

    this.onChangeFloor = this.onChangeFloor.bind(this);
    this.onChangeArea = this.onChangeArea.bind(this);

    this.onChangeItemCategory = this.onChangeItemCategory.bind(this);
    this.onChangeItemSubCategory = this.onChangeItemSubCategory.bind(this);
    this.onChangeItemNew = this.onChangeItemNew.bind(this);
    this.onChangeDivision = this.onChangeDivision.bind(this);
    this.changePhone = this.changePhone.bind(this);
  }

  componentWillMount() {
    this.keyboardDidShowSub = Keyboard.addListener(
      'keyboardDidShow',
      this.handleKeyboardDidShow
    );
    this.keyboardDidHideSub = Keyboard.addListener(
      'keyboardDidHide',
      this.handleKeyboardDidHide
    );
  }

  changePhone(text) {
    console.log(text);
    if (text == '' || !text) {
      this.setState({
        PhoneError: '',
      });
    } else {
      if (text.length == 10) {
        let re = '^[0-9]{10}';
        if (String(text).match(re)) {
          this.setState({
            PhoneError: '',
          });
        } else {
          this.setState({
            PhoneError: 'Invalid Phone Number',
          });
        }
      } else {
        this.setState({
          PhoneError: 'Invalid Phone Number',
        });
      }
    }
  }
  componentWillUnmount() {
    this.keyboardDidShowSub.remove();
    this.keyboardDidHideSub.remove();
  }

  componentDidMount() {
    let id = this.state.AppId;

    if (!this.state.gotData) {
      let url = this.state.servername + 'FetchFloorByBuildingID';
      console.log(url);
      fetch(url, { method: 'GET' })
        .then(response => response.json())
        .then(responseJson => {
          if (responseJson.ID == 200) {
            this.setState({
              floorAll: JSON.parse(responseJson.Data),
              isLoading: false,
              floorCount: '0',
              gotData: true,
            });
          } else {
            console.log(responseJson);
          }
        })
        .catch(error => {
          console.error(error);
        });
    }
  }

  onChangeItemNew(text) {
    this.state.ItemAllIdNew.map(values => {
      if (values.ids.includes(text)) {
        const item_array = values.ids.split(',');
        this.setState({
          SelectedItemId: item_array[0],
          ItemCountNew: '0',
        });
      }
    });
    console.log('SelectedItemIdNeww ' + this.state.SelectedItemId);
  }

  onChangeItemSubCategory(text) {
    this.state.ItemAllIdSubCategory.map(values => {
      if (values.ids.includes(text)) {
        const item_array = values.ids.split(',');
        this.setState({
          SelectedItemIdSubCategory: item_array[0],
          ItemCountSubCategory: '0',
        });
      }
    });

    fetch(
      this.state.servername +
        'FetchItemListWiseCatIdSubCat?categoryId=' +
        this.state.SelectedItemIdCategory +
        '&subCategoryId=' +
        this.state.SelectedItemIdSubCategory,
      {
        method: 'GET',
      }
    )
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.ID == 200) {
          this.setState({
            ItemAllNew: JSON.parse(responseJson.Data),
            ItemCountNew: '1',
          });
        } else {
          //   console.log('responseJson');
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  onChangeFloor(text) {
    //  this.setState({ selectedfloor: text });

    this.state.floorAllId.map(values => {
      if (values.ids.includes(text)) {
        const item_array = values.ids.split(',');
        this.setState({
          selectedfloorId: item_array[0],
          // areasw: [],
          // areaAllId: [],
          floorCount: '1',
        });
      }
    });

    //  console.log(this.state.selectedfloorId);
    let url =
      this.state.servername +
      'fetchDivisionByFloorID?floorID=' +
      this.state.selectedfloorId;

    console.log(url);

    fetch(url, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.ID == 200) {
          this.setState({
            DivisionAll: JSON.parse(responseJson.Data),
            DivisionCount: '1',
          });
        } else {
          console.log('responseJson');
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  onChangeDivision(text) {
    this.state.DivisionAllId.map(values => {
      if (values.ids.includes(text)) {
        const item_array = values.ids.split(',');
        this.setState({
          selectedDivisionId: item_array[0],
          DivisionCount: '0',
        });
      }
    });

    let url =
      this.state.servername +
      'FetchAreaList?divisionID=' +
      this.state.selectedDivisionId;
    console.log(url);
    fetch(url, { method: 'GET' })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.ID == 200) {
          this.setState({
            areaAll: JSON.parse(responseJson.Data),
            areaCount: '1',
          });
        } else {
          console.log('responseJson');
        }
      })
      .catch(error => {
        console.error(error);
      });
  }
  onChangeArea(text) {
    // this.setState({ selectedarea: text });

    this.state.areaAllId.map(values => {
      if (values.ids.includes(text)) {
        const item_array = values.ids.split(',');
        this.setState({
          selectedareaId: item_array[0],
          ItemCountCategory: '1',
          areaCount: '0',
          // ItemswCategory: [],
          // ItemAllIdCategory: [],
          // ItemswSubCategory: [],
          // ItemAllIdSubCategory: [],
          // ItemswNew: [],
          // ItemAllIdNew: [],
        });
      }
    });

    fetch(this.state.servername + 'FetchItemCategoryList', {
      method: 'GET',
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.ID == 200) {
          this.setState({
            ItemAllCategory: JSON.parse(responseJson.Data),
            isLoading: false,
            areaCount: '0',
            ItemCountCategory: '1',
            // ItemswCategory: [],
            // ItemAllIdCategory: [],
            // ItemswSubCategory: [],
            // ItemAllIdSubCategory: [],
          });
        } else {
          console.log('responseJson');
        }
      })
      .catch(error => {
        console.error(error);
      });

    // console.log(this.state.selectedareaId);
  }
  onChangeItemCategory(text) {
    this.state.ItemAllIdCategory.map(values => {
      if (values.ids.includes(text)) {
        const item_array = values.ids.split(',');
        this.setState({
          SelectedItemIdCategory: item_array[0],
          ItemCountCategory: '0', //
        });
      }
    });
    console.log('SelectedItemIdCategory ' + this.state.SelectedItemIdCategory);

    fetch(
      this.state.servername +
        'FetchItemSubCategoryByCategoryId?categoryId=' +
        this.state.SelectedItemIdCategory,
      {
        method: 'GET',
      }
    )
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.ID == 200) {
          this.setState({
            ItemAllSubCategory: JSON.parse(responseJson.Data),
            ItemCountSubCategory: '1',
            ItemswSubCategory: [],
            ItemAllIdSubCategory: [],
          });
        } else {
          console.log('responseJson');
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  onChangeItem(text) {
    this.state.ItemAllId.map(values => {
      if (values.ids.includes(text)) {
        const item_array = values.ids.split(',');
        this.setState({
          SelectedItemId: item_array[0],
          ItemCount: '0',
        });
      }
    });
    console.log('SelectedItemId ' + this.state.SelectedItemId);

    if (this.state.SelectedItemId != '') {
      fetch(
        this.state.servername +
          'GetLocationItemDetals?locationID=' +
          this.state.SelectedItemId,
        {
          method: 'GET',
        }
      )
        .then(response => response.json())
        .then(responseJson => {
          if (responseJson.ID == 200) {
            this.setState({
              ItemAll: JSON.parse(responseJson.Data),
              isLoading: false,
            });
          } else {
            console.log(responseJson);
          }
        })
        .catch(error => {
          console.error(error);
        });
    }
  }

  render() {
    if (!this.state.isLoading) {
      if (this.state.floorCount == '0') {
        if (this.state.floorAll != null) {
          this.state.floorAll.map(product => {
            this.state.floorsw.push({ value: product.floorName });
            this.state.floorAllId.push({
              ids: product.floorId + ' , ' + product.floorName,
            });
          });

          this.setState({
            floorCount: '1',
          });
        }
      }

      if (this.state.DivisionCount == '1') {
        if (this.state.DivisionAll != null) {
          this.state.DivisionAll.map(product => {
            this.state.Divisionsw.push({ value: product.DivisionName });
            this.state.DivisionAllId.push({
              ids: product.DivisionID + ' , ' + product.DivisionName,
            });
          });

          this.setState({
            DivisionCount: '0',
          });
        }
      }
      if (this.state.areaCount == '1') {
        if (this.state.areaAll != null) {
          this.state.areaAll.map(product => {
            this.state.areasw.push({ value: product.areaName });
            this.state.areaAllId.push({
              ids: product.areaId + ' , ' + product.areaName,
            });
          });

          this.setState({
            areaCount: '0',
          });
        }
      }

      if (this.state.ItemCountCategory == '1') {
        //ItemCountCategory
        if (this.state.ItemAllCategory != null) {
          this.state.ItemAllCategory.map(product => {
            this.state.ItemswCategory.push({ value: product.CategoryName });
            this.state.ItemAllIdCategory.push({
              ids: product.CategoryId + ' , ' + product.CategoryName,
            });
          });

          this.setState({
            ItemCountCategory: '0',
          });
        }
      }

      if (this.state.ItemCountSubCategory == '1') {
        if (this.state.ItemAllSubCategory != null) {
          this.state.ItemAllSubCategory.map(product => {
            this.state.ItemswSubCategory.push({
              value: product.SubCategoryName,
            });
            this.state.ItemAllIdSubCategory.push({
              ids: product.SubCategoryId + ' , ' + product.SubCategoryName,
            });
          });

          this.setState({
            ItemCountSubCategory: '0',
          });
        }
      }

      if (this.state.ItemCountNew == '1') {
        if (this.state.ItemAllNew != null) {
          this.state.ItemAllNew.map(product => {
            this.state.ItemswNew.push({ value: product.ItemName });
            this.state.ItemAllIdNew.push({
              ids: product.ItemId + ' , ' + product.ItemName,
            });
          });

          this.setState({
            ItemCountNew: '0',
          });
        }
      }

      if (this.state.ItemCount == '1') {
        if (this.state.ItemAll != null) {
          this.state.ItemAll.map(product => {
            this.state.Itemsw.push({ value: product._AddItem.ItemName });
            this.state.ItemAllId.push({
              ids: product._AddItem.ItemId + ' , ' + product._AddItem.ItemName,
            });
          });

          this.setState({
            ItemCount: '0',
          });
        }
      }
      const { shift } = this.state;
      return (
        <ImageBackground
          source={require('../img/back_reg.png')}
          style={styles.Container}>
          <StatusBar barStyle="light-content" />
          <ScrollView style={styles.EmptyContent1}>
            <Animated.View style={{ transform: [{ translateY: shift }] }}>
              <View style={styles.mybox}>
                <View style={styles.InsideText}>
                  <View style={styles.LabelHeader}>
                    <Icon name="home" size={23} color="white" />
                    <Text>{'   '}</Text>
                    <Text style={styles.text1Style}>Floor</Text>
                  </View>
                  <Dropdown
                    label="Select Floor"
                    data={this.state.floorsw}
                    onChangeText={this.onChangeFloor}
                    pickerStyle={styles.dropDownStyle}
                    containerStyle={styles.dropDownContainer}
                    itemCount="5"
                    style={{ color: '#4db8ff' }}
                    baseColor="#4db8ff"
                  />
                </View>
              </View>
              <View style={styles.mybox}>
                <View style={styles.InsideText}>
                  <View style={styles.LabelHeader}>
                    <Icon name="map" size={20} color="white" />
                    <Text>{'   '}</Text>
                    <Text style={styles.text1Style}>Division</Text>
                  </View>

                  <Dropdown
                    label="Select Division"
                    data={this.state.Divisionsw}
                    onChangeText={this.onChangeDivision}
                    pickerStyle={styles.dropDownStyle}
                    containerStyle={styles.dropDownContainer}
                    itemCount="5"
                    style={{ color: '#4db8ff' }}
                    baseColor="#4db8ff"
                  />
                </View>
              </View>
              <View style={styles.mybox}>
                <View style={styles.InsideText}>
                  <View style={styles.LabelHeader}>
                    <Icon name="map-marker" size={20} color="white" />
                    <Text>{'   '}</Text>
                    <Text style={styles.text1Style}>Area</Text>
                  </View>

                  <Dropdown
                    label="Select Area"
                    data={this.state.areasw}
                    onChangeText={this.onChangeArea}
                    pickerStyle={styles.dropDownStyle}
                    containerStyle={styles.dropDownContainer}
                    itemCount="5"
                    style={{ color: '#4db8ff' }}
                    baseColor="#4db8ff"
                  />
                </View>
              </View>

              {this.state.ShowDropDown && (
                <View style={styles.mybox}>
                  <View style={styles.InsideText}>
                    <View style={styles.LabelHeader}>
                      <Icon name="th-list" size={20} color="white" />
                      <Text>{'   '}</Text>
                      <Text style={styles.text1Style}>Complain Category</Text>
                    </View>
                    <Dropdown
                      label="Select Complain Category"
                      data={this.state.ItemswCategory}
                      onChangeText={this.onChangeItemCategory}
                      pickerStyle={styles.dropDownStyle}
                      containerStyle={styles.dropDownContainer}
                      itemCount="10"
                      style={{ color: '#4db8ff' }}
                      baseColor="#4db8ff"
                    />
                  </View>
                </View>
              )}
              {this.state.ShowDropDown && (
                <View style={styles.mybox}>
                  <View style={styles.InsideText}>
                    <View style={styles.LabelHeader}>
                      <Icon name="list" size={20} color="white" />
                      <Text>{'   '}</Text>
                      <Text style={styles.text1Style}>
                        Complain Sub Category
                      </Text>
                    </View>
                    <Dropdown
                      label="Select Complain Sub Category"
                      data={this.state.ItemswSubCategory}
                      onChangeText={this.onChangeItemSubCategory}
                      pickerStyle={styles.dropDownStyle}
                      containerStyle={styles.dropDownContainer}
                      itemCount="10"
                      style={{ color: '#4db8ff' }}
                      baseColor="#4db8ff"
                    />
                  </View>
                </View>
              )}

              {this.state.ShowDropDown && (
                <View style={styles.mybox}>
                  <View style={styles.InsideText}>
                    <View style={styles.LabelHeader}>
                      <Icon name="list-alt" size={20} color="white" />
                      <Text>{'   '}</Text>
                      <Text style={styles.text1Style}>Complain</Text>
                    </View>
                    <Dropdown
                      label="Select Complain"
                      data={this.state.ItemswNew}
                      onChangeText={this.onChangeItemNew}
                      pickerStyle={styles.dropDownStyle}
                      containerStyle={styles.dropDownContainer}
                      itemCount="10"
                      style={{ color: '#4db8ff' }}
                      baseColor="#4db8ff"
                    />
                  </View>
                </View>
              )}

              <View style={styles.mybox}>
                <View style={styles.InsideText}>
                  <View style={styles.LabelHeader}>
                    <Icon name="mobile" size={23} color="white" />
                    <Text>{'   '}</Text>
                    <Text style={styles.text1Style}>Contact Number</Text>
                  </View>
                  <View>
                    <TextInput
                      placeholderTextColor="#4db8ff"
                      placeholder="Enter mobile number for get alerts"
                      style={styles.NameInputStyle}
                      onChangeText={this.changePhone}
                      returnKeyType="done"
                      underlineColorAndroid="transparent"
                    />
                    <Text style= {styles.errorTextStyle}>{this.state.PhoneError}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.myboxN}>
                <View style={styles.InsideTextN}>
                  <View style={styles.LabelHeader}>
                    <Icon name="sticky-note-o" size={20} color="white" />
                    <Text>{'   '}</Text>
                    <Text style={styles.text1StyleN}>Remark</Text>
                  </View>
                </View>
                <View style={styles.InsideTextN1}>
                  <TextInput
                    placeholderTextColor="#4db8ff"
                    placeholder="Remark"
                    style={styles.NameInputStyle}
                    onChangeText={remark => this.setState({ remark })}
                    returnKeyType="done"
                    underlineColorAndroid="transparent"
                    multiline={true}
                  />
                </View>
              </View>

              <View style={styles.myboxN}>
                <View style={styles.InsideTextN}>
                  <View style={styles.LabelHeader}>
                    <Icon name="camera" size={20} color="white" />
                    <Text>{'   '}</Text>
                    <Text style={styles.text1StyleN}>Image</Text>
                  </View>
                </View>
                <View style={styles.InsideTextN1}>
                  <Text style={styles.text2StyleN}>
                    Please Capture an Image
                  </Text>
                </View>
              </View>
            </Animated.View>
          </ScrollView>

          <View style={styles.EmptyContent3}>
            <Button
              style={styles.btnAddComplain}
              textStyle={styles.btnText}
              onPress={() => this.submit()}>
              MAKE COMPLAIN
            </Button>
          </View>
        </ImageBackground>
      );
    } else {
      return (
        <ImageBackground
          source={require('../img/back_reg.png')}
          style={styles.Container}>
          <View style={styles.Container2}>
            <ProgressCircle
              percent={50}
              radius={50}
              color="#3399FF"
              shadowColor="#999"
              bgColor="#fff">
              <Text style={{ fontSize: 18 }}>{'50%'}</Text>
            </ProgressCircle>
          </View>
        </ImageBackground>
      );
    }
  }

  submit() {
   if(this.state.selectedareaId =='' && this.state.SelectedItemId =='' ){
     alert("Please select Item Details and Location Details");
   }else{
    let date = Math.floor(Date.now());
    let url = this.state.servername + 'InserComplainsWithImage';

    console.log('remark  ' + this.state.remark);
    console.log('selectedItemId  ' + this.state.SelectedItemId);
    console.log('phone  ' + this.state.phone);
    console.log('areaID ' + this.state.selectedareaId);
    console.log('UserId ' + this.state.UserId);
    console.log('phone Error ' + this.state.PhoneError);

    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
     
      body: JSON.stringify({
        ComplainID: 0,
        ComplianDate: '/Date(' + date + ')/',
        Cusmobilenumber: this.state.phone,
        LocationID: this.state.selectedareaId,
        StatusiD: 0,
        ComplainRemark: this.state.remark,
        WorkCategoryID: 0,
        _ComplainImageList: [
          { Image: [0], ImageSeq: 0, ImageType: 'C', ImageURL: '' },
        ],
        itemID: this.state.SelectedItemId,
        userID: this.state.UserId,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        // console.log(responseJson);
        this.setState({
          SendData: responseJson,
        });
      console.log(responseJson);
        if (responseJson.ID == 200) {
          alert('Successfully Made a complain');
          // Alert.alert('Success', 'Successfully Made a complain', {
          //   text: 'OK',
          //   onPress: () => this.props.navigation.goBack(),
          // });
          this.props.navigation.navigate('Main');
        } else {
          Alert.alert(
            'Error',
            'Complain Failed.',
            { text: 'OK' },
            { cancelable: false }
          );
        }
      })
      .catch(error => {
        console.error(error);
      });
   }
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

const styles = StyleSheet.create({
  Container: {
    alignItems: 'center',
    flexDirection: 'column',
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
  },
  Container2: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
  },

  EmptyContent1: {
    flex: 3,
    alignSelf: 'stretch',
  },

  InsideText: {
    marginBottom: 5,
    marginTop: 10,
    marginLeft: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  InsideTextN: {
    marginLeft: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 1,
    marginTop: 20,
    marginBottom: 20,
  },
  InsideTextN1: {
    marginLeft: 20,
    marginBottom: 20,
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1,
  },
  EmptyContent3: {
    flex: 0.1,
    flexDirection: 'column',
    alignSelf: 'stretch',
  },
  btnAddComplain: {
    justifyContent: 'flex-end',
    backgroundColor: 'red',
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
  },
  mybox: {
    flex: 1,
    alignSelf: 'stretch',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 15,
    marginBottom: 5,
    flexDirection: 'row',
    borderColor: '#fff',
    borderWidth: 2,
    justifyContent: 'center',
  },
  LabelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  myboxN: {
    flex: 1,
    alignSelf: 'stretch',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 15,
    marginBottom: 5,
    flexDirection: 'column',
    borderColor: '#fff',
    borderWidth: 2,
  },
  text1Style: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  text1StyleN: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  text2StyleN: {
    color: '#4db8ff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  NameInputStyle: {
    width: Dimensions.get('window').width - 50,
    height: 60,
    backgroundColor: 'rgba(246,241,248,0)',
    color: '#4db8ff',
    borderBottomWidth: 1,
    borderBottomColor: '#4db8ff',
  },
  dropDownStyle: {
    backgroundColor: 'white',
  },
  dropDownContainer: {
    backgroundColor: 'rgba(246,241,248,0)',
    width: Dimensions.get('window').width - 50,

    color: '#4db8ff',
  },
  errorTextStyle: {
    color: 'red',
  },
});
