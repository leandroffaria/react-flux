'use strict';

var React = require('react');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var NotFoundRoute = ReactRouter.NotFoundRoute;
var Redirect = ReactRouter.Redirect;

var ManageAuthor = require('./components/authors/manageAuthorPage');
var ManageCourse = require('./components/courses/manageCoursePage');
var About = require('./components/about/aboutPage');

var routes = (
	<Route path="/" component={require('./components/app')}>
		<IndexRoute component={require('./components/homePage')}/>
		<Route path="/authors" component={require('./components/authors/authorPage')}/>
		<Route path="/addAuthor" component={ManageAuthor} />
		<Route path="/author/:id" component={ManageAuthor} />

		<Route path="/courses" component={require('./components/courses/coursePage')} />
		<Route path="/addCourse" component={ManageCourse} />
		<Route path="/course/:id" component={ManageCourse} />

		<Route path="/about" component={About} onEnter={About.willTransitionTo}/>
		<Redirect from="/about-us" to="/about"/>
		<Route path="*" component={require('./components/notFoundPage')} />
	</Route>
);

module.exports = routes;