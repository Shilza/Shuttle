import {createRef} from "react";
import {connect} from "react-redux";
import React from "react";
import {Button} from "antd";
import styles from './postControl.module.css';
import {create} from '../../../../services/comments';
import {isMobile} from "../../../../utils/isMobile";

class CommentInput extends React.PureComponent {

    state = {
        inputValue: '',
        loading: false
    };

    inputRef = createRef();

    submit = () => {
        const text = this.inputRef.current.value;
        const {post_id, dispatch} = this.props;

        if (text) {
            this.setState({loading: true});

            dispatch(create({post_id, text}))
                .then(() => {
                    this.setState({inputValue: '', loading: false});
                    this.inputRef.current.value = '';
                })
                .catch(() => this.setState({loading: false}));
        }
    };

    onChangeInput = event => this.setState({inputValue: event.target.value});

    render() {
        const {loading} = this.state;
        const {post_id} = this.props;

        return (
            <div className={styles.commentInputContainer} id={'commentInputContainer' + post_id}>
                <input
                    ref={this.inputRef}
                    placeholder='Add comment'
                       className={styles.commentInput}
                       onChange={this.onChangeInput}
                />
                {
                    !isMobile() &&
                    <Button
                        onClick={this.submit}
                        size={'small'}
                        style={{width: '100%'}}
                        loading={loading}
                    >
                        Submit
                    </Button>
                }
            </div>
        );
    }
}

export default connect()(CommentInput);