import React from "react";
import {connect} from "react-redux";
import * as FeedService from "../../services/feed";
import FeedList from "./FeedList";

class Feed extends React.Component {

    componentDidMount() {
        this.props.dispatch(FeedService.getFeed());
    }

    render() {
        const {posts} = this.props;

        return (
            <>
                {posts ? <FeedList posts={posts}/> : <span>Loading</span>}
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        posts: state.posts.posts
    }
};

export default connect(mapStateToProps)(Feed);