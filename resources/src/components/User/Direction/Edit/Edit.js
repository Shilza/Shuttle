import React from "react";
import {Button} from "antd";
import EditBody from "./EditBody/EditBody";
import EditTitle from "./EditTitle";
import Drawer from "../../../Drawer/Drawer";


class Edit extends React.Component {
    state = {visible: false};

    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    render() {
        const {visible} = this.state;

        return <>
            <Button size='small' onClick={this.showDrawer} style={{marginRight: '10px'}}>
                Edit
            </Button>
            {
                visible &&
                <Drawer
                    title={<EditTitle/>}
                    onClose={this.onClose}
                >
                    <EditBody/>
                </Drawer>
            }
        </>;
    }
}

export default Edit;