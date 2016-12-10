'use strict';

var React = require('react');
var ReactRouter = require('react-router');
var browserHistory = ReactRouter.browserHistory;

var toastr = require('toastr');
var AuthorForm = require('./authorForm');
var AuthorActions = require('../../actions/authorActions');
var AuthorStore = require('../../stores/authorStore');

var ManageAuthorPage = React.createClass({
	contextTypes: {
    	router: React.PropTypes.object.isRequired
  	},

	componentWillMount: function() {
		var authorId = this.props.params.id;

		if ( authorId ) {
			this.setState({author: AuthorStore.getAuthorById(authorId)});
		}
	},

  	componentDidMount: function() {
		this.props.router.setRouteLeaveHook(this.props.route, this.routerWillLeave.bind(null, this));
	},

	routerWillLeave: function(component) {
		return 'Are you sure you want to leave?'
    },

	getInitialState: function() {
		return {
			author: { id: '', firstName: '', lastName: '' },
			errors: {}
		}
	},

	setAuthorPage: function(event) {
		var field = event.target.name;
		var value = event.target.value;

		this.state.author[field] = value;
		return this.setState({ author: this.state.author });
	},

	authorFormIsValid: function() {
		var formIsValid = true;
		this.state.errors = {}; // limpa o que tiver setado

		if (this.state.author.firstName.length < 3 ) {
			this.state.errors.firstName = 'First Name is very short.. We need more 3 chars';
			formIsValid = false;
		}

		if (this.state.author.lastName.length < 3 ) {
			this.state.errors.lastName = 'Last Name is very short.. We need more 3 chars';
			formIsValid = false;
		}

		this.setState({errors : this.state.errors});
		return formIsValid;
	},
	
	saveAuthor: function(event) {
		event.preventDefault();

		if ( !this.authorFormIsValid() ) return;
			
		var message = 'Author saved.';
		if ( this.state.author.id ) {
			AuthorActions.updateAuthor(this.state.author);
			message = 'Author updated.';
		} else {
			AuthorActions.createAuthor(this.state.author);	
		}

		toastr.success(message);
		this.context.router.push('/authors');
    },

	render: function() {
		return(
			<AuthorForm 
				author={this.state.author}
				onChange={this.setAuthorPage}
				onSave={this.saveAuthor}
				errors={this.state.errors} />
		);
	}
});

module.exports = ManageAuthorPage;