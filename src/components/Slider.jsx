import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Slider({ lastAnimes }) {
  return (
    <Carousel indicators={true} interval={5000}>
      {lastAnimes.map(({ anime_id, name, cover }) => {
        return (
          <Carousel.Item key={anime_id}>
            <img
              className=' img-slider rounded'
              src={cover}
              alt='First slide'
            />
            <Carousel.Caption>
              <div className='d-flex justify-content-between align-items-center mb-5 py-2 px-3 carousel-container text-capitalize '>
                <h5 className='text-white mb-0'>
                  {name.length > 45 ? name.slice(0, 45) + '...' : name}
                </h5>
                <Link
                  className='btn btn-primary btn-sm '
                  to={`/details/${anime_id}/${name}`}
                >
                  watch now
                </Link>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
}

export default Slider;
