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
    user: this.state.user.displayName || this.state.user.email
  }
  itemsRef.push(item);
  this.setState({
    currentItem: '',
    username: ''
  });
}
logout() {
  auth.signOut()
    .then(() => {
      this.setState({
        user: null
      });
    });
}
login() {
  auth.signInWithPopup(provider) 
    .then((result) => {
      const user = result.user;
      this.setState({
        user
      });
    });
}

/*Here, we instantiate a new array and populate it with the results that come back from our value listener.
 We for…in over each key, and push the result into an object inside our newState array. 
 Finally, once all the keys are iterated over 
 (and therefore all items are grabbed from our database), 
 we update the state with this list of items from our database.*/
componentDidMount() {
  //When the user signs in, this checks the Firebase database to see 
  //if they were already previously authenticated. 
  //If they were, we set their user details back into the state.
  auth.onAuthStateChanged((user) => {
    if (user) {
      this.setState({ user });
    } 
  });
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
 
  <div className='app'>
  {this.state.user ?
    <div className="lolo">
    <button className="btn btn-danger btn-lg btn-block" onClick={this.logout}>Logout</button>  
    </div>
    :
    <button className="btn btn-primary btn-lg btn-block" onClick={this.login}>Log In</button> 
  }
</div>
  <div className="container">
    {this.state.items.map((item) => {
      return (
        <li key={item.id}>
              <p className="col-sm-offset-3 col-sm-6 col-lg-8">{item.title}</p>
                <footer className="blockquote-footer "><cite title="Source Title">{item.user} <img className="user-profile" src={this.state.user.photoURL || null} alt="a" /></cite></footer> 
          {item.user === this.state.user.displayName || item.user === this.state.user.email ?
                   <button type="button" className="btn btn-outline-danger btn-sm btn-block" 
                   onClick={() => this.removeItem(item.id)}>Delete</button> : null}
        </li>
      )
    })}
    <div className="container-fluid">
      <form onSubmit={this.handleSubmit}>
        <textarea type="text" maxLength="140" name="currentItem" className="form-control form-rounded" rows="3" placeholder="Message here..." aria-label="Search for..."
      onChange={this.handleChange} value={this.state.currentItem} />
    <button onSubmit={this.handleSubmit} type="form" className="btn btn-outline-primary btn-lg btn-block">Send</button>
    </form>
  </div>
</div>
</div>
    );
  }
}

export default App;
