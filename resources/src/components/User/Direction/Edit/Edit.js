import React, {useState} from "react";
import {Button} from "antd";
import EditBody from "./EditBody/EditBody";
import EditTitle from "./EditTitle";
import Drawer from "../../../Drawer/Drawer";
import style from './edit.module.css';

const Edit = () => {

    let [isEditDrawerVisible, setDrawerVisible] = useState(false);

    const showDrawer = () => setDrawerVisible(true);

    const onClose = () => setDrawerVisible(false);

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
                <EditBody/>
            </Drawer>
        }
    </>;
};

export default React.memo(Edit);