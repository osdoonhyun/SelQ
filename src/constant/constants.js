export const CATEGORIES = [
  { category: 'All', label: 'all' },
  { category: 'HTML/CSS', label: 'html/css' },
  { category: 'React', label: 'react' },
  { category: 'JavaScript', label: 'javascript' },
  { category: 'TypeScript', label: 'typescript' },
  { category: 'CS', label: 'cs' },
];

export const FONT_SIZE_OPTIONS = [
  { label: '축소', size: '15px', variant: 'small' },
  { label: '기본', size: '18px', variant: 'basic' },
  { label: '확대', size: '21px', variant: 'large' },
];

export const IMPORTANCE_OPTIONS = [
  { label: '안중요', level: 0, color: 'grey' },
  { label: '중요하지 않음', level: 1, color: '#F2D035' },
  { label: '약간 중요', level: 2, color: '#F2D035' },
  { label: '다소 중요', level: 3, color: '#F2D035' },
  { label: '중요', level: 4, color: '#F2D035' },
  { label: '매우 중요', level: 5, color: '#F2D035' },
];

export const EMAIL_LIST = [
  'naver.com',
  'hanmail.net',
  'nate.com',
  'hotmai.com',
  'icloud.com',
  'google.com',
  'kakao.com',
  '직접입력',
];

export const TERMS_AND_CONDITIONS = [
  {
    label: '만 14세 이상입니다 (필수)',
    value: 'fourteenOverAgree',
    isChecked: false,
  },
  { label: '이용약관 (필수)', value: 'termsOfUseAgree', isChecked: false },
  {
    label: '개인정보수집 및 이용동의 (필수)',
    value: 'personalInfoAgree',
    isChecked: false,
  },
  {
    label: '개인정보 마케팅 활용 동의(선택)',
    value: 'marketingConsent',
    isChecked: false,
  },
  {
    label: '이벤트, 쿠폰, 특가 알림 메일 및 SMS 등 수신(선택)',
    value: 'smsAndEventAgree',
    isChecked: false,
  },
];

export const PAGES_PATH = [
  { path: '/', label: '홈' },
  { path: '/questions', label: '질문목록' },
  { path: '/importants', label: '중요질문' },
  { path: '/bookmarks', label: '북마크' },
];

export const USER_FILTER_OPTIONS = [
  { label: '닉네임', option1: '가나다순', option2: 'abc순' },
  { label: '날짜', option1: '최신순', option2: '오래된순' },
  { label: '권한', option1: '유저', option2: '관리자' },
];

export const IMPORTANCE_FILTER_OPTION = [
  {
    label: '중요도',
    options: [
      { label: 1, value: '중요하지 않음', isChecked: false },
      { label: 2, value: '약간 중요', isChecked: false },
      { label: 3, value: '다소 중요', isChecked: false },
      { label: 4, value: '중요', isChecked: false },
      { label: 5, value: '매우 중요', isChecked: false },
    ],
  },
];

export const CATEGORY_FILTER_OPTION = [
  {
    label: '카테고리',
    options: [
      { label: 'html/css', value: 'HTML/CSS', isChecked: false },
      { label: 'react', value: 'React', isChecked: false },
      { label: 'javascript', value: 'JavaScript', isChecked: false },
      { label: 'typescript', value: 'TypeScript', isChecked: false },
      { label: 'cs', value: 'CS', isChecked: false },
    ],
  },
];

export const DATE_FILTER_OPTION = [
  {
    label: '날짜',
    options: [
      { label: 'DESC', value: '최신순' },
      { label: 'ASC', value: '오래된순' },
    ],
  },
];
