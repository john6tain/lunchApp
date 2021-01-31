import $ from 'jquery';
// import Auth from './Auth';
import request from 'superagent';

const BASE_URL = 'http://localhost:3001';
const CONTENT_TYPE = 'application/json';
const CLOUDINARY_UPLOAD_URL = 'http://localhost:3001/user/menu/upload';
// const COMBATANT_IMAGE_PRESET = 'order_image';
// const FILE_NAME_PREFIX = 'sd_combatant_image_';

export default class Requester {
    static get(url, authenticated) {
        let request = {
            type: 'get',
            url: `${BASE_URL}/${url}`
        };
        if (authenticated) {
            let authenticationHeader = `${sessionStorage.getItem('Authentication')}`;
            request.headers = { 'Authentication': authenticationHeader }
        }
        console.log(request);
        return $.ajax(request);
    }

    static post(url, data, authenticated) {
        let request = {
            type: 'post',
            url: `${BASE_URL}/${url}`,
            data: JSON.stringify(data),
            headers: {
                'Content-Type': CONTENT_TYPE,
            }
        };
        console.log(request);
        if (authenticated) {
            let authenticationHeader = `${sessionStorage.getItem('Authentication')}`;
            request.headers = { 'Authentication': authenticationHeader }
        }
        return $.ajax(request);
    }

    static delete(url, authenticated) {
        let request = {
            type: 'delete',
            url: `${BASE_URL}/${url}`,
            headers: {
                'Content-Type': CONTENT_TYPE,
            }
        };
        if (authenticated) {
            let authenticationHeader = `${sessionStorage.getItem('Authentication')}`;
            request.headers = { 'Authentication': authenticationHeader }
        }
        return $.ajax(request);
    }

    static uploadImage(file) {
        return new Promise((resolve, reject) => {
            let authenticationHeader = `${sessionStorage.getItem('Authentication')}`;
            let upload = request.post(CLOUDINARY_UPLOAD_URL)
                .set('Authentication', authenticationHeader)
                .field('base64', file)
            // .field('upload_order', file);

            upload.end((err, response) => {
                if (err) {
                    reject(err);
                }
                resolve(response);
            });
        });
    }
}