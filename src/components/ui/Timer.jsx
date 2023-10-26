import { useEffect, useState } from 'react';
import { RED } from '../../styles/variables';

export default function Timer() {
  const [timeLeft, setTimeLeft] = useState(180);
  const [expired, setExpired] = useState(false);

  const minutes = Math.floor(timeLeft / 60)
    .toString()
    .padStart(2, '0');
  const seconds = (timeLeft % 60).toString().padStart(2, '0');

  useEffect(() => {
    let timer;
    if (timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      setExpired(true);
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [timeLeft]);

  return (
    <div style={{ color: RED }}>
      {expired ? '인증코드가 만료되었습니다.' : `${minutes}:${seconds}`}
    </div>
  );
}
