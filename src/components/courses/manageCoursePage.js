'use strict';

var _ = require('lodash');

var React = require('react');
var ReactRouter = require('react-router');
var browserHistory = ReactRouter.browserHistory;

var toastr = require('toastr');
var CourseForm = require('./courseForm');
var CourseActions = require('./courseActions');
var CourseStore = require('./courseStore');

var AuthorStore = require('../../stores/authorStore');

var ManageCoursePage = React.createClass({
	contextTypes: {
    	router: React.PropTypes.object.isRequired
  	},

  	componentWillMount: function() {
  		var courseId = this.props.params.id;

  		var authorsOptions = [];
  		var authors = AuthorStore.getAllAuthors();

  		for ( var i = 0; i < authors.length; i++) {
  			authorsOptions.push({ value: authors[i].id, label: `${authors[i].firstName} ${authors[i].lastName}` });
  		}

  		this.setState({ authors: authorsOptions });

		if ( courseId ) {
			this.setState({course: CourseStore.getCourseById(courseId)});
		}
  	},

  	getInitialState: function() {
		return {
			course: { id: '', author: { id: '', name: '' }, title: '', category: '', length: '' },
			authors: [],
			errors: {}
		}
	},
	
	authorFormIsValid: function() {
		var formIsValid = true;
		this.state.errors = {}; // limpa o que tiver setado

		if (this.state.course.title.length < 3 ) {
			this.state.errors.title = 'Title is very short.. We need more 3 chars';
			formIsValid = false;
		}

		if (this.state.course.category.length < 3 ) {
			this.state.errors.category = 'Category is very short.. We need more 3 chars';
			formIsValid = false;
		}

		this.setState({errors : this.state.errors});
		return formIsValid;
	},

  	setCoursePage: function(event) {
  		var field = event.target.name;
		var value = event.target.value;

		if ( field === 'author' ) {
			var data = _.find(this.state.authors, {value: value});

			value = {  
				id: data.value,
				name: data.label
			};
		}

		this.state.course[field] = value;
		return this.setState({ course: this.state.course });
  	},

	saveCourse: function(event) {
		event.preventDefault();

		if ( !this.authorFormIsValid() ) return;

		var message = 'Course saved.';
		if ( this.state.course.id ) {
			CourseActions.updateCourse(this.state.course);
			message = 'Course updated.';
		} else {
			CourseActions.createCourse(this.state.course);	
		}

		toastr.success(message);
		this.context.router.push('/courses');
	},

	render: function() {
		return(
			<CourseForm 
				course={this.state.course}
				authors={this.state.authors}
				onSave={this.saveCourse}
				onChange={this.setCoursePage}
				errors={this.state.errors} />
		);
	}
});

module.exports = ManageCoursePage;