import { useEffect } from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import PaginationComponent from '../../../components/PaginationComponent';
import { getPaginateAnime } from '../../../store/anime/paginateSlice';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { deleteAnime } from '../../../store/admin/adminSlice';
import { toast } from 'react-toastify';
import Tbody from './Tbody';
import Heading from '../../../components/Heading';

function AdminAnime() {
  const dispatch = useDispatch();
  const { pager, pageOfItems } = useSelector((state) => state.paginate);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getPaginateAnime());
  }, [dispatch]);

  const handleEdit = (anime_id) => {
    navigate(`/admin/anime/${anime_id}`);
  };

  const handleDelete = (anime_id, name) => {
    const confirm = window.confirm('are yon sure to delete ' + name);
    if (confirm === true) {
      dispatch(deleteAnime(anime_id));
      dispatch(getPaginateAnime());
      toast.success('deleted sucessful');
    } else {
      return;
    }
  };

  return (
    <Container fluid className='mt-3'>
      <Heading>Anime Table</Heading>
      <Row>
        {pageOfItems.length > 0 ? (
          <Col>
            <div>
              <Link
                to='/admin/anime/add'
                className='btn btn-primary d-block ms-auto mb-2 text-capitalize'
                style={{ width: 'fit-content' }}
              >
                add anime
              </Link>
            </div>
            <div className='custom-table mb-3 text-center'>
              <Table striped bordered hover variant='dark'>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Img</th>
                    <th>Status</th>
                    <th>Season</th>
                    <th>Premiered</th>
                    <th>Scores</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <Tbody
                  animes={pageOfItems}
                  handleDelete={handleDelete}
                  handleEdit={handleEdit}
                />
              </Table>
            </div>
            {pager.pages.length > 1 && <PaginationComponent pager={pager} />}
          </Col>
        ) : (
          <div className='mt-5 text-capitalize d-flex align-items-center justify-content-center'>
            <h1 className='display-6 text-white text-center'>
              no animes yet lets add some
            </h1>
            <Link
              to='/admin/anime/add'
              className='btn btn-primary d-block ms-2'
              style={{ width: 'fit-content' }}
            >
              add anime
            </Link>
          </div>
        )}
      </Row>
    </Container>
  );
}

export default AdminAnime;
