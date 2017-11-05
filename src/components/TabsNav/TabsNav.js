// @flow

import * as React from 'React';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { theme, colors } from 'style';
import localize from 'localize';
import { connect } from 'react-redux';

import Button from 'components/UI/Button';
import SVGUri from 'react-native-svg-uri';
import * as Animatable from 'react-native-animatable';

const ProfileIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 38 38"><path fill="#FFF" fill-rule="nonzero" d="M30.93 30.5C27.66 33.9 23.08 36 18 36 8.08 36 0 27.92 0 18S8.08 0 18 0s18 8.08 18 18c0 4.73-1.84 9.04-4.83 12.25-.07.1-.15.18-.24.26zM18 33.94c3.9 0 7.5-1.43 10.3-3.78-4.68-1.55-6.4-3.43-7.05-4.7-.88.4-1.88.6-2.98.62h-.07-.17c-1.2-.02-2.27-.26-3.2-.7-.6 1.24-2.3 3.2-7.1 4.78C10.5 32.5 14.1 33.93 18 33.93zm5.82-19.26v-.06c-.25-5.44-4.27-5.87-5.5-5.87h-.35c-1.23 0-5.25.43-5.5 5.88v.07c-.02.05-.53 5.1 1.83 7.75.94 1.04 2.18 1.57 3.8 1.58h.07c1.63-.02 2.86-.54 3.8-1.58 2.36-2.63 1.86-7.7 1.85-7.75zM18 2.07C9.22 2.07 2.07 9.22 2.07 18c0 4.02 1.5 7.7 3.97 10.5 6.76-1.96 7.02-4.35 7.02-4.38 0 .03.02.05.07.05l-.37-.38c-2.88-3.25-2.4-8.78-2.35-9.33.3-5.77 4.26-7.82 7.58-7.82h.33c3.33 0 7.3 2.05 7.58 7.82.05.54.52 6.07-2.34 9.32l-.53.52c.23.6 1.34 2.53 6.96 4.18 2.47-2.8 3.97-6.48 3.97-10.5 0-8.78-7.15-15.93-15.93-15.93z"/></svg>`;
const CommunityIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 40 40"><g fill="#FFF" fill-rule="evenodd"><path d="M19 37.5C8.78 37.5.5 29.22.5 19S8.78.5 19 .5 37.5 8.78 37.5 19 29.22 37.5 19 37.5zm0-2c9.1 0 16.5-7.4 16.5-16.5S28.1 2.5 19 2.5 2.5 9.9 2.5 19 9.9 35.5 19 35.5z"/><path fill-rule="nonzero" d="M13.5 21C11.02 21 9 23.02 9 25.5s2.02 4.5 4.5 4.5 4.5-2.02 4.5-4.5-2.02-4.5-4.5-4.5z"/><path fill-rule="nonzero" d="M12.5 29c-2.76 0-4.52 1.13-5.3 3.4.6 0 12.27 4.58 12.27 3.97 0-4.3-2.83-7.37-6.97-7.37zM30.5 21c-2.48 0-4.5 2.02-4.5 4.5s2.02 4.5 4.5 4.5 4.5-2.02 4.5-4.5-2.02-4.5-4.5-4.5z"/><path fill-rule="nonzero" d="M30.5 29c-4.14 0-6.48 2.22-6.48 6.53 0 .62 10.62-6.53 6.48-6.53zM25.34 1.97H14.7C12.9 1.97 9 3.4 9 5.22v8.03c0 1.83 1.47 3.32 3.27 3.32h3.28v3.32c0 .98 1.18 1.47 1.86.78l4.05-4.1h8.28c1.8 0 3.27-1.5 3.27-3.33V8.22c0-1.83-5.85-6.25-7.66-6.25z"/></g></svg>`;
const AvtoIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 40 40"><g fill="#FFF" fill-rule="evenodd"><path d="M19 37.5C8.78 37.5.5 29.22.5 19S8.78.5 19 .5 37.5 8.78 37.5 19 29.22 37.5 19 37.5zm0-2c9.1 0 16.5-7.4 16.5-16.5S28.1 2.5 19 2.5 2.5 9.9 2.5 19 9.9 35.5 19 35.5z"/><path fill-rule="nonzero" d="M31.98 6.93C30.08 4.46 18.88.55 18.14 1.6 16.8 3.8 16.16 6.4 15.4 8.84c-.3.34-.52.8-.87 1.08-.3-.07.02-.77-.05-1.1.18-1.02-1.06-1.65-1.93-1.26-.88.34-2.2.43-2.55 1.45 0 1.15 1.2 2.02 2.33 1.87.53.08.75.72 1.07 1.07.02 1.87-.4 3.74-.3 5.62.06 1.18-.07 2.43.3 3.57.1.1.2.14.3.13 0 .06-.03.13-.03.2v9.7c0 .42.4.8.82.8h3.27c.43 0 .82-.38.82-.8v-3.35c9.92.56 15.13.36 15.6-.58 2-4.07 3.03-13.47-2.22-20.34zm-7-3.7c3.87 0 11.18 6.2 6.88 6.16-2.4-.03-10.55.08-11.68.07-1.8 0-2.05 0-2.08-.08 0-.05.22-.83.5-1.74l.84-2.56c.46-1.45.62-1.7 1.6-2.55 1-.9.08.7 3.95.7zm-8.15 7.92c2.05.42 3.93 1.7 5.8 2.6 1.07.4 2.5 1.48 1.66 2.72-1.42.98-3.4.33-5.02.28-1.28-.36-3.3-.24-3.92-1.63-.08-1.3-.38-3.77 1.47-3.97z"/></g></svg>`;
const RoadIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 40 40"><g fill="#FFF" fill-rule="evenodd"><path d="M19 37.5C8.78 37.5.5 29.22.5 19S8.78.5 19 .5 37.5 8.78 37.5 19 29.22 37.5 19 37.5zm0-2c9.1 0 16.5-7.4 16.5-16.5S28.1 2.5 19 2.5 2.5 9.9 2.5 19 9.9 35.5 19 35.5z"/><path fill-rule="nonzero" d="M20.64 18.2l.13 1.54H18.7l.13-1.53c-.74-.23-1.55-.22-2.33-.22-.9 0-1.75-.06-2.7.23-3.37 6.17-4.4 6.4-7.78 12.56 3.12 3.42 6.73 5.92 11.27 5.92.03-.5 1.05.17 1.1-.34h2.94c.04.5.8-.17.84.34 4.53 0 7.43-3.72 10.62-5.92-3.37-6.16-3.77-6.4-7.14-12.55C25 18 24.2 18 23.43 18c-.92 0-1.93 0-2.8.23zm-2.36 3.65h2.65l.38 4.42h-3.4l.38-4.42zm-.65 11.2L18 28.6h3.73l.37 4.42h-4.47zM28.3 18.2c4.67 6.8 8.57 10.38 5.43 10.7-4.3-6.14-2.85-4.53-7.16-10.7h1.73zm-18.2 0h1.74c-4.3 6.17-3.1 4.3-7.4 10.45-1.56 0-.26-1.82-1.82-1.82 5.3-6.16 2.2-2.46 7.5-8.62z"/></g></svg>`;
const MyAvtoIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 40 40"><g fill="#FFF" fill-rule="evenodd"><path d="M19 37.5C8.78 37.5.5 29.22.5 19S8.78.5 19 .5 37.5 8.78 37.5 19 29.22 37.5 19 37.5zm0-2c9.1 0 16.5-7.4 16.5-16.5S28.1 2.5 19 2.5 2.5 9.9 2.5 19 9.9 35.5 19 35.5zM9.08 10.16C13.75 4.72 22.06 4 27.63 8.56c5.57 4.58 6.3 12.7 1.62 18.14-4.67 5.45-12.98 6.16-18.55 1.6-5.57-4.58-6.3-12.7-1.62-18.14zm11.52 5.56c-.1.98-1.37 2.6-3.8 4.85 2.2-.73 3.92-.67 5.17.18-.7-.94-1.2-2.43-1.52-4.48.1-.47.16-.66.15-.55zm-9.26-3.7c-2.7 3.18-3 7.53-1.1 10.84l11.73-13.8c-3.63-1.3-7.9-.25-10.63 2.95zm1.14 13.7c3.8 3 9.3 2.88 12.95 0-4.26-3.24-10.02-3.26-12.95 0zm15.07-2.86c2.37-3.97 1.54-9.16-2.2-12.23-2.88 3.35-1.88 8.8 2.2 12.23z"/><path d="M22.28 26.17c0 .28 1.18-1.38 1.8 1.82.14.78.12 2.35-.72 4.6-.38 1-.9.9-.85 2.83-1 .3-1.74.34-2.23.36-.57 0-1.72.15-2.84-.08 0 0-.06.18-.4-.74-.12-.3-.27-1.02-.76-1.6-.72-.88-1.55-1.77-1.62-1.83-.57-.54-1.67-1.37-1.18-2.03.33-.44 2.45 1 2.78.83 0-1.54-.3-1.54-.52-2.36-.02-.12-.6-.88-1.08-1.2-.03-.68 1.56-2.3 2.38-2.34.8-.04 1.26.65 1.26.65s.15-.34.86-.36c.1 0 .2 0 .3.03.35.07.6.74.8 1.1.17-.06.47-.58.74-.6.15 0 .3.03.45.08.36.1.63.4.83.82z"/></g></svg>`;

