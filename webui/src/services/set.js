import {request, config} from '../utils';

const {api} = config;





export async function setAmount(data) {
    // return 1;
    console.log('service setAmount', data);
    return request ({
        url: '/userDraw',
        method: 'post',
        data
    })
    // return await test();
}