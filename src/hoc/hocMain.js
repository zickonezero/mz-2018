import React from 'react';

const Main = (props) => (
    <ul className="thumbnails">
        {props.dataFeed.map(function (data, i) {
            let newLine = "",
                fancyBox = "fancybox",
                targetBlank = "",
                isIframe = "",
                span = "span3";

            if (data.proj_is_url == true) {
                targetBlank = "_blank";
                fancyBox = "";
            }
            if (data.proj_new_line === true) {
                newLine = "thumb-new-line";
            }
            if (data.proj_is_iframe === true) {
                isIframe = "iframe";
            }
            if (data.art_radio || data.pics_radio) {
                span = "span4";
            }

            return (
                <li key={i} className={newLine + " " + span}>
                    <a href={data.proj_link_0}
                        className={fancyBox + " thumbnail"}
                        target={targetBlank}
                        data-fancybox-type={isIframe}
                        rel={data.proj_rel}
                        title={data.proj_title + "</br>" + data.proj_role}>
                        <img src={data.proj_thumb} />
                    </a>
                    <div className="caption">
                        <h2>{data.proj_header}</h2>
                        <h3 className="lato description">{data.proj_desc}</h3>
                    </div>
                </li>
            );
        })}
    </ul>
);

export default Main;
