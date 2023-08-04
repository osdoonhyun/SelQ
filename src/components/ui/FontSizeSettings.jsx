import { useContext, useRef, useState } from 'react';
import {
  Button,
  Card,
  CardGroup,
  Col,
  Overlay,
  Popover,
  Row,
} from 'react-bootstrap';
import { FontSizingContext } from '../context/FontSizingProvider';
import { getTargetIndex } from '../utils/utils';
import { FONT_SIZE_OPTIONS } from '../../constant/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';

export function FontSizeSettings() {
  const { fontSizing, handleFontSizing } = useContext(FontSizingContext);
  const [selectedFontCard, setSelectedFontCard] = useState('');
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);

  const handleClick = (event) => {
    setShow(!show);
    setTarget(event.target);
  };

  const handleFontSizeSaved = (event) => {
    handleFontSizing(getTargetIndex(selectedFontCard));
    setShow(!show);
    setTarget(event.target);
  };

  const handleFontCardClick = (variant) => {
    setSelectedFontCard(variant);
  };

  return (
    <div ref={ref}>
      <Button variant='Light' onClick={handleClick}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <FontAwesomeIcon icon={faGear} size='xl' />
          <span style={{ fontSize: '13px', marginTop: '8px' }}>설정</span>
        </div>
      </Button>

      <Overlay
        show={show}
        target={target}
        placement='bottom'
        container={ref}
        containerPadding={20}
      >
        <Popover id='popover-contained'>
          <Popover.Header as='h3'>
            <Row className='d-flex justify-content-between'>
              <Col className='text-muted'>글자크기</Col>
              <Col
                className='text-end text-muted'
                onClick={handleFontSizeSaved}
              >
                저장
              </Col>
            </Row>
          </Popover.Header>
          <Popover.Body>
            <CardGroup>
              <Row>
                {FONT_SIZE_OPTIONS.map(({ label, size, variant }, index) => (
                  <Col key={index}>
                    <Card
                      onClick={() => handleFontCardClick(variant)}
                      style={{
                        border:
                          (selectedFontCard || fontSizing) === variant &&
                          '2px solid red',
                        boxShadow:
                          (selectedFontCard || fontSizing) === variant &&
                          '0 0 3px red',
                      }}
                    >
                      <Card.Body
                        style={{
                          height: '86px',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <Card.Text style={{ fontSize: size }}>가 Aa</Card.Text>
                      </Card.Body>
                      <Card.Footer className='d-flex justify-content-center align-items-center p-3'>
                        <span className='text-muted'>{label}</span>
                        {/* <Row>
                          <Col variant='Light'>
                          </Col>
                        </Row> */}
                      </Card.Footer>
                    </Card>
                  </Col>
                ))}
              </Row>
            </CardGroup>
          </Popover.Body>
        </Popover>
      </Overlay>
    </div>
  );
}
