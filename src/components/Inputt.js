import React, { Component, PropTypes } from 'react';
import App from '../App';

class Inputt extends Component {


    render() {
        return (
<section className="add-item">
  <form>
    <input type="text" name="username" placeholder="What's your name?" onChange={this.handleChange} value={this.state.username} />
    <input type="text" name="currentItem" placeholder="What are you bringing?" onChange={this.handleChange} value={this.state.currentItem} />
    <button>Add Item</button>
  </form>
</section>

        );
    }
}

export default Inputt;
