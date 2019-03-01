import React from "react";
import PropTypes from 'prop-types';
import {message} from "antd/lib/index";

const CopyLinkButton = ({link, closeModal}) => {
    const copyLinkToClipboard = () => {
        let el = document.createElement('textarea');
        el.value = link;
        el.setAttribute('readonly', '');
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        message.success('Link copied to clipboard');

        closeModal();
    };

    return (
        <li onClick={copyLinkToClipboard}>Copy link</li>
    );
};

CopyLinkButton.propTypes = {
    link: PropTypes.string.isRequired,
    closeModal: PropTypes.func.isRequired
};

export default React.memo(CopyLinkButton);