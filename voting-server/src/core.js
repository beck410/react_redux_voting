import {List, Map} from 'immutable';

export function setEntries(state, entries) {
    return state.set('entries', entries);
}

export function next(state) {
    const entries = state.get('entries')
                    .concat(_getWinners(state.get('vote')));

    return state.merge({
        entries: entries.skip(2),
        vote: Map({pair: entries.take(2)})
    });
}

export function vote(state, entry) {
    return state.updateIn (
        ['vote', 'tally', entry],
        0,
        tally => tally + 1
    );
}

function _getWinners(vote) {
    if(!vote) return [];

    const [firstMovie, secondMovie] = vote.get('pair');
    const firstMovieVotes = vote.getIn(['tally', firstMovie]);
    const secondMovieVotes = vote.getIn(['tally', secondMovie]);

    if(firstMovieVotes > secondMovieVotes) {
        return [firstMovie];
    } else if(firstMovieVotes < secondMovieVotes) {
        return [secondMovieVotes];
    } else {
        return [firstMovie, secondMovie];
    }
}
