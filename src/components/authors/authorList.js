'use strict';

var toastr = require('toastr');

var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var AuthorActions = require('../../actions/authorActions');

var AuthorList = React.createClass({
	propTypes: {
		authors: React.PropTypes.array.isRequired
	},

	deleteAuthor: function(id) {
		AuthorActions.deleteAuthor(id);
		toastr.success('Author deleted.');
	},

	render: function() {
		var createAuthorRow = function(author) {
			return (
				<tr key={author.id}>
					<td>
						<button type="button" className="btn btn-danger" onClick={this.deleteAuthor.bind(this, author.id)}>
							Delete
						</button>
					</td>
					<td>
						<Link to={`/author/${author.id}`}>{author.id}</Link>
					</td>
					<td>{author.firstName} {author.lastName}</td>
				</tr>
			);
		};

		return(
			<table className="table">
				<thead>
					<tr>
						<th></th>
						<th>ID</th>
						<th>Name</th>
					</tr>
				</thead>
				<tbody>
					{this.props.authors.map(createAuthorRow, this)}
				</tbody>
			</table>
		);
	}
});

module.exports = AuthorList;