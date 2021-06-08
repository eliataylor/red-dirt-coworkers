import axios from 'axios';
const Config = {
    'api' : {
        timeout : process.env.NODE_ENV === 'production' ? 3000 : 0,
        base: '//portal.ruhralfarms.com'
        //    base : 'https://34.105.110.195'
        //    base : 'https://ruhralfarms.bukach.me',
        //    base : 'https://localhost.ruhralfarms.com'
    }
}
class API {

    constructor() {
        axios.defaults.headers.common['timeout'] = Config.api.timeout; // for debugging with php breakpoints
        axios.defaults.headers.common['Accept'] = 'application/json';
        // axios.defaults.headers.common['Access-Control-Max-Age'] = -1;
        axios.defaults.headers.post['Content-Type'] = 'application/json';
        this.requester = axios.create({
            baseURL: Config.api.base,
            timeout: Config.api.timeout,
            params: {'_format': 'json'}
        });
    }

    Get (path) {
        return this.requester.get(path);
    }

    Post (path, data) {
        console.log('POST to "' + path + '" with ', data);
        return this.requester.post(path, data);
    }

    getErrorMsg(err) {
        var msg = [];
        if (err.response && err.response.data) {
            console.log(err.response.status, err.response.data);
            if (typeof err.response.data === 'string') {
                msg.push( err.response.data ); // not json response
            } else if (typeof err.response.data.message === 'string') {
                msg.push( err.response.data.message === '' ? 'Unauthorized' : err.response.data.message );
            } else if (err.response.data.error) {
                if (typeof err.response.data.error === 'object') msg.push(err.response.data.error.join(', '));
                else msg.push(err.response.data.error);
            } else if (err.response.data.indexOf('<!DOCTYPE html>') !== 0) {
                // msg.push(err.response.data);
            }
        }

        if (msg.length === 0) {
            if (typeof err.message !== 'undefined' && err.message !== '') {
                console.log('Error', err.message);
                msg.push(err.message);
            } else if (err.request) {
                console.log(err.request);
                msg.push('no server response from server: ' + Config.api.base);
            } else {
                msg.push(JSON.stringify(err));
                console.log('Default Server Error', err);
            }
        }

        return msg.join('. ');
    }

}

export default new API(); // singleton
