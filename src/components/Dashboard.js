import DataTable from "react-data-table-component";
import React from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default class Dashboard extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            issueList: [],
            currentUserId:1
        };
    }

    notify = (text) => {
        toast(text);
      }

    componentDidMount(){
        if (localStorage.getItem("sessionUser")==null){
            this.notify("Please login first");
            setTimeout(() => {
              this.props.history.push('/');
            }, 1000);      
          }
          else{
        this.fetchIssues()
          }
    }

    fetchIssues(){
        axios.get("http://localhost:8080/changeTracker/1").then(res =>{
            this.setState({
                issueList:res.data
            })
        })
    }

    render(){
        const data = this.state.issueList;
        const columns = [
            {
                name: 'Issue Number',
                selector: 'issue.id',
                right: true,
            },
            {
                name: 'Change Type',
                selector: 'changeType',
                right: true,
            },
            {
                name: 'Project',
                selector: 'issue.project.name',
                right: true,
            },
            {
                name: 'Modified by',
                selector: 'modifiedBy.email',
                right: true,
            }
        ];

        return (
            <div>
                            <ToastContainer />            

                <DataTable
                    title="Recent changes made in your project"
                    columns={columns}
                    data={data}
                />
            </div>

        )
    }

}
