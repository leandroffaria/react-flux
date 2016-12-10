'use strict';

var toastr = require('toastr');

var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var CourseActions = require('./courseActions');

var CourseList = React.createClass({
	propTypes: {
		courses: React.PropTypes.array.isRequired
	},

	deleteCourse: function(id) {
		CourseActions.deleteCourse(id);
		toastr.success('Author deleted.');
	},

	render: function() {
		var createAuthorRow = function(course) {
			return (
				<tr key={course.id}>
					<td>
						<a className="btn btn-primary" href={`${course.watchHref}`} target="_blank">
							Watch
						</a>
					</td>
					<td>
						<button type="button" className="btn btn-danger" onClick={this.deleteCourse.bind(this, course.id)}>
							Delete
						</button>
					</td>
					<td>
						<Link to={`/course/${course.id}`}>{course.title}</Link>
					</td>
					<td>{course.author.name}</td>
					<td>{course.category}</td>
					<td>{course.length}</td>
				</tr>
			);
		};

		return(
			<table className="table">
				<thead>
					<tr>
						<th></th>
						<th></th>
						<th>Title</th>
						<th>Author</th>
						<th>Category</th>
						<th>Length</th>
					</tr>
				</thead>
				<tbody>
					{this.props.courses.map(createAuthorRow, this)}
				</tbody>
			</table>
		);
	}
});

module.exports = CourseList;