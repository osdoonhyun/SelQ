import { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

export default function EmailCodeVerification({ onNext }) {
  const [emailCode, setEmailCode] = useState('');
  const [checkBtnDisable, setCheckBtnDisable] = useState(true);
  const [sendBtnDisable, setSendBtnDisable] = useState(true);

  const handleCheckButton = () => {
    // 이메일 인증 코드 검증 API
    setSendBtnDisable(false);
    setCheckBtnDisable(true);
  };

  const handleEmailCodeVerification = async () => {
    try {
      handleCheckButton();
      onNext();
    } catch (error) {
      console.log('Email Code Verification Error', error.message);
    }
  };

  useEffect(() => {
    if (emailCode !== '') {
      setCheckBtnDisable(false);
    } else {
      setCheckBtnDisable(true);
    }
  }, [emailCode]);

  return (
    <Container>
      <Form onSubmit={handleEmailCodeVerification}>
        <Form.Group as={Col} className='mt-3'>
          <Form.Label>이메일로 전송된 인증코드를 입력해주세요.</Form.Label>
          <Row>
            <div className='d-flex'>
              <Col>
                <Form.Control
                  type='text'
                  value={emailCode}
                  placeholder='인증코드 6자리 입력'
                  onChange={(e) => setEmailCode(e.target.value)}
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
                  variant='primary'
                  onClick={handleCheckButton}
                  disabled={checkBtnDisable}
                >
                  {sendBtnDisable ? '확인' : '확인완료'}
                </Button>
              </Col>
            </div>
            {/* 시간 카운트 */}
            {/* 재전송 버튼 */}
          </Row>
        </Form.Group>
        <div className='d-flex justify-content-center'>
          <Button
            className='mt-3 w-100'
            type='submit'
            disabled={sendBtnDisable}
          >
            비밀번호 재설정하기
          </Button>
        </div>
      </Form>
    </Container>
  );
}
