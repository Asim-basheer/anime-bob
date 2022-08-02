import { useDispatch, useSelector } from 'react-redux';
import { getPaginateAnime } from '../store/anime/paginateSlice';
import { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import AnimeCard from '../components/AnimeCard';
import PaginationComponent from '../components/PaginationComponent';
import Spinner from '../components/Spinner';
import Heading from '../components/Heading';

function AllAnime() {
  const dispatch = useDispatch();
  const { pager, pageOfItems, isLoading } = useSelector(
    (state) => state.paginate
  );

  useEffect(() => {
    dispatch(getPaginateAnime());
  }, [dispatch]);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <Heading>all anime</Heading>
      <Row xs={1} sm={2} md={3} lg={4} className='g-2'>
        {pageOfItems.map((anime) => {
          return (
            <Col key={anime.anime_id}>
              <AnimeCard anime={anime} />
            </Col>
          );
        })}
      </Row>

      <div className='mt-3 '></div>

      {pager.pages.length > 1 && (
        <PaginationComponent pager={pager} pageOfItems={pageOfItems} />
      )}
    </>
  );
}

export default AllAnime;
