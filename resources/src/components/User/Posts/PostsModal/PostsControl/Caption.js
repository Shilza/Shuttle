import styles from './postControl.module.css';
import React from "react";

class Caption extends React.Component {

    state = {
        isInput: false
    };

    changeInput = () => this.setState({isInput: true});

    render() {
        const {post} = this.props;
        const {isInput} = this.state;

        return (
            <div className={styles.caption}>
                <h4 className={styles.captionUsername}>{post.owner}</h4>
                {
                    isInput ? <textarea defaultValue={post.caption} style={{display: 'block', width: '100%', border: 'none'}} /> :
                    <span onClick={this.changeInput}>{post.caption || 'Caaption'}</span>
                }
            </div>
        );
    }
}

export default Caption;