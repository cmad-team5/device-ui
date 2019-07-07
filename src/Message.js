import React, { useState } from 'react';
import useInfiniteScroll from "./useInfiniteScroll";
import { Table } from 'react-bootstrap';
class Message extends React.Component {
    constructor(props){
        super(props);
    
        this.state={
            response:[]
        }
    }
    render() {
        console.log(this.props.response);
        return (

            <tbody>
                {this.state.response.map(listItem =>
                    <tr>
                        <td>listItem.messageId</td>
                        <td>listItem.messageType</td>
                        <td>listItem.message</td>
                    </tr>
                )}
            </tbody>

        );
    }
}

export default Message;