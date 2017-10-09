import React, { Component } from 'react';
import { View, Text, Button } from "react-native";
import LoginSignupPage from 'components/pages/LoginSignupPage';
import Tabs from 'components/Tabs';
import BaseLayout from 'components/pages/BaseLayout';
import SvgUri from 'react-native-svg-uri';

class Main extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
        <BaseLayout>
          <LoginSignupPage />
        </BaseLayout>
    );
  }
}

export default Main;