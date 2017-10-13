import React, { Component } from 'react';
import firebase from './firebase.js';

class App extends Component {

  constructor() {
    super();
    this.state = {
      currentItem: '',
      username: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
  this.setState({
    [e.target.name]: e.target.value
  });
}
handleSubmit(e) {
  e.preventDefault();
  const itemsRef = firebase.database().ref('items');
  const item = {
    title: this.state.currentItem,
    user: this.state.username
  }
  itemsRef.push(item);
  this.setState({
    currentItem: '',
    username: ''
  });
}
    render() {
        return (
  <div className="container">
    <div className="container-fluid">
      <form onSubmit={this.handleSubmit}>
        <input type="text" name="username" class="form-control" placeholder="Search for..." aria-label="Search for..." 
        onChange={this.handleChange} value={this.state.username} />
        <input type="text" name="currentItem" class="form-control" placeholder="Search for..." aria-label="Search for..."
      onChange={this.handleChange} value={this.state.currentItem} />
    <button onSubmit={this.handleSubmit} type="form" class="btn btn-outline-primary">Primary</button>
    </form>
  </div>
</div>
    );
  }
}

export default App;
