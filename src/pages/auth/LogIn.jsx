import axios from 'axios';
import { useState } from 'react';
import { Button, Col, Container, Form, Nav, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function LogIn() {
  const navigate = useNavigate();
  const [logInInfo, setLogInInfo] = useState({
    email: '',
    password: '',
  });

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const userInput = {
        email: logInInfo.email,
        password: logInInfo.password,
      };

      const { data, status } = await axios.post(
        'http://localhost:8000/api/auth/login',
        userInput
      );
      if (status === 201) {
        alert('로그인에 성공하셨습니다.');
        navigate('/');
      }
    } catch (error) {
      console.log('LogIn Error', error.message);
    }
  };

  return (
    <Container>
      <Form onSubmit={loginHandler}>
        <Form.Group as={Col}>
          <Row className='justify-content-center'>Sel-Q</Row>
        </Form.Group>
        <Form.Group controlId='formBasic'>
          <Row className='mb-2 justify-content-center'>
            <Form.Control
              style={{ height: '50px', width: '330px' }}
              value={logInInfo.email}
              placeholder='이메일'
              onChange={(e) =>
                setLogInInfo({
                  ...logInInfo,
                  email: e.target.value,
                })
              }
            />
            <Form.Control
              style={{ height: '50px', width: '330px' }}
              value={logInInfo.password}
              onChange={(e) =>
                setLogInInfo({
                  ...logInInfo,
                  password: e.target.value,
                })
              }
              type='password'
              placeholder='비밀번호'
            />
          </Row>
        </Form.Group>

        <div className='d-flex justify-content-center mt-4'>
          <Button
            style={{ height: '55px', width: '330px', padding: '15px 10px' }}
            variant='primary'
            type='submit'
          >
            로그인
          </Button>
        </div>
      </Form>

      <div className='d-flex justify-content-center mt-3'>
        <Nav as='ul'>
          <Nav.Item as='li'>
            <Nav.Link href='/password/new'>비밀번호 재설정</Nav.Link>
          </Nav.Item>
          <Nav.Item as='li'>
            <Nav.Link href='/signup'>회원가입</Nav.Link>
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
