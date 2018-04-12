const APIV1 = '/api/v1'
const APIV2 = '/api/v2'
const BASE = 'http://192.168.2.177:3000'


import logo from '../public/logo.png'

module.exports = {
  name: '数字币交易所',
  prefix: '数字币交易所',
  footerText: '数字币交易所 0.1 © 2018',
  logo,
  iconFontCSS: '/iconfont.css',
  iconFontJS: '/iconfont.js',
  CORS: [],
  openPages: ['/login'],
  apiPrefix: '/api/v1',
  APIV1,
  APIV2,
  api: {
    userLogin: `${APIV1}/user/login`,
    userLogout: `${APIV1}/user/logout`,
  },
}
