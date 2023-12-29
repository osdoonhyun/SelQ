import { Button, Modal } from 'react-bootstrap';

export default function TemporarySaveModal({
  showModal,
  setShowModal,
  setLoadTemporaryData,
  deleteLocalStorageData,
}) {
  const handleClose = () => {
    setShowModal(false);
    setLoadTemporaryData(true);
  };

  const handleDelete = () => {
    setShowModal(false);
    setLoadTemporaryData(false);
    deleteLocalStorageData();
  };

  return (
    <>
      <Modal
        show={showModal}
        onHide={handleClose}
        backdrop='static'
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>자동저장된 글이 있습니다!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className='font-weight-bold'>
            작성중인 내용을 이어서 작성할 수 있습니다.
            <br />
            삭제를 누르면 자동저장된 글은 삭제됩니다.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleDelete}>
            삭제
          </Button>
          <Button variant='primary' onClick={handleClose}>
            이어서 작성
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
