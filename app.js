'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _reduxUndo = require('redux-undo');

var _reduxUndo2 = _interopRequireDefault(_reduxUndo);

var _redux = require('redux');

var _reduxIgnore = require('redux-ignore');

var states = {
	'one': { 'type': 'one' },
	'two': { 'type': 'two' },
	'bogus': { 'type': 'bogus' }
};

var actions = {
	'toggle': { 'type': 'toggle' },
	'bogus': { 'type': 'bogus' }
};

var reducer = function reducer() {
	var state = arguments.length <= 0 || arguments[0] === undefined ? states.one : arguments[0];
	var action = arguments.length <= 1 || arguments[1] === undefined ? actions.toggle : arguments[1];

	var newState = state;

	switch (state.type) {
		case 'one':
			switch (action.type) {
				case 'toggle':
					newState = states.two;
					break;
				case 'bogus':
					newState = states.bogus;
				default:
					break;
			}
			break;
		case 'two':
			switch (action.type) {
				case 'toggle':
					newState = states.one;
					break;
				case 'bogus':
					newState = states.bogus;
				default:
					break;
			}
			break;
		default:
			break;
	}

	return newState;
};

// const store = createStore(ignoreActions(reducer, [actions.bogus]));

var store = (0, _redux.createStore)((0, _redux.combineReducers)({
	reducer: (0, _reduxUndo2['default'])((0, _reduxIgnore.ignoreActions)(reducer, function (action) {
		return action.type === 'bogus';
	}))
}));

store.subscribe(function () {
	console.log('Present:', store.getState().reducer.present);
	console.log('Past:', store.getState().reducer.past);
	console.log('---');
});

store.dispatch(actions.toggle);
store.dispatch(actions.bogus);
store.dispatch(actions.toggle);

