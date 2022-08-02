import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import AnimeCard from './AnimeCard';
import Heading from './Heading';

function Suggestions({ genreName }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        'https://bob-anime.herokuapp.com/sugg/' + genreName
      );

      setData(data);
    };

    return () => fetchData();
  }, [genreName]);
  return (
    <div>
      <Heading>suggestions</Heading>
      <Row className='g-2' xs={1} sm={2} lg={3}>
        {data.map((anime) => {
          return (
            <Col key={anime?.anime_id}>
              <AnimeCard anime={anime} />
            </Col>
          );
        })}
      </Row>
    </div>
  );
}

export default Suggestions;
