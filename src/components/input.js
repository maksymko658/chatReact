import React, { Component, PropTypes } from 'react';

class input extends Component {


    constructor(props) {
        super(props);
    }

    render() {
        return (
        	<div className="container">
             <input type="text" class="form-control" />
             </div>
        );
    }
}

export default input;
