import React from "react";
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

export default React.memo(CopyLinkButton);