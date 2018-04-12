async function req () {

}


export default {
    namespace: 'withdraw',
    state: {

    },
    effects: {

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