import {expect} from 'chai';
import {List, Map} from 'immutable';

describe('immuntability', () => {
    describe('a number', () => {
        function increment(currentState) {
            return currentState + 1;
        }

        it('is immutable', () => {
            let state = 42;
            let nextState = increment(state);

            expect(nextState).to.equal(43);
            expect(state).to.equal(42);
        });
    });

    describe('a list', () => {
        function addMovie(state, movie) {
            return state.push(movie);
        }

        it('is immutable', () => {
            let state = List.of('Sound of Music', 'Mary Poppins');
            let nextState = addMovie(state, 'Wizard of Oz');

            expect(nextState).to.equal(List.of(
                'Sound of Music',
                'Mary Poppins',
                'Wizard of Oz'
            ));

            expect(state).to.equal(List.of(
                'Sound of Music',
                'Mary Poppins'
            ));

        });
    });

    describe('a tree', () => {
        function addMovie(currentState, movie) {
            return currentState.update('movies', movies => movies.push(movie));
        }

        it('is immutable', () => {
            let state = Map({
                movies: List.of('Sound of Music', 'Mary Poppins')
            });
            let nextState = addMovie(state, 'Wizard of Oz');

            expect(state).to.equal(Map({
                movies: List.of(
                    'Sound of Music',
                    'Mary Poppins'
                )
            }));

            expect(nextState).to.equal(Map({
                movies: List.of(
                    'Sound of Music',
                    'Mary Poppins',
                    'Wizard of Oz'
                )
            }));
        });
    });
});
