import React, {Component} from 'react';
import axiosConfig from '../axiosConfig';
import MainHOC from '../hoc/MainHOC';

class Home extends Component {
    state = {
        workData: null
    };

    componentDidMount() {
        axiosConfig.get('/all.json')
            .then(resp => {
                const sortedWorkData = resp.data.work.sort((a, b) => {
                    return a.order_num - b.order_num;
                });
                console.log(sortedWorkData);

                this.setState({
                    workData: sortedWorkData
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
            <div className="content">
                <div className="row-fluid">
                    <div className="span12">

                        <div id="navComponent"></div>

                        <h1 id="my-name">michael zick</h1>

                        <div id="subclass">
                            <p>ui engineer : class a : v 3.1.0</p>
                            <p>this site is built on nodejs // express // ejs // react // mongodb</p>
                        </div>

                        <div id="socialwell">
                            <span><a href="http://www.linkedin.com/in/michaelzick" target="_blank">linkedin</a></span>
                            <span>&nbsp;:&nbsp;</span>
                            <span><a href="http://zickonezero.tumblr.com/" target="_blank">blog</a></span>
                            <span>&nbsp;:&nbsp;</span>
                            <span><a href="https://github.com/zickonezero?tab=repositories" target="_blank">github</a></span>
                        </div>

                        <div id="ascensorBuilding">
                            <section>
                                <div id="loader"></div>

                                <h1 id="intro" className="typeText"></h1>
                                <br></br>
                                <form id="name-form">
                                    <input id="input-name" maxLength="20" readOnly="readonly" />
                                    <h1 className="loopThis">Input Here</h1>
                                </form>
                            </section>

                            <section className="add-border">
                                <h1 id="section2-title">Corporate Entities</h1>
                                <div id="work" className="row-fluid">
                                    {works}
                                </div>
                            </section>

                            <section className="add-border large-img">
                                <h1 id="section3-title">Cultural Artifacts</h1>
                                <div id="art" className="row-fluid">
                                </div>
                            </section>

                            <section className="add-border large-img">
                                <h1 id="section4-title">Personnel</h1>
                                <div id="pics" className="row-fluid">
                                </div>
                            </section>

                            <section>
                                <h1 id="section5-title">Captain's Log</h1>
                                <div id="bio-box">
                                </div>
                                <div id="qual-box">
                                    <h1 id="qual-header">Qualifications</h1>
                                    <div id="skills-box">
                                    </div>
                                </div>
                            </section>

                            <div id="proj_img_links">
                                <div id="proj-imgs-1"></div>
                                <div id="proj-imgs-2"></div>
                                <div id="proj-imgs-3"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
};

export default Home;
