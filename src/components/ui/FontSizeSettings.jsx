import { useEffect, useRef, useState } from 'react';
import {
  Button,
  Card,
  CardGroup,
  Col,
  Overlay,
  Popover,
  Row,
} from 'react-bootstrap';

const FONT_SIZE_OPTIONS = [
  { label: '축소', size: '14px' },
  { label: '기본', size: '17px' },
  { label: '확대', size: '20px' },
];

export default function FontSizeSettings() {
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);

  const handleClick = (event) => {
    setShow(!show);
    setTarget(event.target);
  };

  //TODO: hover, 선택 시 표시되도록 css 추가 예정
  return (
    <div ref={ref}>
      <Button variant='Light' onClick={handleClick}>
        설정
      </Button>

      <Overlay
        show={show}
        target={target}
        placement='bottom'
        container={ref}
        containerPadding={20}
      >
        <Popover id='popover-contained'>
          <Popover.Header as='h3'>글자크기</Popover.Header>
          <Popover.Body>
            <CardGroup>
              <Row>
                {FONT_SIZE_OPTIONS.map(({ label, size }, index) => (
                  <Col key={index}>
                    <Card>
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
                      <Card.Footer>
                        <Row>
                          <Button variant='Light'>
                            <large className='text-muted'>{label}</large>
                          </Button>
                        </Row>
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
