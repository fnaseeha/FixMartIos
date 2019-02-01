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
  AsyncStorage,
  StatusBar,
  TextInput,
  FlatList,
} from 'react-native';
import Button from 'apsl-react-native-button';
import Login from './Login';
import Main from './Main';
const util = require('util');
import Icon from 'react-native-vector-icons/FontAwesome';

const MainColor = '#071a5a';

export default class History extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      searchItem: '',
      UserId: '1037', //1058
      Datas: null,
      servername: 'http://203.81.101.197:9096/Service1.svc/',
      myList: [],
      havaData: false,
      NewData: null,
      alreadySet: false,
    };
    this.resetArrayList = this.resetArrayList.bind(this);
    this.getData = this.getData.bind(this);
  }

getData(){
 let uId = this.state.UserId;
    if (this.props.navigation != null) {
      if (this.props.navigation.state.params.UserId != null) {
        uId = this.props.navigation.state.params.UserId;
      }
    }
    let url = this.state.servername + 'GetComplainStatusByUserID?UserID=' + uId;
    console.log(url);
    fetch(url, { method: 'GET' })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.ID == 200) {
          this.setState({
            Datas: JSON.parse(responseJson.Data),
            havaData: true,
          });
        } else {
          //   console.log('responseJson');
        }
      })
      .catch(error => {
        console.error(error);
      });
}
  // this.state.servername +
  //       'GetComplainStatusByUserID?UserID=' +
  //       this.props.navigation.state.params.UserId;
  componentDidMount() {
   this.getData();
  }
  static navigationOptions = {
    title: 'Historyy',
    headerStyle: {
      backgroundColor: MainColor,
    },
    headerTintColor: '#fff',
    headerfontWeight: 'bold',
  };
  resetArrayList(text) {
    let mydata = this.state.Datas;
  console.log("text "+text );
    if (!text || text === '') {
      console.log("text is empty");
       this.setState({
            havaData:true,
         });
       this.getData();

    } else {
      if (mydata != null) {
        let filteredList = mydata.filter(item => {
          if (item.ComplainID != null) {
            //  console.log(item.ComplainID.includes(text));
            if (item.ComplainID.includes(text)) return item;
          }
        });
        if (filteredList.length == 0) {
          // set no data flag to true so as to render flatlist conditionally
         this.setState({
            havaData:false,
         });
        } else {
          this.setState({
            Datas: filteredList,
            havaData:true,
          });
        }
      }
    }

   
  }

  render() {
    let re = /\((.*)\)/;

    if (this.state.havaData) {
      if (this.state.Datas != null) {
        this.state.Datas.map(values => {
          let len = String(values.ComplainID).length;
          let want = len;
          console.log("want "+want);
        if(want<8){
          if (len < 8) {
            want = 8 - len;
          }
          let c_id = values.ComplainID;
          if (want > 0) {
            for (let i = 0; i < want; i++) {
              c_id = '0' + c_id;
            }
          } else {
            c_id = values.ComplainID;
          }
          values.ComplainID = c_id;
        }
          
          if (values.ComplianDate != null) {
            let date = new Date();
            if (values.ComplianDate == null) {
              date = new Date();
            } else if (values.ComplianDate.includes('/Date')) {
              date = new Date(parseInt(values.ComplianDate.match(re)[1]));
              // console.log(date);
            }

            let month = date.getMonth() + 1;
            if (month < 10) {
              month = '0' + month;
            }

            let day = date.getDate();
            if (day < 10) {
              day = '0' + day;
            }

            let hour = date.getHours();
            if (hour < 10) {
              hour = '0' + hour;
            }

            let min = date.getMinutes();
            if (min < 10) {
              min = '0' + min;
            }

            let sec = date.getSeconds();
            if (sec < 10) {
              sec = '0' + sec;
            }

            let finalDate =
              date.getFullYear() +
              '-' +
              month +
              '-' +
              day +
              ' ' +
              hour +
              ':' +
              min +
              ':' +
              sec;
            values.ComplianDate = finalDate;
          }
        });
      }
      //String url = SERVICE_URL +"GetComplainStatusByUserID?UserID="+userId;

      return (
        <View style={styles.Container}>
          <StatusBar barStyle="light-content" />

          <View style={styles.SearchContainer}>
            <View style={styles.IconStyle}>
              <Icon name="search" size={20} color="#72777f" />
            </View>
            <View style={styles.SearchStyle}>
              <TextInput
                style={styles.NameInputStyle}
                placeholder="Search By Complain Id"
                onChangeText={this.resetArrayList}
                returnKeyType="done"
                underlineColorAndroid="transparent"
              />
            </View>
          </View>

          <ScrollView style={styles.BodyContainer}>
            <FlatList
              data={this.state.Datas}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={styles.complainItems}>
                  <View style={styles.AllItemContainer}>
                    <View style={styles.IconContainer}>
                      <Icon name="address-card" size={20} color={MainColor} />
                    </View>

                    <View style={styles.ComplainItem}>
                      <Text>Complain ID</Text>
                      <Text style={styles.TxtComplain}>{item.ComplainID}</Text>
                    </View>
                  </View>
                  <View style={styles.AllItemContainer}>
                    <View style={styles.IconContainer}>
                      <Icon name="calendar" size={20} color={MainColor} />
                    </View>
                    <View style={styles.ComplainItem}>
                      <Text>Complain Date</Text>
                      <Text style={styles.TxtComplainDate}>
                        {item.ComplianDate}
                      </Text>
                    </View>
                  </View>

                  {(() => {
                    switch (item.StatusiD) {
                      case 0:
                        return (
                          <View style={styles.AllItemContainer}>
                            <View style={styles.IconContainer}>
                              <Icon
                                name="spinner"
                                size={20}
                                color={MainColor}
                              />
                            </View>
                            <View style={styles.ComplainItem}>
                              <Text>Complain Status</Text>
                              <Text style={styles.TxtComplainStatus}>
                                Pending
                              </Text>
                            </View>
                          </View>
                        );
                      case 1:
                        return (
                          <View style={styles.AllItemContainer}>
                            <View style={styles.IconContainer}>
                              <Icon
                                name="check-circle"
                                size={20}
                                color={MainColor}
                              />
                            </View>
                            <View style={styles.ComplainItem}>
                              <Text>Complain Status</Text>
                              <Text style={styles.TxtComplainStatus}>
                                Accepted
                              </Text>
                            </View>
                          </View>
                        );
                      case 2:
                        return (
                          <View style={styles.AllItemContainer}>
                            <View style={styles.IconContainer}>
                              <Icon
                                name="check-circle"
                                size={20}
                                color={MainColor}
                              />
                            </View>
                            <View style={styles.ComplainItem}>
                              <Text>Complain Status</Text>
                              <Text style={styles.TxtComplainStatus}>
                                Completed
                              </Text>
                            </View>
                          </View>
                        );
                      case 3:
                        return (
                          <View style={styles.AllItemContainer}>
                            <View style={styles.IconContainer}>
                              <Icon
                                name="times-circle"
                                size={20}
                                color={MainColor}
                              />
                            </View>
                            <View style={styles.ComplainItem}>
                              <Text>Complain Status</Text>
                              <Text style={styles.TxtComplainStatus}>
                                Rejected
                              </Text>
                            </View>
                          </View>
                        );
                      case 4:
                        return (
                          <View style={styles.AllItemContainer}>
                            <View style={styles.IconContainer}>
                              <Icon name="share" size={20} color={MainColor} />
                            </View>
                            <View style={styles.ComplainItem}>
                              <Text>Complain Status</Text>
                              <Text style={styles.TxtComplainStatus}>
                                Forward
                              </Text>
                            </View>
                          </View>
                        );
                      case 5:
                        return (
                          <View style={styles.AllItemContainer}>
                            <View style={styles.IconContainer}>
                              <Icon
                                name="check-circle"
                                size={20}
                                color={MainColor}
                              />
                            </View>
                            <View style={styles.ComplainItem}>
                              <Text>Complain Status</Text>
                              <Text style={styles.TxtComplainStatus}>
                                Meterial Request Note
                              </Text>
                            </View>
                          </View>
                        );
                      default:
                        return (
                          <View style={styles.AllItemContainer}>
                            <View style={styles.IconContainer}>
                              <Icon
                                name="question-circle"
                                size={20}
                                color={MainColor}
                              />
                            </View>
                            <View style={styles.ComplainItem}>
                              <Text>Complain Status</Text>
                              <Text style={styles.TxtComplainStatus}>
                                Pending
                              </Text>
                            </View>
                          </View>
                        );
                    }
                  })()}
                </View>
              )}
            />
          </ScrollView>
        </View>
      );
    } else {
      return (
        <View style={styles.Container}>
          <StatusBar barStyle="light-content" />

          <View style={styles.SearchContainer}>
            <View style={styles.IconStyle}>
              <Icon name="search" size={20} color="#72777f" />
            </View>
            <View style={styles.SearchStyle}>
             <TextInput
                style={styles.NameInputStyle}
                placeholder="Search By Complain Id"
                onChangeText={this.resetArrayList}
                returnKeyType="done"
                underlineColorAndroid="transparent"
              />
            </View>
          </View>
          <ScrollView style={styles.BodyContainer}>
            <View style={styles.complainItems}>
              <View style={styles.NoItemContainer}>
                <Text style={styles.NoDataText}>No Data Found</Text>
              </View>
            </View>
          </ScrollView>
        </View>
      );
    }
  }
}
const styles = StyleSheet.create({
  Container: {
    flexDirection: 'column',
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: '#c7ccd6',
  },
  SearchContainer: {
    flex: 0.07,
    justifyContect: 'flex-start',
    flexDirection: 'row',
    borderWidth: 2,
    margin: 3,
    borderRadius: 30,
    overflow: 'hidden',
    borderColor: '#c7ccd6',
    backgroundColor: 'white',
  },
  BodyContainer: {
    flex: 1,
    justifyContect: 'flex-start',

    margin: 3,
  },
  NameInputStyle: {
    width: Dimensions.get('window').width - 70,

    fontSize: 15,
  },
  IconStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  SearchStyle: {
    flex: 6,
    justifyContent: 'center',
    alignItems: 'center',

    marginTop: 4,
    marginBottom: 4,
  },
  complainItems: {
    flex: 1,
    borderColor: '#c7ccd6',
    borderWidth: 5,
    backgroundColor: 'white',
  },

  AllItemContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  NoItemContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 150,
  },

  ComplainItem: {
    flex: 1,
    margin: 5,
  },
  IconContainer: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  TxtComplain: {
    fontSize: 15,
  },
  TxtComplainDate: {
    fontSize: 15,
    color: '#9b1d17',
  },
  TxtComplainStatus: {
    fontSize: 15,
    color: 'green',
  },
  NoDataText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
