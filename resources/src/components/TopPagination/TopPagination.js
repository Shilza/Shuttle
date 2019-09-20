import React, {useEffect, useRef, useState} from "react"
import PropTypes from "prop-types"

const TopPagination = (props) => {
  const {
    loadMoreButton = <button>Load more</button>,
    loader = <span>loading...</span>,
    threshold = 200,
    byWindow,
    fetcher,
    withScrollHandler,
    getScrollParent,
    className,
    children
  } = props

  const [{isFetching, page, lastPage}, setState] = useState({
    isFetching: false,
    page: 0,
    lastPage: 0
  })

  let scrollContainer = useRef(null)

  const hasMore = page < lastPage;

  useEffect(() => {
    setState({isFetching: true})
    fetcher(page + 1).then(({page, lastPage}) => {
      setState({isFetching: false, page, lastPage})
    })

    if (typeof getScrollParent !== 'undefined')
      getScrollParent(scrollContainer)
  }, [])

  const loadMore = () => {
    if (hasMore) {
      setState({isFetching: true})
      fetcher(page + 1).then(({page, lastPage}) => {
          setState({isFetching: false, page, lastPage})
        }
      )
    }
  }

  const handleScroll = (() => {
    const toTop = byWindow ? window.scrollY - threshold : scrollContainer.current.scrollTop;
    if (withScrollHandler && !isFetching && hasMore && toTop - threshold <= 0)
      loadMore()
  });

  return (
    <div
      ref={scrollContainer}
      onWheel={withScrollHandler ? handleScroll : null}
      className={className}
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
};

TopPagination.propTypes = {
  loadMoreButton: PropTypes.element,
  loader: PropTypes.element,
  threshold: PropTypes.number,
  byWindow: PropTypes.bool,
  fetcher: PropTypes.func.isRequired,
  withScrollHandler: PropTypes.bool,
  getScrollParent: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.node
};

export default TopPagination;
