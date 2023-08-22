import { Suspense, useDeferredValue, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import SearchResult from './SearchResult';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

export default function SearchBar() {
  const [show, setShow] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const defferedSearchInput = useDeferredValue(searchInput);
  const isStale = searchInput !== defferedSearchInput;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant='Light' onClick={handleShow}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '8px',
          }}
        >
          <FontAwesomeIcon color='#B3B3B5' icon={faMagnifyingGlass} size='xl' />
          <span
            style={{
              fontSize: '13px',
              marginTop: '8px',
              color: '#B3B3B5',
            }}
          >
            검색
          </span>
        </div>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <label>
            검색 :
            <input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </label>
        </Modal.Header>
        <Modal.Body>
          <Suspense>
            <div style={{ opacity: isStale ? 0.5 : 1 }}>
              <SearchResult />
            </div>
          </Suspense>
        </Modal.Body>
      </Modal>
    </>
  );
}
