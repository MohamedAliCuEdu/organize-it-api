const REGEX = {
  OBJECT_ID: /^[a-zA-Z0-9]{24}$/,
  USERNAME: /^[a-zA-Z][a-zA-Z0-9_]{4,19}$/gi,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,30}$/,
  NAME: /^[a-zA-Z-' ]{1,49}$/,
  HEX_COLOR: /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/,
  COUNTRY: /^[A-Za-zÀ-ÖØ-ÿĀ-ſ]+(?:[\s'-][A-Za-zÀ-ÖØ-ÿĀ-ſ]+)*$/,
  EDUCATION: /^[A-Za-z0-9\s'"\-.,()&]{10,70}$/,
  BIRTH_DATE: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/,
};

module.exports = REGEX;
