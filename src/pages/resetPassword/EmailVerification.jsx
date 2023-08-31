import { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

export default function EmailVerification({ onNext }) {
  const [email, setEmail] = useState('');
  const [checkBtnDisable, setCheckBtnDisable] = useState(true);
  const [sendBtnDisable, setSendBtnDisable] = useState(true);

  const handleCheckButton = () => {
    // 가입된 이메일인지 검증 API
    setSendBtnDisable(false);
    setCheckBtnDisable(true);
  };

  const handleEmailVerification = async () => {
    try {
      // 이메일 인증 코드 전송 API
      onNext();
    } catch (error) {
      console.log('Email Verification Error', error.message);
    }
  };

  useEffect(() => {
    if (email !== '') {
      setCheckBtnDisable(false);
    } else {
      setCheckBtnDisable(true);
    }
  }, [email]);

  return (
    <Container>
      <Form onSubmit={handleEmailVerification}>
        <Form.Label>가입한 이메일 주소를 입력해주세요.</Form.Label>
        <Form.Group as={Col} controlId='formGridCity'>
          <Form.Text className='text-muted'>
            이메일 형식에 맞게 작성해주세요.
          </Form.Text>
          <Row>
            <div className='d-flex'>
              <Col>
                <Form.Control
                  type='email'
                  value={email}
                  placeholder='이메일'
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={!sendBtnDisable}
                />
              </Col>
              <Col
                xs='auto'
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  marginLeft: '10px',
                }}
              >
                <Button
                  onClick={handleCheckButton}
                  variant='primary'
                  disabled={checkBtnDisable}
                >
                  {sendBtnDisable ? '확인' : '확인완료'}
                </Button>
              </Col>
            </div>
          </Row>
        </Form.Group>
        <div className='d-flex justify-content-center'>
          <Button
            className='mt-3 w-100'
            type='submit'
            disabled={sendBtnDisable}
          >
            이메일로 인증코드 보내기
          </Button>
        </div>
      </Form>
    </Container>
  );
}
