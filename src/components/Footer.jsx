import FormContainer from './FormContainer';

export default function Footer() {
  return (
    <FormContainer>
      <div
        style={{
          height: '60px',
          position: 'absolute',
          transform: 'translateY(-100%)',
          borderTop: '1px solid #333',
          left: 0,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'BMEuljiro10yearslater',
        }}
      >
        @ 2023. shinseunghyun all rights reserved.
      </div>
    </FormContainer>
  );
}
