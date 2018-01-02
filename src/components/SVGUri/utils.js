// @flow

export const camelCase = (value: string) =>
value.replace(/-([a-z])/g, g => g[1].toUpperCase());

export const camelCaseNodeName = ({ nodeName, nodeValue }: Object) => ({
nodeName: camelCase(nodeName),
nodeValue,
});

export const removePixelsFromNodeValue = ({ nodeName, nodeValue }: Object) => ({
nodeName,
nodeValue: nodeValue.replace('px', ''),
});

export const transformStyle = (
nodeName: any,
nodeValue: any,
fillProp: any
) => {
if (nodeName === 'style') {
  return nodeValue.split(';').reduce((acc, attribute) => {
    const [property, value] = attribute.split(':');
    if (property == '') return acc;
    else
      return {
        ...acc,
        [camelCase(property)]:
          fillProp && property === 'fill' ? fillProp : value,
      };
  }, {});
}
return null;
};

export const getEnabledAttributes: Function = enabledAttributes => ({
nodeName,
}) => enabledAttributes.includes(nodeName);