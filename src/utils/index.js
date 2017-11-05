export const emailOrPhone = (value) => {
  if(value && !value[0].match(/[+]/gi)) {
   return "email";
  } else if(value && value[0].match(/[0-9+]/gi)) {
   return "phone";  
  }
  return "email";
}

export default {
  emailOrPhone,
}