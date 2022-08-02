import axios from 'axios';
import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import AnimeCard from '../components/AnimeCard';
import Heading from '../components/Heading';

function Result() {
  const params = useParams();
  const [animes, setAnimes] = useState([]);
  useEffect(() => {
    const fetchData = async (body) => {
      const { data } = await axios.post(
        'https://bob-anime.herokuapp.com/quicksearch',
        body
      );
      setAnimes(data);
    };
    const name = params.name,
      value = params.value;
    const body = { name, value };
    fetchData(body);
  }, [params]);

  return (
    <Container fluid>
      <Heading>
        {params.name} {params.value}
      </Heading>
      <Row xs={1} sm={2} md={3} lg={4} className='g-2'>
        {animes?.length > 0 &&
          animes?.map((anime) => {
            return (
              <Col key={anime?.anime_id}>
                <AnimeCard anime={anime} />
              </Col>
            );
          })}
      </Row>
    </Container>
  );
}

export default Result;
