import { Button, Container, Form, Modal, Spinner } from 'react-bootstrap';
import useGetProfileInfo from '../services/authHook/getProfile';
import { useForm } from 'react-hook-form';
import {
  UsernameForm,
  ImageForm,
  EmailForm,
  DeleteForm,
} from '../components/common/ResponsiveForm';
import { useUpdateUser } from '../services/authHook/getUsers';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function MyPage() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

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

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDelete = () => {
    //회원탈퇴 로직
    console.log('탈퇴됨');
    handleClose();
  };

  return (
    <>
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
          <DeleteForm showModal={handleShow} />

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

      <Modal show={show} onHide={handleClose} backdrop='static'>
        <Modal.Header closeButton>
          <Modal.Title>회원 탈퇴</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Check
            type='checkbox'
            label='탈퇴 버튼 선택 시, 계정은 영구 삭제되며 복구되지 않습니다.'
            onChange={() => setIsChecked(!isChecked)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            취소
          </Button>
          <Button variant='danger' onClick={handleDelete} disabled={!isChecked}>
            탈퇴
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
