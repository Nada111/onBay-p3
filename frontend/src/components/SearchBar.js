import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'
import { Form, Button, Alert } from 'react-bootstrap'
import '../App.css'
import axios from "axios"
import { Route, BrowserRouter, Switch, withRouter } from 'react-router-dom'
import { Redirect } from 'react-router-dom'

export default class CustomTables extends Component {


    state = {
        city: '',
        startDate: '',
        endDate: '',
        guests: '',
        bookings: null,
        villas: null,
        results: null
    }

    componentDidMount() {
        axios.get("http://localhost:4000/villa")
            .then(res => {
                this.setState({ villas: res.data })
            })
            .catch()

        axios.get("http://localhost:4000/booking")
            .then(res => { this.setState({ bookings: res.data }) })
    }

    //Methods to update state (2-imp)
    onChangeCity = (e) => {
        this.setState({
            city: e.target.value
        })
    }

    onChangeStartDate = (e) => {
        this.setState({
            startDate: e.target.value
        })
    }

    onChangeEndDate = (e) => {
        this.setState({
            endDate: e.target.value
        })
    }

    onChangeGuests = (e) => {
        this.setState({
            guests: e.target.value
        })
    }

    //Submit event Method of the Form & check the output(3-imp)
    onSubmit = (e) => {
        e.preventDefault()
        let searchResult = []

        let filteredVillas = this.state.villas.filter(vItem => {
            return vItem.city == this.state.city && vItem.guests == this.state.guests
        })

        filteredVillas.map(item => {
            let filteredBooking = this.state.bookings.filter(bItem => {
                return item._id == bItem.villa
            })

            if (filteredBooking.length > 0) {
                filteredBooking.map(check => {
                    if (this.state.startDate > check.endAt || check.startAt > this.state.endDate) {
                        searchResult.push(item)
                    }
                })
            } else {
                searchResult.push(item)
            }
        })


        this.setState({ results: searchResult })
        console.log("results length: " + searchResult.length)

    }

    render() {
        return (
            <div>
                {this.state.results != null &&
                    <Redirect to={{
                        pathname: '/Results',
                        state: { results: this.state.results, startAt: this.state.startDate, endAt: this.state.endDate }
                    }} />
                }
                {/* <div className="search-bar"  style={{backgroundColor:"#F6D55C"}} > */}
                <div className="search-bar" style={{backgroundColor:"#16174b", marginTop:"-10%" }} >
                    <form onSubmit={this.onSubmit}>
                        <div className="form-row" >
                            <div className="form-group col-md-2">
                                <label>City</label>
                                <input type="string" className="form-control" id="inputCity" placeholder="Enter a city"
                                    //(5-imp)
                                    value={this.state.city}
                                    onChange={this.onChangeCity}
                                />
                            </div>
                            <div className="form-group col-md-3">
                                <label>Check in Date</label>
                                <input type="date" className="form-control" id="inputCheck-in" placeholder="Check in Date"
                                    //(5-imp)
                                    value={this.state.startDate}
                                    onChange={this.onChangeStartDate}
                                />
                            </div>
                            <div className="form-group col-md-3">
                                <label>Check out Date</label>
                                <input type="date" className="form-control" id="inputCheck-out" placeholder="Check out Date"
                                    //(5-imp)
                                    value={this.state.endDate}
                                    onChange={this.onChangeEndDate}
                                />
                            </div>
                            <div className="form-group col-md-2">
                                <label>Guests</label>
                                <select id="inputState" className="form-control"
                                    value={this.state.guests}
                                    onChange={this.onChangeGuests}
                                >
                                    <option >Choose</option>
                                    <option

                                    >5 - 10</option>
                                    <option

                                    >10 - 20</option>
                                    <option>20 - 30</option>
                                    <option>30 - 50</option>
                                    <option>50 and above</option>
                                </select>
                            </div>
                            <div className="form-group col-md-2">
                                <label className="hide-chr"> - </label>
                                <div>
                                <Button variant='secondary' type="submit">Search</Button>
                                {/* <button className="btnn"  type="submit">Search</button> */}
                                    {/* <button type="submit" className="btn btn-dark search-btn"
                                    //(5-imp)

                                    >Search</button> */}
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
