export const DEFAULT_CHARTER = {
  coverTitle: 'منشور حقوق مشتری',
  coverSubtitle: 'سامانه پارکینگ هوشمند',
  coverAuthor: 'تعهد ما به استفاده‌کننده',
  chapters: [
    {
      id: 'c1',
      chapter: 'اصل یک',
      title: 'شفافیت نرخ و شرایط',
      body: 'مشتری حق دارد پیش از رزرو، نرخنامه به‌روز اتحادیه پارکینگ، مدت توقف، هزینه شبانه روزی و هر هزینه اضافه را واضح ببیند. هیچ مبلغی خارج از تعرفه اعلام‌شده دریافت نمی‌شود مگر آنکه پیش از پرداخت به اطلاع مشتری رسیده باشد.'
    },
    {
      id: 'c2',
      chapter: 'اصل دو',
      title: 'تضمین جای رزروشده',
      body: 'پس از ثبت و پرداخت موفق، جای پارک انتخاب‌شده تا پایان مدت رزرو در اختیار همان مشتری می‌ماند. اگر به‌دلیل خطای سامانه جای رزروشده در دسترس نباشد، مجتمع موظف است جای معادل فراهم کند یا هزینه را بازگرداند.'
    },
    {
      id: 'c3',
      chapter: 'اصل سه',
      title: 'ایمنی وسیله و محیط',
      body: 'پارکینگ باید محیطی ایمن، روشن و قابل نظارت داشته باشد. مشتری حق دارد از وضعیت ظرفیت، مسیر ورود و خروج و نکات ایمنی مجتمع آگاه شود. مسئولیت نگهداری متعارف فضای پارک با بهره‌بردار است.'
    },
    {
      id: 'c4',
      chapter: 'اصل چهار',
      title: 'حریم خصوصی و داده',
      body: 'اطلاعات حساب، شماره تماس و سابقه رزرو فقط برای ارائه خدمت و پشتیبانی استفاده می‌شود و بدون رضایت مشتری در اختیار شخص ثالث قرار نمی‌گیرد، مگر در موارد الزام قانونی.'
    },
    {
      id: 'c5',
      chapter: 'اصل پنج',
      title: 'لغو، پشتیبانی و شکایت',
      body: 'مشتری می‌تواند رزرو فعال خود را از بخش «رزروهای من» پیگیری یا لغو کند و رسید پرداخت را دریافت نماید. پاسخگویی به درخواست و شکایت باید در کوتاه‌ترین زمان ممکن انجام شود و نتیجه به اطلاع مشتری برسد.'
    }
  ]
};

export function buildCharterPages(charter = DEFAULT_CHARTER) {
  const data = {
    ...DEFAULT_CHARTER,
    ...charter,
    chapters: Array.isArray(charter?.chapters) && charter.chapters.length
      ? charter.chapters
      : DEFAULT_CHARTER.chapters
  };

  const contentPages = data.chapters.map((chapter, index) => ({
    id: chapter.id || `c${index + 1}`,
    kind: 'content',
    chapter: chapter.chapter || `اصل ${index + 1}`,
    title: chapter.title || '',
    body: chapter.body || ''
  }));

  return [
    {
      id: 'cover',
      kind: 'cover',
      title: data.coverTitle || DEFAULT_CHARTER.coverTitle,
      subtitle: data.coverSubtitle || '',
      author: data.coverAuthor || ''
    },
    {
      id: 'toc',
      kind: 'toc',
      title: 'فهرست',
      items: contentPages.map((page, index) => ({
        title: page.title,
        page: index + 3
      }))
    },
    ...contentPages,
    {
      id: 'end',
      kind: 'endpaper',
      title: 'تعهد سامانه',
      body: 'این منشور راهنمای خدمت به مشتری است و ادمین می‌تواند متن آن را به‌روز کند تا با مقررات و نرخ اتحادیه هماهنگ بماند.'
    },
    {
      id: 'back',
      kind: 'back',
      title: data.coverTitle || DEFAULT_CHARTER.coverTitle,
      colophon: data.coverSubtitle || ''
    }
  ];
}
