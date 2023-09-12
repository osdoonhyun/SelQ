import { useState } from 'react';
import EmailVerification from './EmailVerification';
import NewPassword from './NewPassword';
import axios from 'axios';
import LogIn from '../auth/LogIn';
import EmailCodeVerification from './EmailCodeVerification';

export default function ResetPassword() {
  const [step, setStep] = useState('이메일검증');
  const [userEmail, setUserEmail] = useState('');

  return (
    <>
      {step === '이메일검증' && (
        <EmailVerification
          onNext={(email) => {
            setUserEmail(email);
            setStep('인증코드검증');
          }}
        />
      )}
      {/* 가입된 이메일인지 검증 API
      이메일 인증 코드 전송 API */}
      {step === '인증코드검증' && (
        <EmailCodeVerification
          userEmail={userEmail}
          onNext={() => setStep('비밀번호변경')}
        />
        // 이메일 인증코드 검증 API
      )}
      {step === '비밀번호변경' && (
        <NewPassword
          onNext={async () => {
            await axios.post('/api/'); // 비밀번호 변경 API 호출
            setStep('변경성공');
          }}
        />
      )}
      {step === '변경성공' && <LogIn />}
    </>
  );
}

// --- 가입한 이메일 입력 폼 -> 이메일 검증
// 1. 가입한 이메일 주소 입력
// 2. 입력한 주소가 가입되어 있는지 확인
// 3. 확인 완료되면 이메일로 인증코드 받기 버튼 활성화
// --- 이메일 전송된 코드 입력하는 폼으로 전환 -> 인증코드 검증
// 4. 이메일로 인증코드 받기 버튼 클릭시 이메일로 인증코드 전송
// 5. 이메일로 전송된 인증코드 입력
// 6. 확인 완료되면 비밀번호 재설정하기 버튼 활성화
// --- 버튼 클릭시 비밀번호 변경하기 페이지로 이동 -> 비빌번호 변경
// 7. 새로운 비밀번호 재설정
// 8. 변경 성공 시 로그인 페이지로 이동
