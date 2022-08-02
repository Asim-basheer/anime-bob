import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { editUser } from '../store/admin/adminSlice';

function ModalComponent({
  handleClose,
  show,
  title,
  body,
  submit,
  value,
  user,
  getUsers,
}) {
  const dispatch = useDispatch();
  const handleSubmit = () => {
    const body = { user_id: value.user_id, type: user[0]?.type };
    // console.log(values);

    dispatch(editUser(body));
    dispatch(getUsers());
    handleClose();
    toast.success('edit sucessful');
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{body}</Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='primary' onClick={handleSubmit}>
            {submit}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalComponent;
