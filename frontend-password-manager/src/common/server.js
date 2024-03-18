const  baseUrl = 'http://127.0.0.1:8080';


const config = {
  apiUrl: 'https://jsonplaceholder.typicode.com/users', // Example API endpoint
  loginUrl : baseUrl + '/account/login',
  loginValidateUrl : baseUrl + '/account/login/validate',
  registerUrl : baseUrl + '/account/register',
  registerValidateUrl : baseUrl + '/account/register/validate',
  getQr : baseUrl + '/user/secretKey',
  userInfoUrl : baseUrl + '/user/getUserInfo',
  masterKeyUrl : baseUrl + '/user/masterKey',
  checkMasterKeyUrl : baseUrl + '/user/checkMasterKey',
  changeMasterKey : baseUrl +'/user/changeMasterKey',
  subAccountUrl : baseUrl + '/user/subAccount',
  subAccountListUrl : baseUrl + '/user/subAccountList',
  userList : baseUrl + '/admin/userList',
  userDetail : baseUrl + '/admin/userDetail',
  removeCountdown : baseUrl + '/admin/userDetail/removeCountdown',
  page : "PAGE",
  editAccountSetting  : baseUrl + '/account/editAccountSetting',
  getAccountSetting : baseUrl + '/account/getAccountSetting',
  backupMasterKey : baseUrl + '/user/backupMasterkey',
  recoveryMasterkey : baseUrl + '/user/recoveryMasterkey',
  forgotPassword : baseUrl + '/account/forgotPassword',
  unlock : baseUrl + '/user/removeCountdown',
  changePassword : baseUrl + '/account/changePassowrd',

  // Other configurations...
};

export default config;
