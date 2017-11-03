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

  handleSubmit(e) {
    e.preventDefault();
    const itemsRef = firebase.database().ref('items');
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
  componentDidMount() {
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
    });
  }
  removeItem(itemId) {
    const itemRef = firebase.database().ref(`/items/${itemId}`);
    itemRef.remove();
  }


    
render() {
 return (
  <div className="container">
    <div className="col-sm-offset-2 col-sm-10">
    {this.state.items.map((item) => {
      return (
        <li className="list-group-item" key={item.id}>
              <p href="#">{item.title}<p id="demo"></p></p>
                <footer className="blockquote-footer "><cite title="Source Title">{item.user}  <img className="user-profile" src={this.state.user.photoURL} /></cite></footer>
          {item.user === this.state.user.displayName || item.user === this.state.user.email ? 
                   <button className="btn btn-outline-danger" onClick={() => this.removeItem(item.id)}>Delete</button> : null }
        </li>
      )
    })}
      <form onSubmit={this.handleSubmit}>
        <textarea type="text" maxLength="140" name="currentItem" className="form-control form-rounded" rows="3" placeholder="Message here..." aria-label="Search for..."
      onChange={this.handleChange} value={this.state.currentItem} />
    {this.state.user ? <button onSubmit={this.handleSubmit} type="form" className="btn btn-outline-primary btn-lg btn-block">Send</button> : null}
    </form>
    <div className='app'>
  {this.state.user ?
    <div className="lolo">
    <button className="btn btn-danger btn-lg btn-block" onClick={this.logout}>Logout</button> 
    </div>
    :
    <button className="btn btn-success btn-lg btn-block custom" onClick={this.login}>Log In</button> 
  }
</div>
</div>
</div>
    );
  }
}

export default App;
