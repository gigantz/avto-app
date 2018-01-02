// @flow

import { View, Text, StatusBar, ScrollView } from 'react-native';
import Ripple from 'react-native-material-ripple';
import ImagePicker from 'react-native-image-crop-picker';
import Modal from 'react-native-modal-wrapper';
import { connect } from 'react-redux';
import * as React from 'react';
import axios from 'axios';

import Input from 'components/UI/Input';
import { updateUser } from 'actions/auth';
import { theme, colors } from 'style';
import localize from 'localize';

import SelectAuto from 'components/SelectAuto';
import AutoDetails from 'components/AutoDetails';
import Loading from 'components/UI/Loading';
import SVGUri from 'components/SVGUri';
import Button from 'components/UI/Button';

// const noAuto = `<svg xmlns="http://www.w3.org/2000/svg" width="61" height="54" viewBox="3 0 59 60"><g fill="none" fill-rule="evenodd"><path fill="#ACB7C5" fill-rule="nonzero" d="M56.23 31.3c-2.64-.22-4.77-1.45-6-3.4l-.3-.52c-1.52-2.57-4.26-4.1-7.2-4.32-.6-.1-1.12.3-1.12.93-.1.6.32 1.12.93 1.12 2.33.1 4.36 1.44 5.58 3.4l.3.5c1.54 2.58 4.38 4.22 7.63 4.42 1.62.1 2.84 1.44 2.84 3.1v7.18c0 1.75-1.32 3.1-3.05 3.1h-2.1c-.36-2.06-1.7-3.77-3.52-4.6l-.12-.06-.07-.03-.2-.08s-.03 0-.05-.02l-.22-.08h-.05c-.08-.04-.16-.06-.23-.08h-.06l-.24-.07h-.06c-.08-.03-.15-.04-.23-.05h-.07c-.07-.03-.14-.04-.22-.04h-.08l-.22-.02h-.75c-.08 0-.15 0-.23.02h-.07c-.08 0-.15.02-.23.04h-.07l-.22.05h-.05l-.24.06h-.04l-.23.08h-.05l-.23.1h-.05l-.2.1c-.03 0-.05 0-.08.02l-.12.06c-1.8.83-3.16 2.54-3.5 4.6H21.23c-.35-2.06-1.7-3.77-3.5-4.6l-.13-.06-.07-.03-.2-.08c-.02 0-.04 0-.06-.02l-.22-.08H17c-.08-.04-.16-.06-.23-.08h-.06c-.06-.03-.14-.05-.22-.07h-.06c-.07-.03-.15-.04-.23-.05h-.07c-.08-.03-.15-.04-.23-.04h-.07l-.23-.02H14.85c-.08 0-.15 0-.23.02h-.07c-.08 0-.15.02-.23.04h-.06l-.23.05h-.06l-.24.06h-.05l-.23.08h-.05l-.23.1h-.05l-.2.1c-.02 0-.05 0-.08.02l-.12.06c-1.8.83-3.16 2.54-3.5 4.6H5.07c-1.72 0-3.04-1.35-3.04-3.1V39.1c0-1.54 1.12-2.88 2.64-2.98l6.2-.83c4.46-.52 8.52-2.68 11.46-6.07l1.52-1.75c.8-1.02 1.93-2.05 2.95-2.46.5-.2.8-.83.6-1.34-.2-.5-.8-.82-1.32-.62-1.52.52-2.84 1.75-3.85 2.98L20.8 27.7c-2.63 2.97-6.18 4.92-10.14 5.44l-6.2.82C1.94 34.26 0 36.53 0 39.1v4.62c0 2.88 2.23 5.14 5.07 5.14h4.15c.5 2.9 3 5.14 6 5.14s5.52-2.23 6-5.14H41.7c.5 2.9 3 5.14 6 5.14s5.52-2.23 6-5.14h2.12c2.85 0 5.08-2.26 5.18-5.24v-7.2c0-2.67-2.13-4.93-4.77-5.13zm-41 20.64c-2.24 0-4.07-1.85-4.07-4.1 0-2.27 1.83-4.12 4.06-4.12 2.24 0 4.06 1.85 4.06 4.1 0 2.27-1.82 4.12-4.06 4.12zm32.47 0c-2.23 0-4.06-1.85-4.06-4.1 0-2.27 1.83-4.12 4.06-4.12 2.24 0 4.06 1.85 4.06 4.1 0 2.27-1.82 4.12-4.06 4.12z"/><path d="M34.18 33.2h.86c2.16 0 3.26-.58 3.26-2.74v-1.64c0-2.1-1.1-2.68-3.26-2.68h-.86c-2.16 0-3.22.62-3.22 2.68v1.64c0 2.16 1.06 2.73 3.22 2.73zm1.3-9.75c1.58 0 1.86-.43 1.86-1.35 0-5.56 9.27-4.5 9.27-12.48 0-5.18-4.07-8.64-10.9-8.64-7.33 0-10.98 4.32-10.98 7.78 0 3.6 4.13 3.65 4.7 2.35 1.16-2.58 2.26-4.5 6.2-4.5 2.83 0 4.46 1.34 4.46 3.5 0 4.08-8.2 3.36-8.4 11.43-.05 1.3.48 1.92 1.63 1.92h2.17z"/></g></svg>`;

