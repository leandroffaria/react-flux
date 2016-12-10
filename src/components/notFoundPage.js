'use strict';

var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var NotFoundPage = React.createClass({
	render: function() {
		return(
			<div>
				<h1>Page not found</h1>
				<p>Whoops! Sorry, there is nothing to see here.</p>
				<Link to='/' className="btn btn-primary">Back to Home</Link>
			</div>
		);
	}
});

module.exports = NotFoundPage;