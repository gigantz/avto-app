import * as React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { connect } from 'react-redux';
import { TabNavigator } from 'react-navigation';
import Profile from 'screens/Profile';
import Welcome from 'screens/Welcome';

export class BaseLayout extends React.Component {

  render() {
    return (
      <View style={{ flex: 1 }}>
        <MyApp />
      </View>
    )
  }
};

const mapStateToProps = (state) => ({
  
});

const mapDispatchToProps = {
  
};

export default connect(mapStateToProps, mapDispatchToProps)(BaseLayout);
