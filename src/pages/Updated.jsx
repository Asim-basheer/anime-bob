import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getEpisodes } from '../store/episode/episodeSlice';
import Spinner from '../components/Spinner';
import { Col, Row } from 'react-bootstrap';
import Heading from '../components/Heading';
import EpisodeCard from '../components/EpisodeCard';
import EpisodePaginate from '../components/EpisodePaginate';

function Updated() {
  const dispatch = useDispatch();

  const { pageOfItems, pager, isLoading } = useSelector(
    (state) => state.episode
  );

  useEffect(() => {
    dispatch(getEpisodes());
  }, [dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Heading>updated</Heading>
      <Row className='gx-2 gy-3' xs={2} sm={3} md={5} lg={6}>
        {pageOfItems?.map((episode) => {
          return (
            <Col key={episode.episode_id}>
              <EpisodeCard episode={episode} />
            </Col>
          );
        })}
      </Row>
      <div className='mb-3'></div>
      {pager.pages?.length > 1 && <EpisodePaginate pager={pager} />}
    </>
  );
}

export default Updated;
