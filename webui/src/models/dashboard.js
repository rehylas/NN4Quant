import { parse } from 'qs'
import modelExtend from 'dva-model-extend'
import { model } from 'models/common'
import { routerRedux } from 'dva/router'

export default modelExtend(model, {
  namespace: 'dashboard',
  state: {

    sales: [],
    quote: {
      avatar: 'http://img.hb.aicdn.com/bc442cf0cc6f7940dcc567e465048d1a8d634493198c4-sPx5BR_fw236',
    },
    numbers: [],
    recentSales: [],
    comments: [],
    completed: [],
    browser: [],
    cpu: {},
    user:{} ,
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/dashboard' || pathname === '/') {

          dispatch({
            type: 'updateState',
            payload:{
              user:JSON.parse(localStorage.getItem('user') || '{}')
            },
          })
        }
      })
    },
  },
  effects: {
    * query ({
      payload,
    }, { call, put }) {
      const data = yield call(query)
    },
    *gotoset({ payload }, { put, call, select }) {
			console.log('gotoset', payload);
			yield put(routerRedux.push('/set'))
		},
		*gotoget({ }, { put, call, select }) {
			yield put(routerRedux.push('/get'))
		},
		*gotoTransaction({ }, { put, call, select }) {
			yield put(routerRedux.push('/transaction'))
		},
  },
})
