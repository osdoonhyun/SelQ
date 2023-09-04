import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { AGREE_LIST, EMAIL_LIST } from '../../constant/constants';
import { useNavigate } from 'react-router-dom';
import {
  useSignUpHandler,
  verifyRegisteredEmail,
} from '../../services/authHook/signUp';
import { useForm } from 'react-hook-form';

export default function SignUp() {
  const navigate = useNavigate();
  const [btnDisable, setBtnDisable] = useState(true);
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerifiedEmail, setIsVerifiedEmail] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeList, setAgreeList] = useState([]);

  const { handleSubmit, register, watch } = useForm();

  const email = watch('email');
  const emailCategory = watch('emailCategory');

  const { isLoading, error, mutateAsync, data } = useSignUpHandler();

  const signUpHandler = async (values) => {
    const signUpInfo = {
      username: values.username,
      email: values.email + '@' + values.emailCategory,
      password: values.password,
      profileImg: '',
      provider: 'local',
    };
    console.log('USERINPUT', signUpInfo);
    await mutateAsync(signUpInfo);
    navigate('/login');
  };

  const verifyRegisteredEmailHandler = () => {
    // 등록된 이메일인지 검증 로직

    // 등록된 이메일이면 가입된 이메일입니다 알려주기
    // 등록된 이메일이 아니면 이메일로 메일 전송
    setIsVerifiedEmail(true);
  };

  const checkVerificationCode = () => {
    // 이메일 인증 코드 확인 로직
    setIsVerifiedEmail(false);
  };

  const handleAgreeCheckList = (e) => {
    const { name, checked } = e.target;

    if (name === '전체동의') {
      let tempAgree = agreeList.map((agree) => {
        return { ...agree, isChecked: checked };
      });
      setAgreeList(tempAgree);
    } else {
      let tempAgree = agreeList.map((agree) =>
        agree.label === name ? { ...agree, isChecked: checked } : agree
      );
      setAgreeList(tempAgree);
    }
  };

  useEffect(() => {
    setAgreeList(AGREE_LIST);
  }, []);

  useEffect(() => {
    if (email !== '' && emailCategory !== '선택해주세요') {
      setBtnDisable(false);
    } else {
      setBtnDisable(true);
    }
    // setBtnDisable(userInfo.email !== '' && userInfo.emailCategory !== '');
  }, [email, emailCategory]);

  return (
    <Container>
      {error && <h1>{error}</h1>}
      <Form onSubmit={handleSubmit(signUpHandler)}>
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
              type='text'
              placeholder='이메일'
              {...register('email', { required: true })}
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
            <Form.Select {...register('emailCategory', { required: true })}>
              <option className='text-muted'>선택해주세요</option>
              {EMAIL_LIST.map((email, index) => (
                <option key={index}>{email}</option>
              ))}
            </Form.Select>
          </Col>
        </Form.Group>

        <Button
          onClick={verifyRegisteredEmailHandler}
          className='mb-3'
          variant='primary'
          disabled={btnDisable}
        >
          이메일 인증하기
        </Button>

        {isVerifiedEmail && (
          <Form.Group className='mb-3'>
            <Form.Text>이메일로 전송된 인증코드를 입력해주세요.</Form.Text>
            <Form.Control
              type='text'
              placeholder='인증코드 6자리 입력'
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
            />
            <Button
              className='mt-3'
              variant='primary'
              onClick={checkVerificationCode}
              // type='submit'
            >
              확인
            </Button>
          </Form.Group>
        )}

        <Form.Group className='mb-3'>
          <Form.Label>비밀번호</Form.Label>
          <br />

          <Form.Text>
            대문자, 특수문자를 포함한 8자 이상의 비밀번호를 입력해주세요.
          </Form.Text>
          <Form.Control
            type='text'
            placeholder='비밀번호'
            {...register('password', { required: true })}
          />
        </Form.Group>
        {/* TODO: 위 비밀번호와 같은지 확인하는 로직 필요 */}
        <Form.Group className='mb-3' controlId='formBasicPassword'>
          <Form.Label>비밀번호 확인</Form.Label>
          <Form.Control
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type='text'
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
            {...register('username', { required: true })}
            type='text'
            placeholder='별명 (2~15자)'
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicCheckbox'>
          <Form.Label>약관 동의</Form.Label>
          <Form.Check
            type='checkbox'
            label='전체동의'
            name='전체동의'
            checked={!agreeList?.some((agree) => agree?.isChecked !== true)}
            onChange={handleAgreeCheckList}
          />
          <hr />
          {agreeList.map((agree, index) => (
            <Form.Check
              key={index}
              type='checkbox'
              label={agree.label}
              name={agree.label}
              checked={agree?.isChecked || false}
              onChange={handleAgreeCheckList}
            />
          ))}
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
