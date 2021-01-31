import $ from 'jquery';
// import Auth from './Auth';
import request from 'superagent';
const BASE_URL = window.location.origin;
const CONTENT_TYPE = 'application/json';
const CLOUDINARY_UPLOAD_URL = `${BASE_URL}/user/menu/upload`;
// const COMBATANT_IMAGE_PRESET = 'order_image';
// const FILE_NAME_PREFIX = 'sd_combatant_image_';

export default class Requester {
    static get(url, authenticated) {
        let request = {
            type: 'get',
            url: `${BASE_URL}/${url}`
    ***REMOVED***;
        if (authenticated) {
            let authenticationHeader = `${sessionStorage.getItem('Authentication')}`;
            request.headers = { 'Authentication': authenticationHeader }
    ***REMOVED***
        console.log(request);
        return $.ajax(request);
***REMOVED***

    static post(url, data, authenticated) {
        let request = {
            type: 'post',
            url: `${BASE_URL}/${url}`,
            data: JSON.stringify(data),
            headers: {
                'Content-Type': CONTENT_TYPE,
        ***REMOVED***
    ***REMOVED***;
        console.log(request);
        if (authenticated) {
            let authenticationHeader = `${sessionStorage.getItem('Authentication')}`;
            request.headers = { 'Authentication': authenticationHeader }
    ***REMOVED***
        return $.ajax(request);
***REMOVED***

    static delete(url, authenticated) {
        let request = {
            type: 'delete',
            url: `${BASE_URL}/${url}`,
            headers: {
                'Content-Type': CONTENT_TYPE,
        ***REMOVED***
    ***REMOVED***;
        if (authenticated) {
            let authenticationHeader = `${sessionStorage.getItem('Authentication')}`;
            request.headers = { 'Authentication': authenticationHeader }
    ***REMOVED***
        return $.ajax(request);
***REMOVED***

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
            ***REMOVED***
                resolve(response);
        ***REMOVED***);
    ***REMOVED***);
***REMOVED***
}