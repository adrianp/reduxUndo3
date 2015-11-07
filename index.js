import undoable from 'redux-undo';
import {combineReducers, createStore} from 'redux';
import {ignoreActions} from 'redux-ignore';

const states = {
	'one': {'type': 'one'},
	'two': {'type': 'two'},
	'bogus': {'type': 'bogus'}
};

const actions = {
	'toggle': {'type': 'toggle'},
	'bogus': {'type': 'bogus'}
};

const reducer = (state = states.one, action = actions.toggle) => {
	let newState = state;

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

const store = createStore(combineReducers({
	ignore: ignoreActions(reducer, (action) => {
		return action.type === 'bogus';
	}),
	undo: undoable(reducer)
}));

store.subscribe(() => {
	console.log('IGNORE:', store.getState().ignore.type);
	console.log('UNDO PRESENT:', store.getState().undo.present);
	console.log('UNDO PAST:', store.getState().undo.past);
	console.log('---');
});

store.dispatch(actions.toggle);
store.dispatch(actions.bogus);
