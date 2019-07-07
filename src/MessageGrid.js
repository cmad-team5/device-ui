
import React from 'react';
import { Table, Row, Container, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap-theme.min.css';
import Message from './Message';
import Filter from './Filter'
import './index.css';
import InfiniteScroll from 'react-infinite-scroll-component'
class MessageGrid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterResponse: [],
            url:new URL("http://localhost:8080/message"),
            searchParams: new URLSearchParams(""),
            page:1,
            pageSize:10
        }
        this.onFilterResponse = this.onFilterResponse.bind(this);
        this.fetchMore = this.fetchMore.bind(this);
    }

    onFilterResponse(response, url, searchParams) {
        console.log("Calling onFilterResponse", url);
        this.setState({ filterResponse: response });
        this.setState({url: url});
        this.setState({searchParams: searchParams});
    }

    fetchMore() {
        this.state.url.searchParams.set("page", this.state.page+1);
        this.setState({page:this.state.page+1});
        console.log("Next url", this.state.url);
        fetch(this.state.url)
        .then(res => res.json())
        .then(res=>
            res.map(r=>
            this.setState(
                {filterResponse:[...this.state.filterResponse, r]}
            )
        ));
        console.log(this.state.filterResponse);
    }
    render() {
        let response = {};
        return (
            <Container>
                <Row>
                    <Col>
                        <Filter onsubmit={this.onFilterResponse} />
                    </Col>
                    

                        <Col>
                            <div>
                                <div className="rowsHeder">
                                    <div className="row"><h5>Message ID</h5></div>
                                    <div className="row"><h5>Message Type</h5></div>
                                    <div className="row"><h5>Message</h5></div>
                                    <div className="row"><h5>Time</h5></div>
                                </div>
                            </div>
                            <div id="scroll">
                            <InfiniteScroll
                                dataLength={this.state.filterResponse.length}
                                next={this.fetchMore}
                                hasMore={true}
                                loader={<div>Loading...</div>}>
                                {this.state.filterResponse.map(listItem => (
                                    
                                        <div className="rows">
                                            <div className="row">{listItem.messageId}</div>
                                            <div className="row">{listItem.messageType}</div>
                                            <div className="row">{listItem.message}</div>
                                            <div className="row">{listItem.messageTimestamp}</div>
                                        </div>
                                ))}
                            </InfiniteScroll>
                            </div>

                        </Col>
                </Row>
            </Container>

        );
    }
}

export default MessageGrid