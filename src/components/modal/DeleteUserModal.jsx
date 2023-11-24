import { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

export default function DeleteUserModal({ show, setShow, handleDelete }) {
  const [isChecked, setIsChecked] = useState(false);

  const handleClose = () => {
    setShow(false);
    setIsChecked(false);
  };

  return (
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
  );
}
