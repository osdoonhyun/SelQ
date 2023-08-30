import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { EMAIL_LIST } from '../constant/constants';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    email: '',
    emailCategory: '',
    password: '',
    username: '',
  });
  const [btnDisable, setBtnDisable] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerifiedEmail, setIsVerifiedEmail] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');

  const verifyRegisteredEmail = () => {
    // 등록된 이메일인지 검증 로직

    // 등록된 이메일이면 가입된 이메일입니다 알려주기
    // 등록된 이메일이 아니면 이메일로 메일 전송
    setIsVerifiedEmail(true);
  };

  const checkVerificationCode = () => {
    // 이메일 인증 코드 확인 로직
    setIsVerifiedEmail(false);
  };

  const signUpHandler = async (e) => {
    e.preventDefault();
    try {
      const userInput = {
        username: userInfo.username,
        email: userInfo.email,
        password: userInfo.password,
        profileImg: '',
        provider: 'local',
      };

      const { data, status } = await axios.post(
        'http://localhost:8000/api/auth/signup',
        userInput
      );
      if (status === 201) {
        alert('회원가입에 성공하셨습니다.');
        navigate('/login');
      }
    } catch (error) {
      console.log('Sign Up Error', error.message);
    }
  };

  useEffect(() => {
    if (userInfo.email !== '' && userInfo.emailCategory !== '') {
      setBtnDisable(true);
    } else {
      setBtnDisable(false);
    }
    // setBtnDisable(userInfo.email !== '' && userInfo.emailCategory !== '');
  }, [userInfo.email, userInfo.emailCategory]);

  return (
    <Container>
      <Form onSubmit={signUpHandler}>
        <Form.Group as={Col}>
          <Form.Label>회원가입</Form.Label>
          <Row className='justify-content-center'>
            SNS 계정으로 간편하게 회원가입
          </Row>
          <Row className='justify-content-center'>구글</Row>
        </Form.Group>
        <hr />
        <Form.Group as={Row} className='mb-3' controlId='formBasicEmail'>
          <Form.Label className='text-muted'>이메일</Form.Label>
          <Col>
            {/* TODO: Feedback 추가하기 */}
            <Form.Control
              type='email'
              placeholder='이메일'
              value={userInfo.email}
              onChange={(e) =>
                setUserInfo({
                  ...userInfo,
                  email: e.target.value,
                })
              }
            />
          </Col>
          <Col
            xs='auto'
            style={{ display: 'inline-flex', alignItems: 'center', padding: 0 }}
          >
            <span>@</span>
          </Col>
          <Col>
            {/* TODO: 직접 입력 구현하기 */}
            <Form.Select
              value={userInfo.emailCategory}
              onChange={(e) =>
                setUserInfo({
                  ...userInfo,
                  emailCategory: e.target.value,
                })
              }
            >
              <option className='text-muted'>선택해주세요</option>
              {EMAIL_LIST.map((email, index) => (
                <option key={index}>{email}</option>
              ))}
            </Form.Select>
          </Col>
        </Form.Group>

        <Button
          onClick={verifyRegisteredEmail}
          className='mb-3'
          variant='primary'
          disabled={btnDisable ? false : true}
        >
          이메일 인증하기
        </Button>

        {isVerifiedEmail && (
          <Form.Group className='mb-3' controlId='formBasicPassword'>
            <Form.Text>이메일로 전송된 인증코드를 입력해주세요.</Form.Text>
            <Form.Control
              type='password'
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              placeholder='인증코드 6자리 입력'
            />
            <Button
              className='mt-3'
              variant='primary'
              onClick={checkVerificationCode}
              type='submit'
            >
              확인
            </Button>
          </Form.Group>
        )}

        <Form.Group className='mb-3' controlId='formBasicPassword'>
          <Form.Label>비밀번호</Form.Label>
          <br />

          <Form.Text className='text-muted'>
            대문자, 특수문자를 포함한 8자 이상의 비밀번호를 입력해주세요.
          </Form.Text>
          <Form.Control
            value={userInfo.password}
            onChange={(e) =>
              setUserInfo({
                ...userInfo,
                password: e.target.value,
              })
            }
            type='password'
            placeholder='비밀번호'
          />
        </Form.Group>
        {/* TODO: 위 비밀번호와 같은지 확인하는 로직 필요 */}
        <Form.Group className='mb-3' controlId='formBasicPassword'>
          <Form.Label>비밀번호 확인</Form.Label>
          <Form.Control
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type='password'
            placeholder='비밀번호 확인'
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicPassword'>
          <Form.Label>닉네임</Form.Label>
          <br />
          <Form.Text className='text-muted'>
            다른 유저와 겹치지 않도록 입력해주세요. (2~15자)
          </Form.Text>
          <Form.Control
            value={userInfo.username}
            onChange={(e) =>
              setUserInfo({
                ...userInfo,
                username: e.target.value,
              })
            }
            type='text'
            placeholder='별명 (2~15자)'
          />
        </Form.Group>

        <Button variant='primary' type='submit' className='w-100 mt-3'>
          회원가입
        </Button>
      </Form>

      <p className='mt-3' style={{ textAlign: 'center' }}>
        이미 아이디가 있으신가요? <a href='/login'>로그인</a>
      </p>
    </Container>
  );
}
