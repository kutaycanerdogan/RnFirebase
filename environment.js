var _Environments = {
  production: {BASE_URL: 'http://10.0.2.2:5000/api'},
  staging: {BASE_URL: ''},
  // emulator
  development: {BASE_URL: 'http://10.0.2.2:5000/api'},
  // physical device
  deviceDevelopment: {BASE_URL: 'http://10.0.2.2:56657/api'},
};

function getEnvironment() {
  // ...now return the correct environment
  return _Environments['development'];
}

var Environment = getEnvironment();
module.exports = Environment;
