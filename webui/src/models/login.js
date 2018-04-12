import { routerRedux } from 'dva/router'
import {request} from '../utils/fetch';
import {Notification} from '../components';
//import { login } from 'services/login'


import axios from 'axios'
import { notification } from 'antd';
import { connect } from 'tls';

const co = require('co');
async function login(params) {
	return axios({
		method: 'post',
		url: $BASE + 'sys/user/login.do',
		data: params
	})
}

async function yzm(params) {
	return axios({
		method: 'post',
		url: $BASE + 'verification/getImg.do',
		data: params
	})
}


async function menu(params) {
	return axios({
		method: 'post',
		url: $BASE + 'sys/user/getRootTabsByUser.do',
		data: params
	})
}

export default {
	namespace: 'login',

	state: { yzm: {}, menu: [] },
	subscriptions: {
		setup({ dispatch, history }) {
			history.listen((location) => {
				if (location.pathname === '/login') {

				}
			})
		},
	},
	reducers: {
		updateLogin(state, { payload }) {
			return { ...state, ...payload }
		},
	},
	effects: {
		* getYzm({
			payload,
		}, { put, call, select }) {
			const data = yield call(yzm)
			if (data.data.code == 0) {
				yield put({
					type: 'updateLogin', payload: {
						yzm: data.data.response
					}
				})
			} else {
				throw data
			}
		},
		* getMenu({
			payload,
		}, { put, call, select }) {
			const data = yield call(menu)
			if (data.data.code == 0) {
				yield put({
					type: 'updateLogin', payload: {
						menu: data.data.response
					}
				})
			} else {
				throw data
			}
		},
		* login({
			payload,
		}, { put, call, select }) {
			// const data = yield call(login, payload)
			var lists = [];
			for (let i = 0; i < 100; i++) {
				var testmsg = ['存入比特币', '提取以太币', '用***个比特币买入**个以太币', '用***个比特币买入**个以太币'];
				var note = ['存入', '提取', '交易', '交易'];
				var index = Math.floor(Math.random() * 4);
				lists.push({
					key: i + 1,
					time: new Date().format('yyyy-MM-dd hh:mm:s'),
					testmsg: testmsg[index],
					number: (Math.random() * 10).toFixed(2),
					note: note[index],
				})
			}
			const data = {
				data: {
					code: 0,
					response: {
						token: 111,
						lists,
						btb: (Math.random() * 100).toFixed(5),
						ytb: (Math.random() * 100).toFixed(5),
						...payload
					}
				}
			}
			console.log('login payload', payload);
			console.log('登录字段：', data);
			let res = yield request('login', {
				method: 'post',
				data: {
					...payload
				}
			}, null, true)

			console.log('c', res);
			const { locationQuery } = yield select(_ => _.app);
			let  resData = res.data;
			Object.assign(resData, {lists})
			
			if (res && res.retMsg === 'OK') {
				const { from } = locationQuery;
				localStorage.setItem('user', JSON.stringify(resData));
				localStorage.setItem('name', res.data.name);
				localStorage.setItem('address', res.data.address);
				localStorage.setItem('token', res.data.sessionid);
				yield put({
					type: 'app/updateState',
					payload: {
						user: data.data.response
					},
				})
				//yield put({ type: 'app/query' })
				if (from && from !== '/login') {
					yield put(routerRedux.push('/dashboard'))
					// console.log('from ???', from);
					// yield put(routerRedux.push(from))
				} else {
					yield put(routerRedux.push('/dashboard'))
				}
			} else {
				Notification.error("账号或密码错误");
			}
		},
		* register({
			payload,
		}, { put, call, select }) {
			let res = yield request('useradd', {
				method: 'post',
				data: {
					...payload
				}
			}, null, true)
			let lists = [];
			for (let i = 0; i < 100; i++) {
				var testmsg = ['存入比特币', '提取以太币', '用***个比特币买入**个以太币', '用***个比特币买入**个以太币'];
				var note = ['存入', '提取', '交易', '交易'];
				var index = Math.floor(Math.random() * 4);
				lists.push({
					key: i + 1,
					time: new Date().format('yyyy-MM-dd hh:mm:s'),
					testmsg: testmsg[index],
					number: (Math.random() * 10).toFixed(2),
					note: note[index],
				})
			}

			let resData = res.data;
			Object.assign(resData, {lists})

			console.log('register', res);
			if (res && res.retMsg === 'OK') {
				localStorage.setItem('user', JSON.stringify(Object.assign(resData, {lists})));
				localStorage.setItem('name', res.data.name);
				localStorage.setItem('address', res.data.address);
				localStorage.setItem('token', res.data.sessionid);
				yield put({
					type: 'app/updateState',
					payload: {
						user: res.data
					},
				})
				yield put(routerRedux.push('/dashboard'))
			} else {
				return Notification.error(res.retMsg);
				// throw data
			}
		},
	},

}