import React, { Component } from 'react';
import HAHA from './components/Inputt';
import './App.css';


class App extends Component {

  constructor() {
    super();
    this.state = {
      currentItem: '',
      username: ''
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
  this.setState({
    [e.target.name]: e.target.value
  });
}
    render() {
        return (
  <div className="row">
  <section className='add-item'>
    <div className="col-lg-6">
      <div className="input-group">
        <span className="input-group-btn">
          <button className="btn btn-secondary" type="button">Go!</button>
        </span>
        <input type="text" name="username" class="form-control" placeholder="Search for..." aria-label="Search for..." 
        onChange={this.handleChange} value={this.state.username} />
      </div>
    </div>
      <div className="col-lg-6">
    <div className="input-group">
      <input type="text" name="currentItem" class="form-control" placeholder="Search for..." aria-label="Search for..."
      onChange={this.handleChange} value={this.state.currentItem} />
      <span className="input-group-btn">
        <button className="btn btn-secondary" type="button">Go!</button>
      </span>
    </div>
  </div>
  </section>
<button type="button" class="btn btn-outline-primary">Primary</button>
</div>
    );
  }
}

export default App;
