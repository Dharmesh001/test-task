import React, { Component } from 'react';
import {Spinner } from 'react-bootstrap';

class Demo extends Component {
    constructor(props){
        super(props);
        this.state = {
            users:[],
            albums:[],
            albumId:null,
            isLoaded: false,
            toggleModal:false
        }
    }

    viewImage=(id)=>{
        const api = 'http://jsonplaceholder.typicode.com';
        fetch(api+"/photos")
        .then((response) => response.json())
        .then((data) =>data.map(item=>{
            if(item.albumId === id){
                window.open(item.thumbnailUrl)
            }
        }))

    }
    componentDidMount() {
        const api = 'http://jsonplaceholder.typicode.com';
        fetch(api+"/users")
            .then((response) => response.json())
            .then((data) => this.setState({
                isLoaded: true,
                users:data
            }))
        fetch(api+"/albums")
            .then((response) => response.json())
            .then((data) => this.setState({
                albums:data,
                isLoaded: true,
            }))
    }

    render(){
        let { users,albums } =this.state;
        let filterData =[];
        filterData= albums.filter(function(album) {
            return users.some(function(user) {
                return user.id === album.userId;
            });
        });
         return (
            <div className="Demo">
                 {true && <Spinner animation="border" />}
                    <div>
                        {filterData.length >= 0 ? filterData.map(item => (
                            <div key = {item.id} className="p1 alubumName" onClick={this.viewImage.bind(this,item.id)}>
                                {item.title}
                            </div>
                        )) : <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                      </Spinner>
                        }
                    </div>
                </div>
         );
    }
}

export default Demo;