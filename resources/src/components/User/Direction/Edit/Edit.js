import React, {useState} from "react";
import {Button} from "antd";
import EditBody from "./EditBody/EditBody";
import EditTitle from "./EditTitle";
import Drawer from "../../../Drawer/Drawer";
import style from './edit.module.css';

const Edit = () => {

    let [isEditDrawerVisible, setDrawerVisible] = useState(false);
    let [isBodyVisible, setBodtyVisible] = useState(false);

    const showDrawer = () => {
        setDrawerVisible(true);
        setBodtyVisible(true);
    };

    const onClose = () => {
        setBodtyVisible(false);
        setTimeout(() => setDrawerVisible(false), 500);
    };

    return <>
        <Button size='small' onClick={showDrawer} className={style.editButton}>
            Edit
        </Button>
        {
            isEditDrawerVisible &&
            <Drawer
                title={<EditTitle/>}
                onClose={onClose}
            >
                <EditBody visible={isBodyVisible}/>
            </Drawer>
        }
    </>;
};

export default React.memo(Edit);