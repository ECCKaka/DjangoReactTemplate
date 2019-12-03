// List of constants throughout the application.

let URL_PREFIX = `http://${window.location.hostname}:8000`;

// if (process.env.NODE_ENV && process.env.NODE_ENV.trim() === 'production') {
//   URL_PREFIX = 'http://' + window.location.host;
// }

let DATE_FORMAT = 'yyyy-mm-dd';
let EDIT_DATE_FORMAT = "yyyy-mm-dd'T'HH:MM:ss";
let TEXTFIELD_DATE_FORMAT = "yyyy-mm-dd";

let VIEW_MODE = Object.freeze({
    CREATE: 0,
    READ: 1,
    UPDATE: 2,
});

export {URL_PREFIX};
export {DATE_FORMAT};
export {EDIT_DATE_FORMAT};
export {TEXTFIELD_DATE_FORMAT};
export {VIEW_MODE};
