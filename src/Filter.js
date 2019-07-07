import React from 'react'
import { FormLabel, Form, FormGroup, Row, Col, Button } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import Select from 'react-select';
import "react-datepicker/dist/react-datepicker.css";
class Filter extends React.Component {
    constructor(props) {
        super(props);
        console.log("Filter props", props);
        this.state = {
            messageTyepeList: [{ value: 'INFO', label: 'INFO' },
            { value: 'ERROR', label: 'ERROR' },
            { value: 'WARNING', label: 'WARNING' }],
            selectedOption: "",
            messageTypes:[],
            dateFrom: "",
            dateTo: "",
            now: new Date(),
            dateToError: ""
        };
        let params = {};

        this.handleChange = this.handleChange.bind(this);
        this.handleDateFromChange = this.handleDateFromChange.bind(this);
        this.handleDateToChange = this.handleDateToChange.bind(this);
        this.handleFilter = this.handleFilter.bind(this);

    }
    
    handleChange = selectedOption => {
        this.setState({ selectedOption });
        console.log(`Option selected:`, selectedOption);
    };

    handleDateFromChange(date) {
        this.setState({
            dateFrom: date
        });
    }
    handleDateToChange(date) {
        if (date > this.state.now) {
            this.setState({dateToError:"To Date should be before current date"});
        } else if(date < this.state.dateFrom) {
            this.setState({dateToError:"To Date should be after from date"});
            
        
        }else {
            this.setState({dateToError:""});
            this.setState({
                dateTo: date
            });
        }
    }

    handleFilter() {
        let query = "";
        let messageTypeFilter = [];
        messageTypeFilter = this.state.selectedOption;
    
        let url = new URL("http://localhost:8080/message");
        let params = [];
        if(messageTypeFilter!="") {
            messageTypeFilter.map(s => params.push(["messageType",encodeURIComponent(s.value)]));
        }
        if(this.state.dateTo != ""){
            params.push([encodeURIComponent("toDate"), encodeURIComponent(Date.parse(this.state.dateTo))]);
        }
        if(this.state.dateFrom != "") {
            params.push([encodeURIComponent("fromDate"), encodeURIComponent(Date.parse(this.state.dateFrom))]);
        }
        params.push([encodeURIComponent("page"), encodeURIComponent(1)]);
        params.push([encodeURIComponent("pageSize"), encodeURIComponent(30)]);
        
        let urlSearchParams = new URLSearchParams(params);
        url.search = urlSearchParams;
        console.log(url);
        fetch(url)
        .then(res => res.json())
        .then(r=>this.props.onsubmit(r, url, params, urlSearchParams));
    }

    render() {
        return (
            <Row>
                <Col>
                    <h4>Filter By</h4>
                    <Form>
                        <FormGroup>
                            <Select
                                value={this.state.selectedOption}
                                onChange={this.handleChange}
                                options={this.state.messageTyepeList}
                                placeholder="Select Message type..."
                                isMulti />
                        </FormGroup>
                        <FormGroup>
                            <DatePicker
                                placeholderText="Slect Date From..."
                                selected={this.state.dateFrom}
                                onChange={this.handleDateFromChange}
                                name="dateFrom" />

                        </FormGroup>

                        <FormGroup>
                            <DatePicker
                                placeholderText="Slect Date To..."
                                selected={this.state.dateTo}
                                onChange={this.handleDateToChange}
                                name="dateTo" />
                            <div>{this.state.dateToError}</div>
                        </FormGroup>

                        <FormGroup variant="">
                            <span>
                                <Button variant="info" onClick={this.handleFilter}>Filter</Button>
                            </span>
                            <span>&nbsp;&nbsp;</span>
                            <span>
                                <Button variant="info">Clear</Button>
                            </span>
                        </FormGroup>
                    </Form>
                </Col>
            </Row>
        );
    }
}

export default Filter