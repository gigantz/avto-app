import * as React from 'react';
import { View } from 'react-native';
import {
  BarIndicator
} from 'react-native-indicators';
import { colors, theme } from 'style';

export default (props) => {
  // const quotes = [
  //   {
  //     text: 'Səbr etməklə kişi zindandan çıxar, Səbr ilə açılar bağlı qapılar',
  //     author: 'Nizami Gəncəvi'
  //   },
  //   {
  //     text: 'Hər bir müdrikliyin əsası səbrdir.',
  //     author: 'Platon'
  //   },
  //   {
  //     text: 'Səbirin axırı xeyir olar.',
  //     author: 'Atalar sözü'
  //   },
  // ];

  // const { text, author } = quotes[Math.floor(Math.random() * quotes.length) + 0];

  return (
    <View style={theme.loading}>
      <BarIndicator color={colors.darkG} count={5} />
    </View>
  )
};