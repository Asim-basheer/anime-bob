import axios from 'axios';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addEpisode, editEpisode } from '../../store/admin/adminSlice';
import { getAnimes } from '../../store/anime/animeSlice';

function AddEpisode() {
  const [animeName, setAnimeName] = useState([]);
  const [values, setValues] = useState({
    episode_number: 1,
    mega: '',
    okru: '',
  });
  const { animes } = useSelector((state) => state.anime);
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fetchEdit = useCallback(async () => {
    const episode_id = params.episode_id;
    if (episode_id !== 'add') {
      const { data } = await axios.get(
        'https://bob-anime.herokuapp.com/episode/' + episode_id
      );
      setValues({
        episode_number: data.episode_number,
        mega: data.servers[0]?.value,
        okru: data.servers[1]?.value,
      });

      setAnimeName([
        {
          anime_id: data.anime_id,
          anime_name: params.anime_name,
        },
      ]);
    }
  }, [params]);

  useEffect(() => {
    fetchEdit();
  }, [fetchEdit]);

  const fetchAnime = useCallback(() => {
    dispatch(getAnimes());
  }, [dispatch]);

  useEffect(() => {
    fetchAnime();
  }, [fetchAnime]);

  let animeNames = [];
  for (let anime of animes) {
    animeNames.push({ anime_id: anime.anime_id, anime_name: anime.name });
  }

  const handleChange = (e) => {
    setValues((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      animeName === [] ||
      values.episode_number === '' ||
      values.mega === '' ||
      values.okru === ''
    ) {
      toast.error('all fields are required');
    } else {
      if (params.episode_id !== 'add') {
        values.episode_id = +params.episode_id;
        values.anime_id = animeName[0]?.anime_id;
        const servers = [
          { name: 'mega', value: values.mega },
          { name: 'okru', value: values.okru },
        ];
        delete values.mega;
        delete values.okru;
        values.servers = JSON.stringify(servers);
        dispatch(editEpisode(values));
        toast.success('edited successfully');
        navigate('/admin/show-e', { replace: true });
      } else {
        const returnSrcValue = (string) => {
          const src = string
            .slice(string.indexOf('src'))
            .split('src=')[1]
            .split(/[ >]/)[0];
          return src.slice(1, src.lastIndexOf(`"`));
        };
        const servers = [
          { name: 'mega', value: returnSrcValue(values.mega) },
          { name: 'okru', value: returnSrcValue(values.okru) },
        ];
        delete values.mega;
        delete values.okru;
        values.anime_id = animeName[0]?.anime_id;
        values.servers = JSON.stringify(servers);

        dispatch(addEpisode(values));
        toast.success('added successfully');
      }

      setValues({ episode_number: 1, mega: '', okru: '' });
      setAnimeName([]);
    }
  };
  return (
    <Container fluid='xxl'>
      <Row className='g-2 mt-4'>
        <Form onSubmit={handleSubmit} className='text-white bg-dark p-3'>
          <Row className='mb-3'>
            <Col lg={12} xl={10} className='mb-forms-lg '>
              <Form.Group>
                <Form.Label>Anime name</Form.Label>
                <Typeahead
                  id='anime_name'
                  labelKey={(animeNames) => `${animeNames.anime_name}`}
                  onChange={setAnimeName}
                  options={animeNames}
                  placeholder='Choose an anime name...'
                  selected={animeName}
                  size={'sm'}
                  clearButton
                />
              </Form.Group>
            </Col>
            <Col xs={8} sm={6} md={4} xl={2}>
              <Form.Group controlId='episode_number'>
                <Form.Label>Episode number</Form.Label>
                <Form.Control
                  size='sm'
                  type='number'
                  placeholder='Episode number'
                  onChange={handleChange}
                  min={1}
                  value={values.episode_number}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className='mb-3'>
            <Col lg={6} className='mb-forms-md'>
              <Form.Group controlId='okru'>
                <Form.Label>Okru server</Form.Label>
                <Form.Control
                  size='sm'
                  type='text'
                  placeholder='Okru url'
                  onChange={handleChange}
                  value={values.okru}
                />
              </Form.Group>
            </Col>
            <Col lg={6}>
              <Form.Group controlId='mega'>
                <Form.Label>Mega server</Form.Label>
                <Form.Control
                  size='sm'
                  type='text'
                  placeholder='Mega url'
                  onChange={handleChange}
                  value={values.mega}
                />
              </Form.Group>
            </Col>
          </Row>

          <input
            type='submit'
            value={params.episode_id !== 'add' ? 'edit episode' : 'add episdoe'}
            className=' btn btn-primary text-capitalize'
          />
        </Form>
      </Row>
    </Container>
  );
}

export default AddEpisode;
