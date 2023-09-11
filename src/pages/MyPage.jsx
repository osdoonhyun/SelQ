import { Button, Container, Form, Spinner } from 'react-bootstrap';
import useGetProfileInfo from '../services/authHook/getProfile';
import { useForm } from 'react-hook-form';
import {
  UsernameForm,
  ImageForm,
  EmailForm,
} from '../components/common/ResponsiveForm';

export default function MyPage() {
  const { data: userInfo } = useGetProfileInfo();
  console.log('DATA', userInfo);

  const { handleSubmit, register, watch, control } = useForm();

  const updateUserHandler = () => {};

  return (
    <Container>
      <Form onSubmit={handleSubmit(updateUserHandler)}>
        <ImageForm img={userInfo?.profileImg} />
        <EmailForm label={'이메일'} email={userInfo?.email} />
        <UsernameForm label={'닉네임'} content={userInfo?.username} />

        {/* 회원탈퇴 */}

        <Button
          // onClick={verifyRegisteredEmailHandler}
          variant='primary'
          type='submit'
          className='w-100 mt-3'
        >
          {/* {loadingSignUp ? (
            <>
              <Spinner
                animation='border'
                size='sm'
                role='status'
                aria-hidden='true'
              />
              <span className='visually-hidden'>Loading...</span>
            </>
          ) : ( */}
          '회원 정보 수정'
          {/* )} */}
        </Button>
      </Form>
    </Container>
  );
}
