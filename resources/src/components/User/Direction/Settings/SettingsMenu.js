import React from "react";
import Settings from "./Settings";

class SettingsMenu extends React.PureComponent {
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
        return (
            <>
                {
                    React.cloneElement(this.props.trigger, {onClick: this.showDrawer})
                }
                <Settings visible={this.state.visible} onClose={this.onClose}/>
            </>
        );
    }
}

export default SettingsMenu;