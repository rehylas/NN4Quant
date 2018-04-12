import {request} from './fetch'


const test = (payload) => {
    return request(`withdraw`, 'post', payload)
}

export default {
    namespace: 'get',
    state: {
        
    },
    effects: {
        * withdraw({payload}, {call, put, select}) {
            console.log('payload====', payload);
            const res = yield call(test(payload));
            console.log('res', res);
        }
    },

    reducers: {
        updateState (state, {payload}) {
            return {
                ...state,
                ...payload
            }
        }
    }
}