import {Button} from "antd";
import React, {createRef} from "react";

const UploadButton = ({loadMedia}) => {
    const fileRef = createRef();

    return (
        <Button onClick={() => fileRef.current.click()} htmlType='button' style={{width: '100%'}}>New
            <input type='file' style={{display: 'none'}} onChange={loadMedia} ref={fileRef}/>
        </Button>
    );
};

export default UploadButton;