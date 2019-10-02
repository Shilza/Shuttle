import React, {useEffect, useRef, useState} from "react";
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroller';
import Loader from "./Loader";

const Paginator = ({fetcher, children, initialPage, useWindow, isReverse, loader}) => {

  let [page, setPage] = useState(initialPage);
  let [lastPage, setLastPage] = useState(0);
  let lastFetchedPage = useRef(0);

  useEffect(() => {
    if (initialPage === 0)
      fetchData();
  }, []);

  const fetchData = () => {
    const newPage = page + 1;
    if (lastFetchedPage.current !== newPage) {
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
};

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
