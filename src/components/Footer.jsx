import FormContainer from './FormContainer';

export default function Footer() {
  return (
    <FormContainer>
      <div
        style={{
          height: '60px',
          position: 'absolute',
          transform: 'translateY(-100%)',
          left: 0,
          fontWeight: 500,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'BMHANNAPro',
          backgroundColor: '#F7F6F7',
          color: '#313030',
        }}
      >
        @ 2023. shinseunghyun all rights reserved.
      </div>
    </FormContainer>
  );
}
