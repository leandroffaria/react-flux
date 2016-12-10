'use strict';

var React = require('react');
var Input = require('../common/textInput');
var SelectOptions = require('../common/selectOptions');

var CourseForm = React.createClass({
	propTypes: {
		course: React.PropTypes.object.isRequired,
		onSave: React.PropTypes.func.isRequired,
		onChange: React.PropTypes.func.isRequired,
		errors: React.PropTypes.object
	},

	render: function() {
		return(
			<form>
				<h1>Manage Course</h1>
				<Input 
					name="title"
					label="Title"
					value={this.props.course.title}
					onChange={this.props.onChange}
					error={this.props.errors.title}/>

				<SelectOptions 
					name="author" 
					label="Author" 
					selected={this.props.course.author.id}
					onChange={this.props.onChange}
					options={this.props.authors}/>

				<Input 
					name="category"
					label="Category"
					value={this.props.course.category}
					onChange={this.props.onChange}
					error={this.props.errors.category}/>

				<Input 
					name="length"
					label="Length"
					value={this.props.course.length}
					onChange={this.props.onChange}
					error={this.props.errors.length}/>
				
				<button type="submit" className="btn btn-default" onClick={this.props.onSave}>
					Save
				</button>
			</form>
		);
	}
});

module.exports = CourseForm;