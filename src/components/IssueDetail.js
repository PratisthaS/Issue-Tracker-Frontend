import React, { Fragment } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'reactstrap';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { FaPaperclip } from 'react-icons/fa';
import "./Component.css";
import AppBar from "@material-ui/core/AppBar/AppBar";

export default class IssueDetail extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            issueId:'',
            issueName:'',
            issueDescription:'',
            createdDate: '',
            dueDate: '',
            issueType: '',
            priorityLevel: '',
            status:'',
            assignee:{},
            userList:[],
            comment: '',
            commentList: [],
            file:null
          };
          this.currentStatus = "";
          this.issueStatusList = ["RESOLVED",
            "NEW",
            "REOPENED",
            "IN_PROGRESS",
            "WAITING"]
    }

    changeAssignee = (event)=>{
        const data = {
            userId: this.state.assignee.id,
            issueId: this.state.issueId,
            sessionUserId: 1 //will need to set it from session
        }
        axios.post('http://localhost:8080/change-assignee', data)
        .then(res => {
      console.log("Assignee changed")      
    })
    event.preventDefault();
}

fetchComment(){
    axios.get("http://localhost:8080/issue/comment/" + this.state.issueId).then (response=>{
        this.setState({
            commentList: response.data
        })
        debugger
    })
}

handleChange = (event)=> {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    
    this.setState({
      [name]: value
    });
    console.log('Change detected. State updated' + name + ' = ' + value);
  }

    changeStatus = (event)=>{
        const data = {
            issueId: this.state.issueId,
            status: this.currentStatus,
            sessionUserId: 1 //will need to set it from session
        }
        axios.post('http://localhost:8080/change-status', data)
        .then(res => {
            console.log("Status changed")
            this.setState({status: this.currentStatus})
    })
    event.preventDefault();
    }


    postComments = (event)=>{


        const data = new FormData();
        data.append('issueId',this.state.issueId)
        data.append('userId',1)
        data.append('comment', this.state.comment)
        data.append('attach',this.state.file)        
        axios.post('http://localhost:8080/comment', data)
        .then(res => {
            console.log("Posted comments")
            this.setState({status: this.currentStatus})
            this.fetchComment()

    })
    event.preventDefault()
    }


    onFileUploadChange = (e) =>{
        this.setState({file:e.target.files[0]})
      }

    componentDidMount(){

    const { issueId } = this.props.match.params
        axios.get(`http://localhost:8080/issues/${issueId}`).then(res => {
            this.setState({
                issueId: res.data.id,
                issueName: res.data.name,
                issueDescription: res.data.description,
                createdDate: res.data.createdDate,
                dueDate: res.data.dueDate,
                issueType: res.data.issueType,
                priorityLevel: res.data.priorityLevel,
                status: res.data.status,
                assignee: res.data.assignee             
            })
            this.currentStatus = this.state.status
            axios.get("http://localhost:8080/users/").then (response=>{
                let tempUserList = response.data
                //filter(user => user.id!=this.state.assignee.id)
                this.setState({
                    userList: tempUserList
                })
            })
            this.issue = res.data
            this.fetchComment()


        })

    }

    onFileDownloadClicked = (item) => {

        let currentId = item.target.id

        axios.get("http://localhost:8080/attach/comment/" + currentId).then (response=>{
                debugger
                var binaryString = window.atob(response.data);
                var binaryLen = binaryString.length;
                var bytes = new Uint8Array(binaryLen);
                for (var i = 0; i < binaryLen; i++) {
                     var ascii = binaryString.charCodeAt(i);
                     bytes[i] = ascii;
                }
                var contentType = response.headers['content-type'];
                var blob = new Blob([bytes], {type: contentType});
                var link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                var fileName = "ss";
                link.download = fileName;
                link.click();
        
        

    });
}
    

    render(){
        return(
        <div>
            <AppBar color="primary" position="static">
                <h1>Issue Detail Page</h1>
            </AppBar>
            <Container>
                <Row>
                    <Col>
            <Fragment>

                <h3>Issue  Details </h3>
                <div>
                    <Container>

                    <Row>
                    <label>Issue Name: </label>
                    <label>{this.state.issueName}</label>
                    </Row>

                    <Row>
                    <label>Issue Description: </label>
                    <label>{this.state.issueDescription}</label>
                    </Row>

                    <Row>
                    <label>Created At: </label>
                    <label>{this.state.createdDate}</label>
                    </Row>

                    <Row>
                    <label>Assigned To: </label>
                    <label>{this.state.assignee.firstname}</label>
                    </Row>

                    <Row>
                    <label>Due Date: </label>
                    <label>{this.state.dueDate}</label>
                    </Row>
                    
                    <Row>
                    <label>Issue Type: </label>
                    <label>{this.state.issueType}</label>
                    </Row>

                    <Row>
                    <label>Priority: </label>
                    <label>{this.state.priorityLevel}</label>
                    </Row>
                    
                    <Row>

                    <label>Status: </label>
                    <label>{this.state.status}</label>

                    </Row>

                    </Container>

                
                </div>
                </Fragment>
                </Col>
                </Row>
                
                <Row>
                    <Col>
                <Fragment>
                    <h3>Change Assignee</h3>
                    <form onSubmit={this.changeAssignee} >
                    <label htmlFor="assignee">Select Assignee: </label> 
                     <select id="assignee" name="assignee" onChange = {event => {this.setState({assignee:this.state.userList.filter(item => item.id==event.target.value)[0]})}}>
                     {this.state.userList.map((item) => <option key={item.id} value={item.id}>{item.firstname}</option>)}
                    </select>
                    <br/> <br/>
                    <input type="submit" value="Submit" className="btn btn-primary" />

                    </form>                    
                </Fragment>
                </Col>

                    <Col>
                <Fragment>
                    <h3>Change Status</h3>
                    <form onSubmit={this.changeStatus}>
                    <label htmlFor="statusDropdown">Change Issue Status: </label> 
                     <select id="statusDropdown" name="statusDropdown" onChange = {event => {this.currentStatus = event.target.value}}>
                     {this.issueStatusList.map((item) => <option key={item} value={item}>{item}</option>)}
                    </select>
                    <br/> <br/>
                    <input type="submit" value="Submit" className="btn btn-primary" />
                    </form>
                </Fragment>
                </Col>
                </Row>

                <Row>
                    <Col>
                <Fragment>
                    <br/>
                    <br/> <br/>
                    <form onSubmit={this.postComments}>
                    <label htmlFor="comment">Add Comment: </label>
                    <br/>
                    <textarea name="comment" rows="4" cols="70" onChange={this.handleChange}></textarea>
                    <br/>
                    <input type="file" onChange={this.onFileUploadChange} /> <br/>
                    <input type="submit" value="Submit" className="btn btn-primary" />
                    </form>

                </Fragment>
                </Col>
                </Row>

                <Row>
                    <Col>
                <Fragment>
                    <br/>
                    <h3>Comments:</h3>
                    <ListGroup>
        {this.state.commentList.map((item) => 
        <ListGroupItem>
            <strong>{item.user.firstname + item.user.lastName} ({item.user.email})</strong>
            <br/>
            {item.date}
            <br/>
            {item.messageText}      
            <br/>
            <div>
            {item.attachment!=null? (
            <button id={item.id} onClick = {this.onFileDownloadClicked}><FaPaperclip />{item.fileName}</button>
            ):(<label></label>)}
            </div>
        </ListGroupItem>)}
    </ListGroup>
                </Fragment>
                </Col>
                </Row>
                </Container>

        </div>
        )

        
    }

}
