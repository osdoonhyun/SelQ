import { useEffect } from 'react';
import {
  Button,
  Col,
  Container,
  Form,
  Nav,
  Row,
  Spinner,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { logIn } from '../../slices/auth';

export default function LogIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { handleSubmit, register } = useForm();

  const loginHandler = async (values) => {
    const logInInfo = {
      email: values.email,
      password: values.password,
    };

    dispatch(logIn(logInInfo));
    navigate('/');
  };

  return (
    <Container
      style={{
        maxWidth: '330px',
        padding: '140px 0',
      }}
    >
      <Form onSubmit={handleSubmit(loginHandler)}>
        <Form.Group as={Col}>
          <Row
            style={{
              fontSize: '2rem',
              fontWeight: 500,
              color: '#5bacee',
            }}
            className='justify-content-center mb-4'
          >
            Sel-Q
          </Row>
        </Form.Group>
        <Form.Group controlId='formBasic'>
          <Row className='mb-2 justify-content-center'>
            <Form.Control
              style={{ height: '50px', width: '330px' }}
              {...register('email', { required: true })}
              placeholder='이메일'
            />
            <Form.Control
              style={{ height: '50px', width: '330px' }}
              {...register('password', { required: true })}
              type='text'
              placeholder='비밀번호'
            />
          </Row>
        </Form.Group>

        {/* {isLoading && <h1>...loading</h1>} */}
        <div className='d-flex justify-content-center mt-4'>
          <Button
            style={{
              height: '55px',
              width: '330px',
              padding: '15px 10px',
              backgroundColor: '#2f93ea',
              border: '1px solid #2f93ea',
              color: '#fff',
            }}
            variant='Light'
            type='submit'
          >
            {/* {isLoading ? (
              <div>
                <Spinner
                  animation='border'
                  size='sm'
                  role='status'
                  aria-hidden='true'
                />
                <span className='visually-hidden'>Loading...</span>
              </div>
            ) : (
              '로그인'
            )} */}
            로그인
          </Button>
        </div>
      </Form>

      <div className='d-flex justify-content-center mt-3'>
        <Nav as='ul'>
          <Nav.Item as='li'>
            <Nav.Link style={{ color: '#5bacee' }} href='/password/new'>
              비밀번호 재설정
            </Nav.Link>
          </Nav.Item>
          <Nav.Item as='li'>
            <Nav.Link style={{ color: '#5bacee' }} href='/signup'>
              회원가입
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </div>

      <hr />

      <Row className='justify-content-center'>
        SNS 계정으로 간편하게 로그인하기
      </Row>
      <Row className='justify-content-center'>구글</Row>
    </Container>
  );
}
