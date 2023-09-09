import {
  Container,
  Form,
  Row,
  Col,
  Button,
  Spinner,
  Table,
} from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { AGREE_LIST, EMAIL_LIST } from '../../constant/constants';
import { useNavigate } from 'react-router-dom';
import {
  useSignUpHandler,
  useVerifyRegisteredEmail,
  useSendEmailVerification,
  useCheckEmailVerification,
} from '../../services/authHook/signUp';
import { Controller, useForm } from 'react-hook-form';

export default function SignUp() {
  const navigate = useNavigate();
  const [btnDisable, setBtnDisable] = useState(true);
  const [verificationBtnDisable, setVerificationBtnDisable] = useState(true);
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerifiedEmail, setIsVerifiedEmail] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeList, setAgreeList] = useState(AGREE_LIST);

  const { handleSubmit, register, watch, control } = useForm();

  const email = watch('email');
  const emailCategory = watch('emailCategory');

  const {
    mutateAsync: signUp,
    isLoading: loadingSignUp,
    error: errorSignUp,
  } = useSignUpHandler();

  const {
    mutateAsync: verifyEmail,
    isLoading: loadingVerifyEmail,
    error: errorVerifyEmail,
  } = useVerifyRegisteredEmail();

  const {
    mutateAsync: sendEmail,
    isLoading: loadingSendEmail,
    error: errorSendEmail,
  } = useSendEmailVerification();

  const {
    mutateAsync: checkEmail,
    isLoading: loadingCheckEmail,
    error: errorCheckEmail,
  } = useCheckEmailVerification();

  const signUpHandler = async (values, e) => {
    e.preventDefault();

    const allTrue = values.allTrue;
    const signUpInfo = {
      username: values.username,
      email: values.email + '@' + values.emailCategory,
      password: values.password,
      profileImg: '',
      provider: 'local',

      fourteenOverAgree: values.fourteenOverAgree
        ? true
        : values.fourteenOverAgree === undefined && allTrue,
      termsOfUseAgree: values.termsOfUseAgree
        ? true
        : values.termsOfUseAgree === undefined && allTrue,
      personalInfoAgree: values.personalInfoAgree
        ? true
        : values.personalInfoAgree === undefined && allTrue,
      marketingConsent: values.marketingConsent
        ? true
        : values.marketingConsent === undefined && allTrue,
      smsAndEventAgree: values.smsAndEventAgree
        ? true
        : values.smsAndEventAgree === undefined && allTrue,
    };

    await signUp(signUpInfo);
    navigate('/login');
  };

  const verifyRegisteredEmailHandler = async () => {
    const userEmail = email + '@' + emailCategory;
    const response = await verifyEmail(userEmail);

    if (response === true) {
      // 등록된 이메일
      alert('이미 가입된 이메일입니다.');
      return;
    } else {
      // 등록된 이메일이 아니면 이메일로 메일 전송
      await sendEmail(userEmail);
      setIsVerifiedEmail(true);
    }
  };

  // 이메일 인증 코드 확인 로직
  const checkEmailVerificationHandler = async () => {
    const userEmail = email + '@' + emailCategory;
    const response = await checkEmail({
      email: userEmail,
      code: verificationCode,
    });

    if (response === true) {
      setIsVerifiedEmail(false);
      setVerificationBtnDisable(false);
    } else {
      alert('다시 인증 코드를 입력해 주세요');
    }
  };

  const handleAgreeCheckList = (e, field) => {
    const { value, checked } = e.target;

    if (value === '전체동의') {
      let tempAgree = agreeList.map((agree) => ({
        ...agree,
        isChecked: checked,
      }));
      setAgreeList(tempAgree);
    } else {
      let tempAgree = agreeList.map((agree) =>
        agree.label === value ? { ...agree, isChecked: checked } : agree
      );
      setAgreeList(tempAgree);
    }
    field.onChange(checked);
  };

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
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: 0,
            }}
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
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '127px',
            height: '38px',
          }}
          onClick={verifyRegisteredEmailHandler}
          className='mb-3'
          variant='primary'
          disabled={btnDisable || !verificationBtnDisable}
        >
          {loadingVerifyEmail || loadingSendEmail ? (
            <div>
              <Spinner
                animation='border'
                size='sm'
                role='status'
                aria-hidden='true'
              />
              <span className='visually-hidden'>Loading...</span>
            </div>
          ) : verificationBtnDisable ? (
            '이메일 인증하기'
          ) : (
            '이메일 인증완료'
          )}
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
            {/* TODO: 타이머 기능 추가 */}
            <Button
              className='mt-3'
              variant='primary'
              onClick={checkEmailVerificationHandler}
            >
              {loadingCheckEmail ? (
                <>
                  <Spinner
                    animation='border'
                    size='sm'
                    role='status'
                    aria-hidden='true'
                  />
                  <span className='visually-hidden'>Loading...</span>
                </>
              ) : (
                '확인'
              )}
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
        {/* TODO: 위 비밀번호와 같은지 유효성 검사 로직 필요 */}
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
          <div
            style={{
              border: '1px solid #B3B3B5',
              padding: '18px',
              borderRadius: '5px',
            }}
          >
            <Controller
              render={({ field }) => (
                <Form.Check
                  type='checkbox'
                  label='전체동의 (선택항목에 대한 동의 포함)'
                  value='전체동의'
                  checked={
                    !agreeList?.some((agree) => agree?.isChecked !== true)
                  }
                  onChange={(e) => handleAgreeCheckList(e, field)}
                />
              )}
              name='allTrue'
              control={control}
            />
            <hr />
            {agreeList.map((agree, index) => (
              <Controller
                key={index}
                name={agree.value}
                render={({ field }) => (
                  <>
                    <Form.Check
                      type='checkbox'
                      onChange={(e) => handleAgreeCheckList(e, field)}
                      checked={field.value || agree.isChecked}
                      label={agree.label}
                      value={agree.label}
                    />
                  </>
                )}
                control={control}
              />
            ))}
          </div>
        </Form.Group>

        <Button
          onClick={verifyRegisteredEmailHandler}
          variant='primary'
          type='submit'
          className='w-100 mt-3'
        >
          {loadingSignUp ? (
            <>
              <Spinner
                animation='border'
                size='sm'
                role='status'
                aria-hidden='true'
              />
              <span className='visually-hidden'>Loading...</span>
            </>
          ) : (
            '회원가입'
          )}
        </Button>
      </Form>

      <p className='mt-3' style={{ textAlign: 'center' }}>
        이미 아이디가 있으신가요? <a href='/login'>로그인</a>
      </p>
    </Container>
  );
}
