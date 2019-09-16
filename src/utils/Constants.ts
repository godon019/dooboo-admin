const STATUS_CODE = {
  ERROR: 500, // 500
  NOT_FOUND: 404, // 404
  NO_CONTENT: 204, // 204
  SUCCESS: 200, // 200
  BAD_REQUEST: 400, // 400
  CONFLICT: 409, // conflict
  UNAUTHORIZED: 401, // 401
};

export { STATUS_CODE as statusCode };

export const GQL = {
  serviceGroups: 'serviceGroups',
  categories: 'categories',
  services: 'services',
  subscriptions: 'subscriptions',
};

export const ROUTE = {
  signIn: '/signin',
  signUp: '/signup',
  main: '/main',
  serviceGroup: '/service-group',
  category: '/category',
  serviceDetail: '/service-detail',
};
