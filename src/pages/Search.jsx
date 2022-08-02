import { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getGenres } from '../store/admin/adminSlice';
import { SearchInput } from '../components/SearchInput';
import { MdKeyboardArrowRight } from 'react-icons/md';

function Search() {
  const { genre } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  const handleClick = (name, value) => {
    // navigate(`/result/${JSON.stringify(id)}`);
    if (name === 'genre') {
      navigate(`/result/${name}/${value}`);
    } else if (name === 'season') {
      navigate(`/result/${name}/${value}`);
    }
  };

  return (
    <Row className='justify-content-center'>
      <Col xs={12} sm={10} md={8} lg={6}>
        <SearchInput />
      </Col>
      <Row className='mt-3'>
        <Col sm={12}>
          <h3 className='display-6  text-capitalize text-white mb-3 pb-2 border-bottom'>
            genres
          </h3>
          <Row className='g-2' xs={2} sm={4} md={5} lg={6}>
            {genre &&
              genre.map((g) => {
                return (
                  <Col key={g.genre_id}>
                    <div
                      className='btn btn-dark text-start w-100 px-1 fast-search border text-capitalize'
                      onClick={() => handleClick('genre', g.genre_name)}
                    >
                      <MdKeyboardArrowRight className='icon-fast-search' />
                      {g.genre_name}
                    </div>
                  </Col>
                );
              })}
          </Row>
        </Col>
      </Row>
      <Row className='mt-3'>
        <Col sm={12}>
          <h3 className='display-6  text-capitalize text-white mb-3 pb-2 border-bottom'>
            season
          </h3>
          <Row className='g-2' xs={2} sm={4} md={5} lg={6}>
            {['summer', 'winter', 'fall', 'spring'].map((season) => {
              return (
                <Col key={season}>
                  <div
                    className='btn btn-dark text-start w-100 px-1 fast-search border text-capitalize'
                    onClick={() => handleClick('season', season)}
                  >
                    <MdKeyboardArrowRight className='icon-fast-search' />
                    {season}
                  </div>
                </Col>
              );
            })}
          </Row>
        </Col>
      </Row>
    </Row>
  );
}

export default Search;
