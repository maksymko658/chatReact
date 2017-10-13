import React, { Component, PropTypes } from 'react';

class NavBar extends Component {
    render() {
        return (
            <div>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary rounded">
  <a class="navbar-brand" href="#">Navbar</a>
  <ul class="navbar-nav mr-auto">
    <li class="nav-item active">
      <a class="nav-link">Left Link 1</a>
    </li>
    <li class="nav-item">
      <a class="nav-link">Left Link 2</a>
    </li>
  </ul>
  <ul class="navbar-nav ml-auto">
    <li class="nav-item">
      <a class="nav-link">Right Link 1</a>
    </li>
    <li class="navbar-item">
      <a class="nav-link">Right Link 2</a>
    </li>
  </ul>
</nav>
            </div>
        );
    }
}

export default NavBar;
