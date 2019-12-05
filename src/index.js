import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './index.css'
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import Project from './components/Project'
import Issues from './components/Issues'
import User from './components/User'
import editRoles from './components/editRoles'
import IssueDetail from './components/IssueDetail';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Login'
import { Nav, NavItem, NavLink } from 'reactstrap';
import WebSocketClient from './components/WebSocketClient';
import Dashboard from "./components/Dashboard";
import RouterConfig from "./Route";
import { Button } from 'reactstrap';
import { useHistory } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const routing = (
    <Fragment>
      <Fragment>
      <Nav>
        <NavItem>
          <NavLink href="/dashboard"><h4>Dashboard</h4></NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/project"><h4>Project</h4></NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/issue"><h4>Issues</h4></NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/user"><h4>User</h4></NavLink>
        </NavItem>
        <NavItem>
          <NavLink  id="linkHome" href="/login"><h4>Login</h4></NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/changePassword"><h4>Change Password</h4></NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/socket"><h4>Socket</h4></NavLink>
        </NavItem>
        </Nav>
        <div align="right">
        <Button onClick = {event => {
          localStorage.removeItem('sessionUser')
          document.getElementById('linkHome').click();
        }}>Logout</Button>
        </div>
        </Fragment>
        
      <RouterConfig/>
    </Fragment>
  )
  ReactDOM.render(routing, document.getElementById('root'))


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
