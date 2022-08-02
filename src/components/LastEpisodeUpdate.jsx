import axios from 'axios';
import { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import EpisodeCard from './EpisodeCard';
import Heading from './Heading';

function LastEpisodeUpdate() {
  const [last, setLast] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        'https://bob-anime.herokuapp.com/episode/get/last'
      );
      setLast(data);
    };
    fetchData();
  }, []);

  return (
    <>
      <Heading>latest updated episode</Heading>
      <Row className='gx-2 gy-3 mb-2' xs={2} sm={3} md={4} xl={5}>
        {last.map((episode) => {
          return (
            <Col key={episode.episode_id}>
              <EpisodeCard episode={episode} />
            </Col>
          );
        })}
      </Row>
      <div className='d-flex justify-content-end'>
        <Link
          className='btn btn-link btn-sm text-end text-capitalize'
          to={'/updated'}
        >
          see more episodes
        </Link>
      </div>
    </>
  );
}

export default LastEpisodeUpdate;
