import React from "react";
import MaterialInput from "./MaterialInput";
import {Icon} from "antd";
import {checkIsUsernameUnique} from "../../../../../services/user";

class Username extends React.Component {

    state = {
        isLoading: false,
        error: undefined,
        isOk: false
    };

    isUnique = event => {
        this.setState({isLoading: true, error: undefined, isOk: false});
        checkIsUsernameUnique(event.target.value)
            .then(({unique, message}) => this.setState({isOk: unique, error: message, isLoading: false}))
            .catch(({message}) => this.setState({isOk: false, error: message, isLoading: false}))
    };

    render() {
        const {username} = this.props;
        const {isLoading, error, isOk} = this.state;

        return (
            <>
                <div style={{display: 'inline-flex', alignItems: 'center', width: '100%'}}>
                    <MaterialInput defaultValue={username} label={'Username'} error={error} onChange={this.isUnique}/>
                    {
                        isLoading && <Icon type="loading"/>
                    }
                    {
                        isOk && <Icon type="check-circle" style={{color: 'green', marginBottom: 12}}/>
                    }
                </div>
            </>
        );
    }
}

export default Username;