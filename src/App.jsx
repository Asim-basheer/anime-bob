import { useEffect, lazy, Suspense } from 'react';
import { getFavorites } from './store/anime/favoriteSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

// import components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './components/Login';
import Register from './components/Register';
import Home from './pages/Home';
import Result from './pages/Result';
import PageNotFound from './pages/PageNotFound';
import AdminEpisode from './pages/Admin/AdminEpisode/AdminEpisode';
import AdminHome from './pages/Admin/AdminHome/AdminHome';
import AdminAnime from './pages/Admin/AdminAnime/AdminAnime';
import AddAnime from './pages/Admin/AddAnime';
import AddEpisode from './pages/Admin/AddEpisode';
import AnimePage from './pages/AnimePage/AnimePage';
import Users from './pages/Admin/AdminUser/Users';
import Spinner from './components/Spinner';
import { getPaginateAnime } from './store/anime/paginateSlice';
import { Container } from 'react-bootstrap';
import genre from './components/genre';
const AllAnime = lazy(() => import('./pages/AllAnime'));
const Updated = lazy(() => import('./pages/Updated'));
const Admin = lazy(() => import('./pages/Admin/Admin'));
const Search = lazy(() => import('./pages/Search'));
const Favorite = lazy(() => import('./pages/Favorite'));

const titles = {
  '/all': 'All Anime-Anime Bob',
  '/updated': 'Updated-Anime Bob',
  '/search': 'Search-Anime Bob',
  '/favorite': 'Favorite-Anime Bob',
  '/admin': 'Admin-Anime Bob',
  '/login': 'Login Page Anime Bob',
  '/register': 'Register Page Anime Bob',
};

function App() {
  const user = JSON.parse(localStorage.getItem('user'));
  const location = useLocation();
  const { pathname } = location;
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = titles[pathname] ?? 'Anime Bob';
  }, [pathname]);

  useEffect(() => {
    dispatch(getFavorites());
    dispatch(getPaginateAnime());
  }, [dispatch]);
  const { pager, isError } = useSelector((state) => state.paginate);

  if (isError) {
    return <PageNotFound title={'Whops something went wrong'} back={false} />;
  }

  return (
    <>
      <div className={`${pathname.startsWith('/admin') ? 'd-none' : ''}`}>
        <Navbar user={user} />
        <div className='mb-5'>&nbsp;</div>
        <div className='mb-3'>&nbsp;</div>
      </div>
      <main className='main'>
        <Container fluid='xxl'>
          <Routes>
            <Route index element={<Home />}></Route>
            <Route path='register' element={<Register />}></Route>
            <Route path='login' element={<Login />}></Route>
            <Route
              path='admin'
              element={
                <Suspense fallback={<Spinner />}>
                  <Admin user={user} />
                </Suspense>
              }
            >
              <Route
                path='home'
                element={<AdminHome animeCount={pager.totalItems} />}
              />
              <Route path='show-a' element={<AdminAnime />} />
              <Route
                path='anime/:anime_id'
                element={<AddAnime genre={genre} />}
              />
              <Route path='show-e' element={<AdminEpisode />} />
              <Route path='episode/:episode_id' element={<AddEpisode />} />
              <Route
                path='episode/:episode_id/:anime_name'
                element={<AddEpisode />}
              />
              <Route path='show-users' element={<Users user={user} />} />
            </Route>
            <Route
              path='all'
              element={
                <Suspense>
                  <AllAnime fallback={<Spinner />} />
                </Suspense>
              }
            ></Route>
            <Route
              path='updated'
              element={
                <Suspense fallback={<Spinner />}>
                  <Updated />
                </Suspense>
              }
            ></Route>
            <Route
              path='search'
              element={
                <Suspense fallback={<Spinner />}>
                  <Search />
                </Suspense>
              }
            ></Route>
            <Route
              path='favorite'
              element={
                <Suspense fallback={<Spinner />}>
                  <Favorite user={user} />
                </Suspense>
              }
            ></Route>
            <Route path='details/:id/:name' element={<AnimePage />} />
            <Route path='details/:id/:name/:episode' element={<AnimePage />} />
            <Route path='result/:name/:value' element={<Result />} />

            {/* display page not found  */}
            <Route
              path='*'
              element={<PageNotFound title={'Page not found'} />}
            />
          </Routes>
        </Container>

        {/* call toast container to display the toast Library */}
        <ToastContainer
          position='bottom-left'
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          draggable
          theme='dark'
          toastClassName='dark-toast'
        />
      </main>
      <div className={`${pathname.startsWith('/admin') ? 'd-none' : ''}`}>
        <Footer />
      </div>
    </>
  );
}

export default App;
