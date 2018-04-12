const host = 'http://localhost:8002/';

const request = (api, method, data) => {
    console.log('request=====', api, method, data);
    return new Promise((resolve, reject) => {
        fetch(`${host}${api}`, {
            mode: 'no-cors',
            method: String(method).toLocaleLowerCase(),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((err, res) => {
            console.log('err???', res);
            if (err) {
                return reject(err)
            }
            return resolve(res);
        })
    })
}

export {
    request
}