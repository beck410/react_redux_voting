import {Map, List, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer';

describe('reducer', () => {

    it('has initial state', () => {
        const action = {type: 'SET_ENTRIES', entries: List.of('Wizard of Oz')};
        const nextState = reducer(undefined, action);
        expect(nextState).to.equal(fromJS({
            entries: ['Wizard of Oz']
        }));
    });

    it('handles SET_ENTRIES', () => {
        const initialState = Map();
        const action = {type: 'SET_ENTRIES', entries: List.of('Wizard of Oz')};
        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            entries: ['Wizard of Oz']
        }));
    });

    it('handles NEXT', () => {
        const initialState = fromJS({
            entries: ['Wizard of Oz', 'Sound of Music']
        });
        const action = {type: 'NEXT'};
        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            entries: [],
            vote: {
                pair: ['Wizard of Oz', 'Sound of Music']
            }
        }));
    });

    it('handles VOTE', () => {
        const initialState = fromJS({
            vote: {
                pair: ['Wizard of Oz', 'Sound of Music']
            },
            entries: []
        });

        const action = {type: 'VOTE', entry: 'Sound of Music'};
        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            vote: {
                pair: ['Wizard of Oz', 'Sound of Music'],
                tally: {'Sound of Music': 1}
            },
            entries: []
        }));
    });

    it('can be used with reduce', () => {
        const actions = [
            {type: 'SET_ENTRIES', entries: List.of('Sound of Music', 'Wizard of Oz')},
            {type: 'NEXT'},
            {type: 'VOTE', entry: 'Sound of Music'},
            {type: 'VOTE', entry: 'Sound of Music'},
            {type: 'VOTE', entry: 'Wizard of Oz'},
            {type: 'NEXT'}
        ];
        const finalState = actions.reduce(reducer, Map());

        expect(finalState).to.equal(fromJS({
            winner: 'Sound of Music'
        }));
    });
});
