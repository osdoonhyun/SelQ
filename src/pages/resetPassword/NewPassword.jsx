import { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

export default function NewPassword() {
  const [newPassword, setNewPassword] = useState({
    password: '',
    confirmPassword: '',
  });

  const newPasswordHandler = async () => {};

  return (
    <Container>
      <Form onSubmit={newPasswordHandler}>
        <Form.Group as={Col}>
          <Row className='justify-content-center'>Sel-Q</Row>
        </Form.Group>
        <Form.Group controlId='formBasic'>
          <Row className='mb-2 justify-content-center'>
            <Form.Control
              style={{ height: '50px', width: '330px' }}
              value={newPassword.password}
              placeholder='새 비밀번호'
              onChange={(e) =>
                setNewPassword({
                  ...newPassword,
                  password: e.target.value,
                })
              }
            />
            <Form.Control
              className='mt-3'
              style={{ height: '50px', width: '330px' }}
              value={newPassword.confirmPassword}
              onChange={(e) =>
                setNewPassword({
                  ...newPassword,
                  confirmPassword: e.target.value,
                })
              }
              type='password'
              placeholder='새 비밀번호 확인'
            />
          </Row>
        </Form.Group>

        <div className='d-flex justify-content-center mt-4'>
          <Button
            style={{ height: '55px', width: '330px', padding: '15px 10px' }}
            variant='primary'
            type='submit'
          >
            비밀번호 변경하기
          </Button>
        </div>
      </Form>
    </Container>
  );
}
