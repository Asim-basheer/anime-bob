import { useSearchParams, useLocation } from 'react-router-dom';
import { Pagination } from 'react-bootstrap';
import { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { getPaginateAnime } from '../store/anime/paginateSlice';
import ScrollToTop from './ScrollToTop';
function PaginationComponent({ pager }) {
  const [, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const currentPage = location.search.slice(6) || 1;
  const page = parseInt(currentPage) || 1;

  const handlePaginate = useCallback(
    (pageNumber) => {
      setSearchParams({ page: pageNumber });
      dispatch(getPaginateAnime(pageNumber));
    },
    [dispatch, setSearchParams]
  );

  useEffect(() => {
    const loadPage = () => {
      dispatch(getPaginateAnime(page));
    };

    if (page !== pager.currentPage) {
      loadPage();
    }
  }, [currentPage, dispatch, pager.currentPage, page]);

  return (
    <>
      <ScrollToTop />
      <Pagination size='sm'>
        {pager.currentPage === 1 ? (
          <Pagination.First onClick={() => handlePaginate(1)} disabled />
        ) : (
          <Pagination.First onClick={() => handlePaginate(1)} />
        )}

        {pager.currentPage === 1 ? (
          <Pagination.Prev disabled />
        ) : (
          <Pagination.Prev
            onClick={() => handlePaginate(pager.currentPage - 1)}
          />
        )}
        {pager.currentPage >= 5 && (
          <Pagination.Ellipsis
            onClick={() => handlePaginate(pager.currentPage - 5)}
          />
        )}

        {pager.pages &&
          pager.pages.map((page) => {
            if (pager.currentPage === page) {
              return (
                <Pagination.Item
                  active
                  onClick={() => handlePaginate(page)}
                  key={page}
                >
                  {page}
                </Pagination.Item>
              );
            }
            return (
              <Pagination.Item onClick={() => handlePaginate(page)} key={page}>
                {page}
              </Pagination.Item>
            );
          })}

        {pager.currentPage <= pager.totalPages - 5 && (
          <Pagination.Ellipsis
            onClick={() => handlePaginate(pager.currentPage + 5)}
          />
        )}

        {pager.currentPage === pager.totalPages ? (
          <Pagination.Next disabled />
        ) : (
          <Pagination.Next
            onClick={() => handlePaginate(pager.currentPage + 1)}
          />
        )}

        {pager.currentPage === pager.totalPages ? (
          <Pagination.Last disabled />
        ) : (
          <Pagination.Last onClick={() => handlePaginate(pager.totalPages)} />
        )}
      </Pagination>
    </>
  );
}

export default PaginationComponent;
