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

let scroll = setInterval(function(){ window.scrollBy(0,1000); });
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

/*Here, we instantiate a new array and populate it with the results that come back from our value listener.
 We for…in over each key, and push the result into an object inside our newState array. 
 Finally, once all the keys are iterated over 
 (and therefore all items are grabbed from our database), 
 we update the state with this list of items from our database.*/
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
    //We need to actually grab those items from our Firebase database so that we can store them into our state.
itemsRef.on('value', (snapshot) => {
  console.log(snapshot.val());
/*We'll attach this event listener inside of our componentDidMount, 
so that we start tracking our Potluck items as soon as our component loads on to the page:*/
});
  });
}
removeItem(itemId) {
  const itemRef = firebase.database().ref(`/items/${itemId}`);
  itemRef.remove();
}

    render() {
        return (
  <div className="container">
    <div className="container-fluid">
    <section className='display-item'>
    <ul>
      {this.state.items.map((item) => {
        return (
          <li key={item.id}>
            <blockquote class="blockquote text-center">
              <p class="mb-0">{item.title}</p>
                <footer class="blockquote-footer"><cite title="Source Title">{item.user}</cite></footer>
            </blockquote>
          <button type="button" class="btn btn-outline-danger btn-sm btn-block" onClick={() => this.removeItem(item.id)}>DELETE</button>
        </li>
      )
    })}
    </ul>
</section>
    <div className="container-fluid">
      <form onSubmit={this.handleSubmit}>
        <input type="text" name="username" class="form-control" placeholder="Search for..." aria-label="Search for..." 
        onChange={this.handleChange} value={this.state.username} />
        <input type="text" name="currentItem" class="form-control" placeholder="Search for..." aria-label="Search for..."
      onChange={this.handleChange} value={this.state.currentItem} />
    <button onSubmit={this.handleSubmit} type="form" class="btn btn-outline-primary btn-lg btn-block">Send</button>
    </form>
  </div>
    </div>
</div>
    );
  }
}

export default App;
