import React, {useEffect, useRef, useState} from "react";
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroller';
import Loader from "./Loader";

const Paginator = React.memo(({fetcher, children, initialPage, useWindow, isReverse, loader}) => {

  let [page, setPage] = useState(initialPage);
  let [lastPage, setLastPage] = useState(0);
  let lastFetchedPage = useRef(0);

  const resetState = () => {
    lastFetchedPage.current = 0;
    setPage(initialPage);
    setLastPage(0);
  };

  useEffect(() => {
    if (initialPage === 0) {
      resetState();
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetcher]);

  const fetchData = () => {
    const newPage = lastFetchedPage.current + 1;
    if (lastFetchedPage.current !== newPage && lastPage !== 0 ? newPage <= lastPage : true) {
      lastFetchedPage.current = newPage;
      fetcher(newPage).then(({page, lastPage}) => {
        setPage(page);
        setLastPage(lastPage);
      });
    }
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
});

Paginator.defaultProps = {
  initialPage: 0,
  useWindow: true,
  isReverse: false,
  loader: <Loader key='loader'/>
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
