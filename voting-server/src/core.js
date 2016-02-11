import {List, Map} from 'immutable';

export function setEntries(state, entries) {
    return state.set('entries', entries);
}

export function next(state) {
    const entries = state.get('entries');

    return state.merge({
        entries: entries.skip(2),
        vote: Map({pair: entries.take(2)})
    });
}
