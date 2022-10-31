import { StatusCodes } from 'http-status-codes';
import CustomApiError from './custom-api.js';

class UnAuthentication extends CustomApiError {
    constructor(mess) {
        super(mess);
        this.statusCode = StatusCodes.UNAUTHORIZED;
    }
}

export default UnAuthentication;