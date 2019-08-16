// expose as package default as string to reference

const api = {
  Register: '/auth/register',
  Login: '/auth/login',
  Logout: '/auth/logout',
  ForgePassword: '/auth/forge-password',
  twoStepCode: '/auth/2step-code',
  SendSms: '/account/sms',
  SendSmsErr: '/account/sms_err',
  UserInfo: '/user/info',
  // CreateProject: '/p'
}

export default api
