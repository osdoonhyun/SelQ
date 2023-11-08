import { Button, Form, InputGroup } from 'react-bootstrap';
import { faEyeSlash, faEye } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { GREYS } from '../../styles/variables';

export default function PasswordInputGroup({
  register,
  name,
  placeholder,
  controlStyle,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <InputGroup>
      <Form.Control
        style={controlStyle || {}}
        {...register(name, { required: true })}
        type={showPassword ? 'text' : 'password'}
        placeholder={placeholder}
      />
      <Button
        style={{
          color: GREYS.MEDIUM,
          border: `1px solid ${GREYS.LIGHT}`,
        }}
        variant='Light'
        onClick={togglePasswordVisibility}
      >
        {showPassword ? (
          <FontAwesomeIcon style={{ width: '18px' }} icon={faEye} />
        ) : (
          <FontAwesomeIcon style={{ width: '18px' }} icon={faEyeSlash} />
        )}
      </Button>
    </InputGroup>
  );
}
