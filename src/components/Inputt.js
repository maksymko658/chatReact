import React, { Component, PropTypes } from 'react';

class Inputt extends Component {

  constructor() {
    super();
    this.state = {
      currentItem: '',
      username: ''
    }
  }
    render() {
        return (
	<div class="row">
	<section className='add-item'>
	  <div class="col-lg-6">
	    <div class="input-group">
	      <span class="input-group-btn">
	        <button class="btn btn-secondary" type="button">Go!</button>
	      </span>
	      <input type="text" class="form-control" placeholder="Search for..." aria-label="Search for..."
	      onChange={this.handleChange} value={this.state.username} />
	    </div>
	  </div>
	    <div class="col-lg-6">
    <div class="input-group">
      <input type="text" class="form-control" placeholder="Search for..." aria-label="Search for..."
      onChange={this.handleChange} value={this.state.currentItem} />
      <span class="input-group-btn">
        <button class="btn btn-secondary" type="button">Go!</button>
      </span>
    </div>
  </div>
  </section>
<button type="button" class="btn btn-outline-primary">Primary</button>
</div>

        );
    }
}

export default Inputt;
