import { Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { GREYS, MAIN } from '../../styles/variables';

export default function LoginModal({ openLoginModal, handleClose }) {
  const navigate = useNavigate();

  const handleLogin = () => {
    handleClose();
    navigate('/login');
  };
  return (
    <Modal size='sm' show={openLoginModal} onHide={handleClose}>
      <Modal.Body className='py-3 text-center'>
        로그인이 필요한 서비스입니다.
        <br />
        로그인 하시겠습니까?
      </Modal.Body>
      <Modal.Footer className='justify-content-center'>
        <Button
          variant='Light'
          style={{ color: MAIN.MEDIUM }}
          onClick={handleLogin}
        >
          로그인 하기
        </Button>
        <Button
          variant='Light'
          style={{ color: GREYS.MEDIUM }}
          onClick={handleClose}
        >
          취소
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
