// @flow

//
// Taken and optimized from: https://github.com/matc4/react-native-svg-uri
//

import * as React from 'react';

import { View } from 'react-native';
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';

// $FlowFixMe: TODO
import xmldom from 'xmldom';

import Svg, {
  Circle,
  ClipPath,
  Ellipse,
  G,
  LinearGradient,
  RadialGradient,
  Line,
  Path,
  Polygon,
  Rect,
  Defs,
  Stop,
} from 'react-native-svg';

import * as utils from 'components/SVGUri/utils';

const ACCEPTED_SVG_ELEMENTS = [
  'svg',
  'g',
  'circle',
  'line',
  'path',
  'rect',
  'defs',
  'clipPath',
  'linearGradient',
  'radialGradient',
  'stop',
  'ellipse',
  'polygon',
];

// Attributes from SVG elements that are mapped directly.
const SVG_ATTS = ['viewBox', 'fill'];
const G_ATTS = ['id', 'clipPath'];
const CIRCLE_ATTS = ['cx', 'cy', 'r', 'fill', 'stroke'];
const PATH_ATTS = ['d', 'fill', 'stroke'];
const RECT_ATTS = [
  'width',
  'height',
  'fill',
  'stroke',
  'x',
  'y',
  'transform',
  'rx',
  'ry',
];
const LINE_ATTS = [
  'x1',
  'x2',
  'y1',
  'y2',
  'fill',
  'stroke',
  'stroke-linecap',
  'stroke-linejoin',
];
const LINEARG_ATTS = [
  'id',
  'x1',
  'y1',
  'x2',
  'y2',
  'gradientTransform',
  'gradientUnits',
];
const RADIALG_ATTS = ['id', 'cx', 'cy', 'r'];
const STOP_ATTS = ['offset', 'stopColor'];
const ELLIPSE_ATTS = ['fill', 'cx', 'cy', 'rx', 'ry'];
const POLYGON_ATTS = ['points'];
const CLIPPATH_ATTS = ['id'];

type Props = {
  source?: string,
  svgXmlData: string,
  width: number,
  height: number,
  fill?: string,
  style?: View.props.style,
};
type State = {
  rootSVG: Node,
};

class SVGUri extends React.Component<Props, State> {
  props: Props;
  state: State;

  _isComponentMounted: boolean;
  _index: number;

  constructor(props: Props) {
    super(props);

    this.state = {
      rootSVG: null,
    };

    this._isComponentMounted = false;
    this._index = 0;

    // Gets the image data from an URL or a static file
    if (props.source) {
      const source = resolveAssetSource(props.source) || {};
      this._fetchSVGData(source.uri);
    } else if (props.svgXmlData) {
      this.state = {
        rootSVG: this._buildSVG(props.svgXmlData),
      };
    }
  }

