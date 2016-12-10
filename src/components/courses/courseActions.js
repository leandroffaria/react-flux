'use strict';

var Dispatcher = require('../../dispatcher/appDispatcher');
var CourseApi = require('../../api/courseApi');
var ActionTypes = require('../../constants/actionTypes');

var CourseActions = {

	createCourse: function(course) {
		var data = CourseApi.saveCourse(course);

		Dispatcher.dispatch({
			actionType: ActionTypes.CREATE_COURSE,
			course: data
		});
	},

	updateCourse: function(course) {
		var data = CourseApi.saveCourse(course);

		Dispatcher.dispatch({
			actionType: ActionTypes.UPDATE_COURSE,
			course: data
		});
	},

	deleteCourse: function(id) {
		CourseApi.deleteCourse(id);

		Dispatcher.dispatch({
			actionType: ActionTypes.DELETE_COURSE,
			id: id
		});
	}

};

module.exports = CourseActions;