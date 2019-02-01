import React from "react";
import {Button, Drawer, Icon} from "antd";
import EditBody from "./EditBody/EditBody";

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

        return (
            <>
                <Button size='small' onClick={this.showDrawer} style={{marginRight: '10px'}}>
                    Edit
                </Button>
                {
                    visible && (window.screen.availWidth <= 768 ?
                            <Drawer
                                title={<EditTitle/>}
                                placement={'bottom'}
                                closable={false}
                                onClose={this.onClose}
                                visible={visible}
                                height='90%'
                            >
                                <EditBody/>
                            </Drawer> :
                            <div>MODAL!</div>
                    )
                }
            </>
        );
    }
}

const EditTitle = () => (
    <div>
        <Icon type="edit"/>
        <span style={{marginLeft: 10}}>Edit profile</span>
    </div>
);

export default Edit;