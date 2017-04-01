import React from 'react';

class Span extends React.Component {
    constructor (props) {
        super(props)
    }
    render () {
        return (
            <span className={this.props.className}>{this.props.children}</span>
        );
    }
}

export default Span;