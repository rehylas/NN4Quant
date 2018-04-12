async function test() {
    console.log('test--');
    let cookie = document.cookie;
    console.log('===cookie', cookie);
    fetch('http://localhost:8080/userDraw', {
        mode: 'no-cors',
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: 'test'
        })
    }).then((err, res) => {
        console.log('err', res);
    })
}


export default {
    namespace: 'set',
    state: {
        
    },
    effects: {
        // async setAmount({payload}, {call, put, select}) {
        //     console.log('payload====', payload);
        //     // const res = await call(test);
        //     const res = await call(setAmount);
        //     console.log('res', res);
        // },
        * deposit({payload}, {call, put, select}) {
            console.log('payload====', payload);
            const res = yield call(test);
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