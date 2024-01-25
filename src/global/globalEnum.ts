export enum Role {
    ADMIN = 'admin',
    PATIENT = 'patient',
    DENTIST = 'dentist',
    STAFF = 'staff',
    GUEST = 'guest',
}

export enum HttpStatus {
    SUCCESS = 200,
    CREATED = 201,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500,
}

export enum HttpMessage {
    SUCCESS = 'Success',
    CREATED = 'Created',
    BAD_REQUEST = 'Bad Request',
    UNAUTHORIZED = 'Unauthorized',
    NOT_FOUND = 'Not Found',
    INTERNAL_SERVER_ERROR = 'Internal Server Error',
}