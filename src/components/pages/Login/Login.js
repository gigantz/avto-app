import React, { Component } from "react";
import { connect } from "react-redux";
import { Text, View, Image } from "react-native";
import { login } from "actions/auth";

import localize from "localize";
import { colors, theme, width } from 'style';
import Input from 'components/UI/Input';
import Button from 'components/UI/Button';
import Misc from 'components/UI/Misc';
import { validator } from 'utils/validation';
import * as Animatable from 'react-native-animatable';

const { TextLine } = Misc;
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'orkhanjafarovr@gmail.com',
      password: 'Rbkkvb90',
      focused: false,
      validation: {
        email: true,
        password: true,
      }
    }
  }

  _login = () => {
    const { email, password } = this.state;
    this.props.onLogin(email, password);
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

  render() {
    const { locale, error, loading, authenticated } = this.props;
    const { email, password, focused, validation } = this.state;
    const validationOK = validation.email && validation.password;

    return (
      <Animatable.View animation="fadeIn" style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        {!authenticated && <Image style={{ width: 180, height: 66, marginBottom: 20 }} source={require("assets/img/logo_1000.png")} />}
        {!authenticated && <View style={[theme.padd, { marginBottom: 20 }]}>
            <Text style={theme.label}>{localize[locale].emailInput}</Text>
            <Input
              keyboardType="email-address"
              placeholder="Email"
              defaultValue={email}
              returnKeyType = {"next"}
              onSubmitEditing={ this._focusNext }
              invalid={ !validation['email'] }
              onChangeText={value => { this._changeText("email", value); }} />
            <Text style={theme.label}>{localize[locale].passwordInput}</Text>
            <Input
              placeholder="•••••••"
              secureTextEntry
              defaultValue={password}
              onSubmitEditing={() => validationOK && this._login()}
              returnKeyType = {"done"}
              invalid={ !validation['password'] }
              ref={c => this._passwordInput = c}
              onChangeText={value => { this._changeText("password", value); }} />
            {!loading && error ?
              <Animatable.Text animation="wobble" style={theme.warning}>
                {localize[locale][error.message]}
              </Animatable.Text>
              : <Text style={theme.warning} />
            }
            <Button disabled={!validationOK} title={localize[locale].loginBtn} onPress={this._login} />
        </View>}
      </Animatable.View>);
  }
}

const mapStateToProps = ({ user }) => ({
  locale: user.get('locale'),
  loading: user.get('loading'),
  error: user.get('error'),
  authenticated: user.get('authenticated')
});

const mapDispatchToProps = dispatch => ({
  onLogin: (email, password) => dispatch(login({ email, password })),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
