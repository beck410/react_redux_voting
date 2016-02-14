import {expect} from 'chai';
import {List, Map} from 'immutable';
import {setEntries, next, vote} from '../src/core';

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

describe('application logic', () => {
    describe('setEntries', () => {
        it('adds the entries to the state', () => {
            const state = Map();
            const entries = List.of('Sound of Music', 'Marry Poppins');
            const nextState = setEntries(state, entries);

            expect(nextState).to.equal(Map({
                entries: List.of('Sound of Music', 'Marry Poppins')
            }));
        });
    });

    describe('next', () => {
        it('takes the next two entries under vote', () => {
            const state = Map({
                entries: List.of('Sound of Music', 'Marry Poppins', 'Wizard of Oz')
            });
            const nextState = next(state);

            expect(nextState).to.equal(Map({
                entries: List.of('Wizard of Oz'),
                vote: Map({
                    pair: List.of('Sound of Music', 'Marry Poppins'),
                })
            }));
        });

        it('puts winner of current vote back to entries', () => {
            const state = Map({
                vote: Map({
                    pair: List.of('Sound of Music', 'Wizard of Oz'),
                    tally: Map({
                        'Sound of Music': 4,
                        'Wizard of Oz': 1
                    })
                }),
                entries: List.of('Mary Poppins', 'Princess Bride')
            });

            const nextState = next(state);

            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of('Mary Poppins', 'Princess Bride')
                }),
                entries: List.of('Sound of Music')
            }));
        });

        it('puts both from tied vote back to entries', () => {
            const state = Map({
                vote: Map({
                    pair: List.of('Sound of Music', 'Wizard of Oz'),
                    tally: Map({
                        'Sound of Music': 3,
                        'Wizard of Oz': 3
                    })
                }),
                entries: List.of('Mary Poppins', 'Princess Bride')
            });
            const nextState = next(state);

            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of('Mary Poppins', 'Princess Bride')
                }),
                entries: List.of('Sound of Music', 'Wizard of Oz')
            }));
        });

    });

    describe('vote', () => {
        it('creates a tally for the voted entry', () => {
            const state = Map({
                vote: Map({
                    pair: List.of('Sound of Music', 'Wizard of Oz'),
                    tally: Map({
                        'Sound of Music': 3,
                        'Wizard of Oz': 1
                    })
                }),
                entries: List()
            });
            const nextState = vote(state, 'Sound of Music');

            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of('Sound of Music', 'Wizard of Oz'),
                    tally: Map({
                        'Sound of Music': 4,
                        'Wizard of Oz': 1
                    })
                }),
                entries: List()
            }));
        });
    });
});
