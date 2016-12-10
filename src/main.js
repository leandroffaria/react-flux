var React = require('react');
var ReactDOM = require('react-dom');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var hashHistory = ReactRouter.hashHistory;
var browserHistory = ReactRouter.browserHistory;
var DefaultRoute = ReactRouter.DefaultRoute;
var IndexRoute = ReactRouter.IndexRoute;

var InitializeActions = require('./actions/initializeActions')

var routes = require('./routes');

InitializeActions.initApp();

ReactDOM.render(
  <Router history={hashHistory}>
	{routes}
  </Router>,
  document.getElementById('app')
);