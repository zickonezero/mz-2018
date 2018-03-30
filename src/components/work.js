import React, { Component } from 'react';
import axiosConfig from '../axiosConfig';
import MainHOC from '../hoc/MainHOC';

class Work extends Component {
    state = {
        workData: null
    };

    componentDidMount() {
        axiosConfig.get('/all.json')
            .then(resp => {
                console.log(resp.data);
                this.setState({
                    workData: resp.data.work
                });
            })
            .catch(err => {
                console.log(err);
            });
    }

    render () {
        let works = !this.state.workData ?
            null : <MainHOC dataFeed={this.state.workData} />;

        return (
            <ul>
                {works}
            </ul>
        );
    }
}

export default Work;
