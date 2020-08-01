import React, { Component } from 'react';
import axiosConfig from '../axiosConfig';
import Main from '../components/main';
import ExtraImages from '../components/extraImages';
import Nav from '../components/nav';
import NameForm from '../components/nameForm';
import { GlobalJS } from '../global';

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

                this.setState({
                    aboutData: resp.data.about,
                    artData: resp.data.art,
                    picsData: resp.data.pics,
                    skillsData: resp.data.skills,
                    workData: sortedWorkData
                });

                // jQuery functions
                GlobalJS.init();
            })
            .catch(err => {
                console.log(err);
            });
    }

    render () {
        let works, art, pics, worksImgs, artImgs, picsImgs = null;

        if (this.state.workData) {
            works = <Main header='Corporate Entities'
                headerId='section2-title'
                dataId='work'
                dataFeed={this.state.workData} />;
            worksImgs = <ExtraImages dataFeed={this.state.workData} />;
        }
        if (this.state.artData) {
            art = <Main header='Cultural Artifacts'
                headerId='section3-title'
                dataId='art'
                dataFeed={this.state.artData} />;
            artImgs = <ExtraImages dataFeed={this.state.artData} />;
        }
        if (this.state.picsData) {
            pics = <Main header='Personnel'
                headerId='section4-title'
                dataId='pics'
                dataFeed={this.state.picsData} />;
            picsImgs = <ExtraImages dataFeed={this.state.picsData} />;
        }
        const about = !this.state.aboutData ?
            null : <Main header={'Captain\'s Log'}
                    dataFeed={this.state.aboutData} />;
        const skills = !this.state.skillsData ?
            null : <Main header='Qualifications'
                    dataFeed={this.state.skillsData} />;

        return (
          <div className="content">
            <div className="row-fluid">
              <div className="span12">
                <h1 id="my-name">Michael Zick</h1>
                <div id="subclass">
                  <p>Life & Relationship Coach for Men</p>
                </div>
                <div id="socialwell">
                  <span>
                    <a
                      href="https://www.linkedin.com/in/michaelzick"
                      target="_blank"
                    >
                      LinkedIn
                    </a>
                  </span>
                  <span>&nbsp;:&nbsp;</span>
                  <span>
                    <a
                      href="https://twitter.com/michaelzick"
                      target="_blank"
                    >
                      Twitter
                    </a>
                  </span>
                </div>

                <div id="ascensorBuilding">
                  <section>
                    <div id="loader"></div>
                    <h1 id="intro" className="typeText"></h1>
                    <br></br>
                  </section>
                  <section className="add-border">{works}</section>
                  <section className="add-border large-img">{art}</section>
                  <section className="add-border large-img">{pics}</section>
                  <section>
                    {about}
                    {skills}
                  </section>

                  <div id="proj_img_links">
                    {worksImgs}
                    {artImgs}
                    {picsImgs}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
};

export default Home;
