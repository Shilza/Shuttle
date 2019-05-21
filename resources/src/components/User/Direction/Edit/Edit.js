import React, {useState} from "react";
import {Drawer} from 'react-pretty-drawer';
import {Button} from "antd";
import EditBody from "./EditBody/EditBody";
import EditTitle from "./EditTitle";
import style from './edit.module.css';

export const Edit = React.memo(() => {

    let [isEditDrawerVisible, setDrawerVisible] = useState(false);

    const showDrawer = () => {
        setDrawerVisible(true);
    };

    const closeDrawer = () => {
        setDrawerVisible(false);
    };

    return <>
        <Button size='small' onClick={showDrawer} className={style.editButton}>
            Edit
        </Button>
        <Drawer
            visible={isEditDrawerVisible}
            onClose={closeDrawer}
            placement='bottom'
            height={'50%'}
        >
            <>
                <EditTitle onClose={closeDrawer}/>
                <EditBody/>
            </>
        </Drawer>
    </>;
});