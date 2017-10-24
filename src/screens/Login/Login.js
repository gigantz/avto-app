import React, { Component } from "react";
import { Text, View, ScrollView, Image, TouchableOpacity, StatusBar } from "react-native";
import { login } from "actions/auth";
import { connect } from "react-redux";

import localize from "localize";
import { colors, theme, width } from 'style';
import Input from 'components/UI/Input';
import Button from 'components/UI/Button';
import Misc from 'components/UI/Misc';
import { validator } from 'utils/validation';
import * as Animatable from 'react-native-animatable';
import Logo from 'assets/svg/LogoSVG';
import Svg,{ Circle } from 'react-native-svg';

const { TextLine } = Misc;
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: 'orkhanjafarovr@gmail.com',
      password: 'killme90',
      focused: false,
      validation: {
        login: true,
        password: true,
      }
    }
  }

  _login = () => {
    const { login, password } = this.state;
    this.props.onLogin(login, password);
  }

  _changeText = (type, value) => {
    this.setState(prev => ({
      ...prev,
      [type]: value,
      validation: { ...this.state.validation, ...{ [type]: validator(type, value) }}
    }));
  }

  _focusNext = () => {
    this._passwordInput.refs._inputText.focus();
  }

  _passwordFocus = () => {
    this.setState(prev => ({
      ...prev,
      password: '',
      validation: { ...this.state.validation, ...{ password: false }}
    }));
    
    this._passwordInput.refs._inputText.clear();
  }

  _signUp = () => {
    this.props.onRedirect({
      type: "REDIRECT_TO_SIGNUP",
      pathto: 'SignUp'
    })
  }

  render() {
    const { locale, error, loading, authenticated } = this.props;
    const { login, password, focused, validation } = this.state;
    const validationOK = validation.login && validation.password;

    return (
      <ScrollView contentContainerStyle={ theme.base }>
        {!authenticated &&
          <View style={[theme.padd, { marginBottom: 20 }]}>
              {/* <Image style={{ width: 180, height: 66, marginBottom: 20, alignSelf: 'center' }} source={require("assets/img/logo_1000.png")} /> */}
              <View style={{ alignSelf: 'center', marginBottom: 10 }}>
                <Logo noAnimation white width={160} height={60} />
              </View>
              <Text style={theme.label}>{localize[locale].loginInput}</Text>
              <Input
                keyboardType="email-address"
                placeholder="Email"
                defaultValue={login}
                returnKeyType = {"next"}
                onSubmitEditing={ this._focusNext }
                invalid={ !validation['login'] }
                onChangeText={value => { this._changeText("login", value); }} />
              <Text style={theme.label}>{localize[locale].passwordInput}</Text>
              <Input
                placeholder="•••••••"
                secureTextEntry
                defaultValue={password}
                onSubmitEditing={() => validationOK && this._login()}
                returnKeyType = {"done"}
                invalid={ !validation['password'] }
                ref={c => this._passwordInput = c}
                onFocus={this._passwordFocus}
                onChangeText={value => { this._changeText("password", value); }} />
              {!loading && error ?
                <Animatable.Text animation="wobble" style={theme.warning}>
                  {localize[locale][error.message]}
                </Animatable.Text>
                : <Text style={theme.warning} />
              }
              <Button black disabled={!validationOK} title={localize[locale].loginBtn} onPress={this._login} />
          </View>}
          <View style={ theme.footer }>
            <Animatable.View animation="bounceInUp" style={{ position: 'absolute', right: 0, left: 0, bottom: 0 }}>
            <TouchableOpacity style={{ flexDirection: 'row', padding: 20, alignSelf: 'center' }} onPress={ this._signUp }>
              <Text style={ theme.footerText }>
                AvtoBirlikdə yenisən? 
              </Text>
              <Text style={ theme.footerTextLink }>
                Qeydiyyatdan keç
              </Text>
            </TouchableOpacity>
            <Svg
                height="100"
                width={width}
                style={{ position: 'absolute', zIndex: -1, top: 0, left: 0, right: 0, alignSelf: 'center', }}
            >
                <Circle
                    cx={width/2+5}
                    cy={width}
                    r={width}
                    fill={ colors.goblin }
                />
            </Svg>
            </Animatable.View>
          </View>
          <StatusBar
        backgroundColor={colors.white}
        barStyle="dark-content" />
      </ScrollView>);
  }
}

const mapStateToProps = ({ user }) => ({
  locale: user.get('locale'),
  loading: user.get('loading'),
  error: user.get('error'),
  authenticated: user.get('authenticated')
});

const mapDispatchToProps = dispatch => ({
  onLogin: (loginValue, password) => dispatch(login({ loginValue, password })),
  onRedirect: (dispatcher) => dispatch(dispatcher),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
