import React, { Component, PropTypes } from 'react';

class Inputt extends Component {


    constructor(props) {
        super(props);
    }

    render() {
        return (
	<div class="row">
	  <div class="col-lg-6">
	    <div class="input-group">
	      <span class="input-group-btn">
	        <button class="btn btn-secondary" type="button">Go!</button>
	      </span>
	      <input type="text" class="form-control" placeholder="Search for..." aria-label="Search for..." />
	    </div>
	  </div>
	  </div>

        );
    }
}

export default Inputt;
