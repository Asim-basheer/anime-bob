import { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Heading from '../../../components/Heading';
import { getUsers } from '../../../store/admin/adminSlice';
import HomeCard from './HomeCard';
function AdminHome({ animeCount }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const { users } = useSelector((state) => state.admin);
  const { pager } = useSelector((state) => state.episode);

  return (
    <Container fluid className='mt-3'>
      <Heading>quick view</Heading>
      <Row className='g-2' xs={1} sm={2} md={3} lg={4}>
        <Col>
          <HomeCard name={'anime'} count={animeCount} />
        </Col>
        <Col>
          <HomeCard name={'episodes'} count={pager.totalItems} />
        </Col>
        <Col>
          <HomeCard
            name={'inserting users'}
            count={users.filter((user) => user.user_type === '2').length}
          />
        </Col>
        <Col>
          <HomeCard
            name={'users'}
            count={users.filter((user) => user.user_type === '3').length}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default AdminHome;
