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
import IssueDetail from './components/IssueDetail';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, NavItem, NavLink } from 'reactstrap';


const routing = (
    <Router>

      <Nav>
        <NavItem>
          <NavLink href="/">Home</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/project">Project</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/issue">Issues</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/user">User</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/issue-detail/1">Issue Detail</NavLink>
        </NavItem>
        </Nav>

      <div>
        <Route exact path="/" component={App} />
        <Route path="/project" component={Project} />
        <Route path="/issue" component={Issues} />
        <Route path="/user" component={User} />
        <Route path="/issue-detail/:issueId" component={IssueDetail} />

      </div>
    </Router>
  )
  ReactDOM.render(routing, document.getElementById('root'))


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
