import React, {useEffect, useRef, useState} from "react"
import PropTypes from "prop-types"

const TopPagination = React.memo((props) => {
  const {
    loadMoreButton = <button>Load more</button>,
    loader = <span>loading...</span>,
    threshold = 200,
    toBottom = false,
    byWindow,
    fetcher,
    withScrollHandler,
    getScrollParent,
    className,
    children,
    ...rest
  } = props;

  const [{isFetching, page, lastPage}, setState] = useState({
    isFetching: false,
    page: 0,
    lastPage: 0
  });

  let scrollContainer = useRef(null);

  const hasMore = page < lastPage;

  useEffect(() => {
    setState({isFetching: true});
    const returnedValue = fetcher(page + 1);
    if (returnedValue instanceof Promise)
      returnedValue.then(({page, lastPage}) => {
        setState({isFetching: false, page, lastPage});
        if (typeof toBottom === 'boolean' && toBottom && typeof scrollContainer.current.scrollTo === 'function')
          scrollContainer.current && scrollContainer.current.scrollTo(0, scrollContainer.current.scrollHeight);
        else if (toBottom && toBottom.current && typeof toBottom.current.scrollTo === 'function')
          toBottom.current.scrollTo(0, toBottom.current.scrollHeight);
      });
    else
      setState({isFetching: false});

    if (typeof getScrollParent !== 'undefined') {
      getScrollParent(scrollContainer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadMore = () => {
    if (hasMore) {
      setState({isFetching: true});
      fetcher(page + 1).then(({page, lastPage}) => {
        setState({isFetching: false, page, lastPage})
      });
    }
  };

  const handleScroll = (() => {
    const toTop = byWindow ? window.scrollY - threshold : scrollContainer.current.scrollTop;
    if (withScrollHandler && !isFetching && hasMore && toTop - threshold <= 0)
      loadMore()
  });

  return (
    <div
      ref={scrollContainer}
      className={className}
      onScroll={handleScroll}
      {...rest}
    >
      {
        (hasMore && !withScrollHandler && !isFetching)
        && React.cloneElement(loadMoreButton, {onClick: loadMore})
      }
      {
        isFetching && loader
      }
      {
        children
      }
    </div>
  )
});

TopPagination.propTypes = {
  loadMoreButton: PropTypes.element,
  loader: PropTypes.element,
  threshold: PropTypes.number,
  byWindow: PropTypes.bool,
  fetcher: PropTypes.func.isRequired,
  withScrollHandler: PropTypes.bool,
  getScrollParent: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.node,
  toBottom: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object
  ])
};

export default TopPagination;
