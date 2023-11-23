import { useState } from 'react';
import { Button, Container, Form, Modal, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import useAuth from '../hooks/common/useAuth';
import { useUpdateUserInfoByUser } from '../hooks/common/useUpdateUserInfoByUser';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  UsernameForm,
  ImageForm,
  EmailForm,
  DeleteForm,
} from '../components/ResponsiveForm';
import { NextButton } from '../styles/ButtonStyles';

const usernameSchema = yup
  .object({
    username: yup
      .string()
      .min(2, '최소 2글자 이상 입력해 주세요.')
      .max(15, '최대 15글자까지 입력 가능합니다.'),
  })
  .required('닉네임을 입력해 주세요.');

export default function MyPage() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const { user, token } = useAuth();

  const {
    mutateAsync: updateUser,
    isLoading: loadingUpdateUser,
    error: errorUpdateUser,
  } = useUpdateUserInfoByUser();

  const {
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(usernameSchema),
  });

  const updateUserHandler = async () => {
    const updatedInfo = {};

    const usernameValue = getValues('username');
    if (usernameValue !== '' && usernameValue !== user?.username) {
      updatedInfo.username = usernameValue;
    }

    await updateUser({ updatedInfo, token });
    navigate('/');
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDelete = () => {
    //TODO: 회원탈퇴 로직
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
          <ImageForm img={user?.profileImg} />
          <EmailForm label={'이메일'} email={user?.email} />
          <UsernameForm
            label={'닉네임'}
            content={user?.username}
            control={control}
            setValue={setValue}
            errors={errors.username?.message}
          />
          <DeleteForm showModal={handleShow} />

          <div className='d-flex justify-content-center'>
            <NextButton my type='submit' className='mt-5'>
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
            </NextButton>
          </div>
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
