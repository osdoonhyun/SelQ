import {
  Button,
  Dropdown,
  DropdownButton,
  Form,
  Image,
  Modal,
  Table,
} from 'react-bootstrap';
import useUsersQuery from '../services/authHook/getUsers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

export default function UsersManagement() {
  const { data: users } = useUsersQuery();
  const [updatedUserInfo, setUpdatedUserInfo] = useState({});
  const [selectedUser, setSelectedUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleCloseEditModal = () => setShowEditModal(false);
  const handleCloseDeleteModal = () => setShowDeleteModal(false);

  const handleShowEditModal = (user) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };
  const handleShowDeleteModal = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>닉네임</th>
            <th>계정</th>
            <th>가입 날짜</th>
            <th>유저 권한</th>
            <th>가입 유형</th>
            <th>옵션</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users?.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.createdAt.slice(0, 10)}</td>
                <td>{user.roles[0] === 'admin' ? '관리자' : '유저'}</td>
                <td>{user.provider === 'local' ? '로컬' : '소셜'}</td>
                <td>
                  <DropdownButton
                    id='dropdown-basic-button'
                    variant='light'
                    title={<FontAwesomeIcon icon={faEllipsis} />}
                  >
                    <Dropdown.Item onClick={() => handleShowEditModal(user)}>
                      수정
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleShowDeleteModal(user)}>
                      삭제
                    </Dropdown.Item>
                  </DropdownButton>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>

      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>계정 삭제</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className='d-flex justify-content-center'>
              <Image src={selectedUser?.profileImg} roundedCircle />
            </div>

            <Form.Group
              className='mb-3'
              controlId='exampleForm.ControlTextarea1'
            >
              <Form.Label>이메일</Form.Label>
              <Form.Control
                type='email'
                placeholder={selectedUser?.email}
                disabled
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
              <Form.Label>유저 이름</Form.Label>
              <Form.Control
                type='text'
                placeholder={selectedUser?.username}
                disabled
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Label>유저 등급</Form.Label>
              <Form.Control
                type='text'
                placeholder={selectedUser?.isAdmin ? '관리자' : '유저'}
                disabled
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Label>가입 날짜</Form.Label>
              <Form.Control
                type='text'
                placeholder={selectedUser?.createdAt.slice(0, 10)}
                disabled
              />
            </Form.Group>
          </Form>
          <Form.Check // prettier-ignore
            type={'checkbox'}
            // checked={isChecked}
            // onChange={() => setIsChecked(!isChecked)}
            label='계정 삭제하시면 다시 되돌리지 못합니다. 정말 삭제하시겠습니까?'
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleCloseDeleteModal}>
            취소
          </Button>
          <Button
            variant='danger'
            // disabled={!isChecked}
            // onClick={() => deleteUserHandler(selectedUser?.id)}
          >
            계정 삭제
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>계정 수정</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className='d-flex justify-content-center'>
              <Image src={selectedUser?.profileImg} roundedCircle />
            </div>

            <Form.Group
              className='mb-3'
              controlId='exampleForm.ControlTextarea1'
            >
              <Form.Label>이메일</Form.Label>
              <Form.Control
                type='email'
                placeholder={selectedUser?.email}
                disabled
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
              <Form.Label>유저 이름</Form.Label>
              <Form.Control
                type='text'
                value={selectedUser?.username}
                placeholder={selectedUser?.username}
                // disabled
                // onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Label>유저 등급</Form.Label>
              <Form.Select
                aria-label='Default select example'
                onChange={(e) => {
                  console.log('유저등급 클릭함!!!', e.target.value);
                  // setIsAdmin(e.target.value);
                }}
              >
                <option value='default'>
                  {selectedUser?.roles[0] ? '관리자' : '유저'}
                </option>
                <option value='select' disabled>
                  선택해 주세요
                </option>
                <option value='false'>유저</option>
                <option value='true'>관리자</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleCloseEditModal}>
            취소
          </Button>
          <Button
            variant='primary'
            // onClick={() => updateUserHandler(selectedUser?.id)}
          >
            수정하기
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
