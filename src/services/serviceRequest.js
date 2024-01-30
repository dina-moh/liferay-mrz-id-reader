import { Request } from '../utils/request';

export function postRequest(data) {
    let config = {
        method: 'post',
        url: '/o/c/srs/',
        data: data
    }

    return Request(config);
}