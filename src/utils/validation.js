const containsLetter = /(?=(.*[a-zA-Z]){1})/;
const containsSymbol = /(?=(.*[^0-9a-zA-Z]){1})/;
const containsDigit = /(?=(.*[0-9]){1})/;
const isAnEmail = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.([a-z]+)|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
const birthdate = /null/g;

const rules = {
  email: (value) => value && value.match(isAnEmail),
  password: (value) => value && value.length >= 6,
};

export const validator = (key, value) => {
  return rules[key](value);
}

export default validator;