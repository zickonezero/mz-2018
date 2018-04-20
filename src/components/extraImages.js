import React from 'react';

const extraImages = (props) => (
    <div id={props.id}>
        {props.dataFeed.map(function(data, i) {
            let projLink1,
                projLink2,
                projLink3;

            if (data.proj_link_1 != "" && data.proj_link_1 != null) {
                projLink1 = <a href={data.proj_link_1}
                className="fancybox"
                rel={data.proj_rel}
                title={data.proj_link_1_title + "</br>" + data.proj_link_1_role}></a>;
            }
            if (data.proj_link_2 != "" && data.proj_link_2 != null) {
                projLink2 = <a href={data.proj_link_2}
                className="fancybox"
                rel={data.proj_rel}
                title={data.proj_link_2_title + "</br>" + data.proj_link_2_role}></a>;
            }
            if (data.proj_link_3 != "" && data.proj_link_3 != null) {
                projLink3 = <a href={data.proj_link_3}
                className="fancybox"
                rel={data.proj_rel}
                title={data.proj_link_3_title + "</br>" + data.proj_link_3_role}></a>;
            }
            return (
                <span key={i}>
                    {projLink1}
                    {projLink2}
                    {projLink3}
                </span>
            );
        })}
    </div>
);

export default extraImages;