export class MyAuto extends React.Component<*,*> {
  constructor(props) {
    super(props);
    this.state = {
      pickerVisible: false,
    }
  }

  _openPicker = async (type) => {
    this.setState(prev => ({ ...prev, pickerVisible: false }));

    try {
      const image = await ImagePicker[type]({
        mediaType: 'photo',
        cropping: false
      });
      const data: FormData = new FormData();
      // data.append('token', this.props.token);
      data.append('carphoto', {
        uri: image.path,
        type: 'image/jpeg', 
        name: 'file'
      });

      const fromServer = await axios.post('/user/upload', data, {headers: { 'Content-Type': 'multipart/form-data'} });
      if (fromServer.data.status === 200) {
        this.props.updateUser({ autoPhoto: fromServer.data.photo });
      }
    } catch (error) {
      console.log(error);
    }
  }

  _setModalVisible = () => {
    console.log(this.state);
    this.setState({pickerVisible: true});
  }

  _removePhoto = async () => {
    this.setState(prev => ({ ...prev, pickerVisible: false }));
    await axios.put(`/user/update`, { autoPhoto: 'default.png' });
    this.props.updateUser({ autoPhoto: 'default.png' });
  }

  render() {
    const { userId, myauto, autoId, locale, navigation: { navigate }, autoPhoto } = this.props;

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
              icon={require('./icons').cameraIcon}
              black fullWidth title={ localize[locale].fromCamera }
              onPress={ () => this._openPicker('openCamera')} />
            <Button
              borderColor={ colors.pony }
              buttonColor={ colors.pony }
              icon={require('./icons').galleryIcon}
              black fullWidth title={ localize[locale].fromGallery }
              onPress={ () => this._openPicker('openPicker')} />
            <Button
              borderColor={ colors.pony }
              buttonColor={ colors.pony }
              icon={require('./icons').closeIcon}
              black fullWidth title={ localize[locale].removePhoto }
              onPress={this._removePhoto} />
          </View>
        </View>
      </Modal>
      {
        myauto &&
        <AutoDetails openModal={this._setModalVisible} userId={userId} locale={locale} data={myauto} autoPhoto={autoPhoto} />
      }
      {
        autoId &&
        <View style={{ marginBottom: 10, width: '100%'  }}>
          <Ripple onPress={ () => navigate('SelectAuto') }>
            <Text style={{ fontSize: 15, color: colors.horror, width: '100%', padding: 15 }}>{localize[locale].reselectAuto}...</Text>
          </Ripple>
        </View>
      }
      {/* <Button black fullWidth title="Camera" onPress={ () => this._openPicker('openPicker')} /> */}
      {
        !autoId &&
        <Ripple onPress={ () => navigate('SelectAuto') }>
          <View style={[ theme.hiBlock ,{ alignItems: 'center'}]}>
            {/* <SVGUri svgXmlData={noAuto} width="45" height="40" style={{ marginRight: 10 }} /> */}
            <Text style={{ fontSize: 15, color: colors.snow500 }}>{localize[locale].requireAuto}...</Text>
          </View>
        </Ripple>
      }
    </ScrollView>
    )
  }
};

const mapStateToProps = ({ auto, user: { autoId, locale, autoPhoto, myauto, token, userId } }) => ({
  auto,
  autoId,
  locale,
  myauto,
  token,
  userId,
  autoPhoto,
})

export default connect(mapStateToProps, { updateUser })(MyAuto);