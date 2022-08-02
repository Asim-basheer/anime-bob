function HomeCard({ name, count }) {
  return (
    <div
      className='bg-dark text-white rounded text-capitalize d-flex justify-content-center align-items-center'
      style={{ height: '150px' }}
    >
      {name} count : <span className='text-primary ms-1'>{count}</span>
    </div>
  );
}

export default HomeCard;
