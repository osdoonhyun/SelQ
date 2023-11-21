import { useNavigate } from 'react-router-dom';
import { serverApi } from '../../apis/api';
import { getCookie } from '../../config/cookie';
import Google from '../../assets/icon/oauth/google.svg';
import { POPUP_STRING } from '../../constant/options';
import { SocialLoginButton, SocialLoginSpan } from '../../styles/ButtonStyles';
import { Image } from 'react-bootstrap';

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
      process.env.REACT_APP_GOOGLE_LOGIN_URL,
      'Google Login',
      POPUP_STRING
    );

    const receiveLoginCompleteMessage = async (event) => {
      console.log('EVENT', event);
      if (
        event.origin === process.env.REACT_APP_ORIGIN_URL &&
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
    <SocialLoginButton variant='Light' onClick={socialLogin}>
      <div className='d-flex justify-content-center align-items-center'>
        <Image src={Google} alt='Google 아이콘' width={24} />
        <SocialLoginSpan>구글 계정으로 계속하기</SocialLoginSpan>
      </div>
    </SocialLoginButton>
  );
}
