import Modal from "../../../Modal/Modal";
import React, {useState} from "react";
import {connect} from "react-redux";
import {setIsSaveModalOpen} from "../../../../store/actions/saved";
import styles from './savedBarCompilations.module.css';
import {Button, Form} from "antd";
import {CompilationName} from "../../../Fields/CompilationName";
import * as PostService from "../../../../services/post";

const NewCompilationModal = ({dispatch, form, postToBeSaved}) => {

    let [loading, setLoading] = useState(false);

    const saveToNewCompilation = event => {
        event.preventDefault();

        form.validateFields((err, {compilationName}) => {
            if (!err) {
                setLoading(true);
                dispatch(PostService.save({post_id: postToBeSaved.id, compilation: compilationName}))
                    .then(() => {
                        setLoading(false);
                        dispatch(setIsSaveModalOpen(false));
                    });
            }
        });
    };

    return (
        <Modal closeModal={() => dispatch(setIsSaveModalOpen(false))}>
            <div className={styles.modalContainer}>
                <div className={styles.title}>New Compilation</div>
                <div className={styles.modalBody}>
                    <img src={postToBeSaved.src} alt={'Compilation cover'}/>
                    <Form onSubmit={saveToNewCompilation} className={styles.modalBody}>
                        <CompilationName getFieldDecorator={form.getFieldDecorator}/>
                        <Button type={'primary'} htmlType="submit" loading={loading}>Ok</Button>
                    </Form>
                </div>
            </div>
        </Modal>
    );
};

const mapStateToProps = state => ({
    postToBeSaved: state.saved.postToBeSaved
});

export default connect(mapStateToProps)(Form.create()(NewCompilationModal));