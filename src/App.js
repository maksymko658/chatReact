import React, { Component } from 'react';
import firebase from './firebase.js';

class App extends Component {

  constructor() {
    super();
    this.state = {
      currentItem: '',
      username: '',
      items: []
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
//We need to actually grab those items from our Firebase database so that we can store them into our state.
itemsRef.on('value', (snapshot) => {
  console.log(snapshot.val());
});
/*We'll attach this event listener inside of our componentDidMount, 
so that we start tracking our Potluck items as soon as our component loads on to the page:*/
componentDidMount() {
  const itemsRef = firebase.database().ref('items');
  itemsRef.on('value', (snapshot) => {
    let items = snapshot.val();
    let newState = [];
    for (let item in items) {
      newState.push({
        id: item,
        title: items[item].title,
        user: items[item].user
      });
    }
    this.setState({
      items: newState
    });
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
    <button onSubmit={this.handleSubmit} type="form" class="btn btn-outline-primary btn-lg btn-block">Primary</button>
    </form>
  </div>
</div>
    );
  }
}

export default App;
