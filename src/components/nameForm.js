import React from 'react';

const NameForm = (props) => {
    return (
        <form id="name-form">
            <input id="input-name" maxLength="20" readOnly="readonly" />
            <h1 className="loopThis">Input Here</h1>
        </form>
    )
}

export default NameForm;
