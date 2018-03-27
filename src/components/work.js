import React, { Component } from 'react';
import axiosConfig from '../axiosConfig';
import HocMain from '../hoc/hocMain';

class Work extends Component {
    state = {
        workdData: null
    };

    componentDidMount() {
        axiosConfig.get('/work.json')
            .then(resp => {
                this.setState({
                    workdData: resp.data
                });
                console.log(this.state.workdData);
            })
            .catch(err => {
                console.log(err);
            });
    }

    render () {
        return (
            <ul>

            </ul>
        );
    }
}

export default Work;