  componentWillMount() {
    this._isComponentMounted = true;
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.source) {
      const source = resolveAssetSource(nextProps.source);
      const oldSource = resolveAssetSource(this.props.source);
      if (source && oldSource && source.uri !== oldSource.uri) {
        this._fetchSVGData(source.uri);
      }
    }
  }

  componentWillUnmount() {
    this._isComponentMounted = false;
  }

  _buildSVG = svgData => {
    const inputSVG = svgData.substring(
      svgData.indexOf('<svg '),
      svgData.indexOf('</svg>') + 6
    );
    const doc = new xmldom.DOMParser().parseFromString(inputSVG);
    return this._inspectNode(doc.childNodes[0]);
  };

  _fetchSVGData = async uri => {
    let responseXML = null;
    try {
      let response = await fetch(uri);
      responseXML = await response.text();
    } catch (e) {
      console.error('ERROR SVG', e);
      // } finally {
      //   if (this._isComponentMounted) {
      //     this.setState(prev => ({
      //       ...prev,
      //       svgXmlData: responseXML || '',
      //     }));
      //   }
    }
    return responseXML;
  };

  _createSVGElement = (node, children) => {
    let componentAtts = {};
    const i = this._index++;

    switch (node.nodeName) {
      case 'svg':
        const { width, height } = this.props;
        componentAtts = this._obtainComponentAtts(node, SVG_ATTS);
        if (width) {
          componentAtts.width = width;
        }
        if (height) {
          componentAtts.height = height;
        }
        return (
          <Svg key={i} {...componentAtts}>
            {children}
          </Svg>
        );

      case 'g':
        componentAtts = this._obtainComponentAtts(node, G_ATTS);
        return (
          <G key={i} {...componentAtts}>
            {children}
          </G>
        );

      case 'path':
        componentAtts = this._obtainComponentAtts(node, PATH_ATTS);
        return (
          <Path key={i} {...componentAtts}>
            {children}
          </Path>
        );

      case 'line':
        componentAtts = this._obtainComponentAtts(node, LINE_ATTS);
        return <Line key={i} {...componentAtts} />;

      case 'circle':
        componentAtts = this._obtainComponentAtts(node, CIRCLE_ATTS);
        return (
          <Circle key={i} {...componentAtts}>
            {children}
          </Circle>
        );

      case 'rect':
        componentAtts = this._obtainComponentAtts(node, RECT_ATTS);
        return (
          <Rect key={i} {...componentAtts}>
            {children}
          </Rect>
        );

      case 'linearGradient':
        componentAtts = this._obtainComponentAtts(node, LINEARG_ATTS);
        return (
          <LinearGradient key={i} {...componentAtts}>
            {children}
          </LinearGradient>
        );

      case 'radialGradient':
        componentAtts = this._obtainComponentAtts(node, RADIALG_ATTS);
        return (
          <RadialGradient key={i} {...componentAtts}>
            {children}
          </RadialGradient>
        );

      case 'stop':
        componentAtts = this._obtainComponentAtts(node, STOP_ATTS);
        return (
          <Stop key={i} {...componentAtts}>
            {children}
          </Stop>
        );

      case 'ellipse':
        componentAtts = this._obtainComponentAtts(node, ELLIPSE_ATTS);
        return (
          <Ellipse key={i} {...componentAtts}>
            {children}
          </Ellipse>
        );

      case 'polygon':
        componentAtts = this._obtainComponentAtts(node, POLYGON_ATTS);
        return (
          <Polygon key={i} {...componentAtts}>
            {children}
          </Polygon>
        );

      case 'defs':
        return <Defs key={i}>{children}</Defs>;

      case 'clipPath':
        componentAtts = this._obtainComponentAtts(node, CLIPPATH_ATTS);
        return (
          <ClipPath key={i} {...componentAtts}>
            {children}
          </ClipPath>
        );

      default:
        return null;
    }
  };

  _obtainComponentAtts = (node, enabledAttributes) => {
    let styleAtts = {};
    [...node.attributes].forEach(({ nodeName, nodeValue }) => {
      Object.assign(
        styleAtts,
        utils.transformStyle(nodeName, nodeValue, this.props.fill)
      );
    });

    let componentAtts = [...node.attributes]
      .map(utils.camelCaseNodeName)
      .map(utils.removePixelsFromNodeValue)
      .filter(utils.getEnabledAttributes(enabledAttributes))
      .reduce(
        (acc, { nodeName, nodeValue }) => ({
          ...acc,
          [nodeName]:
            this.props.fill && nodeName === 'fill'
              ? this.props.fill
              : nodeValue,
        }),
        {}
      );
    if (componentAtts.transform) {
      componentAtts.transform = componentAtts.transform
        .match(/\w+\(.+?\)/g)
        .reduce((acc, curr) => {
          const reg = /(\w+)\((.+)\)/g;
          const [_all, propName, argsString] = Array.from(reg.exec(curr));
          const args = argsString.split(/,\ /g);
          switch (propName) {
            case 'translate':
              acc.translateX = parseFloat(args[0]);
              acc.translateY = parseFloat(args[1]);
              break;
            case 'rotate':
              acc.rotation = parseFloat(args[0]);
              break;
          }
          return acc;
        }, {});
    }
    Object.assign(componentAtts, styleAtts);

    return componentAtts;
  };

  _inspectNode = node => {
    //Process the xml node
    const arrayElements = [];

    // Only process accepted elements
    if (!ACCEPTED_SVG_ELEMENTS.includes(node.nodeName)) {
      return null;
    }

    // Recursive function.
    if (node.childNodes && node.childNodes.length > 0) {
      for (let i = 0; i < node.childNodes.length; i++) {
        const nodo = this._inspectNode(node.childNodes[i]);
        if (nodo != null) {
          arrayElements.push(nodo);
        }
      }
    }

    return this._createSVGElement(node, arrayElements);
  };

  render() {
    const { style } = this.props;
    const { rootSVG } = this.state;

    if (!rootSVG) {
      return null;
    }

    return <View style={style}>{rootSVG}</View>;
  }
}

export default SVGUri;