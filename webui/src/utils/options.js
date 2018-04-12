const COINS = ['ETH', 'BTC'];

const initCoinOptions = (prefix = "", endfix = "") => {
    return COINS.map(c => {
        return (
            <Option value={c}>{`${prefix}${c}${endfix}`}</Option>
        )
    })
}



export {
    initCoinOptions
}