import { Col, Row } from 'react-bootstrap';
import Slider from '../components/Slider';
import TopAnime from '../components/TopAnime';
import LastAnimeUpdate from '../components/LastAnimeUpdate';
import LastEpisodeUpdate from '../components/LastEpisodeUpdate';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
function Home() {
  const [lastAnimes, setLastAnimes] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setIsloading(true);
      const { data } = await axios.get(
        'https://bob-anime.herokuapp.com/anime/get/last'
      );
      setLastAnimes(data);
    };
    fetchData();
    setIsloading(false);
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Row>
        <Col lg='8' xl={9}>
          <Slider lastAnimes={lastAnimes} />
          <div className='mb-5'></div>
          <LastEpisodeUpdate />
          <div className='mb-2'></div>
          <LastAnimeUpdate lastAnimes={lastAnimes} />
        </Col>
        <Col lg='4' xl={3} className='d-none d-lg-block'>
          <TopAnime />
        </Col>
      </Row>
    </>
  );
}

export default Home;
