import React, { Component } from 'react';
//import NavBar from './components/NavBar.js';
import firebase, { auth, provider } from './firebase.js';
import './index.css';



class App extends Component {

  constructor() {
    super();
    this.state = {
      currentItem: '',
      username: '',
      items: [],
      user: null
    }
    this.handleChange = this.handleChange.bind(this);
     this.handleSubmit = this.handleSubmit.bind(this);
      this.login = this.login.bind(this);
       this.logout = this.logout.bind(this);
  }

  handleChange(e) {
  this.setState({
    [e.target.name]: e.target.value
  });
}
handleSubmit(e) {
  e.preventDefault();
  const itemsRef = firebase.database().ref('items');
// eslint-disable-next-line 
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
  <div>
 
  <div className="container">
  <div className="wrapper">
  <h1>Fun Food Friends</h1>
  {this.state.user ?
    <button onClick={this.logout}>Log Out</button>                
    :
    <button onClick={this.login}>Log In</button>              
  }
</div>
    {this.state.items.map((item) => {
      return (
        <li key={item.id}>
              <p className="col-sm-offset-3 col-sm-6 col-lg-8">{item.title}</p>
                <footer class="blockquote-footer "><cite title="Source Title">{item.user}</cite></footer>  
          <button type="button" class="btn btn-outline-danger btn-sm btn-block" 
          onClick={() => this.removeItem(item.id)}>DELETE</button>
        </li>
      )
    })}
    <div className="container-fluid">
      <form onSubmit={this.handleSubmit}>
        <textarea type="text" maxlength="140" name="currentItem" class="form-control form-rounded" rows="3" placeholder="Message here..." aria-label="Search for..."
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
