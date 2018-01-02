import React, { Component } from "react";
import axios from 'axios';
import { connect } from "react-redux";
import { Text, View, ScrollView, Image, StatusBar } from "react-native";
import { CachedImage, ImageCacheManager } from 'react-native-cached-image';
import Svg, { LinearGradient, Rect, Defs, Stop } from 'react-native-svg';
import * as Animatable from 'react-native-animatable';
import ImagePicker from 'react-native-image-crop-picker';
import moment from 'moment-with-locales-es6';
import Ripple from 'react-native-material-ripple';
import Modal from 'react-native-modal-wrapper';


import localize from "localize";
import { colors, theme, width } from 'style';
import { logout, updateUser } from 'actions/auth';
import config from 'config';

import Button from 'components/UI/Button';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pickerVisible: false,
    }
  }

  _renderStats = (number, type) => {
    return (
      <View key={Math.random()} style={{ width: '100%' }}>
        <Text style={[ theme.mediumText, { alignSelf: 'center', color: colors.white }]}>{number}</Text>
        <Text style={[ theme.smallText, { alignSelf: 'center' }]}>{type}</Text>
      </View>
    )
  }

  _setModalVisible = () => {
    this.setState({pickerVisible: true});
  }

  _openPicker = async (type) => {
    this.setState(prev => ({ ...prev, pickerVisible: false }));

    try {
      const image = await ImagePicker[type]({
        mediaType: 'photo',
        width: 200,
        height: 200,
        cropperCircleOverlay: true,
        cropping: true,
      });
      const data: FormData = new FormData();
      data.append('profilePhoto', {
        uri: image.path,
        type: 'image/jpeg', 
        name: 'file'
      });

      const fromServer = await axios.post('/user/upload', data, {headers: { 'Content-Type': 'multipart/form-data'} });
      if (fromServer.data.status === 200) {
        this.props.updateUser({ picture: fromServer.data.photo });
      }
    } catch (error) {
      console.log(error);
    }
  }

  _removePhoto = async () => {
    this.setState(prev => ({ ...prev, pickerVisible: false }));
    await axios.put(`/user/update`, { picture: 'default.png' });
    this.props.updateUser({ picture: 'default.png' });
  }

  render() {
    const { authenticated, user, myauto, navigation } = this.props;
    const stats = [
      { name: 'xallar', value: user.points || 0 },
      { name: 'suallar', value: user.questions || 0 },
      { name: 'cavablar', value: user.answers || 0 },
    ];

    return (
      <ScrollView contentContainerStyle={[ theme.base, { backgroundColor: colors.darkG } ]}>
      <Modal
          overlayStyle={{ backgroundColor: colors.darkG, opacity: 0.8 }}
          position='bottom'
          style={{ width: 200, paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10, borderRadius: 4, backgroundColor: colors.pony }}        
          visible={this.state.pickerVisible}
          onRequestClose={() => this.setState({pickerVisible: false})}
          >
        <View>
            <View>
              <Button
                style={{ marginBottom: 8 }}
                borderColor={ colors.pony }
                buttonColor={ colors.pony }
                icon={require('../MyAuto/icons').cameraIcon}
                black fullWidth title={ localize[user.locale].fromCamera }
                onPress={ () => this._openPicker('openCamera')} />
              <Button
                borderColor={ colors.pony }
                buttonColor={ colors.pony }
                icon={require('../MyAuto/icons').galleryIcon}
                black fullWidth title={ localize[user.locale].fromGallery }
                onPress={ () => this._openPicker('openPicker')} />
              <Button
                borderColor={ colors.pony }
                buttonColor={ colors.pony }
                icon={require('../MyAuto/icons').closeIcon}
                black fullWidth title={ localize[user.locale].removePhoto }
                onPress={this._removePhoto} />
            </View>
          </View>
        </Modal>
        {authenticated && <View style={ theme.profileHeader }>
          <Ripple onPress={this._setModalVisible} style={{ width: 90, height: 90, alignSelf: 'center', marginBottom: 10  }}>
            <CachedImage
              style={ theme.profilePicture }
              key={ user.picture }
              source={{ uri: config.PROFILE_PIC_PATH + user.picture }} />
          </Ripple>
          <View style={{ alignItems: 'center' }}>
            <Text style={[ theme.mediumText, { color: colors.white } ]}>
              {user && user.firstname} {user && user.lastname}
            </Text>
            <Button
              small naked style={{ borderColor: 'transparent' }}
              onPress={ () => navigation.navigate('MyAuto') }
              title={ !myauto ? 'Avtonuzu seçin' : `${myauto.make} ${myauto.model}` }
            />

            <View style={[ theme.block ,{ flexDirection: 'row', justifyContent: 'space-around', padding: 10 ,marginBottom: 20 }]}>
              { stats.map((item, index) => this._renderStats(item.value, item.name)) }
            </View>
          {/* <View>
              { user && user.logs.reverse().slice(0,3).map(item => <Text key={item._id}>{item.type} - {moment(item.date).fromNow()}</Text>) }
            </View> */}
          </View>
          <Button
              title="çıxış et"
              small naked
              style={{ width: '80%', alignSelf: 'center' }}
              onPress={ this.props.onLogout } />
        </View>}
        <StatusBar
          backgroundColor={colors.darkerG}
          barStyle="light-content" />
        <View style={{ width: '100%', position: 'absolute', top: 0, zIndex: -1 }}>
          <View style={{ width:'100%', height: 200, position: 'absolute', zIndex: 1, top: 0 }}>
            <Svg
                height="200"
                width={width}
            >
                <Defs>
                    <LinearGradient id="grad" x1="50%" y1="0%" x2="50%" y2="100%">
                      <Stop offset="0" stopColor={colors.darkG} stopOpacity="0.8" />
                      <Stop offset="1" stopColor={colors.darkG} stopOpacity="1" />
                    </LinearGradient>
                </Defs>
                <Rect
                    width={width}
                    height="200"
                    fill="url(#grad)"
                />
            </Svg>
          </View>
          {user.autoPhoto !== 'default.png' && <CachedImage key={ user.autoPhoto } style={{ width: '100%', height: 200 }} source={{ uri: config.MYAUTO_PIC_PATH + user.autoPhoto }} />}
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = ({ auto, user, realtime: { logs } }) => ({
  authenticated: user.authenticated,
  user,
  logs,
  myauto: user.myauto,
})

const mapDispatchToProps = (dispatch) => ({
  onLogout: () => dispatch(logout()),
  updateUser: (obj) => dispatch(updateUser(obj)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
