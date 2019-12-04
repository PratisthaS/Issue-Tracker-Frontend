import React from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import IssueDetail from "./components/IssueDetail";
import Project from "./components/Project";
import User from "./components/User";
import App from "./App";
import Issues from "./components/Issues";
import Dashboard from "./components/Dashboard";
import editRoles from "./components/editRoles";
import WebSocketClient from "./components/WebSocketClient";
import Login from "./Login";

export default function RouterConfig() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Dashboard} />
                <Route path="/project" component={Project} />
                <Route path="/issue" component={Issues} />
                <Route path="/user" component={User} />
                <Route path="/issue-detail/:issueId" component={IssueDetail} />
                <Route path="/edit-roles/:userId" component={editRoles} />
                <Route path="/socket" component={WebSocketClient} />
                <Route path="/login" component={Login} />
            </Switch>
        </BrowserRouter>
    );
}
