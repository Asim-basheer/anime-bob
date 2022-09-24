import { Link } from 'react-router-dom';

function PageNotFound({ title, back = true }) {
  return (
    <div className='page-not-found text-capitalize'>
      <span className='d-block text-center display-1 text-danger'>404</span>
      <span className='d-block mb-4 text-center display-5 text-info'>
        {title}
      </span>

      {back && (
        <Link to='/' className='btn btn-primary m-auto d-block'>
          back to home
        </Link>
      )}
    </div>
  );
}

export default PageNotFound;
