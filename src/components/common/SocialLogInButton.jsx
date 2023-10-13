import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { serverApi } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import { logIn } from '../../store/Slices/auth';
import Google from '../../assets/icon/oauth/google.svg';
import { getCookie } from '../../config/cookie';

export default function SocialLogInButton() {
  const navigate = useNavigate();
  // const dispatch = useDispatch();

  // const verifyRegisteredEmail = async (email) => {
  //   try {
  //     const { status } = await serverApi.post('/users/email', {
  //       email,
  //     });

  //     if (status === 201) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   } catch (error) {
  //     if (error.response && error.response.status === 404) {
  //       return false;
  //     }
  //     throw error;
  //   }
  // };

  // const socialLogin = useGoogleLogin({
  //   onSuccess: async (tokenResponse) => {
  //     const userInfo = await axios
  //       .get('https://www.googleapis.com/oauth2/v3/userinfo', {
  //         headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
  //       })
  //       .then((res) => {
  //         const { email, name, picture } = res.data;
  //         return { email, name, picture };
  //       });

  //     const registeredEmail = await verifyRegisteredEmail(userInfo?.email);

  //     if (registeredEmail) {
  //       await dispatch(logIn({ email: userInfo?.email }));
  //       navigate('/');
  //     } else {
  //       navigate('/signup/social', { state: { userInfo } });
  //     }
  //   },
  //   onError: (error) => {
  //     console.log('소셜 로그인 실패', error);
  //   },
  // });
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
      'width=400,height=500'
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
        console.log('USERINFO++++', userInfo?.userInfo);
        console.log(
          'userInfo.termsOfUseAgree++++',
          userInfo?.userInfo.email,
          userInfo?.userInfo.termsOfUseAgree,
          userInfo?.userInfo.personalInfoAgree,
          userInfo?.userInfo.fourteenOverAgree
        );

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
      style={{ border: '1px solid #bdbdbd' }}
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
        <span style={{ color: '#0c0b0b66' }}>구글 계정으로 계속하기</span>
      </div>
    </Button>
  );
}
