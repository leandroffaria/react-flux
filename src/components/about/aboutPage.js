'use strict';

var React = require('react');
var browserHistory = require('react-router').browserHistory;

var About = React.createClass({
	statics: {
		willTransitionTo: function(next, transition, callback) {
			if(!confirm('Are you sure want to read a page that is this boring?')) {
				browserHistory.goBack();
			}

			callback(null, transition);
		}
	},

	render: function() {
		return(
			<div>
				<h1>About</h1>
				<p>
					This application uses the following technologies:
				</p>
				<ul>
					<li>React</li>
					<li>React Router</li>
					<li>Flux</li>
					<li>Node</li>
					<li>Gulp</li>
					<li>Browserify</li>
					<li>Bootstrap</li>
				</ul>
			</div>
		);
	}
});

module.exports = About;