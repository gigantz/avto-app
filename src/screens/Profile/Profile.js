import React, { Component } from "react";
import { connect } from "react-redux";
import { Text, View, ScrollView, Image, TouchableOpacity } from "react-native";
import localize from "localize";
import { colors, theme, width } from 'style';
import { logout } from 'actions/auth';
import Button from 'components/UI/Button';
import * as Animatable from 'react-native-animatable';
import ImagePicker from 'react-native-image-crop-picker';
import moment from 'moment-with-locales-es6';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUrl: 'http://www.designyourway.net/diverse/6/menus/2030358.jpg'
    }
  }

  _renderStats = (number, type) => {
    return (
      <View key={Math.random()} style={{ width: '100%' }}>
        <Text style={[ theme.mediumText, { alignSelf: 'center' }]}>{number}</Text>
        <Text style={[ theme.smallText, { alignSelf: 'center' }]}>{type}</Text>
      </View>
    )
  }

  _openPicker = async () => {
    try {
      const image = await ImagePicker.openPicker({
        cropping: true,
        cropperCircleOverlay: true,
      });
      this.setState({
        imageUrl: image.path
      })
      console.log(image);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { authenticated, user } = this.props;
    const stats = [
      { name: 'xallar', value: user.points || 0 },
      { name: 'suallar', value: user.questions || 0 },
      { name: 'cavablar', value: user.answers || 0 },
    ];

    return (
      <ScrollView contentContainerStyle={ theme.base }>
        {authenticated && <View style={ theme.profileHeader }>
          <TouchableOpacity onPress={this._openPicker}>
            <Image
              style={ theme.profilePicture }
              source={{ uri: this.state.imageUrl }} />
          </TouchableOpacity>
          <View style={{ alignItems: 'center' }}>
            <Text style={ theme.mediumText }>
              {user && user.firstname} {user && user.lastname}
            </Text>
            <Text style={[ theme.smallText, { marginBottom: 10 }]}>Avtonuzu seçin</Text>
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
      </ScrollView>
    );
  }
}

const mapStateToProps = ({ user, realtime: { logs } }) => ({
  authenticated: user.authenticated,
  user,
  logs
})

const mapDispatchToProps = (dispatch) => ({
  onLogout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
