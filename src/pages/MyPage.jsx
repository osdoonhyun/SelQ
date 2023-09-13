import { Button, Container, Form, Spinner } from 'react-bootstrap';
import useGetProfileInfo from '../services/authHook/getProfile';
import { useForm } from 'react-hook-form';
import {
  UsernameForm,
  ImageForm,
  EmailForm,
} from '../components/common/ResponsiveForm';
import { useUpdateUser } from '../services/authHook/getUsers';
import { useNavigate } from 'react-router-dom';

export default function MyPage() {
  const navigate = useNavigate();
  const { data: userInfo } = useGetProfileInfo();
  const {
    mutateAsync: updateUser,
    isLoading: loadingUpdateUser,
    error: errorUpdateUser,
  } = useUpdateUser();

  const { handleSubmit, control, setValue, getValues } = useForm();

  const updateUserHandler = async () => {
    const updatedInfo = {};

    const usernameValue = getValues('username');
    if (usernameValue !== '' && usernameValue !== userInfo?.username) {
      updatedInfo.username = usernameValue;
    }

    await updateUser({ updatedInfo });
    navigate('/');
  };

  return (
    <Container
      style={{
        maxWidth: '550px',
      }}
    >
      <Form onSubmit={handleSubmit(updateUserHandler)}>
        <ImageForm img={userInfo?.profileImg} />
        <EmailForm label={'이메일'} email={userInfo?.email} />
        <UsernameForm
          label={'닉네임'}
          content={userInfo?.username}
          control={control}
          setValue={setValue}
        />

        {/* 회원탈퇴 */}

        <Button
          style={{ width: '280px' }}
          variant='primary'
          type='submit'
          className='mt-3'
        >
          {loadingUpdateUser ? (
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
            '회원 정보 수정'
          )}
        </Button>
      </Form>
    </Container>
  );
}
