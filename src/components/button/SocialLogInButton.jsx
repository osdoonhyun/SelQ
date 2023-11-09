import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { serverApi } from '../../apis/api';
import { getCookie } from '../../config/cookie';
import Google from '../../assets/icon/oauth/google.svg';
import { GREYS } from '../../styles/variables';
import { POPUP_STRING } from '../../constant/options';

export default function SocialLogInButton() {
  const navigate = useNavigate();

  const getUserInfo = async (accessToken) => {
    const config = {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    };

    try {
      const { data, status } = await serverApi.get('/auth', config);
      if (status === 200) {
        return { userInfo: data?.body };
      }
    } catch (error) {
      console.log('유저정보 조회 실패');
    }
  };

  const socialLogin = () => {
    const popup = window.open(
      'http://localhost:8000/api/auth/google',
      'Google Login',
      POPUP_STRING
    );

    const receiveLoginCompleteMessage = async (event) => {
      console.log('EVENT', event);
      if (
        event.origin === 'http://localhost:8000' &&
        event.data === 'loginComplete'
      ) {
        popup.close();

        const token = getCookie('Authentication');
        sessionStorage.setItem('accessToken', token);

        // 유저 정보 조회
        const userInfo = await getUserInfo(token);

        // 이용약관 확인
        if (
          userInfo?.userInfo.termsOfUseAgree === false ||
          userInfo?.userInfo.personalInfoAgree === false ||
          userInfo?.userInfo.fourteenOverAgree === false
        ) {
          navigate('/signup/social', { state: { userInfo, token } });
        } else {
          navigate('/');
        }
      }
    };

    window.addEventListener('message', receiveLoginCompleteMessage);
  };

  return (
    <Button
      variant='Light'
      style={{ border: `1px solid ${GREYS.MEDIUM}` }}
      onClick={socialLogin}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '28px',
        }}
      >
        <img src={Google} alt='Google 아이콘' style={{ width: '24px' }} />
        <span style={{ color: GREYS.DARKEST }}>구글 계정으로 계속하기</span>
      </div>
    </Button>
  );
}
