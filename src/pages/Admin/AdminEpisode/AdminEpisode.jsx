import { useEffect } from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { deleteEpisode } from '../../../store/admin/adminSlice';
import { toast } from 'react-toastify';
import TbodyEpi from './TbodyEpi';
import { getEpisodes } from '../../../store/episode/episodeSlice';
import EpisodePaginate from '../../../components/EpisodePaginate';
import Heading from '../../../components/Heading';

function AdminEpisode() {
  const dispatch = useDispatch();
  const { pager, pageOfItems } = useSelector((state) => state.episode);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getEpisodes());
  }, [dispatch]);

  const handleEdit = (anime_id, name) => {
    navigate(`/admin/episode/${anime_id}/${name}`);
  };

  const handleDelete = (episode_id, name, episode_number) => {
    const confirm = window.confirm(
      'are yon sure to delete ' + name + ' episode number ' + episode_number
    );
    if (confirm === true) {
      dispatch(deleteEpisode(episode_id));
      dispatch(getEpisodes());

      toast.success('deleted sucessfully');
    } else {
      return;
    }
  };

  return (
    <Container fluid className='mt-3'>
      <Row className='g-2'>
        <Heading>episode table</Heading>
        {pageOfItems.length > 0 ? (
          <Col>
            <div>
              <Link
                to='/admin/episode/add'
                className='btn btn-primary d-block ms-auto mb-2 text-capitalize'
                style={{ width: 'fit-content' }}
              >
                add episdoe
              </Link>
            </div>
            <div className='custom-table mb-3 text-center'>
              <Table striped bordered hover variant='dark'>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Img</th>
                    <th>Episode Number</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <TbodyEpi
                  animes={pageOfItems}
                  handleDelete={handleDelete}
                  handleEdit={handleEdit}
                />
              </Table>
            </div>
            {pager.pages.length > 1 && <EpisodePaginate pager={pager} />}
          </Col>
        ) : (
          <Col>
            <div className='mt-5 text-capitalize d-flex align-items-center justify-content-center'>
              <h1 className='display-6 text-white text-center'>
                no episodes yet lets add some
              </h1>
              <Link
                to='/admin/episode/add'
                className='btn btn-primary d-block ms-2'
                style={{ width: 'fit-content' }}
              >
                add episode
              </Link>
            </div>
          </Col>
        )}
      </Row>
    </Container>
  );
}

export default AdminEpisode;
