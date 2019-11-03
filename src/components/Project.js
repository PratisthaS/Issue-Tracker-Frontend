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

export default class Project extends React.Component {

    
    constructor(props) {
      
      super(props);
      this.state = {

        name: '',
        key:'',
        description:'',
        projectList: []

      };
  
      this.handleChange = this.handleInputChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
      this.fetchProjects()
    }

    fetchProjects(){
      axios.get("http://localhost:8080/projects").then(res =>{
        debugger
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
      const project = {
        name: this.state.name,
        key: this.state.key,
        description: this.state.description
      };
      axios.post('http://localhost:8080/projects', {name: this.state.name,
      key: this.state.key,
      description: this.state.description}
      )
      .then(res => {
        this.setState({
          name: '',
        key:'',
        description:''
        })
        this.fetchProjects();
        alert('Project added successfully!')
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
          <br/>
          <form onSubmit={this.handleSubmit} >
            <div className="form-group">
              <label for="nameImput">Project Name: </label>
              <input type="text" name="name" value={this.state.name} onChange={this.handleChange} className="form-control" id="nameImput" placeholder="Project Name" />
            </div>
            <div className="form-group">
              <label for="keyInput">Project Key: </label>
              <input name="key" type="text" value={this.state.key} onChange={this.handleChange} className="form-control" id="keyInput" placeholder="KEY"/>
            </div>
            <div className="form-group">
              <label for="description">Project Description: </label>
              <input name="description" type="text" value={this.state.description} onChange={this.handleChange} className="form-control" id="description" placeholder="Describe your project"/>
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