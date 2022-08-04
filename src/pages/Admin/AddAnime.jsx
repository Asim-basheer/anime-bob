import { useState, useCallback } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { addAnime, getGenres, updateAnime } from '../../store/admin/adminSlice';
import { getPaginateAnime } from '../../store/anime/paginateSlice';
import { getAnimes } from '../../store/anime/animeSlice';
function AddAnime() {
  const [status, setStatus] = useState([{ status: 'Currently Airing' }]);
  const [season, setSeason] = useState([{ season: 'summer' }]);
  const [genres, setGenres] = useState([]);
  const { genre } = useSelector((state) => state.admin);
  const [values, setValues] = useState({
    name: '',
    other_names: '',
    scores: 10,
    description: '',
    img: '',
    cover: '',
    episodes_number: 1,
    premiered: new Date().getFullYear(),
  });
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAnimes());
  }, [dispatch]);

  const { animes } = useSelector((state) => state.anime);

  const filterValue = animes?.filter(
    ({ anime_id }) => anime_id === Number(params?.anime_id)
  )[0];

  const editHandler = useCallback(() => {
    if (typeof filterValue === 'object') {
      const returnGenres = (genreName) => {
        const filterGenre = genre.filter(
          ({ genre_name }) => genre_name === genreName
        )[0];
        return filterGenre;
      };
      let arrOfGenres = [];

      if (genre.length > 0) {
        for (let genre of filterValue.genre) {
          arrOfGenres.push(returnGenres(genre));
        }
      }
      setValues({
        name: filterValue.name,
        other_names: filterValue.other_names,
        scores: filterValue.scores,
        description: filterValue.description,
        img: filterValue.img,
        cover: filterValue.cover,
        premiered: filterValue.premiered,
        episodes_number: filterValue.episodes_number,
      });
      setGenres(arrOfGenres);
      setStatus([{ status: filterValue.status }]);
      setSeason([{ season: filterValue.season }]);
    }
  }, [filterValue]);

  useEffect(() => {
    dispatch(getGenres());
    editHandler();
  }, [dispatch, editHandler]);

  const statusOptions = [
    { status: 'Currently Airing' },
    { status: 'Finished Airing' },
  ];

  const arrPremiered = [];
  for (let i = 2000; i <= new Date().getFullYear(); i++) {
    arrPremiered.push(i);
  }

  const seasonOptions = [
    {
      season: 'summer',
    },
    {
      season: 'spring',
    },
    {
      season: 'fall',
    },
    {
      season: 'winter',
    },
  ];

  const handleChange = (e) => {
    setValues((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const genre = [];
    for (let g of genres) {
      genre.push(g.genre_id);
    }
    values.status = status[0]?.status;
    values.season = season[0]?.season;
    values.genre = JSON.stringify(genre);

    const clearInputs = () => {
      setValues({
        name: '',
        other_names: '',
        scores: 10,
        description: '',
        img: '',
        cover: '',
        episodes_number: 1,
        premiered: new Date().getFullYear(),
      });
      setGenres([]);
    };
    if (params?.anime_id === 'add') {
      if (
        values.status === [] ||
        values.season === [] ||
        values.genre === [] ||
        values.premiered === '' ||
        values.scores === '' ||
        values.name === '' ||
        values.cover === '' ||
        values.img === '' ||
        values.description === '' ||
        values.episodes_number === ''
      ) {
        toast.error('all fields are required');
      } else {
        dispatch(addAnime(values));
        clearInputs();
        toast.success('added successfully');
      }
    } else {
      if (
        values.status === [] ||
        values.season === [] ||
        values.genre === [] ||
        values.premiered === '' ||
        values.scores === '' ||
        values.name === '' ||
        values.cover === '' ||
        values.img === '' ||
        values.description === '' ||
        values.episodes_number === ''
      ) {
        toast.error('all fields are required');
      } else {
        const anime = { body: values, anime_id: filterValue.anime_id };
        dispatch(updateAnime(anime));
        dispatch(getPaginateAnime());

        clearInputs();
        navigate('/admin/anime/add');
        toast.success('edited successfully');
      }
    }
  };

  return (
    <Container fluid='xxl'>
      <Row className='g-1 mt-1'>
        <Form onSubmit={handleSubmit} className='text-white bg-dark p-3'>
          <Row className='mb-3 g-2' xs={1} sm={2} md={3} lg={4}>
            <Col className='mb-forms-md'>
              <Form.Group controlId='name'>
                <Form.Label>Aname</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Anime name'
                  onChange={handleChange}
                  size='sm'
                  value={values.name}
                />
              </Form.Group>
            </Col>
            <Col className=' mb-forms-sm'>
              <Form.Group controlId='other_names'>
                <Form.Label>Other names</Form.Label>
                <Form.Control
                  size='sm'
                  type='text'
                  placeholder='Other names'
                  onChange={handleChange}
                  value={values.other_names}
                />
              </Form.Group>
            </Col>
            <Col className=' mb-forms-sm'>
              <Form.Label>Premiered</Form.Label>
              <Form.Select
                size='sm'
                id='premiered'
                onChange={handleChange}
                value={values.premiered}
              >
                {arrPremiered.reverse().map((premiered) => {
                  return (
                    <option key={premiered} value={premiered}>
                      {premiered}
                    </option>
                  );
                })}
              </Form.Select>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Status</Form.Label>
                <Typeahead
                  id='status'
                  labelKey='status'
                  onChange={setStatus}
                  options={statusOptions}
                  placeholder='Choose a status...'
                  selected={status}
                  size='sm'
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className='mb-3 g-2'>
            <Col md={6} lg={6} className=' mb-forms-sm'>
              <Form.Group controlId='img'>
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Img url'
                  onChange={handleChange}
                  size='sm'
                  value={values.img}
                />
              </Form.Group>
            </Col>
            <Col md={6} lg={6}>
              <Form.Group controlId='cover'>
                <Form.Label>Cover</Form.Label>
                <Form.Control
                  size='sm'
                  type='text'
                  placeholder='Cover url'
                  onChange={handleChange}
                  value={values.cover}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className='mb-3 g-2'>
            <Col xl={7} className='mb-forms-md'>
              <Form.Group>
                <Form.Label>Genres</Form.Label>
                <Typeahead
                  id='genre'
                  labelKey={(genre) => `${genre.genre_name}`}
                  multiple
                  onChange={setGenres}
                  options={genre}
                  selected={genres}
                  placeholder='Choose a genres...'
                  clearButton
                  size='sm'
                />
              </Form.Group>
            </Col>
            <Col xs={6} sm={4} xl={2} className='mb-forms-md'>
              <Form.Group>
                <Form.Label>Season</Form.Label>
                <Typeahead
                  id='season'
                  labelKey='season'
                  onChange={setSeason}
                  options={seasonOptions}
                  placeholder='Choose a season...'
                  selected={season}
                  size={'sm'}
                />
              </Form.Group>
            </Col>
            <Col xs={6} sm={4} xl={1}>
              <Form.Group controlId='scores'>
                <Form.Label>Scores</Form.Label>
                <Form.Control
                  size='sm'
                  type='number'
                  placeholder='Scores'
                  onChange={handleChange}
                  max={10}
                  min={1}
                  step='.01'
                  value={values.scores}
                />
              </Form.Group>
            </Col>
            <Col xs={6} sm={4} xl={2}>
              <Form.Group controlId='episodes_number'>
                <Form.Label>Episode Number</Form.Label>
                <Form.Control
                  size='sm'
                  type='number'
                  placeholder='Episode Number'
                  onChange={handleChange}
                  min={1}
                  value={values.episodes_number}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className='mb-3 g-2'>
            <Col>
              <Form.Group controlId='description'>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as='textarea'
                  rows={8}
                  placeholder='Anime description'
                  onChange={handleChange}
                  size='sm'
                  value={values.description}
                />
              </Form.Group>
            </Col>
          </Row>

          <input
            type='submit'
            value={`${params?.anime_id === 'add' ? 'Add anime' : 'Edit anime'}`}
            className='mb-3 btn btn-primary'
          />
        </Form>
      </Row>
    </Container>
  );
}

export default AddAnime;
