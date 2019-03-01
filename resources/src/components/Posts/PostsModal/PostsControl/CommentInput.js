import React, {useRef, useState} from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {Button} from "antd";
import styles from './postControl.module.css';
import {create} from '../../../../services/comments';
import {isMobile} from "../../../../utils/isMobile";

const CommentInput = React.memo(({post_id, dispatch}) => {
    let [loading, setLoading] = useState(false);

    let inputRef = useRef();

    const submit = event => {
        event.preventDefault();

        const text = inputRef.current.value;

        if (text) {
            setLoading(true);

            dispatch(create({post_id, text}))
                .then(() => {
                    setLoading(false);
                    inputRef.current.value = '';
                })
                .catch(() => setLoading(false));
        }
    };

    return (
        <form onSubmit={submit} className={styles.commentInputContainer} id={'commentInputContainer' + post_id}>
            <input
                ref={inputRef}
                placeholder='Add comment'
                className={styles.commentInput}
            />
            {
                !isMobile() &&
                <Button
                    size={'small'}
                    htmlType={'submit'}
                    style={{width: '100%'}}
                    loading={loading}
                >
                    Submit
                </Button>
            }
        </form>
    );
});

CommentInput.propTypes = {
    post_id: PropTypes.number.isRequired,
    dispatch: PropTypes.func.isRequired
};

export default connect()(CommentInput);