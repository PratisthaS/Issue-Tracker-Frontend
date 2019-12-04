import React, { useState } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import AppBar from '@material-ui/core/AppBar';
import "./Component.css";
import {
  FormControl,
  InputLabel,
  Input,
  Button,
  TextField
} from "@material-ui/core";

export default class Project extends React.Component {

  //Haven't connected with backend yet.
    
    constructor(props) {
      
      super(props);
      this.state = {

        name: '',
        key:'',
        description:'',
        projectList: []

      };

  
      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
      this.fetchProjects()
    }

    fetchProjects(){
      axios.get("http://localhost:8080/projects").then(res =>{
        this.setState({
          projectList:res.data
        })
      })
    }
    
    handleInputChange(event) {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;

      this.setState({
        [name]: value
      });
      console.log('Change detected. State updated' + name + ' = ' + value);
    }
  
    handleSubmit(event) {
      //alert('A form was submitted: ' + this.state.name + ' // ' + this.state.email);
      const projectDto = {
        name: this.state.name,
        key: this.state.key,
        description: this.state.description,
      };
      axios.post('http://localhost:8080/projects', projectDto)
      .then(res => {
        console.log('Project added successfully!')
        this.fetchProjects()
      })

      event.preventDefault();


    }
  
    render() {

      const data = this.state.projectList;
const columns = [
  {
    name: 'Name',
    selector: 'name',
    right: true,
  },
  {
    name: 'Key',
    selector: 'key',
    right: true,
  },
  {
    name: 'Description',
    selector: 'description',
    right: true,
  },
];
      return (
        <div>
          <AppBar color="primary" position="static">
          <h1>Issue Tracker</h1>
        </AppBar>
          <h3>Create Projects</h3>
          <br/>
          <form onSubmit={this.handleSubmit} >
            <div className="form-group">
              <label for="nameImput">Project Name: </label>
              <input type="text" name="name" value={this.state.name} onChange={this.handleInputChange} className="form-control" id="nameImput" placeholder="Project Name" />
            </div>
            <div className="form-group">
              <label for="keyInput">Project Key: </label>
              <input name="key" type="text" value={this.state.key} onChange={this.handleInputChange} className="form-control" id="keyInput" placeholder="KEY"/>
            </div>
            <div className="form-group">
              <label for="description">Project Description: </label>
              <textarea name="description" value={this.state.description} onChange={this.handleInputChange} className="form-control" id="descInput" placeholder="Description" cols="40" rows="5"></textarea>
            </div>
            <input type="submit" value="Submit" className="btn btn-primary" />
          </form>
          
          <DataTable
    title="List of Projects"
    columns={columns}
    data={data}
    />
        </div>


      )
    }
  }
