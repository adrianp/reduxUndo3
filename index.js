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
	reducer: undoable(ignoreActions(
		reducer, (action) => action.type === 'bogus'))
}));

store.subscribe(() => {
	console.log('Present:', store.getState().reducer.present);
	console.log('Past:', store.getState().reducer.past);
	console.log('---');
});

store.dispatch(actions.toggle);
store.dispatch(actions.bogus);
store.dispatch(actions.toggle);
