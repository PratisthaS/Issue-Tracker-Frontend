import React from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import IssueDetail from "./components/IssueDetail";
import Project from "./components/Project";
import User from "./components/User";
import App from "./App";
import Issues from "./components/Issues";

export default function RouterConfig() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path ="/" key={1} component={App}/>
                <Route path ="/issue" key={2} component={Issues} />
                <Route path ="/project" key={2} component={Project} />
                <Route path ="/user" key={2} component={User} />
                <Route path ="/issue-detail/:issueId" component={IssueDetail} />
            </Switch>
        </BrowserRouter>
    );
}
