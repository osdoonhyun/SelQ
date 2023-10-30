import { useState } from 'react';
import { Button, Col, Container, Form, Nav, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { logIn } from '../store/Slices/auth';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ErrorMessage } from '../styles/Styles';
import ErrorToast from '../components/common/ErrorToast';
import SocialLogInButton from '../components/common/SocialLogInButton';
import { MAIN, GREYS } from '../styles/variables';
import { MESSAGE } from '../constant/message';

const loginSchema = yup.object({
  email: yup
    .string()
    .email(MESSAGE.LOGIN.VALIDATION_EMAIL)
    .required(MESSAGE.LOGIN.VALIDATION_EMAIL_REQUIRED),
  password: yup
    .string()
    .required(MESSAGE.LOGIN.VALIDATION_PASSWORD_REQUIRED)
    .min(8, MESSAGE.LOGIN.VALIDATION_PASSWORD_MIN)
    .matches(
      /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/,
      MESSAGE.LOGIN.VALIDATION_PASSWORD_MATCHES
    ),
});

export default function LogIn() {
  const navigate = useNavigate();
  const [errorShow, setErrorShow] = useState(false);

  const dispatch = useDispatch();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const loginHandler = async (values) => {
    const logInInfo = {
      email: values.email,
      password: values.password,
    };

    const result = await dispatch(logIn(logInInfo));

    if (result?.error) {
      setErrorShow(true);
    } else {
      navigate('/');
    }
  };

  return (
    <>
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
                color: MAIN.MEDIUM,
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
              <ErrorMessage>{errors.email?.message}</ErrorMessage>
              <Form.Control
                style={{ height: '50px', width: '330px' }}
                {...register('password', { required: true })}
                type='text'
                placeholder='비밀번호'
              />
              <ErrorMessage>{errors.password?.message}</ErrorMessage>
            </Row>
          </Form.Group>

          {/* {isLoading && <h1>...loading</h1>} */}
          <div className='d-flex justify-content-center mt-4'>
            <Button
              style={{
                height: '55px',
                width: '330px',
                padding: '15px 10px',
                backgroundColor: MAIN.DARK,
                border: `1px solid ${MAIN.DARK}`,
                color: GREYS.LIGHTER,
              }}
              variant='Light'
              type='submit'
            >
              로그인
            </Button>
          </div>
        </Form>

        <div className='d-flex justify-content-center mt-3'>
          <Nav as='ul'>
            <Nav.Item as='li'>
              <Nav.Link style={{ color: MAIN.MEDIUM }} href='/password/new'>
                비밀번호 재설정
              </Nav.Link>
            </Nav.Item>
            <Nav.Item as='li'>
              <Nav.Link style={{ color: MAIN.MEDIUM }} href='/signup'>
                회원가입
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </div>

        <hr />

        <Row
          style={{ fontSize: '0.9rem' }}
          className='justify-content-center mt-4 mb-3 text-muted'
        >
          SNS 계정으로 간편하게 로그인하기
        </Row>

        <Row className='justify-content-center mt-2 mx-1'>
          <SocialLogInButton />
        </Row>
      </Container>

      <ErrorToast
        errorShow={errorShow}
        setErrorShow={() => setErrorShow(false)}
      />
    </>
  );
}
