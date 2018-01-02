import * as React from 'react';
import { View, Text } from 'react-native';
import {
  BarIndicator
} from 'react-native-indicators';
import { colors, theme } from 'style';
import * as Animatable from 'react-native-animatable';

export default (props) => {
  const quotes = [
    // {
    //   text: 'Səbr etməklə kişi zindandan çıxar, Səbr ilə açılar bağlı qapılar',
    //   author: 'Nizami Gəncəvi'
    // },
    // {
    //   text: 'Hər bir müdrikliyin əsası səbrdir.',
    //   author: 'Platon'
    // },
    // {
    //   text: 'Səbirin axırı xeyir olar.',
    //   author: 'Atalar sözü'
    // },
  ];

  if(quotes.length > 0) {
    const { text, author } = quotes[Math.floor(Math.random() * quotes.length) + 0];
  }

  return (
    <Animatable.View animation="fadeIn" duration={200} style={theme.loading} useNativeDriver>
      <Animatable.View animation="bounceIn" duration={300} useNativeDriver style={{ flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ backgroundColor: colors.darkG, width: 80, height: 80, borderRadius: 40, borderWidth: 1, borderColor: colors.darkG }}>
          <BarIndicator color={colors.goblin} count={7} size={20} />
        </View>
        {quotes.length > 0 && <Text style={{ marginTop: 10, width: '80%', textAlign: 'center' }}>{text}</Text>}
      </Animatable.View>
    </Animatable.View>
  )
};