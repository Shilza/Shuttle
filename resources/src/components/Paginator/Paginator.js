import React, {useEffect, useState} from "react";
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroller';
import Loader from "./Loader/Loader";

const Paginator = ({fetcher, initialPage = 0, useWindow = true, isReverse = false, children, loader = <Loader key='loader'/>}) => {

    let [page, setPage] = useState(initialPage);
    let [lastPage, setLastPage] = useState(0);

    useEffect(() => {
        if (initialPage === 0)
            fetchData();
    }, []);

    const fetchData = () => {
        fetcher(page + 1).then(({page, lastPage} ) => {
            setPage(page);
            setLastPage(lastPage);
        });
    };

    return (
        <InfiniteScroll
            pageStart={0}
            loadMore={fetchData}
            hasMore={page < lastPage}
            loader={loader}
            isReverse={isReverse}
            useWindow={useWindow}
        >
            {children}
        </InfiniteScroll>
    );
};

Paginator.propTypes = {
    fetcher: PropTypes.func.isRequired,
    initialPage: PropTypes.number,
    isReverse: PropTypes.bool,
    children: PropTypes.node.isRequired,
    loader: PropTypes.node,
    useWindow: PropTypes.bool
};

export default Paginator;