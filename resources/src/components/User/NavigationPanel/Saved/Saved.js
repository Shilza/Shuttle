import React from "react";
import {connect} from "react-redux";
import {getCompilations} from "../../../../services/saved";
import SavedContainer from "./SavedContainer";
import withLoader from "../../../Loader/Loader";
import Posts from "../../../Posts/Posts";
import styles from './saved.module.css';
import {Button} from "antd";

const SavedWithLoading = withLoader(SavedContainer);

class Saved extends React.PureComponent {

    state = {
        isLoading: true,
        compilationsPage: true
    };

    componentDidMount() {
        this.props.dispatch(getCompilations())
            .then(() => this.setState({isLoading: false}))
            .catch(() => this.setState({isLoading: false}));
    }

    goToCompilationsPage = () => this.setState({compilationsPage: true});

    goToSavedPosts = () => this.setState({compilationsPage: false});

    render() {
        const {savedPosts} = this.props;
        const {compilationsPage} = this.state;

        return (
            <>
                {
                    compilationsPage &&
                    <SavedWithLoading isLoading={this.state.isLoading} goToSavedPosts={this.goToSavedPosts}/>
                }
                {
                    !compilationsPage && savedPosts &&
                    <>
                        <Button className={styles.compilationsLabel}
                              onClick={this.goToCompilationsPage}>Compilations</Button>
                        <Posts posts={savedPosts}/>
                    </>
                }
            </>
        );
    }
}

const mapStateToProps = state => ({
    savedPosts: state.posts.savedPosts,
});

export default connect(mapStateToProps)(Saved);