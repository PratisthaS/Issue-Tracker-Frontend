import DataTable from "react-data-table-component";
import React from "react";
import axios from "axios";


export default class Dashboard extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            issueList: [],
            currentUserId:1
        };
    }
    componentDidMount(){
        this.fetchIssues()
    }

    fetchIssues(){
        axios.get("http://localhost:8080/changeTracker").then(res =>{
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
                selector: 'id',
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
                <DataTable
                    title="Recent changes made in your project"
                    columns={columns}
                    data={data}
                />
            </div>

        )
    }

}
