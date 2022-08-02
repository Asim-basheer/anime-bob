import { Formik } from 'formik';
import { Col, Row, Form, Button } from 'react-bootstrap';
import Spinner from './Spinner';
import * as yup from 'yup';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, reset } from '../store/auth/authSlice';

import signIn from '../images/login-img.webp';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const [showPassword, setShowPassword] = useState(false);
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate('/', { replace: true });
      window.location.reload();
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = yup.object({
    email: yup.string().email('email format invalid').required(),
    password: yup.string().required(),
  });

  const onSubmit = (values, { resetForm }) => {
    dispatch(login(values));
  };

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <Row>
      <Col className='d-flex align-items-center'>
        <div className='sign-form__img  w-50 rounded-start d-none d-md-block '>
          <img src={signIn} alt='login' className='d-block m-auto login' />
        </div>
        <div className='width-form-container bg-dark h-100 d-flex align-items-center justify-content-center  rounded-end flex-column px-4 px-md-4 px-lg-5 py-4 py-md-3 py-md-auto'>
          <h2 className='display-5 mb-4 text-white'>Login Page</h2>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({
              handleSubmit,
              handleChange,
              handleBlur,
              values,
              touched,
              isValid,
              errors,
            }) => {
              return (
                <Form noValidate onSubmit={handleSubmit} className='text-white'>
                  <Row className='gx-0'>
                    <Form.Group
                      className='mb-2'
                      as={Col}
                      sm='12'
                      controlId='validationFormik01'
                    >
                      <Form.Control
                        type='email'
                        name='email'
                        placeholder='Email '
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={touched.email && !errors.email}
                        isInvalid={!!errors.email && touched.email}
                      />
                      {errors.email && touched.email ? (
                        <Form.Control.Feedback type='invalid' className='mb-1'>
                          {errors.email}
                        </Form.Control.Feedback>
                      ) : (
                        <Form.Control.Feedback className='mb-1'>
                          Looks good!
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>

                    <Form.Group
                      as={Col}
                      sm='12'
                      controlId='validationFormik02'
                      className='mb-2'
                    >
                      <Form.Control
                        type={showPassword ? 'text' : 'password'}
                        name='password'
                        placeholder='Password '
                        value={values.password}
                        onChange={handleChange}
                        isValid={touched.password && !errors.password}
                        isInvalid={!!errors.password && touched.password}
                        onBlur={handleBlur}
                      />
                      {errors.password && touched.password ? (
                        <Form.Control.Feedback type='invalid' className='mb-1'>
                          {errors.password}
                        </Form.Control.Feedback>
                      ) : (
                        <Form.Control.Feedback className='mb-1'>
                          Looks good!
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>
                    <Form.Check
                      type='checkbox'
                      id='showpassword'
                      label='Show Password'
                      className='mb-2'
                      onChange={(e) =>
                        e.currentTarget.checked
                          ? setShowPassword(true)
                          : setShowPassword(false)
                      }
                    />
                    <Button
                      type='submit'
                      className='fw-bolder'
                      disabled={!isValid}
                    >
                      Login
                    </Button>
                  </Row>
                </Form>
              );
            }}
          </Formik>
          <div className='text-white mt-4'>
            Don't have an account?
            <Link
              to='/register'
              className='ms-1 text-primary member-event text-capitalize'
            >
              Register
            </Link>
          </div>
        </div>
      </Col>
    </Row>
  );
}

export default Login;
