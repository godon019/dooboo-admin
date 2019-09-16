interface String {
  kr: string;
  en?: string;
}

const STRINGS: { [keyName: string]: String } = {
  // Service
  SERVICE_NETFLIX: { kr: '넷플릭스', en: 'Netflix' },
  // Subs
  SUBS_NETFLIX_BASIC: { kr: '베이직', en: 'Basic' },
  SUBS_NETFLIX_STANDARD: { kr: '스텐다드', en: 'Standard' },
  SUBS_WATCHA_EVERY_3_MONTH: { kr: '3개월', en: '3 Month' },
  SUBS_WATCHA_EVERYMONTH: { kr: '매월', en: '1 Month' },
  // Category
  CATEGORY_NEWS: { kr: '뉴스', en: 'News' },
  CATEGORY_MAGAZINE: { kr: '잡지 및 신문', en: 'Magazine & News Paper' },
  CATEGORY_MUSIC: { kr: '음악', en: 'Music' },
  CATEGORY_SHOPPING: { kr: '쇼핑', en: 'Shopping' },
  CATEGORY_MAGAZINE_APP: { kr: '여행', en: 'Trip' },
  CATEGORY_BOOK: { kr: '도서', en: 'BOOK' },
  CATEGORY_TRIP: { kr: '여행', en: 'TRIP' },
  CATEGORY_LIFESTYLE_APP: { kr: '라이프스타일', en: 'LIFESTYLE(APP)' },
  // Service Group
  SERVICE_GROUP_LIFE_EXPENSE: { kr: '생활 지출', en: 'Life expenses' },
  SERVICE_GROUP_SUBSCRIPTION: { kr: '구독 서비스', en: 'Subscriptions' },
};

export const localize = (inputStr: string, lang?: keyof String) => {
  const _lang = lang || 'kr';
  const str = STRINGS[inputStr] ? STRINGS[inputStr][_lang] : 'none';
  return str;
};
