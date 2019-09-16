const STRINGS = {
  en: {
    // English
    BUTTON: 'Button',
    SIGNUP: 'Sign Up',
    ADMIN_LOGIN: 'Admin Login',
    LOGIN: 'Login',
    LOGOUT: 'Logout',
    GOOGLE_LOGIN: 'Login with Google',
    FACEBOOK_LOGIN: 'Login with Facebook',
    EMAIL: 'Email',
    EMAIL_HINT: 'Write email address.',
    EMAIL_ERROR: 'Wrong email address',
    PASSWORD: 'Password',
    PASSWORD_CONFIRM: 'Confirm Password',
    PASSWORD_FIND: 'Find Password',
    PASSWORD_HINT: 'Write password.',
    PASSWORD_NOT_MATCH: 'Password and confirm password does not match.',
    COMPLETE: 'Done',
    GOTO_Temp: 'No Page',
    BACK: 'Back',
    NAVIGATE: 'Navigate',
    CHANGE_THEME: 'Change theme',
    SIGN_IN_SCREEN: 'Sign in screen',
    SIGN_UP_SCREEN: 'Sign up screen',
    MAIN_SCREEN: 'Main screen',
    UPDATE_BUTTON: 'Update',
    DELETE_BUTTON: 'Delete',
    SERVICE_LIST: 'Service List',
    CATEGORY_LIST: 'Category List',
    SUBS_LIST: 'Subs List',
    SUBS_ADD_BUTTON: '+ Add Subs',
    SAVE: 'Save',
    SUBMIT: 'Submit',
    CANCEL: 'Cancel',
    // Service Screen
    SERVICE_ADD_BUTTON: '+ Add Service',
    // Category Screen
    CATEGORY_ADD_BUTTON: '+ Add Category',
    // Service Modal
    ICON: 'Icon',
    THUMBNAIL: 'Thumbnail',
    IMAGE: 'Image',
    SERVICE_NAME_KEY: 'name key',
    WEB_PAGE: 'Web Url',
    ANDROID_PLAY_STORE_URL: 'Android url',
    IOS_APP_STORE_URL: 'IOS url',
    MEMO: 'Memo',
    PNG_JPG_GIF_ONLY: 'you can upload png, jpg and gif files only',
    INPUT_REQUIRED: 'is required',
    INPUT_MAX_VALIDATION: 'you exceeded max length of',
    INPUT_TEXT_TO_SEARCH: 'Search.',
    // Service List
    SERVICE_LIST_TABLE_LABEL_ID: 'ID',
    SERVICE_LIST_TABLE_LABEL_NAME: 'SERVICE_EN',
    SERVICE_LIST_TABLE_LABEL_NAME_KR: 'SERVICE_KR',
    SERVICE_LIST_TABLE_LABEL_THUMBNAIL: 'THUMBNAIL',
    SERVICE_LIST_TABLE_LABEL_SETTING: 'SETTING',
    PREVIEW_ICON: 'Preview',
    // Category List
    CATEGORY_LIST_TABLE_LABEL_ID: 'ID',
    CATEGORY_LIST_TABLE_LABEL_KEY: 'KEY',
    CATEGORY_LIST_TABLE_LABEL_DESCRIPTION: 'DESCRIPTION',
    CATEGORY_LIST_TABLE_LABEL_RELEASED: 'Released',
    CATEGORY_LIST_TABLE_LABEL_SETTING: 'SETTING',
    // Service Group
    SERVICE_GROUP_ADD_BUTTON: '+ Add Service Group',
    SERVICE_GROUP_LIST: 'Service Group List',
    SERVICE_GROUP_LIST_TABLE_LABEL_ID: 'ID',
    SERVICE_GROUP_LIST_TABLE_LABEL_KEY: 'KEY',
    SERVICE_GROUP_LIST_TABLE_LABEL_DESCRIPTION: 'DESCRIPTION',
    SERVICE_GROUP_LIST_TABLE_LABEL_SETTING: 'SETTING',
    // Service Details
    SERVICE_LABEL_ID: 'ID',
    SERVICE_LABEL_NAME: 'KEY NAME',
    SERVICE_LABEL_PRICE_PLAN_CURRENCY: 'CURRENCY',
    SERVICE_LABEL_PRICE: 'PRICE',
    SERVICE_LABEL_PERIOD_UNIT: 'PERIOD UNIT',
    SERVICE_LABEL_PERIOD_TYPE: 'PERIOD TYPE',
    SERVICE_LABEL_SETTING: 'SETTING',
    // Subs modal
    SUBS_MODAL_TITLE: 'ADD SUBS',
    SUBS_MODAL_NAME: 'NAME',
    SUBS_MODAL_CURRENCY: 'CURRENCY',
    SUBS_MODAL_PRICE: 'PRICE',
    SUBS_MODAL_PAYMENT_DATE_UNIT: 'PAYMENT DATE UNIT',
    SUBS_MODAL_CASE: 'CASE',
    SUBS_MODAL_MEMO: 'MEMO',
    // Category modal
    CATEGORY_MODAL_CREATE_TITLE: 'Add Category',
    CATEGORY_MODAL_UPDATE_TITLE: 'Update Category',
    CAT_MODAL_KEY: 'key',
    CAT_MODAL_DESC: 'description',
    CAT_MODAL_RELEASED: 'Released',
    // Service Group modal
    SERVICE_GROUP_MODAL_CREATE_TITLE: 'Add Service Group',
    SERVICE_GROUP_MODAL_UPDATE_TITLE: 'Update Service Group',
    SERVICE_GROUP_MODAL_KEY: 'key',
    SERVICE_GROUP_MODAL_DESC: 'description',
  },
  ko: {
    // Korean
    BUTTON: '버튼',
    SIGNUP: '회원가입',
    ADMIN_LOGIN: '어드민 로그인',
    LOGIN: '로그인',
    LOGOUT: '로그아웃',
    GOOGLE_LOGIN: '구글 로그인',
    FACEBOOK_LOGIN: '페이스북 로그인',
    EMAIL: '이메일',
    EMAIL_ERROR: '이메일이 잘못 입력되었습니다.',
    EMAIL_HINT: '이메일 주소를 입력해주세요.',
    PASSWORD: '비밀번호',
    PASSWORD_CONFIRM: '비밀번호 확인',
    PASSWORD_FIND: '비밀번호 찾기',
    PASSWORD_HINT: '비밀번호를 입력해주세요.',
    PASSWORD_NOT_MATCH: '입력된 비밀번호와 비밀번호 확인이 일치하지 않습니다.',
    COMPLETE: '완료',
    GOTO_Temp: '없는 페이지',
    BACK: '뒤로',
    NAVIGATE: '이동하기',
    CHANGE_THEME: '테마 변경',
    SIGN_IN_SCREEN: '로그인 화면',
    SIGN_UP_SCREEN: '회원가입 화면',
    MAIN_SCREEN: '메인 화면',
    UPDATE_BUTTON: '수정',
    DELETE_BUTTON: '삭제',
    SERVICE_LIST: '서비스 리스트',
    CATEGORY_LIST: '카테고리 리스트',

    SUBS_LIST: '구독 리스트',
    SUBS_ADD_BUTTON: '+ 구독 추가',
    SAVE: '저장',
    SUBMIT: '등록',
    CANCEL: '취소',
    // Service Screen
    SERVICE_ADD_BUTTON: '+ 서비스 추가',
    // Category Screen
    CATEGORY_ADD_BUTTON: '+ 카테고리 추가',
    // Service Modal
    ICON: '아이콘',
    THUMBNAIL: '썸네일',
    IMAGE: '이미지',
    SERVICE_NAME_KEY: '키값',
    WEB_PAGE: 'Web url',
    ANDROID_PLAY_STORE_URL: '안드로이드 url',
    IOS_APP_STORE_URL: 'IOS url',
    MEMO: '부가 설명',
    PNG_JPG_GIF_ONLY: 'png, jpg파일과 gif파일만 업로드 가능합니다',
    INPUT_REQUIRED: '의 입력이 필요합니다',
    INPUT_MAX_VALIDATION: '해당 길이 이상으로 입력될 수 없습니다:',
    INPUT_TEXT_TO_SEARCH: '검색어를 입력하세요.',
    // Service List
    SERVICE_LIST_TABLE_LABEL_ID: 'ID',
    SERVICE_LIST_TABLE_LABEL_NAME: '영문',
    SERVICE_LIST_TABLE_LABEL_NAME_KR: '국문',
    SERVICE_LIST_TABLE_LABEL_THUMBNAIL: '썸네일',
    SERVICE_LIST_TABLE_LABEL_SETTING: '설정',
    PREVIEW_ICON: '미리보기',
    // Category List
    CATEGORY_LIST_TABLE_LABEL_ID: 'ID',
    CATEGORY_LIST_TABLE_LABEL_KEY: '키',
    CATEGORY_LIST_TABLE_LABEL_DESCRIPTION: '설명',
    CATEGORY_LIST_TABLE_LABEL_RELEASED: 'Released',
    CATEGORY_LIST_TABLE_LABEL_SETTING: '설정',
    // Service Group
    SERVICE_GROUP_ADD_BUTTON: '+ 서비스 그룹 추가',
    SERVICE_GROUP_LIST: '서비스 그룹 리스트',
    SERVICE_GROUP_LIST_TABLE_LABEL_ID: 'ID',
    SERVICE_GROUP_LIST_TABLE_LABEL_KEY: '키',
    SERVICE_GROUP_LIST_TABLE_LABEL_DESCRIPTION: '설명',
    SERVICE_GROUP_LIST_TABLE_LABEL_SETTING: '설정',
    // Service Details
    SERVICE_LABEL_ID: 'ID',
    SERVICE_LABEL_NAME: 'Subs 키',
    SERVICE_LABEL_PRICE_PLAN_CURRENCY: '통화',
    SERVICE_LABEL_PRICE: '가격',
    SERVICE_LABEL_PERIOD_UNIT: '갱신단위',
    SERVICE_LABEL_PERIOD_TYPE: '갱신주기',
    SERVICE_LABEL_SETTING: '설정',
    // Subs modal
    SUBS_MODAL_TITLE: '구독 추가',
    SUBS_MODAL_NAME: '구독명',
    SUBS_MODAL_CURRENCY: '통화',
    SUBS_MODAL_PRICE: '가격',
    SUBS_MODAL_PAYMENT_DATE_UNIT: '갱신',
    SUBS_MODAL_CASE: '케이스',
    SUBS_MODAL_MEMO: '메모',
    // Category modal
    CATEGORY_MODAL_CREATE_TITLE: '카테고리 추가',
    CATEGORY_MODAL_UPDATE_TITLE: '카테고리 수정',
    CAT_MODAL_KEY: '키',
    CAT_MODAL_DESC: '설명',
    CAT_MODAL_RELEASED: 'Released',
    // Service Group modal
    SERVICE_GROUP_MODAL_CREATE_TITLE: '카테고리 추가',
    SERVICE_GROUP_MODAL_UPDATE_TITLE: '카테고리 수정',
    SERVICE_GROUP_MODAL_KEY: '키',
    SERVICE_GROUP_MODAL_DESC: '설명',
  },
  // ja: { // Japanese
  // },
  // zh: { // Chinese
  // },
  // es: { // Spanish
  // },
  // fr: { // French
  // },
  // id: { // Indonesian
  // },
};

const DEFAULT_LANG = 'en';
let lang = DEFAULT_LANG;

if (navigator) {
  // lang = navigator.language.substr(0, 2);
  lang = 'ko'; // set it for test
}

export const getString = (inputStr: string) => {
  let str = STRINGS[lang]
    ? STRINGS[lang][inputStr]
    : STRINGS[DEFAULT_LANG][inputStr];

  if (!str) {
    // console.warn(`${inputStr} doesn't exist on STRING`);
    str = inputStr;
  }
  return str;
};

export default STRINGS;
