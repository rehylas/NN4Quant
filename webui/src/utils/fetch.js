import {routerRedux} from 'dva/router';

const host = 'http://localhost:8080/';

function requireResponse (response) {
    if (response.status > 300) {
        return {error: `请求失败[${response.status}],${response.url}`}
    }
    return response.json()
}

function handleResponse (result, cb) {
    console.log('handle Response', result);
    // 约定为 token 不存在 或者 token 过期
    if (result.retCode && result.retCode === '999') {
        // routerRedux.push('/login');
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("address");
        // localStorage.removeItem("")/
        window.location.reload(); 
    }
    if (result.error) {
        // alert(result.error);
        console.log('handleResponse error ', result.error);
        return cb(result.error, null);
    }
    
    return cb(null, result);
    // process.env.NODE_ENV === 'development' && console.log('response>>>', result);

    if (result && result.statusCode === 200) {
        return cb(null, result.data);
    }

    if (result && result.statusCode > 10000) {
        return cb(result, null);
    }

    console.log('result', result, cb);

    if (result.error) {
        return cb({detail: '', errorType: '', msg: result.error, statusCode: 500}, null);
    }
}

function request (path, {method = 'GET', data = {}}, cb, promise){

    const token = localStorage.getItem('token');
    const name = localStorage.getItem('name');

    method = method.toUpperCase();
    let url = host + path;
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };

    let body = {name, token};

    if (method !== 'GET') {
        body = JSON.stringify(Object.assign(body, data));
    } else {
        let params = _.map(data, (v, k)=> [[k], JSON.stringify(v)].join('='));
        if (params.length) {
            url = [url, encodeURIComponent(params.join('&'))].join('?');
        }
    }

    // console.lo

   if (promise) {
       return new Promise((resolve, reject) => {
            fetch(url, {
                headers,
                method: method.toUpperCase(),
                mode: 'cors',
                // credentials: "include",
                body
            }).then(res => {
                return resolve(res.json())
            });
       })
   }

    fetch(url, {
        headers,
        method: method.toUpperCase(),
        mode: 'cors',
        // credentials: "include",
        body
    }).then(res => {
        return requireResponse(res);
    }).then(data => {
        return handleResponse(data, cb);
    });
}

export {
    request
}



// function T () {
// }

// T.prototype.test = function () {

// }

// class T {
//     test() {

//     }
// }


// const T = () => {
//     test: () => {

//     }
// }

// const T = function () {
//     function test() {

//     }
// }

