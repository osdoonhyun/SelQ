import { Button, Col, Form, Row } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ErrorMessage } from '../../styles/Styles';
import { MAIN, GREYS } from '../../styles/variables';
import { MESSAGE } from '../../constant/message';
import { REGEXP } from '../../constant/regexp';

const newPasswordSchema = yup.object({
  password: yup
    .string()
    .required(MESSAGE.RESET_PASSWORD.VALIDATION_PASSWORD)
    .min(8, MESSAGE.RESET_PASSWORD.VALIDATION_PASSWORD_MIN)
    .matches(
      REGEXP.PASSWORD,
      MESSAGE.RESET_PASSWORD.VALIDATION_PASSWORD_MATCHES
    ),
  confirmPassword: yup
    .string()
    .oneOf(
      [yup.ref('password'), null],
      MESSAGE.RESET_PASSWORD.VALIDATION_CONFIRM_PASSWORD
    )
    .required(MESSAGE.RESET_PASSWORD.VALIDATION_CONFIRM_PASSWORD_REQUIRED),
});

export default function NewPassword() {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(newPasswordSchema),
  });

  const newPasswordHandler = async (data) => {
    // TODO: 비밀번호 재설정 로직
    console.log('NEW PASSWORD', data.password, data.confirmPassword);
  };

  return (
    <Form onSubmit={handleSubmit(newPasswordHandler)}>
      <Form.Group as={Col}>
        <Row className='justify-content-center'>Sel-Q</Row>
      </Form.Group>
      <Form.Group controlId='formBasic'>
        <Row className='mb-2 justify-content-center'>
          <Controller
            name='password'
            defaultValue=''
            control={control}
            render={({ field }) => (
              <Form.Control
                style={{ height: '50px', width: '330px' }}
                value={field.value}
                placeholder='새 비밀번호'
                onChange={(e) => {
                  setValue('password', e.target.value);
                  field.onChange(e);
                }}
              />
            )}
          />
          <ErrorMessage>{errors.password?.message}</ErrorMessage>

          <Controller
            name='confirmPassword'
            defaultValue=''
            control={control}
            render={({ field }) => (
              <Form.Control
                style={{ height: '50px', width: '330px' }}
                value={field.value}
                onChange={(e) => {
                  setValue('confirmPassword', e.target.value);
                  field.onChange(e);
                }}
                // type='password'
                placeholder='새 비밀번호 확인'
              />
            )}
          />
          <ErrorMessage>{errors.confirmPassword?.message}</ErrorMessage>
        </Row>
      </Form.Group>

      <div className='d-flex justify-content-center mt-4'>
        <Button
          variant='Light'
          style={{
            height: '55px',
            width: '330px',
            padding: '15px 10px',
            backgroundColor: MAIN.DARK,
            border: `1px solid ${MAIN.DARK}`,
            color: GREYS.LIGHTER,
          }}
          type='submit'
        >
          비밀번호 변경하기
        </Button>
      </div>
    </Form>
  );
}
