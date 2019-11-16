import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './index.css'
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import Project from './components/Project'
import Issues from './components/Issues'
import User from './components/User'

const routing = (
    <Router>

        <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/project">Project</Link>
        </li>
        <li>
          <Link to="/issue">Issues</Link>
        </li>
        <li>
          <Link to="/user">User</Link>
        </li>
      </ul>

      <div>
        <Route exact path="/" component={App} />
        <Route path="/project" component={Project} />
        <Route path="/issue" component={Issues} />
          <Route path="/user" component={User} />

      </div>
    </Router>
  )
  ReactDOM.render(routing, document.getElementById('root'))


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
