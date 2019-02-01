import React, { Component } from 'react';
import { Text, View, StyleSheet, Alert, Dimensions } from 'react-native';
import { Constants, BarCodeScanner, Permissions } from 'expo';
import Complain from './Complain';

export default class Scanner extends Component {

   constructor(props) {
    super(props);
    this.state = {
      language:'',
    }
   }
  static navigationOptions = {
    title: 'Scanner',
    headerStyle: {
      backgroundColor: '#071a5a',
    },
    headerTintColor: '#fff',
    headerfontWeight: 'bold',
  };

  state = {
    hasCameraPermission: null,
  };

  componentDidMount() {
    this._requestCameraPermission();
  }

componentWillMount() {
      if (this.props.navigation.state.params.lang != null) {
      this.setState({
        language: this.props.navigation.state.params.lang,
      });
    }
  
  }
  _requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted',
    });
  };
  // JSON.stringify(data)
  _handleBarCodeRead = data => {
    this.props.navigation.navigate('Complain', {
      scannerId: data.data,
      lang: this.state.language,
    });
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.hasCameraPermission === null ? (
          <Text>Requesting for camera permission</Text>
        ) : this.state.hasCameraPermission === false ? (
          <Text>Camera permission is not granted</Text>
        ) : (
          <BarCodeScanner
            onBarCodeRead={this._handleBarCodeRead}
            style={{
              height: Dimensions.get('window').height - 200,
              width: Dimensions.get('window').width,
            }}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
});
