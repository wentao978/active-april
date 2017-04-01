import React from 'react';

class Image extends React.Component {
    constructor (props) {
        super(props);
    }
    render () {
        return (
            <img src={this.props.src} className={this.props.className}/>
        );
    }
}
export default Image;