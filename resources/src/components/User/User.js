import React from "react";
import styles from './userPage.module.css';
import StoriesList from "./UserInfoHeader/Stories/StoriesList/StoriesList";
import NavigationPanel from "./NavigationPanel/NavigationPanel";
import {connect} from "react-redux";
import PostsUploader from "../Posts/Uploader/PostsUploader";
import UserInfoHeader from "./UserInfoHeader/UserInfoHeader";

const User = ({me, isPrivate}) => (
    <div className={styles.userPageContainer}>
        <UserInfoHeader/>
        {
            isPrivate ? <span>Private</span>
                :
                <>
                    <StoriesList stories={
                        [
                            {src: 'https://www.itsnicethat.com/system/files/112017/5a0c24617fa44c187f000efc/index_default/Chris-(Simpsons-Artist)-The-Story-of-Life-publication-itsnicethat-list.png?1510746521'},
                            {
                                src: 'https://www.storynory.com/wp-content/uploads/2018/01/pot-of-broth-storynory-600-600x400.jpg',
                                name: 'Stoory'
                            }
                        ]
                    }/>
                    {
                        me && <PostsUploader/>
                    }
                    <NavigationPanel/>
                </>
        }
    </div>
);

const mapStateToProps = state => ({
    me: state.auth.user.id === state.users.user.id,
    isPrivate: state.users.user.private
});

export default connect(mapStateToProps)(User);