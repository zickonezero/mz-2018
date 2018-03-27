import React, { Component } from 'react';
import axiosConfig from '../axiosConfig';
import HocMain from '../hoc/hocMain';

class Work extends Component {
    state = {
        workData: null
    };

    componentDidMount() {
        axiosConfig.get('/work.json')
            .then(resp => {
                this.setState({
                    workData: resp.data
                });
            })
            .catch(err => {
                console.log(err);
            });
    }

    render () {
        console.log(this.state.workData);
        let works = <div>Loading...</div>;

        if (this.state.workData) {
            works = this.state.workData.map((work) => {
                return (
                    <li key={work.proj_header}></li>
                );
            });
        }

        return (
            <ul>
                {works}
            </ul>
        );
    }
}

export default Work;
