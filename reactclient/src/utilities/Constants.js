//Creating our endpoints for local server and azure enviroment.
const API_BASE_URL_DEVELOPMENT = 'https://localhost:7169';
const API_BASE_URL_PRODUCTION = 'https://aspnetcorereactproject-aspnetserver.azurewebsites.net';

//Object to store all of the routes for our endpoints
const ENDPOINTS = {
    GET_All_POSTS: 'get-all-posts',
    GET_POST_BY_ID: 'get-post-by-id',
    CREATE_POST: 'create-post',
    UPDATE_POST: 'update-post',
    DELETE_POST_BY_ID: 'delete-post-by-id'
};

//object for all the API routes within development
const development = {
    API_URL_GET_ALL_POSTS: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINTS.GET_All_POSTS}`,
    API_URL_GET_POST_BY_ID: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINTS.GET_POST_BY_ID}`,
    APL_URL_CREATE_POST: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINTS.CREATE_POST}`,
    API_URL_UPDATE_POST: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINTS.UPDATE_POST}`,
    API_URL_DELETE_POST_BY_ID: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINTS.DELETE_POST_BY_ID}`
};

//Object for all the production API Routes
const production = {
    API_URL_GET_ALL_POSTS: `${API_BASE_URL_PRODUCTION}/${ENDPOINTS.GET_All_POSTS}`,
    API_URL_GET_POST_BY_ID: `${API_BASE_URL_PRODUCTION}/${ENDPOINTS.GET_POST_BY_ID}`,
    APL_URL_CREATE_POST: `${API_BASE_URL_PRODUCTION}/${ENDPOINTS.CREATE_POST}`,
    API_URL_UPDATE_POST: `${API_BASE_URL_PRODUCTION}/${ENDPOINTS.UPDATE_POST}`,
    API_URL_DELETE_POST_BY_ID: `${API_BASE_URL_PRODUCTION}/${ENDPOINTS.DELETE_POST_BY_ID}`
};

//Object to decide if we are working in production or development and make its default export
const Constants = process.env.NODE_ENV === 'development' ? development : production; //If else statement for return development or production

export default Constants;
