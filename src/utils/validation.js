export const containsLetter = /(?=(.*[a-zA-Z]){1})/;
export const containsSymbol = /(?=(.*[^0-9a-zA-Z]){1})/;
export const containsDigit = /(?=(.*[0-9]){1})/;
export const isAnEmail = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.([a-z]+)|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
export const birthdate = /null/g;

export const rules = {
  email: value => value && String(value).match(isAnEmail),
  phone: value => value && String(value).length === 13 && value[0] === "+",
  password: value => value && value.length >= 6,
  repeatPassword: value => value && value.length >= 6,
  fullname: value => value && value.split(' ').length > 1 && value.split(' ')[1],
  login: value => value && String(value).length === 13 && value[0] === "+" && !value.match(containsLetter) || value && value.match(isAnEmail),
};

export const validator = (key, value) => {
  return !!rules[key](value.trim());
}

export const emailOrPhone = (value) => {
  if(value && !value[0].match(/[+]/gi)) {
   return "email";
  } else if(value && value[0].match(/[0-9+]/gi)) {
   return "phone";  
  }
  return false;
}

export default validator;