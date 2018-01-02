import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';
import { theme, colors } from 'style';
import localize from 'localize';
import Ripple from 'react-native-material-ripple';
import { CachedImage, ImageCacheManager } from 'react-native-cached-image';
import config from 'config';
import SVGUri from 'components/SVGUri';
const manager = ImageCacheManager({});

const cameraIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="60" heigh="60" viewBox="0 0 80 87"><path fill="#FFF" d="M50 40c-8.29 0-15 6.72-15 15 0 8.29 6.7 15 15 15 8.28 0 15-6.7 15-15 0-8.28-6.72-15-15-15zm40-15H78c-1.65 0-3.43-1.28-3.95-2.85l-3.1-9.3C70.43 11.28 68.65 10 67 10H33c-1.65 0-3.43 1.28-3.95 2.85l-3.1 9.3C25.43 23.73 23.65 25 22 25H10C4.5 25 0 29.5 0 35v45c0 5.5 4.5 10 10 10h80c5.5 0 10-4.5 10-10V35c0-5.5-4.5-10-10-10zM50 80c-13.8 0-25-11.2-25-25s11.2-25 25-25 25 11.2 25 25-11.2 25-25 25zm36.5-38c-1.93 0-3.5-1.57-3.5-3.5 0-1.94 1.57-3.5 3.5-3.5s3.5 1.56 3.5 3.5c0 1.93-1.57 3.5-3.5 3.5z"/></svg>`;

class AutoDetails extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps = (nextProps) => {
    // if(nextProps.autoPhoto !== this.props.autoPhoto) {
    //   manager.clearCache();
    //   // await manager.deleteUrl(config.API + '/files/users/myauto/thumbs/' + `${this.props.autoPhoto}`);
    //   // this.setState({
    //   //   autoPhotoURI: config.API + '/files/users/myauto/thumbs/' + `${nextProps.autoPhoto}`
    //   // })
    // }
  }

  render() {
    const { 
      make, 
      model, 
      year, 
      body, 
      engine_volume, 
      engine_power,
      engine_type,
      gearbox,
      drive,
      generation,
      image,
    } = this.props.data;
    const { locale, openModal, autoPhoto } = this.props;
    // console.log(config.API + '/files/users/myauto/' + `${this.props.userId}_myauto.jpeg` );

    return (
      <View style={{ width: '100%', flex: 1, justifyContent: 'flex-start' }}>
        <Ripple onPress={ openModal } style={{ position:'absolute', right: 0, top: 0, zIndex: 2, padding: 15, borderRadius: 15 }}>
          <View>
            <SVGUri
                width="30"
                height="20"
                svgXmlData={cameraIcon} />
          </View>
        </Ripple>
        <CachedImage key={ autoPhoto } style={{ width: '100%', height: 200 }} source={{ uri: config.MYAUTO_PIC_PATH + autoPhoto }} />


        <Text style={ style.make }>{make}</Text>

        <View style={ style.row }>
          <Text style={ style.label }>{localize[locale].auto.model}</Text>
          <View style={ style.dots }></View>
          <Text style={ style.value }>{model}</Text>
        </View>

        <View style={ style.row }>
          <Text style={ style.label }>{localize[locale].auto.year}</Text>
          <View style={ style.dots }></View>
          <Text style={ style.value }>{year}</Text>
        </View>
        
        <View style={ style.row }>
          <Text style={ style.label }>{localize[locale].auto.body}</Text>
          <View style={ style.dots }></View>
          <Text style={ style.value }>{body}</Text>
        </View>

        <View style={ style.row }>
          <Text style={ style.label }>{localize[locale].auto.generation}</Text>
          <View style={ style.dots }></View>
          <Text style={ style.value }>{generation}</Text>
        </View>

        <View style={ style.row }>
          <Text style={ style.label }>{localize[locale].auto.engineVolume}</Text>
          <View style={ style.dots }></View>
          <Text style={ style.value }>{engine_volume} L</Text>
        </View>

        <View style={ style.row }>
          <Text style={ style.label }>{localize[locale].auto.enginePower}</Text>
          <View style={ style.dots }></View>
          <Text style={ style.value }>{engine_power} a.g.</Text>
        </View>

        <View style={ style.row }>
          <Text style={ style.label }>{localize[locale].auto.engineType}</Text>
          <View style={ style.dots }></View>
          <Text style={ style.value }>{localize[locale].engineType[engine_type]}</Text>
        </View>

        <View style={ style.row }>
          <Text style={ style.label }>{localize[locale].auto.gearbox}</Text>
          <View style={ style.dots }></View>
          <Text style={ style.value }>{localize[locale].gearboxTypes[gearbox]}</Text>
        </View>

        <View style={ style.row }>
          <Text style={ style.label }>{localize[locale].auto.drive}</Text>
          <View style={ style.dots }></View>
          <Text style={ style.value }>{localize[locale].driveTypes[drive]}</Text>
        </View>

      </View>
    )
  }
}

const style = StyleSheet.create({
  pic: {
    backgroundColor: colors.goblin,
    height: 200,
    marginBottom: 10,
    width: '100%',
  },
  make: {
    fontSize: 20,
    color: colors.white,
    padding: 15,
  },
  row: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 15,
    color: colors.white,
    padding: 5,
  },
  value: {
    fontSize: 15,
    color: colors.white,
    padding: 5,
  },
  year: {
    fontSize: 15,
    color: colors.snow400,
    padding: 10,
  },
  dots: {
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: colors.lighterG,
    flexGrow: 1,
    top: -5,
  }
});

export default AutoDetails;