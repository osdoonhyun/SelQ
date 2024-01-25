import { useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCheckRegisteredEmail } from '../../hooks/common/useCheckRegisteredEmail';
import { useSendVerificationCode } from '../../hooks/common/useSendVerificationCode';
import { NextButton } from '../../styles/ButtonStyles';
import { ErrorMessage } from '../../styles/Styles';
import LoadingSpinner from '../../components/LoadingSpinner';

export default function EmailVerification({ onNext }) {
  const [checkBtnDisable, setCheckBtnDisable] = useState(true);
  const [sendBtnDisable, setSendBtnDisable] = useState(true);

  const resetPasswordSchema = yup.object().shape({
    email: yup
      .string()
      .email('유효한 이메일을 입력해 주세요.')
      .required('이메일을 입력해 주세요.')
      .test('check email', '가입 되지 않은 이메일입니다.', async (email) => {
        const response = await verifyEmail(email);
        // 가입된 경우 다음 step 진행
        if (response) {
          setSendBtnDisable(false);
          setCheckBtnDisable(true);
        }
        return !!response;
      }),
  });

  const {
    handleSubmit,
    control,
    getValues,
    setValue,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(resetPasswordSchema),
  });

  const { mutateAsync: verifyEmail, isLoading: loadingVerifyEmail } =
    useCheckRegisteredEmail();

  const { mutateAsync: sendEmail, isLoading: loadingSendEmail } =
    useSendVerificationCode();

  const handleEmailVerification = async () => {
    const inputEmail = getValues('email');
    await sendEmail(inputEmail);
    onNext(inputEmail);
  };

  return (
    <Form onSubmit={handleSubmit(handleEmailVerification)}>
      <Form.Label>가입한 이메일 주소를 입력해주세요.</Form.Label>
      <Form.Group as={Col} controlId='formGridCity'>
        <Form.Text className='text-muted'>
          이메일 형식에 맞게 작성해주세요.
        </Form.Text>
        <Row>
          <div className='d-flex'>
            <Col>
              <Controller
                name='email'
                control={control}
                defaultValue=''
                render={({ field }) => (
                  <Form.Control
                    {...field}
                    type='email'
                    placeholder='이메일'
                    onChange={(e) => {
                      setValue('email', e.target.value);
                      setCheckBtnDisable(e.target.value === '');
                    }}
                    disabled={!sendBtnDisable}
                  />
                )}
              />
            </Col>

            <Col xs='auto' className='d-inline-flex align-items-center ms-2'>
              <NextButton
                onClick={() => trigger('email')}
                disabled={checkBtnDisable}
              >
                {loadingVerifyEmail ? (
                  <LoadingSpinner />
                ) : sendBtnDisable ? (
                  '확인'
                ) : (
                  '확인완료'
                )}
              </NextButton>
            </Col>
          </div>
        </Row>
        {errors.email && <ErrorMessage>{errors.email?.message}</ErrorMessage>}
      </Form.Group>
      <div className='d-flex justify-content-center'>
        <NextButton
          className='mt-3 w-100'
          type='submit'
          disabled={sendBtnDisable}
        >
          {loadingSendEmail ? <LoadingSpinner /> : '이메일로 인증코드 보내기'}
        </NextButton>
      </div>
    </Form>
  );
}
