import React from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import AppBar from '@material-ui/core/AppBar';
import {
  FormControl,
  InputLabel,
  Input,
  Button,
  TextField
} from "@material-ui/core";

export default class Issues extends React.Component {

  //only UI is designed for this page. Need to hookup with backend.

  constructor(props){
    super(props)
    this.state = {

      name: '',
      description: '',
      type:'Bug',
      priorityLevel:'HIGH',
      dueDate:'',
      project:'',
      assignee:'',
      issueList: []
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.issueType = ["Bug","Task"]
    this.priorityLevel = ["HIGH","LOW","MEDIUM"]
    this.handleSubmit = this.handleSubmit.bind(this);


  }

  fetchIssues(){
    axios.get("http://localhost:8080/issue").then(res =>{
      debugger
      this.setState({
        issueList:res.data
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

  handleSubmit (event) {
    const issue = {
      name: this.state.name,
      type: this.state.type,
      description: this.state.description,
      priorityLevel: this.state.priorityLevel,
      dueDate: this.state.dueDate,
      assignee: this.state.assignee
    };
    axios.post('http://localhost:8080/issues', {name: this.state.name,
    type: this.state.type,
    description: this.state.description,
    priorityLevel: this.state.priorityLevel,
    dueDate: this.state.dueDate,
    assignee: this.state.assignee})
    .then(res => {
      alert('Issue added successfully!')
    })

  };

  componenDidMount(){
    

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
          name: 'Description',
          selector: 'description',
          right: true,
        },
        {
          name: 'Type',
          selector: 'issueType',
          right: true,
        },
        {
          name: 'PriorityLevel',
          selector: 'priorityLevel',
          right: true,
        },
        {
          name: 'DueDate',
          selector: 'dueDate',
          right: true,
        },
        {
          name: 'Project',
          selector: 'project',
          right: true,
        },
        {
          name: 'Assignee',
          selector: 'assignee',
          right: true,
        },
      ];

      return (
        <div>
            <AppBar color="primary" position="static">
                <h1>Issue Tracker</h1>
            </AppBar>
          <h3>Create Issues</h3>
          <form onSubmit={this.handleSubmit} >
            <div className="form-group">
              <label htmlFor="nameInput">Name: </label>
              <input type="text" name="name" value={this.state.name} onChange={this.handleInputChange} className="form-control" id="nameInput" placeholder="Title" />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description: </label><br/>
              <textarea name="description" value={this.state.description} onChange={this.handleInputChange} className="form-control" id="descInput" placeholder="Description" cols="40" rows="5"></textarea>
            </div>
            
            <div className="form-group">
              <label htmlFor="type">Type: </label>
              <select id="type" name="type" onChange = {event => {this.setState({type:event.target.value})}}>
          {this.issueType.map((type) => <option key={type} value={type}>{type}</option>)}
        </select>
            </div>

            <div className="form-group">
              <label htmlFor="priority">Priority: </label>
              <select id="priority" name="type" onChange = {event => {this.setState({priority:event.target.value})}}>
              {this.priorityLevel.map((priority) => <option key={priority} value={priority}>{priority}</option>)}
        </select>
            </div>
            <input type="submit" value="Submit" className="btn btn-primary" />
          </form>

          <DataTable
              title="List of Issues"
              columns={columns}
              data={data}
          />
          </div>


      )
    }
  }
