import Spinner from 'react-bootstrap/Spinner';

function SpinnerComponent() {
  return (
    <div className='spinner'>
      <div>
        <Spinner animation='border' variant='primary' />
      </div>
    </div>
  );
}

export default SpinnerComponent;
