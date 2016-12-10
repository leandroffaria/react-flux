'use strict';

var React = require('react');

var SelectOptions = React.createClass({
	propTypes: {
		name: React.PropTypes.string.isRequired,
		label: React.PropTypes.string.isRequired,
		options: React.PropTypes.array.isRequired,
		selected: React.PropTypes.string.isRequired,
		onChange: React.PropTypes.func.isRequired,
		error: React.PropTypes.string
	},

	getInitialState: function() {
		return {
			value: this.props.selected
		};
	},

	handleChange: function(event) {
		this.setState({value: event.target.value});
		this.props.onChange(event);
	},

	render: function() {
		var wrapperClass = 'form-group';
		if ( this.props.error && this.props.error.length > 0 ) {
			wrapperClass += ' has-error';
		}

		var options = this.props.options.map(function(opt, i) {
			return <option key={i} value={opt.value} label={opt.label}>{opt.label}</option>;
		}, this);

		return(
			<div className={wrapperClass}>
				<label htmlFor={this.props.name}>{this.props.label}</label>
				<select 
					value={this.state.value} 
					ref={this.props.name}
					onChange={this.handleChange} 
					className="form-control" 
					name={this.props.name}>
					<option value=''></option>
					{options}
				</select>
			</div>
		);
	}
});

module.exports = SelectOptions;