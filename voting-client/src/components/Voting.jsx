import React from 'react';

export default React.createClass({
    getPair: function() {
        return this.props.pair || [];
    },

    renderButtons: function() {
        return this.getPair().map(entry => {
            return (
                <button key={entry}>
                    <h1>{entry}</h1>
                </button>
            )
        })
    },

    render: function() {
        return (
            <div className="voting">
                {this.renderButtons()}
            </div>
        )
    }
});
