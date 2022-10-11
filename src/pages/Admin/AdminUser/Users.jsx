import { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, getUsers } from '../../../store/admin/adminSlice';
import { AiFillEdit } from 'react-icons/ai';
import { RiDeleteBinLine } from 'react-icons/ri';
import { toast } from 'react-toastify';
import ModalComponent from '../../../components/ModalComponent';
import { Typeahead } from 'react-bootstrap-typeahead';
import Heading from '../../../components/Heading';
import { useNavigate } from 'react-router-dom';

function Users({ user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [userData, setUserData] = useState([{ type: 3, label: '' }]);
  const [value] = useState({});
  useEffect(() => {
    if (+user.user_type !== 1) {
      navigate('/admin/home', { resplace: true });
    }

    dispatch(getUsers());
  }, [dispatch, user, navigate]);

  const { users } = useSelector((state) => state.admin);

  const userOptions = [
    {
      type: 2,
      label: 'Inserting',
    },
    {
      type: 3,
      label: 'User',
    },
  ];

  const handleClose = () => setShow(false);
  const handleShow = (user_id) => {
    value.user_id = user_id;
    setShow(true);
  };
  const handleDelete = (id, name = 'user') => {
    const confirm = window.confirm(
      'Are you sure want to delete this user ? ' + name
    );
    if (confirm) {
      dispatch(deleteUser(id));
      toast.success('deleted sucessfully');
    }
  };

  return (
    <Container fluid className='mt-3'>
      <Row>
        <ModalComponent
          handleClose={handleClose}
          show={show}
          title='Change the user type'
          user={userData}
          getUsers={getUsers}
          body={
            <Form.Group>
              <Typeahead
                id='user'
                labelKey={(userOptions) => `${userOptions.label}`}
                onChange={setUserData}
                options={userOptions}
                placeholder='Choose a type...'
                selected={userData}
                size={'sm'}
                clearButton
              />
            </Form.Group>
          }
          value={value}
          submit='save changes'
        />
        <Col>
          <Heading>user table</Heading>
          <div className='custom-table mb-3 text-center'>
            <Table
              striped
              bordered
              hover
              variant='dark'
              className='text-center'
            >
              <thead>
                <tr className='text-capitalize'>
                  <th>id</th>
                  <th>name</th>
                  <th>email</th>
                  <th>type</th>
                  <th>date of registration</th>
                  <th>edit type</th>
                  <th>delete</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => {
                  return (
                    <tr key={user.user_id}>
                      <td>{user.user_id}</td>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td className='text-capitalize'>
                        {(() => {
                          if (user.user_type === '1') {
                            return <p className='bg-danger p-1 mb-0'>admin</p>;
                          } else if (user.user_type === '2') {
                            return (
                              <p className='bg-success p-1 mb-0'>inserting</p>
                            );
                          } else {
                            return (
                              <p className='bg-info p-1 text-dark mb-0'>user</p>
                            );
                          }
                        })()}
                      </td>
                      <td>{user.date_sign_up.slice(0, 10)}</td>
                      <td>
                        {user.user_type !== '1' ? (
                          <Button
                            variant='info'
                            size='sm'
                            onClick={() => handleShow(user.user_id)}
                          >
                            <AiFillEdit className='table-icon' />
                          </Button>
                        ) : null}
                      </td>
                      <td>
                        {user.user_type !== '1' ? (
                          <Button
                            variant='danger'
                            size='sm'
                            onClick={() =>
                              handleDelete(user.user_id, user.username)
                            }
                          >
                            <RiDeleteBinLine className='table-icon' />
                          </Button>
                        ) : null}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Users;
