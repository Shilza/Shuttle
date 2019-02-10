import React from "react";
import {connect} from "react-redux";
import {getCompilations} from "../../../../services/saved";
import SavedContainer from "./SavedContainer";
import withLoader from "../../../Loader/Loader";
import Posts from "../../../Posts/Posts";

const SavedWithLoading = withLoader(SavedContainer);

class Saved extends React.PureComponent {

    state = {
        isLoading: true
    };

    componentDidMount() {
        this.props.dispatch(getCompilations())
            .then(() => this.setState({isLoading: false}))
            .catch(() => this.setState({isLoading: false}));
    }

    render() {
        const {savedPosts, compilations} = this.props;

        return (
            <>
                {
                    savedPosts ? <Posts posts={savedPosts}/> :
                        <SavedWithLoading isLoading={this.state.isLoading} compilations={compilations}/>
                }
            </>
        );
    }
}

const mapStateToProps = state => ({
    savedPosts: state.posts.savedPosts,
    compilations: state.saved.compilations
});

export default connect(mapStateToProps)(Saved);