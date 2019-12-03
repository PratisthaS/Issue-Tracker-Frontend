import React,{Component} from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stomp-websocket'

export default class WebSocketClient extends React.Component {
    constructor(props) {
        super(props);
        this.stompClient = null;
        this.state = {
            id: '',
            messageValue: '',
            messages: [],
        }
    }


    connect = () => {
        var socket = new SockJS('http://localhost:8080/stat-websocket');
        this.stompClient = Stomp.over(socket);
        let that = this;
        this.stompClient.connect({}, frame => {
            this.stompClient.subscribe('/topic/stats', function (frame) {
//                let msg = JSON.parse(frame.body);
                debugger
                let msg = frame.body
                var displayMessages = []
                that.setState({messages: that.state.messages.concat(msg)})
            })
        })
    }

    disconnect = () => {
        if (this.stompClient !== null) {
            this.stompClient.disconnect();
        }
        console.log("Disconnected");
    };

    sendName = () => {
        this.stompClient.send("/app/hello", {}, JSON.stringify({'name': this.state.messageValue, 'id':this.state.id}));
    };



    onChange = e => {
        this.setState({messageValue: e.target.value})
    };

    onIdChange = e => {
        this.setState({id: e.target.value})
    };


    sendMessage = message => {
        this.stompClient.send("/app/hello", {}, JSON.stringify({'name': this.state.messageValue, 'id':this.state.id}));
    };

    render() {
        return (
            <div>
                <div>
                    <button onClick={this.connect}>Connect</button>
                    <button onClick={this.disconnect}>Disconnect</button>
                </div>

                <div>
                    <ul>
                        {this.state.messages.map(message => <li>{message}</li>)}
                    </ul>
                </div>


            </div>
        )
    }
}