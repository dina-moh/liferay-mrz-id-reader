/* global Liferay */

import axios from 'axios';

export function Request(config) {
    return new Promise((resolve, reject) => {
        axios
            .request({
                headers: {
                    'x-csrf-token': Liferay.authToken,
                },
                method: 'get',
                ...config,
            })
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            });
    });

    //    Demo Service Request

}