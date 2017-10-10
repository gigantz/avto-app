import React, { Component } from 'react';
import { View, Text, Button, StatusBar } from "react-native";
import LoginSignupPage from 'components/pages/LoginSignupPage';
import Tabs from 'components/Tabs';
import { colors } from 'style';
import BaseLayout from 'components/pages/BaseLayout';

class Main extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
        <BaseLayout>
          <StatusBar
              backgroundColor={colors.darkG}
              barStyle="light-content"
            />
          <LoginSignupPage />
        </BaseLayout>
    );
  }
}

export default Main;