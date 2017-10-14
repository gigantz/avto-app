import React, { Component } from "react";
import { connect } from "react-redux";
import { Text, View, Image } from "react-native";
import localize from "localize";
import { colors, theme, width } from 'style';
import { logout } from 'actions/auth';
import Button from 'components/UI/Button';
import * as Animatable from 'react-native-animatable';

class Login extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { user, authenticated } = this.props;

    return (
      <Animatable.View animation="fadeIn" style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        { user && authenticated &&
          <View>
            <Animatable.Text animation="fadeIn" style={{ color: 'white', fontSize: 25 }}>{ `${user.firstname} ${user.lastname}` }</Animatable.Text>
            <Animatable.Text animation="fadeIn" style={{ color: 'white', fontSize: 10 }}>Axırıncı giriş { Date(user.lastLogged).toLocaleString('ru') }</Animatable.Text>
          </View>
        }
        <Button title="Logout" onPress={ this.props.onLogout } />
      </Animatable.View>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  user: user.toJS(),
  authenticated: user.get('authenticated')
})

const mapDispatchToProps = (dispatch) => ({
  onLogout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
