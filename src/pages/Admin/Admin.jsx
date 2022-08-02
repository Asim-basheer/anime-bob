import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SideBar from './SideBar';

function Admin({ user }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || +user.user_type === 3) {
      navigate('/', { replace: true });
    }
  }, [user, navigate]);

  return (
    <div className='admin-page d-flex align-items-start'>
      <SideBar user={user} />
    </div>
  );
}

export default Admin;