type Props = {
  tabsVisible: boolean, 
  router: Object, 
  onRedirect: (screen: string) => void,
}



export class TabsNav extends React.Component<Props> {
  props: Props;

  constructor(props: Props) {
    super(props);
  }

  render() {
    const { tabsVisible, navigation: { state }, onRedirect } = this.props;

    return (
      <View style={styles.tabs}>
        <Icon
          src={require('../../../assets/img/road.png')}
          active={state.index === 0}
          tapHandler={() => onRedirect('Welcome2') } />
        {state.index === 0 && <Text style={ styles.tabText }>Yolda</Text> }
          
        <Icon
          src={require('../../../assets/img/avtolar.png')}
          active={state.index === 1}
          tapHandler={() => onRedirect('Login') } />
        {state.index === 1 && <Text style={ styles.tabText }>Avto Baza</Text> }
          
        <Icon
          src={require('../../../assets/img/forum.png')}
          active={state.index === 2}
          tapHandler={() => onRedirect('Welcome') } />
        {state.index === 2 && <Text style={ styles.tabText }>Birlik</Text> }
          
        <Icon
          src={require('../../../assets/img/myavto.png')}
          active={state.index === 3}
          tapHandler={() => onRedirect('Avto') } />
        {state.index === 3 && <Text style={ styles.tabText }>Avto</Text> }
        
        <Icon
          src={require('../../../assets/img/user.png')}
          active={state.index === 4}
          tapHandler={() => onRedirect('Profile') } />
        {state.index === 4 && <Text style={ styles.tabText }>Mən</Text> }

      </View>
    )
  }
};

const Icon = ({ active, src, tapHandler }) => (
  <TouchableOpacity onPress={tapHandler} style={ styles.tab } disabled={active}>
    <Image style={{ width: 30, height: 30, tintColor: active ? colors.goblin : colors.white }} source={src} />
  </ TouchableOpacity>
);

const mapStateToProps = ({ ui: { tabsVisible }, user: { loading } }) => ({
  tabsVisible,
  loading
});

const mapDispatchToProps = (dispatch) => ({
  onRedirect: (screen) => dispatch({ type: 'Navigation/NAVIGATE', routeName: screen })
});

const styles = StyleSheet.create({
  tabs: {
    backgroundColor: colors.darkG,
    height: 70,
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tab: {
    padding: 10
  },
  tabText: {
    color: colors.goblin,
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(TabsNav);
