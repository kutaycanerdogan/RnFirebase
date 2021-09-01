const dashBoardRoute = '/dashboard';
const routes = {
  landingScreen: '/',
  login: '/login',
  hello: '/hello',
  signUp: '/signUp',
  dashboard: {
    root: dashBoardRoute,
    menu: `${dashBoardRoute}/menu`,
  },
};
export default routes;
