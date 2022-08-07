import { useState } from 'react';
import axios from 'axios';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { useEffect, useCallback } from 'react';
import {
  Alert,
  Button,
  Col,
  Container,
  OverlayTrigger,
  Row,
  Tooltip,
} from 'react-bootstrap';
import TopAnime from '../../components/TopAnime';
import { Link } from 'react-router-dom';
import AnimeDetails from './AnimeDetails';
import Suggestions from '../../components/Suggestions';
import { TbPlayerTrackNext, TbPlayerTrackPrev } from 'react-icons/tb';

function AnimePage() {
  const [animes, setAnimes] = useState([]);
  const [checkIfThereAnimeNext, setCheckIfThereAnimeNext] = useState(true);
  const [checkIfThereAnimePrev, setCheckIfThereAnimePrev] = useState(true);
  const [allEpisode, setAllEpisode] = useState([]);
  const [currentEpisode, setCurrentEpisode] = useState([]);
  const [server, setServer] = useState('');
  const location = useLocation();
  const params = useParams();
  const anime = animes.filter((a) => a?.anime_id === +params?.id)[0];
  const navigate = useNavigate();
  const fetchData = useCallback(async () => {
    const { data } = await axios.get(
      'https://bob-anime.herokuapp.com/episodesnumber/' + params?.id
    );
    setAllEpisode(data);
  }, [params.id]);

  useEffect(() => {
    document.title = params?.episode
      ? `${params.name}-episode  ${params.episode}-Anime Bob`
      : `${params.name}-Anime Bob`;
  });

  const currentPage = params?.episode
    ? params?.episode
    : location.search.slice(9) ||
      (allEpisode.length > 0 && allEpisode[0].episode_number);
  const fetchEpisode = useCallback(async (body) => {
    const { data } = await axios.post(
      'https://bob-anime.herokuapp.com/episode',
      body
    );
    if (data.length > 0) {
      setCurrentEpisode(data);
      setServer(data[0].servers[0].value);
    } else {
      setServer('');
    }
  }, []);

  const fetchAnAnime = async (id) => {
    const { data } = await axios.get(
      `https://bob-anime.herokuapp.com/anime/one/${id}`
    );
    setAnimes(data);
  };

  useEffect(() => {
    fetchAnAnime(params.id);
  }, [params.id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    const anime_id = params.id,
      episode_number = currentPage,
      body = { anime_id, episode_number };

    fetchEpisode(body);
  }, [fetchEpisode, params.id, currentPage]);

  const handleClick = (episode_number, anime_id, name) => {
    navigate(`/details/${anime_id}/${name}/${episode_number}`);
    const body = { episode_number, anime_id };

    fetchEpisode(body);
  };

  const serverHandler = (serverName) => {
    const filter = currentEpisode[0]?.servers.filter(
      (i) => i.name === serverName
    )[0];
    setServer(filter.value);
  };

  const index =
    params?.episode && params?.episode
      ? allEpisode?.findIndex(
          (object) => object.episode_id === currentEpisode[0]?.episode_id
        )
      : 0;

  useEffect(() => {
    const episode = allEpisode[index + 1];
    if (episode) {
      setCheckIfThereAnimeNext(true);
    } else {
      setCheckIfThereAnimeNext(false);
    }
  }, [allEpisode, currentEpisode, index]);
  useEffect(() => {
    const episode = allEpisode[index - 1];
    if (episode) {
      setCheckIfThereAnimePrev(true);
    } else {
      setCheckIfThereAnimePrev(false);
    }
  }, [allEpisode, currentEpisode, index]);

  const nextHandler = () => {
    const episdoe = allEpisode[index + 1];
    if (episdoe) {
      navigate(
        `/details/${episdoe.anime_id}/${episdoe.name}/${episdoe.episode_number}`
      );
    }
  };
  const prevHandler = () => {
    const episdoe = allEpisode[index - 1];
    if (episdoe) {
      navigate(
        `/details/${episdoe.anime_id}/${episdoe.name}/${episdoe.episode_number}`
      );
    }
  };

  const renderTooltip = (props) => (
    <Tooltip id='button-tooltip' {...props}>
      episode {props}
    </Tooltip>
  );

  return (
    <Container fluid>
      <Row>
        <Col lg={9}>
          {server.length > 0 ? (
            <>
              <p className='bg-dark text-white rounded text-center h5 text-capitalize p-3 mb-0'>
                {`${params.name} ${
                  typeof params.episode === 'undefined'
                    ? ''
                    : 'episode ' + params.episode
                }`}
              </p>
              <div className='video-show bg-dark'>
                <iframe
                  src={server}
                  frameBorder='0'
                  allow='autoplay'
                  title='anime'
                  className='w-100 h-100'
                  allowFullScreen
                ></iframe>
              </div>
              <div className='bg-dark mb-4 p-1'>
                <Button
                  onClick={prevHandler}
                  variant='secondary'
                  size='sm'
                  className={`${checkIfThereAnimePrev ? '' : 'disabled'}`}
                >
                  <TbPlayerTrackPrev
                    style={{ marginBottom: '1.8px' }}
                    className='me-1'
                  />
                  Prev
                </Button>
                <Button
                  onClick={nextHandler}
                  variant='secondary'
                  size='sm'
                  className={`me-5 ${checkIfThereAnimeNext ? '' : 'disabled'}`}
                >
                  Next
                  <TbPlayerTrackNext
                    style={{ marginBottom: '1.8px' }}
                    className='ms-1'
                  />
                </Button>

                {currentEpisode &&
                  currentEpisode[0]?.servers.map((server) => {
                    return (
                      <Button
                        variant='secondary'
                        onClick={() => serverHandler(server.name)}
                        key={server.value}
                        className='text-capitalize me-2'
                        size={'sm'}
                      >
                        {server.name}
                      </Button>
                    );
                  })}
              </div>
              <Row className='g-2 bg-dark p-3 pt-2 mb-3 rounded'>
                {allEpisode.map((anime) => {
                  return (
                    <Col
                      xs={3}
                      sm={2}
                      md={1}
                      className='text-white'
                      key={anime.episode_id}
                    >
                      <div>
                        <OverlayTrigger
                          placement='top'
                          delay={{ show: 250, hide: 400 }}
                          overlay={renderTooltip(anime.episode_number)}
                        >
                          <Button
                            variant='primary'
                            size={'sm'}
                            className={`w-100 me-2 rounded ${
                              +currentPage === anime.episode_number
                                ? 'disabled'
                                : ''
                            }`}
                            onClick={() =>
                              handleClick(
                                anime.episode_number,
                                anime.anime_id,
                                anime.name
                              )
                            }
                          >
                            {anime.episode_number}
                          </Button>
                        </OverlayTrigger>
                      </div>
                    </Col>
                  );
                })}
              </Row>
            </>
          ) : (
            <Alert key={'danger'} variant={'danger'}>
              This anime doesn't have episodes, wait till we upload some of
              them, find another anime{' '}
              <Link to='/all' className='fw-bold' style={{ color: '#6a1a21' }}>
                go to anime page
              </Link>
            </Alert>
          )}
          <AnimeDetails anime={anime} />
          <div className='mb-3'></div>
          {anime && <Suggestions genreName={anime?.genre[0]} />}
        </Col>
        <Col className='d-none d-lg-block'>
          <TopAnime />
        </Col>
      </Row>
    </Container>
  );
}

export default AnimePage;
