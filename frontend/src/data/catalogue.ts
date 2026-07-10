// AUTO-GENERATED mock catalogue (67 real product photos). Edit via admin / backend later.
import type { Product, Category, Brand } from "@/types";

export const categories: Category[] = [
  {
    "id": "c1",
    "slug": "dinnerware",
    "name": "أطقم الصحون",
    "nameEn": "Dinnerware Sets",
    "image": "/assets/products/p16.jpg",
    "count": 17
  },
  {
    "id": "c2",
    "slug": "serving",
    "name": "أدوات التقديم",
    "nameEn": "Serving Ware",
    "image": "/assets/products/p01.jpg",
    "count": 8
  },
  {
    "id": "c3",
    "slug": "cutlery",
    "name": "أدوات المائدة",
    "nameEn": "Cutlery & Flatware",
    "image": "/assets/products/p56.jpg",
    "count": 8
  },
  {
    "id": "c4",
    "slug": "linens",
    "name": "مفارش وتشاريف",
    "nameEn": "Table Linens",
    "image": "/assets/products/p33.jpg",
    "count": 23
  },
  {
    "id": "c5",
    "slug": "accessories",
    "name": "إكسسوارات المطبخ",
    "nameEn": "Kitchen Accessories",
    "image": "/assets/products/p09.jpg",
    "count": 7
  },
  {
    "id": "c6",
    "slug": "home",
    "name": "مستلزمات منزلية",
    "nameEn": "Home Essentials",
    "image": "/assets/products/p64.jpg",
    "count": 4
  }
];

export const brands: Brand[] = [
  {
    "id": "b1",
    "name": "RTC",
    "logo": "/assets/brands/rtc.png"
  },
  {
    "id": "b2",
    "name": "Al-Sharif",
    "logo": "/assets/brands/alsharif.png"
  }
];

export const products: Product[] = [
  {
    "id": "p1",
    "slug": "serving-1",
    "name": "صينية تقديم ستانلس",
    "nameEn": "serving item 1",
    "brandId": "b2",
    "categorySlug": "serving",
    "price": 255,
    "rating": 4.2,
    "reviewsCount": 25,
    "images": [
      "/assets/products/p01.jpg",
      "/assets/products/p02.jpg",
      "/assets/products/p03.jpg"
    ],
    "inStock": true,
    "isFeatured": false,
    "isBestseller": false,
    "isNew": false,
    "description": "قطعة فاخرة بتصميم عصري أنيق تضيف لمسة من الرقي إلى مائدتك. مصنوعة من خامات عالية الجودة مقاومة للاستخدام اليومي وسهلة التنظيف. مثالية للضيافة والمناسبات الخاصة، وتأتي بتشطيب راقٍ يدوم طويلاً.",
    "specs": [
      {
        "label": "الخامة",
        "value": "سيراميك / ستانلس ستيل عالي الجودة"
      },
      {
        "label": "عدد القطع",
        "value": "7"
      },
      {
        "label": "لون التشطيب",
        "value": "رمادي"
      },
      {
        "label": "مناسب لغسالة الصحون",
        "value": "يُغسل باليد"
      },
      {
        "label": "الضمان",
        "value": "سنة واحدة"
      }
    ],
    "reviews": [
      {
        "id": "r1",
        "author": "سارة أحمد",
        "rating": 5,
        "date": "2026-05-12",
        "text": "جودة ممتازة وتغليف رائع، تستحق السعر بكل تأكيد."
      },
      {
        "id": "r2",
        "author": "محمد علي",
        "rating": 4,
        "date": "2026-04-28",
        "text": "منتج جميل ووصل بسرعة، أنصح به."
      }
    ]
  },
  {
    "id": "p2",
    "slug": "serving-2",
    "name": "حامل مناديل أنيق",
    "nameEn": "serving item 2",
    "brandId": "b1",
    "categorySlug": "serving",
    "price": 235,
    "rating": 4.9,
    "reviewsCount": 42,
    "images": [
      "/assets/products/p02.jpg",
      "/assets/products/p03.jpg",
      "/assets/products/p04.jpg"
    ],
    "inStock": true,
    "isFeatured": false,
    "isBestseller": false,
    "isNew": false,
    "description": "قطعة فاخرة بتصميم عصري أنيق تضيف لمسة من الرقي إلى مائدتك. مصنوعة من خامات عالية الجودة مقاومة للاستخدام اليومي وسهلة التنظيف. مثالية للضيافة والمناسبات الخاصة، وتأتي بتشطيب راقٍ يدوم طويلاً.",
    "specs": [
      {
        "label": "الخامة",
        "value": "سيراميك / ستانلس ستيل عالي الجودة"
      },
      {
        "label": "عدد القطع",
        "value": "8"
      },
      {
        "label": "لون التشطيب",
        "value": "ذهبي"
      },
      {
        "label": "مناسب لغسالة الصحون",
        "value": "نعم"
      },
      {
        "label": "الضمان",
        "value": "سنة واحدة"
      }
    ],
    "reviews": [
      {
        "id": "r1",
        "author": "سارة أحمد",
        "rating": 5,
        "date": "2026-05-12",
        "text": "جودة ممتازة وتغليف رائع، تستحق السعر بكل تأكيد."
      },
      {
        "id": "r2",
        "author": "محمد علي",
        "rating": 4,
        "date": "2026-04-28",
        "text": "منتج جميل ووصل بسرعة، أنصح به."
      }
    ]
  },
  {
    "id": "p3",
    "slug": "serving-3",
    "name": "طقم صواني تقديم",
    "nameEn": "serving item 3",
    "brandId": "b2",
    "categorySlug": "serving",
    "price": 240,
    "oldPrice": 300,
    "rating": 4,
    "reviewsCount": 59,
    "images": [
      "/assets/products/p03.jpg",
      "/assets/products/p04.jpg",
      "/assets/products/p05.jpg"
    ],
    "inStock": true,
    "isFeatured": false,
    "isBestseller": false,
    "isNew": false,
    "badge": "خصم",
    "description": "قطعة فاخرة بتصميم عصري أنيق تضيف لمسة من الرقي إلى مائدتك. مصنوعة من خامات عالية الجودة مقاومة للاستخدام اليومي وسهلة التنظيف. مثالية للضيافة والمناسبات الخاصة، وتأتي بتشطيب راقٍ يدوم طويلاً.",
    "specs": [
      {
        "label": "الخامة",
        "value": "سيراميك / ستانلس ستيل عالي الجودة"
      },
      {
        "label": "عدد القطع",
        "value": "9"
      },
      {
        "label": "لون التشطيب",
        "value": "كلاسيك"
      },
      {
        "label": "مناسب لغسالة الصحون",
        "value": "يُغسل باليد"
      },
      {
        "label": "الضمان",
        "value": "سنة واحدة"
      }
    ],
    "reviews": [
      {
        "id": "r1",
        "author": "سارة أحمد",
        "rating": 5,
        "date": "2026-05-12",
        "text": "جودة ممتازة وتغليف رائع، تستحق السعر بكل تأكيد."
      },
      {
        "id": "r2",
        "author": "محمد علي",
        "rating": 4,
        "date": "2026-04-28",
        "text": "منتج جميل ووصل بسرعة، أنصح به."
      }
    ]
  },
  {
    "id": "p4",
    "slug": "serving-4",
    "name": "صينية تقديم مذهّبة",
    "nameEn": "serving item 4",
    "brandId": "b1",
    "categorySlug": "serving",
    "price": 220,
    "rating": 4.7,
    "reviewsCount": 76,
    "images": [
      "/assets/products/p04.jpg",
      "/assets/products/p05.jpg",
      "/assets/products/p06.jpg"
    ],
    "inStock": true,
    "isFeatured": false,
    "isBestseller": true,
    "isNew": false,
    "description": "قطعة فاخرة بتصميم عصري أنيق تضيف لمسة من الرقي إلى مائدتك. مصنوعة من خامات عالية الجودة مقاومة للاستخدام اليومي وسهلة التنظيف. مثالية للضيافة والمناسبات الخاصة، وتأتي بتشطيب راقٍ يدوم طويلاً.",
    "specs": [
      {
        "label": "الخامة",
        "value": "سيراميك / ستانلس ستيل عالي الجودة"
      },
      {
        "label": "عدد القطع",
        "value": "10"
      },
      {
        "label": "لون التشطيب",
        "value": "أبيض"
      },
      {
        "label": "مناسب لغسالة الصحون",
        "value": "نعم"
      },
      {
        "label": "الضمان",
        "value": "سنة واحدة"
      }
    ],
    "reviews": [
      {
        "id": "r1",
        "author": "سارة أحمد",
        "rating": 5,
        "date": "2026-05-12",
        "text": "جودة ممتازة وتغليف رائع، تستحق السعر بكل تأكيد."
      },
      {
        "id": "r2",
        "author": "محمد علي",
        "rating": 4,
        "date": "2026-04-28",
        "text": "منتج جميل ووصل بسرعة، أنصح به."
      }
    ]
  },
  {
    "id": "p5",
    "slug": "serving-5",
    "name": "حامل تقديم متعدد",
    "nameEn": "serving item 5",
    "brandId": "b2",
    "categorySlug": "serving",
    "price": 200,
    "rating": 3.8,
    "reviewsCount": 93,
    "images": [
      "/assets/products/p05.jpg",
      "/assets/products/p06.jpg",
      "/assets/products/p07.jpg"
    ],
    "inStock": true,
    "isFeatured": true,
    "isBestseller": false,
    "isNew": false,
    "description": "قطعة فاخرة بتصميم عصري أنيق تضيف لمسة من الرقي إلى مائدتك. مصنوعة من خامات عالية الجودة مقاومة للاستخدام اليومي وسهلة التنظيف. مثالية للضيافة والمناسبات الخاصة، وتأتي بتشطيب راقٍ يدوم طويلاً.",
    "specs": [
      {
        "label": "الخامة",
        "value": "سيراميك / ستانلس ستيل عالي الجودة"
      },
      {
        "label": "عدد القطع",
        "value": "11"
      },
      {
        "label": "لون التشطيب",
        "value": "رمادي"
      },
      {
        "label": "مناسب لغسالة الصحون",
        "value": "يُغسل باليد"
      },
      {
        "label": "الضمان",
        "value": "سنة واحدة"
      }
    ],
    "reviews": [
      {
        "id": "r1",
        "author": "سارة أحمد",
        "rating": 5,
        "date": "2026-05-12",
        "text": "جودة ممتازة وتغليف رائع، تستحق السعر بكل تأكيد."
      },
      {
        "id": "r2",
        "author": "محمد علي",
        "rating": 4,
        "date": "2026-04-28",
        "text": "منتج جميل ووصل بسرعة، أنصح به."
      }
    ]
  },
  {
    "id": "p6",
    "slug": "serving-6",
    "name": "طبق تقديم فاخر",
    "nameEn": "serving item 6",
    "brandId": "b1",
    "categorySlug": "serving",
    "price": 205,
    "oldPrice": 255,
    "rating": 4.5,
    "reviewsCount": 110,
    "images": [
      "/assets/products/p06.jpg",
      "/assets/products/p07.jpg",
      "/assets/products/p08.jpg"
    ],
    "inStock": true,
    "isFeatured": false,
    "isBestseller": false,
    "isNew": false,
    "badge": "خصم",
    "description": "قطعة فاخرة بتصميم عصري أنيق تضيف لمسة من الرقي إلى مائدتك. مصنوعة من خامات عالية الجودة مقاومة للاستخدام اليومي وسهلة التنظيف. مثالية للضيافة والمناسبات الخاصة، وتأتي بتشطيب راقٍ يدوم طويلاً.",
    "specs": [
      {
        "label": "الخامة",
        "value": "سيراميك / ستانلس ستيل عالي الجودة"
      },
      {
        "label": "عدد القطع",
        "value": "12"
      },
      {
        "label": "لون التشطيب",
        "value": "ذهبي"
      },
      {
        "label": "مناسب لغسالة الصحون",
        "value": "نعم"
      },
      {
        "label": "الضمان",
        "value": "سنة واحدة"
      }
    ],
    "reviews": [
      {
        "id": "r1",
        "author": "سارة أحمد",
        "rating": 5,
        "date": "2026-05-12",
        "text": "جودة ممتازة وتغليف رائع، تستحق السعر بكل تأكيد."
      },
      {
        "id": "r2",
        "author": "محمد علي",
        "rating": 4,
        "date": "2026-04-28",
        "text": "منتج جميل ووصل بسرعة، أنصح به."
      }
    ]
  },
  {
    "id": "p7",
    "slug": "serving-7",
    "name": "صينية حلويات",
    "nameEn": "serving item 7",
    "brandId": "b2",
    "categorySlug": "serving",
    "price": 185,
    "rating": 3.6,
    "reviewsCount": 127,
    "images": [
      "/assets/products/p07.jpg",
      "/assets/products/p08.jpg",
      "/assets/products/p09.jpg"
    ],
    "inStock": true,
    "isFeatured": false,
    "isBestseller": false,
    "isNew": false,
    "description": "قطعة فاخرة بتصميم عصري أنيق تضيف لمسة من الرقي إلى مائدتك. مصنوعة من خامات عالية الجودة مقاومة للاستخدام اليومي وسهلة التنظيف. مثالية للضيافة والمناسبات الخاصة، وتأتي بتشطيب راقٍ يدوم طويلاً.",
    "specs": [
      {
        "label": "الخامة",
        "value": "سيراميك / ستانلس ستيل عالي الجودة"
      },
      {
        "label": "عدد القطع",
        "value": "13"
      },
      {
        "label": "لون التشطيب",
        "value": "كلاسيك"
      },
      {
        "label": "مناسب لغسالة الصحون",
        "value": "يُغسل باليد"
      },
      {
        "label": "الضمان",
        "value": "سنة واحدة"
      }
    ],
    "reviews": [
      {
        "id": "r1",
        "author": "سارة أحمد",
        "rating": 5,
        "date": "2026-05-12",
        "text": "جودة ممتازة وتغليف رائع، تستحق السعر بكل تأكيد."
      },
      {
        "id": "r2",
        "author": "محمد علي",
        "rating": 4,
        "date": "2026-04-28",
        "text": "منتج جميل ووصل بسرعة، أنصح به."
      }
    ]
  },
  {
    "id": "p8",
    "slug": "serving-8",
    "name": "طقم تقديم راقٍ",
    "nameEn": "serving item 8",
    "brandId": "b1",
    "categorySlug": "serving",
    "price": 190,
    "rating": 4.3,
    "reviewsCount": 144,
    "images": [
      "/assets/products/p08.jpg",
      "/assets/products/p09.jpg",
      "/assets/products/p10.jpg"
    ],
    "inStock": true,
    "isFeatured": false,
    "isBestseller": true,
    "isNew": false,
    "description": "قطعة فاخرة بتصميم عصري أنيق تضيف لمسة من الرقي إلى مائدتك. مصنوعة من خامات عالية الجودة مقاومة للاستخدام اليومي وسهلة التنظيف. مثالية للضيافة والمناسبات الخاصة، وتأتي بتشطيب راقٍ يدوم طويلاً.",
    "specs": [
      {
        "label": "الخامة",
        "value": "سيراميك / ستانلس ستيل عالي الجودة"
      },
      {
        "label": "عدد القطع",
        "value": "14"
      },
      {
        "label": "لون التشطيب",
        "value": "أبيض"
      },
      {
        "label": "مناسب لغسالة الصحون",
        "value": "نعم"
      },
      {
        "label": "الضمان",
        "value": "سنة واحدة"
      }
    ],
    "reviews": [
      {
        "id": "r1",
        "author": "سارة أحمد",
        "rating": 5,
        "date": "2026-05-12",
        "text": "جودة ممتازة وتغليف رائع، تستحق السعر بكل تأكيد."
      },
      {
        "id": "r2",
        "author": "محمد علي",
        "rating": 4,
        "date": "2026-04-28",
        "text": "منتج جميل ووصل بسرعة، أنصح به."
      }
    ]
  },
  {
    "id": "p9",
    "slug": "accessories-9",
    "name": "حامل أكواب أنيق",
    "nameEn": "accessories item 9",
    "brandId": "b2",
    "categorySlug": "accessories",
    "price": 170,
    "oldPrice": 215,
    "rating": 5,
    "reviewsCount": 21,
    "images": [
      "/assets/products/p09.jpg",
      "/assets/products/p10.jpg",
      "/assets/products/p11.jpg"
    ],
    "inStock": true,
    "isFeatured": false,
    "isBestseller": false,
    "isNew": false,
    "badge": "خصم",
    "description": "قطعة فاخرة بتصميم عصري أنيق تضيف لمسة من الرقي إلى مائدتك. مصنوعة من خامات عالية الجودة مقاومة للاستخدام اليومي وسهلة التنظيف. مثالية للضيافة والمناسبات الخاصة، وتأتي بتشطيب راقٍ يدوم طويلاً.",
    "specs": [
      {
        "label": "الخامة",
        "value": "سيراميك / ستانلس ستيل عالي الجودة"
      },
      {
        "label": "عدد القطع",
        "value": "15"
      },
      {
        "label": "لون التشطيب",
        "value": "رمادي"
      },
      {
        "label": "مناسب لغسالة الصحون",
        "value": "يُغسل باليد"
      },
      {
        "label": "الضمان",
        "value": "سنة واحدة"
      }
    ],
    "reviews": [
      {
        "id": "r1",
        "author": "سارة أحمد",
        "rating": 5,
        "date": "2026-05-12",
        "text": "جودة ممتازة وتغليف رائع، تستحق السعر بكل تأكيد."
      },
      {
        "id": "r2",
        "author": "محمد علي",
        "rating": 4,
        "date": "2026-04-28",
        "text": "منتج جميل ووصل بسرعة، أنصح به."
      }
    ]
  },
  {
    "id": "p10",
    "slug": "accessories-10",
    "name": "منظم أدوات المطبخ",
    "nameEn": "accessories item 10",
    "brandId": "b1",
    "categorySlug": "accessories",
    "price": 150,
    "rating": 4.1,
    "reviewsCount": 38,
    "images": [
      "/assets/products/p10.jpg",
      "/assets/products/p11.jpg",
      "/assets/products/p12.jpg"
    ],
    "inStock": true,
    "isFeatured": true,
    "isBestseller": false,
    "isNew": false,
    "description": "قطعة فاخرة بتصميم عصري أنيق تضيف لمسة من الرقي إلى مائدتك. مصنوعة من خامات عالية الجودة مقاومة للاستخدام اليومي وسهلة التنظيف. مثالية للضيافة والمناسبات الخاصة، وتأتي بتشطيب راقٍ يدوم طويلاً.",
    "specs": [
      {
        "label": "الخامة",
        "value": "سيراميك / ستانلس ستيل عالي الجودة"
      },
      {
        "label": "عدد القطع",
        "value": "16"
      },
      {
        "label": "لون التشطيب",
        "value": "ذهبي"
      },
      {
        "label": "مناسب لغسالة الصحون",
        "value": "نعم"
      },
      {
        "label": "الضمان",
        "value": "سنة واحدة"
      }
    ],
    "reviews": [
      {
        "id": "r1",
        "author": "سارة أحمد",
        "rating": 5,
        "date": "2026-05-12",
        "text": "جودة ممتازة وتغليف رائع، تستحق السعر بكل تأكيد."
      },
      {
        "id": "r2",
        "author": "محمد علي",
        "rating": 4,
        "date": "2026-04-28",
        "text": "منتج جميل ووصل بسرعة، أنصح به."
      }
    ]
  },
  {
    "id": "p11",
    "slug": "accessories-11",
    "name": "حامل تقديم معدني",
    "nameEn": "accessories item 11",
    "brandId": "b2",
    "categorySlug": "accessories",
    "price": 155,
    "rating": 4.8,
    "reviewsCount": 55,
    "images": [
      "/assets/products/p11.jpg",
      "/assets/products/p12.jpg",
      "/assets/products/p13.jpg"
    ],
    "inStock": false,
    "isFeatured": false,
    "isBestseller": false,
    "isNew": false,
    "description": "قطعة فاخرة بتصميم عصري أنيق تضيف لمسة من الرقي إلى مائدتك. مصنوعة من خامات عالية الجودة مقاومة للاستخدام اليومي وسهلة التنظيف. مثالية للضيافة والمناسبات الخاصة، وتأتي بتشطيب راقٍ يدوم طويلاً.",
    "specs": [
      {
        "label": "الخامة",
        "value": "سيراميك / ستانلس ستيل عالي الجودة"
      },
      {
        "label": "عدد القطع",
        "value": "17"
      },
      {
        "label": "لون التشطيب",
        "value": "كلاسيك"
      },
      {
        "label": "مناسب لغسالة الصحون",
        "value": "يُغسل باليد"
      },
      {
        "label": "الضمان",
        "value": "سنة واحدة"
      }
    ],
    "reviews": [
      {
        "id": "r1",
        "author": "سارة أحمد",
        "rating": 5,
        "date": "2026-05-12",
        "text": "جودة ممتازة وتغليف رائع، تستحق السعر بكل تأكيد."
      },
      {
        "id": "r2",
        "author": "محمد علي",
        "rating": 4,
        "date": "2026-04-28",
        "text": "منتج جميل ووصل بسرعة، أنصح به."
      }
    ]
  },
  {
    "id": "p12",
    "slug": "accessories-12",
    "name": "إكسسوار طاولة مذهّب",
    "nameEn": "accessories item 12",
    "brandId": "b1",
    "categorySlug": "accessories",
    "price": 135,
    "oldPrice": 170,
    "rating": 3.9,
    "reviewsCount": 72,
    "images": [
      "/assets/products/p12.jpg",
      "/assets/products/p13.jpg",
      "/assets/products/p14.jpg"
    ],
    "inStock": true,
    "isFeatured": false,
    "isBestseller": true,
    "isNew": false,
    "badge": "خصم",
    "description": "قطعة فاخرة بتصميم عصري أنيق تضيف لمسة من الرقي إلى مائدتك. مصنوعة من خامات عالية الجودة مقاومة للاستخدام اليومي وسهلة التنظيف. مثالية للضيافة والمناسبات الخاصة، وتأتي بتشطيب راقٍ يدوم طويلاً.",
    "specs": [
      {
        "label": "الخامة",
        "value": "سيراميك / ستانلس ستيل عالي الجودة"
      },
      {
        "label": "عدد القطع",
        "value": "18"
      },
      {
        "label": "لون التشطيب",
        "value": "أبيض"
      },
      {
        "label": "مناسب لغسالة الصحون",
        "value": "نعم"
      },
      {
        "label": "الضمان",
        "value": "سنة واحدة"
      }
    ],
    "reviews": [
      {
        "id": "r1",
        "author": "سارة أحمد",
        "rating": 5,
        "date": "2026-05-12",
        "text": "جودة ممتازة وتغليف رائع، تستحق السعر بكل تأكيد."
      },
      {
        "id": "r2",
        "author": "محمد علي",
        "rating": 4,
        "date": "2026-04-28",
        "text": "منتج جميل ووصل بسرعة، أنصح به."
      }
    ]
  },
  {
    "id": "p13",
    "slug": "accessories-13",
    "name": "حامل فوط مطبخ",
    "nameEn": "accessories item 13",
    "brandId": "b2",
    "categorySlug": "accessories",
    "price": 140,
    "rating": 4.6,
    "reviewsCount": 89,
    "images": [
      "/assets/products/p13.jpg",
      "/assets/products/p14.jpg",
      "/assets/products/p15.jpg"
    ],
    "inStock": true,
    "isFeatured": false,
    "isBestseller": false,
    "isNew": false,
    "description": "قطعة فاخرة بتصميم عصري أنيق تضيف لمسة من الرقي إلى مائدتك. مصنوعة من خامات عالية الجودة مقاومة للاستخدام اليومي وسهلة التنظيف. مثالية للضيافة والمناسبات الخاصة، وتأتي بتشطيب راقٍ يدوم طويلاً.",
    "specs": [
      {
        "label": "الخامة",
        "value": "سيراميك / ستانلس ستيل عالي الجودة"
      },
      {
        "label": "عدد القطع",
        "value": "19"
      },
      {
        "label": "لون التشطيب",
        "value": "رمادي"
      },
      {
        "label": "مناسب لغسالة الصحون",
        "value": "يُغسل باليد"
      },
      {
        "label": "الضمان",
        "value": "سنة واحدة"
      }
    ],
    "reviews": [
      {
        "id": "r1",
        "author": "سارة أحمد",
        "rating": 5,
        "date": "2026-05-12",
        "text": "جودة ممتازة وتغليف رائع، تستحق السعر بكل تأكيد."
      },
      {
        "id": "r2",
        "author": "محمد علي",
        "rating": 4,
        "date": "2026-04-28",
        "text": "منتج جميل ووصل بسرعة، أنصح به."
      }
    ]
  },
  {
    "id": "p14",
    "slug": "accessories-14",
    "name": "منظم مائدة عملي",
    "nameEn": "accessories item 14",
    "brandId": "b1",
    "categorySlug": "accessories",
    "price": 120,
    "rating": 3.7,
    "reviewsCount": 106,
    "images": [
      "/assets/products/p14.jpg",
      "/assets/products/p15.jpg",
      "/assets/products/p16.jpg"
    ],
    "inStock": true,
    "isFeatured": false,
    "isBestseller": false,
    "isNew": false,
    "description": "قطعة فاخرة بتصميم عصري أنيق تضيف لمسة من الرقي إلى مائدتك. مصنوعة من خامات عالية الجودة مقاومة للاستخدام اليومي وسهلة التنظيف. مثالية للضيافة والمناسبات الخاصة، وتأتي بتشطيب راقٍ يدوم طويلاً.",
    "specs": [
      {
        "label": "الخامة",
        "value": "سيراميك / ستانلس ستيل عالي الجودة"
      },
      {
        "label": "عدد القطع",
        "value": "20"
      },
      {
        "label": "لون التشطيب",
        "value": "ذهبي"
      },
      {
        "label": "مناسب لغسالة الصحون",
        "value": "نعم"
      },
      {
        "label": "الضمان",
        "value": "سنة واحدة"
      }
    ],
    "reviews": [
      {
        "id": "r1",
        "author": "سارة أحمد",
        "rating": 5,
        "date": "2026-05-12",
        "text": "جودة ممتازة وتغليف رائع، تستحق السعر بكل تأكيد."
      },
      {
        "id": "r2",
        "author": "محمد علي",
        "rating": 4,
        "date": "2026-04-28",
        "text": "منتج جميل ووصل بسرعة، أنصح به."
      }
    ]
  },
  {
    "id": "p15",
    "slug": "accessories-15",
    "name": "حامل أكواب أنيق — تشكيلة 2",
    "nameEn": "accessories item 15",
    "brandId": "b2",
    "categorySlug": "accessories",
    "price": 100,
    "oldPrice": 125,
    "rating": 4.4,
    "reviewsCount": 123,
    "images": [
      "/assets/products/p15.jpg",
      "/assets/products/p16.jpg",
      "/assets/products/p17.jpg"
    ],
    "inStock": true,
    "isFeatured": true,
    "isBestseller": false,
    "isNew": false,
    "badge": "خصم",
    "description": "قطعة فاخرة بتصميم عصري أنيق تضيف لمسة من الرقي إلى مائدتك. مصنوعة من خامات عالية الجودة مقاومة للاستخدام اليومي وسهلة التنظيف. مثالية للضيافة والمناسبات الخاصة، وتأتي بتشطيب راقٍ يدوم طويلاً.",
    "specs": [
      {
        "label": "الخامة",
        "value": "سيراميك / ستانلس ستيل عالي الجودة"
      },
      {
        "label": "عدد القطع",
        "value": "21"
      },
      {
        "label": "لون التشطيب",
        "value": "كلاسيك"
      },
      {
        "label": "مناسب لغسالة الصحون",
        "value": "يُغسل باليد"
      },
      {
        "label": "الضمان",
        "value": "سنة واحدة"
      }
    ],
    "reviews": [
      {
        "id": "r1",
        "author": "سارة أحمد",
        "rating": 5,
        "date": "2026-05-12",
        "text": "جودة ممتازة وتغليف رائع، تستحق السعر بكل تأكيد."
      },
      {
        "id": "r2",
        "author": "محمد علي",
        "rating": 4,
        "date": "2026-04-28",
        "text": "منتج جميل ووصل بسرعة، أنصح به."
      }
    ]
  },
  {
    "id": "p16",
    "slug": "dinnerware-16",
    "name": "طقم صحون 18 قطعة",
    "nameEn": "dinnerware item 16",
    "brandId": "b1",
    "categorySlug": "dinnerware",
    "price": 105,
    "rating": 3.5,
    "reviewsCount": 140,
    "images": [
      "/assets/products/p16.jpg",
      "/assets/products/p17.jpg",
      "/assets/products/p18.jpg"
    ],
    "inStock": true,
    "isFeatured": false,
    "isBestseller": true,
    "isNew": false,
    "description": "قطعة فاخرة بتصميم عصري أنيق تضيف لمسة من الرقي إلى مائدتك. مصنوعة من خامات عالية الجودة مقاومة للاستخدام اليومي وسهلة التنظيف. مثالية للضيافة والمناسبات الخاصة، وتأتي بتشطيب راقٍ يدوم طويلاً.",
    "specs": [
      {
        "label": "الخامة",
        "value": "سيراميك / ستانلس ستيل عالي الجودة"
      },
      {
        "label": "عدد القطع",
        "value": "22"
      },
      {
        "label": "لون التشطيب",
        "value": "أبيض"
      },
      {
        "label": "مناسب لغسالة الصحون",
        "value": "نعم"
      },
      {
        "label": "الضمان",
        "value": "سنة واحدة"
      }
    ],
    "reviews": [
      {
        "id": "r1",
        "author": "سارة أحمد",
        "rating": 5,
        "date": "2026-05-12",
        "text": "جودة ممتازة وتغليف رائع، تستحق السعر بكل تأكيد."
      },
      {
        "id": "r2",
        "author": "محمد علي",
        "rating": 4,
        "date": "2026-04-28",
        "text": "منتج جميل ووصل بسرعة، أنصح به."
      }
    ]
  },
  {
    "id": "p17",
    "slug": "dinnerware-17",
    "name": "طقم عشاء بورسلين فاخر",
    "nameEn": "dinnerware item 17",
    "brandId": "b2",
    "categorySlug": "dinnerware",
    "price": 85,
    "rating": 4.2,
    "reviewsCount": 17,
    "images": [
      "/assets/products/p17.jpg",
      "/assets/products/p18.jpg",
      "/assets/products/p19.jpg"
    ],
    "inStock": true,
    "isFeatured": false,
    "isBestseller": false,
    "isNew": false,
    "description": "قطعة فاخرة بتصميم عصري أنيق تضيف لمسة من الرقي إلى مائدتك. مصنوعة من خامات عالية الجودة مقاومة للاستخدام اليومي وسهلة التنظيف. مثالية للضيافة والمناسبات الخاصة، وتأتي بتشطيب راقٍ يدوم طويلاً.",
    "specs": [
      {
        "label": "الخامة",
        "value": "سيراميك / ستانلس ستيل عالي الجودة"
      },
      {
        "label": "عدد القطع",
        "value": "23"
      },
      {
        "label": "لون التشطيب",
        "value": "رمادي"
      },
      {
        "label": "مناسب لغسالة الصحون",
        "value": "يُغسل باليد"
      },
      {
        "label": "الضمان",
        "value": "سنة واحدة"
      }
    ],
    "reviews": [
      {
        "id": "r1",
        "author": "سارة أحمد",
        "rating": 5,
        "date": "2026-05-12",
        "text": "جودة ممتازة وتغليف رائع، تستحق السعر بكل تأكيد."
      },
      {
        "id": "r2",
        "author": "محمد علي",
        "rating": 4,
        "date": "2026-04-28",
        "text": "منتج جميل ووصل بسرعة، أنصح به."
      }
    ]
  },
  {
    "id": "p18",
    "slug": "dinnerware-18",
    "name": "طقم صحون دائري مزخرف",
    "nameEn": "dinnerware item 18",
    "brandId": "b1",
    "categorySlug": "dinnerware",
    "price": 90,
    "oldPrice": 115,
    "rating": 4.9,
    "reviewsCount": 34,
    "images": [
      "/assets/products/p18.jpg",
      "/assets/products/p19.jpg",
      "/assets/products/p20.jpg"
    ],
    "inStock": true,
    "isFeatured": false,
    "isBestseller": false,
    "isNew": false,
    "badge": "خصم",
    "description": "قطعة فاخرة بتصميم عصري أنيق تضيف لمسة من الرقي إلى مائدتك. مصنوعة من خامات عالية الجودة مقاومة للاستخدام اليومي وسهلة التنظيف. مثالية للضيافة والمناسبات الخاصة، وتأتي بتشطيب راقٍ يدوم طويلاً.",
    "specs": [
      {
        "label": "الخامة",
        "value": "سيراميك / ستانلس ستيل عالي الجودة"
      },
      {
        "label": "عدد القطع",
        "value": "6"
      },
      {
        "label": "لون التشطيب",
        "value": "ذهبي"
      },
      {
        "label": "مناسب لغسالة الصحون",
        "value": "نعم"
      },
      {
        "label": "الضمان",
        "value": "سنة واحدة"
      }
    ],
    "reviews": [
      {
        "id": "r1",
        "author": "سارة أحمد",
        "rating": 5,
        "date": "2026-05-12",
        "text": "جودة ممتازة وتغليف رائع، تستحق السعر بكل تأكيد."
      },
      {
        "id": "r2",
        "author": "محمد علي",
        "rating": 4,
        "date": "2026-04-28",
        "text": "منتج جميل ووصل بسرعة، أنصح به."
      }
    ]
  },
  {
    "id": "p19",
    "slug": "dinnerware-19",
    "name": "طقم تقديم 12 قطعة",
    "nameEn": "dinnerware item 19",
    "brandId": "b2",
    "categorySlug": "dinnerware",
    "price": 70,
    "rating": 4,
    "reviewsCount": 51,
    "images": [
      "/assets/products/p19.jpg",
      "/assets/products/p20.jpg",
      "/assets/products/p21.jpg"
    ],
    "inStock": true,
    "isFeatured": false,
    "isBestseller": false,
    "isNew": false,
    "description": "قطعة فاخرة بتصميم عصري أنيق تضيف لمسة من الرقي إلى مائدتك. مصنوعة من خامات عالية الجودة مقاومة للاستخدام اليومي وسهلة التنظيف. مثالية للضيافة والمناسبات الخاصة، وتأتي بتشطيب راقٍ يدوم طويلاً.",
    "specs": [
      {
        "label": "الخامة",
        "value": "سيراميك / ستانلس ستيل عالي الجودة"
      },
      {
        "label": "عدد القطع",
        "value": "7"
      },
      {
        "label": "لون التشطيب",
        "value": "كلاسيك"
      },
      {
        "label": "مناسب لغسالة الصحون",
        "value": "يُغسل باليد"
      },
      {
        "label": "الضمان",
        "value": "سنة واحدة"
      }
    ],
    "reviews": [
      {
        "id": "r1",
        "author": "سارة أحمد",
        "rating": 5,
        "date": "2026-05-12",
        "text": "جودة ممتازة وتغليف رائع، تستحق السعر بكل تأكيد."
      },
      {
        "id": "r2",
        "author": "محمد علي",
        "rating": 4,
        "date": "2026-04-28",
        "text": "منتج جميل ووصل بسرعة، أنصح به."
      }
    ]
  },
  {
    "id": "p20",
    "slug": "dinnerware-20",
    "name": "أطباق سيراميك راقية",
    "nameEn": "dinnerware item 20",
    "brandId": "b1",
    "categorySlug": "dinnerware",
    "price": 240,
    "rating": 4.7,
    "reviewsCount": 68,
    "images": [
      "/assets/products/p20.jpg",
      "/assets/products/p21.jpg",
      "/assets/products/p22.jpg"
    ],
    "inStock": true,
    "isFeatured": true,
    "isBestseller": true,
    "isNew": false,
    "description": "قطعة فاخرة بتصميم عصري أنيق تضيف لمسة من الرقي إلى مائدتك. مصنوعة من خامات عالية الجودة مقاومة للاستخدام اليومي وسهلة التنظيف. مثالية للضيافة والمناسبات الخاصة، وتأتي بتشطيب راقٍ يدوم طويلاً.",
    "specs": [
      {
        "label": "الخامة",
        "value": "سيراميك / ستانلس ستيل عالي الجودة"
      },
      {
        "label": "عدد القطع",
        "value": "8"
      },
      {
        "label": "لون التشطيب",
        "value": "أبيض"
      },
      {
        "label": "مناسب لغسالة الصحون",
        "value": "نعم"
      },
      {
        "label": "الضمان",
        "value": "سنة واحدة"
      }
    ],
    "reviews": [
      {
        "id": "r1",
        "author": "سارة أحمد",
        "rating": 5,
        "date": "2026-05-12",
        "text": "جودة ممتازة وتغليف رائع، تستحق السعر بكل تأكيد."
      },
      {
        "id": "r2",
        "author": "محمد علي",
        "rating": 4,
        "date": "2026-04-28",
        "text": "منتج جميل ووصل بسرعة، أنصح به."
      }
    ]
  },
  {
    "id": "p21",
    "slug": "dinnerware-21",
    "name": "طقم صحون عميقة",
    "nameEn": "dinnerware item 21",
    "brandId": "b2",
    "categorySlug": "dinnerware",
    "price": 245,
    "oldPrice": 305,
    "rating": 3.8,
    "reviewsCount": 85,
    "images": [
      "/assets/products/p21.jpg",
      "/assets/products/p22.jpg",
      "/assets/products/p23.jpg"
    ],
    "inStock": true,
    "isFeatured": false,
    "isBestseller": false,
    "isNew": false,
    "badge": "خصم",
    "description": "قطعة فاخرة بتصميم عصري أنيق تضيف لمسة من الرقي إلى مائدتك. مصنوعة من خامات عالية الجودة مقاومة للاستخدام اليومي وسهلة التنظيف. مثالية للضيافة والمناسبات الخاصة، وتأتي بتشطيب راقٍ يدوم طويلاً.",
    "specs": [
      {
        "label": "الخامة",
        "value": "سيراميك / ستانلس ستيل عالي الجودة"
      },
      {
        "label": "عدد القطع",
        "value": "9"
      },
      {
        "label": "لون التشطيب",
        "value": "رمادي"
      },
      {
        "label": "مناسب لغسالة الصحون",
        "value": "يُغسل باليد"
      },
      {
        "label": "الضمان",
        "value": "سنة واحدة"
      }
    ],
    "reviews": [
      {
        "id": "r1",
        "author": "سارة أحمد",
        "rating": 5,
        "date": "2026-05-12",
        "text": "جودة ممتازة وتغليف رائع، تستحق السعر بكل تأكيد."
      },
      {
        "id": "r2",
        "author": "محمد علي",
        "rating": 4,
        "date": "2026-04-28",
        "text": "منتج جميل ووصل بسرعة، أنصح به."
      }
    ]
  },
  {
    "id": "p22",
    "slug": "dinnerware-22",
    "name": "طقم أطباق تقديم ملكي",
    "nameEn": "dinnerware item 22",
    "brandId": "b1",
    "categorySlug": "dinnerware",
    "price": 225,
    "rating": 4.5,
    "reviewsCount": 102,
    "images": [
      "/assets/products/p22.jpg",
      "/assets/products/p23.jpg",
      "/assets/products/p24.jpg"
    ],
    "inStock": false,
    "isFeatured": false,
    "isBestseller": false,
    "isNew": false,
    "description": "قطعة فاخرة بتصميم عصري أنيق تضيف لمسة من الرقي إلى مائدتك. مصنوعة من خامات عالية الجودة مقاومة للاستخدام اليومي وسهلة التنظيف. مثالية للضيافة والمناسبات الخاصة، وتأتي بتشطيب راقٍ يدوم طويلاً.",
    "specs": [
      {
        "label": "الخامة",
        "value": "سيراميك / ستانلس ستيل عالي الجودة"
      },
      {
        "label": "عدد القطع",
        "value": "10"
      },
      {
        "label": "لون التشطيب",
        "value": "ذهبي"
      },
      {
        "label": "مناسب لغسالة الصحون",
        "value": "نعم"
      },
      {
        "label": "الضمان",
        "value": "سنة واحدة"
      }
    ],
    "reviews": [
      {
        "id": "r1",
        "author": "سارة أحمد",
        "rating": 5,
        "date": "2026-05-12",
        "text": "جودة ممتازة وتغليف رائع، تستحق السعر بكل تأكيد."
      },
      {
        "id": "r2",
        "author": "محمد علي",
        "rating": 4,
        "date": "2026-04-28",
        "text": "منتج جميل ووصل بسرعة، أنصح به."
      }
    ]
  },
  {
    "id": "p23",
    "slug": "dinnerware-23",
    "name": "طقم عشاء عصري",
    "nameEn": "dinnerware item 23",
    "brandId": "b2",
    "categorySlug": "dinnerware",
    "price": 230,
    "rating": 3.6,
    "reviewsCount": 119,
    "images": [
      "/assets/products/p23.jpg",
      "/assets/products/p24.jpg",
      "/assets/products/p25.jpg"
    ],
    "inStock": true,
    "isFeatured": false,
    "isBestseller": false,
    "isNew": false,
    "description": "قطعة فاخرة بتصميم عصري أنيق تضيف لمسة من الرقي إلى مائدتك. مصنوعة من خامات عالية الجودة مقاومة للاستخدام اليومي وسهلة التنظيف. مثالية للضيافة والمناسبات الخاصة، وتأتي بتشطيب راقٍ يدوم طويلاً.",
    "specs": [
      {
        "label": "الخامة",
        "value": "سيراميك / ستانلس ستيل عالي الجودة"
      },
      {
        "label": "عدد القطع",
        "value": "11"
      },
      {
        "label": "لون التشطيب",
        "value": "كلاسيك"
      },
      {
        "label": "مناسب لغسالة الصحون",
        "value": "يُغسل باليد"
      },
      {
        "label": "الضمان",
        "value": "سنة واحدة"
      }
    ],
    "reviews": [
      {
        "id": "r1",
        "author": "سارة أحمد",
        "rating": 5,
        "date": "2026-05-12",
        "text": "جودة ممتازة وتغليف رائع، تستحق السعر بكل تأكيد."
      },
      {
        "id": "r2",
        "author": "محمد علي",
        "rating": 4,
        "date": "2026-04-28",
        "text": "منتج جميل ووصل بسرعة، أنصح به."
      }
    ]
  },
  {
    "id": "p24",
    "slug": "dinnerware-24",
    "name": "طقم صحون 18 قطعة — تشكيلة 2",
    "nameEn": "dinnerware item 24",
    "brandId": "b1",
    "categorySlug": "dinnerware",
    "price": 210,
    "oldPrice": 265,
    "rating": 4.3,
    "reviewsCount": 136,
    "images": [
      "/assets/products/p24.jpg",
      "/assets/products/p25.jpg",
      "/assets/products/p26.jpg"
    ],
    "inStock": true,
    "isFeatured": false,
    "isBestseller": true,
    "isNew": false,
    "badge": "خصم",
    "description": "قطعة فاخرة بتصميم عصري أنيق تضيف لمسة من الرقي إلى مائدتك. مصنوعة من خامات عالية الجودة مقاومة للاستخدام اليومي وسهلة التنظيف. مثالية للضيافة والمناسبات الخاصة، وتأتي بتشطيب راقٍ يدوم طويلاً.",
    "specs": [
      {
        "label": "الخامة",
        "value": "سيراميك / ستانلس ستيل عالي الجودة"
      },
      {
        "label": "عدد القطع",
        "value": "12"
      },
      {
        "label": "لون التشطيب",
        "value": "أبيض"
      },
      {
        "label": "مناسب لغسالة الصحون",
        "value": "نعم"
      },
      {
        "label": "الضمان",
        "value": "سنة واحدة"
      }
    ],
    "reviews": [
      {
        "id": "r1",
        "author": "سارة أحمد",
        "rating": 5,
        "date": "2026-05-12",
        "text": "جودة ممتازة وتغليف رائع، تستحق السعر بكل تأكيد."
      },
      {
        "id": "r2",
        "author": "محمد علي",
        "rating": 4,
        "date": "2026-04-28",
        "text": "منتج جميل ووصل بسرعة، أنصح به."
      }
    ]
  },
  {
    "id": "p25",
    "slug": "dinnerware-25",
    "name": "طقم عشاء بورسلين فاخر — تشكيلة 2",
    "nameEn": "dinnerware item 25",
    "brandId": "b2",
    "categorySlug": "dinnerware",
    "price": 190,
    "rating": 5,
    "reviewsCount": 13,
    "images": [
      "/assets/products/p25.jpg",
      "/assets/products/p26.jpg",
      "/assets/products/p27.jpg"
    ],
    "inStock": true,
    "isFeatured": true,
    "isBestseller": false,
    "isNew": false,
    "description": "قطعة فاخرة بتصميم عصري أنيق تضيف لمسة من الرقي إلى مائدتك. مصنوعة من خامات عالية الجودة مقاومة للاستخدام اليومي وسهلة التنظيف. مثالية للضيافة والمناسبات الخاصة، وتأتي بتشطيب راقٍ يدوم طويلاً.",
    "specs": [
      {
        "label": "الخامة",
        "value": "سيراميك / ستانلس ستيل عالي الجودة"
      },
      {
        "label": "عدد القطع",
        "value": "13"
      },
      {
        "label": "لون التشطيب",
        "value": "رمادي"
      },
      {
        "label": "مناسب لغسالة الصحون",
        "value": "يُغسل باليد"
      },
      {
        "label": "الضمان",
        "value": "سنة واحدة"
      }
    ],
    "reviews": [
      {
        "id": "r1",
        "author": "سارة أحمد",
        "rating": 5,
        "date": "2026-05-12",
        "text": "جودة ممتازة وتغليف رائع، تستحق السعر بكل تأكيد."
      },
      {
        "id": "r2",
        "author": "محمد علي",
        "rating": 4,
        "date": "2026-04-28",
        "text": "منتج جميل ووصل بسرعة، أنصح به."
      }
    ]
  },
  {
    "id": "p26",
    "slug": "dinnerware-26",
    "name": "طقم صحون دائري مزخرف — تشكيلة 2",
    "nameEn": "dinnerware item 26",
    "brandId": "b1",
    "categorySlug": "dinnerware",
    "price": 195,
    "rating": 4.1,
    "reviewsCount": 30,
    "images": [
      "/assets/products/p26.jpg",
      "/assets/products/p27.jpg",
      "/assets/products/p28.jpg"
    ],
    "inStock": true,
    "isFeatured": false,
    "isBestseller": false,
    "isNew": false,
    "description": "قطعة فاخرة بتصميم عصري أنيق تضيف لمسة من الرقي إلى مائدتك. مصنوعة من خامات عالية الجودة مقاومة للاستخدام اليومي وسهلة التنظيف. مثالية للضيافة والمناسبات الخاصة، وتأتي بتشطيب راقٍ يدوم طويلاً.",
    "specs": [
      {
        "label": "الخامة",
        "value": "سيراميك / ستانلس ستيل عالي الجودة"
      },
      {
        "label": "عدد القطع",
        "value": "14"
      },
      {
        "label": "لون التشطيب",
        "value": "ذهبي"
      },
      {
        "label": "مناسب لغسالة الصحون",
        "value": "نعم"
      },
      {
        "label": "الضمان",
        "value": "سنة واحدة"
      }
    ],
    "reviews": [
      {
        "id": "r1",
        "author": "سارة أحمد",
        "rating": 5,
        "date": "2026-05-12",
        "text": "جودة ممتازة وتغليف رائع، تستحق السعر بكل تأكيد."
      },
      {
        "id": "r2",
        "author": "محمد علي",
        "rating": 4,
        "date": "2026-04-28",
        "text": "منتج جميل ووصل بسرعة، أنصح به."
      }
    ]
  },
  {
    "id": "p27",
    "slug": "dinnerware-27",
    "name": "طقم تقديم 12 قطعة — تشكيلة 2",
    "nameEn": "dinnerware item 27",
    "brandId": "b2",
    "categorySlug": "dinnerware",
    "price": 175,
    "oldPrice": 220,
    "rating": 4.8,
    "reviewsCount": 47,
    "images": [
      "/assets/products/p27.jpg",
      "/assets/products/p28.jpg",
      "/assets/products/p29.jpg"
    ],
    "inStock": true,
    "isFeatured": false,
    "isBestseller": false,
    "isNew": false,
    "badge": "خصم",
    "description": "قطعة فاخرة بتصميم عصري أنيق تضيف لمسة من الرقي إلى مائدتك. مصنوعة من خامات عالية الجودة مقاومة للاستخدام اليومي وسهلة التنظيف. مثالية للضيافة والمناسبات الخاصة، وتأتي بتشطيب راقٍ يدوم طويلاً.",
    "specs": [
      {
        "label": "الخامة",
        "value": "سيراميك / ستانلس ستيل عالي الجودة"
      },
      {
        "label": "عدد القطع",
        "value": "15"
      },
      {
        "label": "لون التشطيب",
        "value": "كلاسيك"
      },
      {
        "label": "مناسب لغسالة الصحون",
        "value": "يُغسل باليد"
      },
      {
        "label": "الضمان",
        "value": "سنة واحدة"
      }
    ],
    "reviews": [
      {
        "id": "r1",
        "author": "سارة أحمد",
        "rating": 5,
        "date": "2026-05-12",
        "text": "جودة ممتازة وتغليف رائع، تستحق السعر بكل تأكيد."
      },
      {
        "id": "r2",
        "author": "محمد علي",
        "rating": 4,
        "date": "2026-04-28",
        "text": "منتج جميل ووصل بسرعة، أنصح به."
      }
    ]
  },
  {
    "id": "p28",
    "slug": "dinnerware-28",
    "name": "أطباق سيراميك راقية — تشكيلة 2",
    "nameEn": "dinnerware item 28",
    "brandId": "b1",
    "categorySlug": "dinnerware",
    "price": 180,
    "rating": 3.9,
    "reviewsCount": 64,
    "images": [
      "/assets/products/p28.jpg",
      "/assets/products/p29.jpg",
      "/assets/products/p30.jpg"
    ],
    "inStock": true,
    "isFeatured": false,
    "isBestseller": true,
    "isNew": false,
    "description": "قطعة فاخرة بتصميم عصري أنيق تضيف لمسة من الرقي إلى مائدتك. مصنوعة من خامات عالية الجودة مقاومة للاستخدام اليومي وسهلة التنظيف. مثالية للضيافة والمناسبات الخاصة، وتأتي بتشطيب راقٍ يدوم طويلاً.",
    "specs": [
      {
        "label": "الخامة",
        "value": "سيراميك / ستانلس ستيل عالي الجودة"
      },
      {
        "label": "عدد القطع",
        "value": "16"
      },
      {
        "label": "لون التشطيب",
        "value": "أبيض"
      },
      {
        "label": "مناسب لغسالة الصحون",
        "value": "نعم"
      },
      {
        "label": "الضمان",
        "value": "سنة واحدة"
      }
    ],
    "reviews": [
      {
        "id": "r1",
        "author": "سارة أحمد",
        "rating": 5,
        "date": "2026-05-12",
        "text": "جودة ممتازة وتغليف رائع، تستحق السعر بكل تأكيد."
      },
      {
        "id": "r2",
        "author": "محمد علي",
        "rating": 4,
        "date": "2026-04-28",
        "text": "منتج جميل ووصل بسرعة، أنصح به."
      }
    ]
  },
  {
    "id": "p29",
    "slug": "dinnerware-29",
    "name": "طقم صحون عميقة — تشكيلة 2",
    "nameEn": "dinnerware item 29",
    "brandId": "b2",
    "categorySlug": "dinnerware",
    "price": 160,
    "rating": 4.6,
    "reviewsCount": 81,
    "images": [
      "/assets/products/p29.jpg",
      "/assets/products/p30.jpg",
      "/assets/products/p31.jpg"
    ],
    "inStock": true,
    "isFeatured": false,
    "isBestseller": false,
    "isNew": false,
    "description": "قطعة فاخرة بتصميم عصري أنيق تضيف لمسة من الرقي إلى مائدتك. مصنوعة من خامات عالية الجودة مقاومة للاستخدام اليومي وسهلة التنظيف. مثالية للضيافة والمناسبات الخاصة، وتأتي بتشطيب راقٍ يدوم طويلاً.",
    "specs": [
      {
        "label": "الخامة",
        "value": "سيراميك / ستانلس ستيل عالي الجودة"
      },
      {
        "label": "عدد القطع",
        "value": "17"
      },
      {
        "label": "لون التشطيب",
        "value": "رمادي"
      },
      {
        "label": "مناسب لغسالة الصحون",
        "value": "يُغسل باليد"
      },
      {
        "label": "الضمان",
        "value": "سنة واحدة"
      }
    ],
    "reviews": [
      {
        "id": "r1",
        "author": "سارة أحمد",
        "rating": 5,
        "date": "2026-05-12",
        "text": "جودة ممتازة وتغليف رائع، تستحق السعر بكل تأكيد."
      },
      {
        "id": "r2",
        "author": "محمد علي",
        "rating": 4,
        "date": "2026-04-28",
        "text": "منتج جميل ووصل بسرعة، أنصح به."
      }
    ]
  },
  {
    "id": "p30",
    "slug": "dinnerware-30",
    "name": "طقم أطباق تقديم ملكي — تشكيلة 2",
    "nameEn": "dinnerware item 30",
    "brandId": "b1",
    "categorySlug": "dinnerware",
    "price": 140,
    "oldPrice": 175,
    "rating": 3.7,
    "reviewsCount": 98,
    "images": [
      "/assets/products/p30.jpg",
      "/assets/products/p31.jpg",
      "/assets/products/p32.jpg"
    ],
    "inStock": true,
    "isFeatured": true,
    "isBestseller": false,
    "isNew": false,
    "badge": "خصم",
    "description": "قطعة فاخرة بتصميم عصري أنيق تضيف لمسة من الرقي إلى مائدتك. مصنوعة من خامات عالية الجودة مقاومة للاستخدام اليومي وسهلة التنظيف. مثالية للضيافة والمناسبات الخاصة، وتأتي بتشطيب راقٍ يدوم طويلاً.",
    "specs": [
      {
        "label": "الخامة",
        "value": "سيراميك / ستانلس ستيل عالي الجودة"
      },
      {
        "label": "عدد القطع",
        "value": "18"
      },
      {
        "label": "لون التشطيب",
        "value": "ذهبي"
      },
      {
        "label": "مناسب لغسالة الصحون",
        "value": "نعم"
      },
      {
        "label": "الضمان",
        "value": "سنة واحدة"
      }
    ],
    "reviews": [
      {
        "id": "r1",
        "author": "سارة أحمد",
        "rating": 5,
        "date": "2026-05-12",
        "text": "جودة ممتازة وتغليف رائع، تستحق السعر بكل تأكيد."
      },
      {
        "id": "r2",
        "author": "محمد علي",
        "rating": 4,
        "date": "2026-04-28",
        "text": "منتج جميل ووصل بسرعة، أنصح به."
      }
    ]
  },
  {
    "id": "p31",
    "slug": "dinnerware-31",
    "name": "طقم عشاء عصري — تشكيلة 2",
    "nameEn": "dinnerware item 31",
    "brandId": "b2",
    "categorySlug": "dinnerware",
    "price": 145,
    "rating": 4.4,
    "reviewsCount": 115,
    "images": [
      "/assets/products/p31.jpg",
      "/assets/products/p32.jpg",
      "/assets/products/p33.jpg"
    ],
    "inStock": true,
    "isFeatured": false,
    "isBestseller": false,
    "isNew": false,
    "description": "قطعة فاخرة بتصميم عصري أنيق تضيف لمسة من الرقي إلى مائدتك. مصنوعة من خامات عالية الجودة مقاومة للاستخدام اليومي وسهلة التنظيف. مثالية للضيافة والمناسبات الخاصة، وتأتي بتشطيب راقٍ يدوم طويلاً.",
    "specs": [
      {
        "label": "الخامة",
        "value": "سيراميك / ستانلس ستيل عالي الجودة"
      },
      {
        "label": "عدد القطع",
        "value": "19"
      },
      {
        "label": "لون التشطيب",
        "value": "كلاسيك"
      },
      {
        "label": "مناسب لغسالة الصحون",
        "value": "يُغسل باليد"
      },
      {
        "label": "الضمان",
        "value": "سنة واحدة"
      }
    ],
    "reviews": [
      {
        "id": "r1",
        "author": "سارة أحمد",
        "rating": 5,
        "date": "2026-05-12",
        "text": "جودة ممتازة وتغليف رائع، تستحق السعر بكل تأكيد."
      },
      {
        "id": "r2",
        "author": "محمد علي",
        "rating": 4,
        "date": "2026-04-28",
        "text": "منتج جميل ووصل بسرعة، أنصح به."
      }
    ]
  },
  {
    "id": "p32",
    "slug": "dinnerware-32",
    "name": "طقم صحون 18 قطعة — تشكيلة 3",
    "nameEn": "dinnerware item 32",
    "brandId": "b1",
    "categorySlug": "dinnerware",
    "price": 125,
    "rating": 3.5,
    "reviewsCount": 132,
    "images": [
      "/assets/products/p32.jpg",
      "/assets/products/p33.jpg",
      "/assets/products/p34.jpg"
    ],
    "inStock": true,
    "isFeatured": false,
    "isBestseller": true,
    "isNew": false,
    "description": "قطعة فاخرة بتصميم عصري أنيق تضيف لمسة من الرقي إلى مائدتك. مصنوعة من خامات عالية الجودة مقاومة للاستخدام اليومي وسهلة التنظيف. مثالية للضيافة والمناسبات الخاصة، وتأتي بتشطيب راقٍ يدوم طويلاً.",
    "specs": [
      {
        "label": "الخامة",
        "value": "سيراميك / ستانلس ستيل عالي الجودة"
      },
      {
        "label": "عدد القطع",
        "value": "20"
      },
      {
        "label": "لون التشطيب",
        "value": "أبيض"
      },
      {
        "label": "مناسب لغسالة الصحون",
        "value": "نعم"
      },
      {
        "label": "الضمان",
        "value": "سنة واحدة"
      }
    ],
    "reviews": [
      {
        "id": "r1",
        "author": "سارة أحمد",
        "rating": 5,
        "date": "2026-05-12",
        "text": "جودة ممتازة وتغليف رائع، تستحق السعر بكل تأكيد."
      },
      {
        "id": "r2",
        "author": "محمد علي",
        "rating": 4,
        "date": "2026-04-28",
        "text": "منتج جميل ووصل بسرعة، أنصح به."
      }
    ]
  },
  {
    "id": "p33",
    "slug": "linens-33",
    "name": "مفرش طاولة مزخرف",
    "nameEn": "linens item 33",
    "brandId": "b2",
    "categorySlug": "linens",
    "price": 130,
    "oldPrice": 165,
    "rating": 4.2,
    "reviewsCount": 9,
    "images": [
      "/assets/products/p33.jpg",
      "/assets/products/p34.jpg",
      "/assets/products/p35.jpg"
    ],
    "inStock": false,
    "isFeatured": false,
    "isBestseller": false,
    "isNew": false,
    "badge": "خصم",
    "description": "قطعة فاخرة بتصميم عصري أنيق تضيف لمسة من الرقي إلى مائدتك. مصنوعة من خامات عالية الجودة مقاومة للاستخدام اليومي وسهلة التنظيف. مثالية للضيافة والمناسبات الخاصة، وتأتي بتشطيب راقٍ يدوم طويلاً.",
    "specs": [
      {
        "label": "الخامة",
        "value": "سيراميك / ستانلس ستيل عالي الجودة"
      },
      {
        "label": "عدد القطع",
        "value": "21"
      },
      {
        "label": "لون التشطيب",
        "value": "رمادي"
      },
      {
        "label": "مناسب لغسالة الصحون",
        "value": "يُغسل باليد"
      },
      {
        "label": "الضمان",
        "value": "سنة واحدة"
      }
    ],
    "reviews": [
      {
        "id": "r1",
        "author": "سارة أحمد",
        "rating": 5,
        "date": "2026-05-12",
        "text": "جودة ممتازة وتغليف رائع، تستحق السعر بكل تأكيد."
      },
      {
        "id": "r2",
        "author": "محمد علي",
        "rating": 4,
        "date": "2026-04-28",
        "text": "منتج جميل ووصل بسرعة، أنصح به."
      }
    ]
  },
  {
    "id": "p34",
    "slug": "linens-34",
    "name": "تشريفة طاولة فاخرة",
    "nameEn": "linens item 34",
    "brandId": "b1",
    "categorySlug": "linens",
    "price": 110,
    "rating": 4.9,
    "reviewsCount": 26,
    "images": [
      "/assets/products/p34.jpg",
      "/assets/products/p35.jpg",
      "/assets/products/p36.jpg"
    ],
    "inStock": true,
    "isFeatured": false,
    "isBestseller": false,
    "isNew": false,
    "description": "قطعة فاخرة بتصميم عصري أنيق تضيف لمسة من الرقي إلى مائدتك. مصنوعة من خامات عالية الجودة مقاومة للاستخدام اليومي وسهلة التنظيف. مثالية للضيافة والمناسبات الخاصة، وتأتي بتشطيب راقٍ يدوم طويلاً.",
    "specs": [
      {
        "label": "الخامة",
        "value": "سيراميك / ستانلس ستيل عالي الجودة"
      },
      {
        "label": "عدد القطع",
        "value": "22"
      },
      {
        "label": "لون التشطيب",
        "value": "ذهبي"
      },
      {
        "label": "مناسب لغسالة الصحون",
        "value": "نعم"
      },
      {
        "label": "الضمان",
        "value": "سنة واحدة"
      }
    ],
    "reviews": [
      {
        "id": "r1",
        "author": "سارة أحمد",
        "rating": 5,
        "date": "2026-05-12",
        "text": "جودة ممتازة وتغليف رائع، تستحق السعر بكل تأكيد."
      },
      {
        "id": "r2",
        "author": "محمد علي",
        "rating": 4,
        "date": "2026-04-28",
        "text": "منتج جميل ووصل بسرعة، أنصح به."
      }
    ]
  },
  {
    "id": "p35",
    "slug": "linens-35",
    "name": "طقم مفارش جلوس",
    "nameEn": "linens item 35",
    "brandId": "b2",
    "categorySlug": "linens",
    "price": 90,
    "rating": 4,
    "reviewsCount": 43,
    "images": [
      "/assets/products/p35.jpg",
      "/assets/products/p36.jpg",
      "/assets/products/p37.jpg"
    ],
    "inStock": true,
    "isFeatured": true,
    "isBestseller": false,
    "isNew": false,
    "description": "قطعة فاخرة بتصميم عصري أنيق تضيف لمسة من الرقي إلى مائدتك. مصنوعة من خامات عالية الجودة مقاومة للاستخدام اليومي وسهلة التنظيف. مثالية للضيافة والمناسبات الخاصة، وتأتي بتشطيب راقٍ يدوم طويلاً.",
    "specs": [
      {
        "label": "الخامة",
        "value": "سيراميك / ستانلس ستيل عالي الجودة"
      },
      {
        "label": "عدد القطع",
        "value": "23"
      },
      {
        "label": "لون التشطيب",
        "value": "كلاسيك"
      },
      {
        "label": "مناسب لغسالة الصحون",
        "value": "يُغسل باليد"
      },
      {
        "label": "الضمان",
        "value": "سنة واحدة"
      }
    ],
    "reviews": [
      {
        "id": "r1",
        "author": "سارة أحمد",
        "rating": 5,
        "date": "2026-05-12",
        "text": "جودة ممتازة وتغليف رائع، تستحق السعر بكل تأكيد."
      },
      {
        "id": "r2",
        "author": "محمد علي",
        "rating": 4,
        "date": "2026-04-28",
        "text": "منتج جميل ووصل بسرعة، أنصح به."
      }
    ]
  },
  {
    "id": "p36",
    "slug": "linens-36",
    "name": "مفرش دانتيل أنيق",
    "nameEn": "linens item 36",
    "brandId": "b1",
    "categorySlug": "linens",
    "price": 95,
    "oldPrice": 120,
    "rating": 4.7,
    "reviewsCount": 60,
    "images": [
      "/assets/products/p36.jpg",
      "/assets/products/p37.jpg",
      "/assets/products/p38.jpg"
    ],
    "inStock": true,
    "isFeatured": false,
    "isBestseller": true,
    "isNew": false,
    "badge": "خصم",
    "description": "قطعة فاخرة بتصميم عصري أنيق تضيف لمسة من الرقي إلى مائدتك. مصنوعة من خامات عالية الجودة مقاومة للاستخدام اليومي وسهلة التنظيف. مثالية للضيافة والمناسبات الخاصة، وتأتي بتشطيب راقٍ يدوم طويلاً.",
    "specs": [
      {
        "label": "الخامة",
        "value": "سيراميك / ستانلس ستيل عالي الجودة"
      },
      {
        "label": "عدد القطع",
        "value": "6"
      },
      {
        "label": "لون التشطيب",
        "value": "أبيض"
      },
      {
        "label": "مناسب لغسالة الصحون",
        "value": "نعم"
      },
      {
        "label": "الضمان",
        "value": "سنة واحدة"
      }
    ],
    "reviews": [
      {
        "id": "r1",
        "author": "سارة أحمد",
        "rating": 5,
        "date": "2026-05-12",
        "text": "جودة ممتازة وتغليف رائع، تستحق السعر بكل تأكيد."
      },
      {
        "id": "r2",
        "author": "محمد علي",
        "rating": 4,
        "date": "2026-04-28",
        "text": "منتج جميل ووصل بسرعة، أنصح به."
      }
    ]
  },
  {
    "id": "p37",
    "slug": "linens-37",
    "name": "رانر طاولة عصري",
    "nameEn": "linens item 37",
    "brandId": "b2",
    "categorySlug": "linens",
    "price": 75,
    "rating": 3.8,
    "reviewsCount": 77,
    "images": [
      "/assets/products/p37.jpg",
      "/assets/products/p38.jpg",
      "/assets/products/p39.jpg"
    ],
    "inStock": true,
    "isFeatured": false,
    "isBestseller": false,
    "isNew": false,
    "description": "قطعة فاخرة بتصميم عصري أنيق تضيف لمسة من الرقي إلى مائدتك. مصنوعة من خامات عالية الجودة مقاومة للاستخدام اليومي وسهلة التنظيف. مثالية للضيافة والمناسبات الخاصة، وتأتي بتشطيب راقٍ يدوم طويلاً.",
    "specs": [
      {
        "label": "الخامة",
        "value": "سيراميك / ستانلس ستيل عالي الجودة"
      },
      {
        "label": "عدد القطع",
        "value": "7"
      },
      {
        "label": "لون التشطيب",
        "value": "رمادي"
      },
      {
        "label": "مناسب لغسالة الصحون",
        "value": "يُغسل باليد"
      },
      {
        "label": "الضمان",
        "value": "سنة واحدة"
      }
    ],
    "reviews": [
      {
        "id": "r1",
        "author": "سارة أحمد",
        "rating": 5,
        "date": "2026-05-12",
        "text": "جودة ممتازة وتغليف رائع، تستحق السعر بكل تأكيد."
      },
      {
        "id": "r2",
        "author": "محمد علي",
        "rating": 4,
        "date": "2026-04-28",
        "text": "منتج جميل ووصل بسرعة، أنصح به."
      }
    ]
  },
  {
    "id": "p38",
    "slug": "linens-38",
    "name": "مفرش سفرة قطني",
    "nameEn": "linens item 38",
    "brandId": "b1",
    "categorySlug": "linens",
    "price": 80,
    "rating": 4.5,
    "reviewsCount": 94,
    "images": [
      "/assets/products/p38.jpg",
      "/assets/products/p39.jpg",
      "/assets/products/p40.jpg"
    ],
    "inStock": true,
    "isFeatured": false,
    "isBestseller": false,
    "isNew": false,
    "description": "قطعة فاخرة بتصميم عصري أنيق تضيف لمسة من الرقي إلى مائدتك. مصنوعة من خامات عالية الجودة مقاومة للاستخدام اليومي وسهلة التنظيف. مثالية للضيافة والمناسبات الخاصة، وتأتي بتشطيب راقٍ يدوم طويلاً.",
    "specs": [
      {
        "label": "الخامة",
        "value": "سيراميك / ستانلس ستيل عالي الجودة"
      },
      {
        "label": "عدد القطع",
        "value": "8"
      },
      {
        "label": "لون التشطيب",
        "value": "ذهبي"
      },
      {
        "label": "مناسب لغسالة الصحون",
        "value": "نعم"
      },
      {
        "label": "الضمان",
        "value": "سنة واحدة"
      }
    ],
    "reviews": [
      {
        "id": "r1",
        "author": "سارة أحمد",
        "rating": 5,
        "date": "2026-05-12",
        "text": "جودة ممتازة وتغليف رائع، تستحق السعر بكل تأكيد."
      },
      {
        "id": "r2",
        "author": "محمد علي",
        "rating": 4,
        "date": "2026-04-28",
        "text": "منتج جميل ووصل بسرعة، أنصح به."
      }
    ]
  },
  {
    "id": "p39",
    "slug": "linens-39",
    "name": "طقم مفارش تقديم",
    "nameEn": "linens item 39",
    "brandId": "b2",
    "categorySlug": "linens",
    "price": 250,
    "oldPrice": 315,
    "rating": 3.6,
    "reviewsCount": 111,
    "images": [
      "/assets/products/p39.jpg",
      "/assets/products/p40.jpg",
      "/assets/products/p41.jpg"
    ],
    "inStock": true,
    "isFeatured": false,
    "isBestseller": false,
    "isNew": false,
    "badge": "خصم",
    "description": "قطعة فاخرة بتصميم عصري أنيق تضيف لمسة من الرقي إلى مائدتك. مصنوعة من خامات عالية الجودة مقاومة للاستخدام اليومي وسهلة التنظيف. مثالية للضيافة والمناسبات الخاصة، وتأتي بتشطيب راقٍ يدوم طويلاً.",
    "specs": [
      {
        "label": "الخامة",
        "value": "سيراميك / ستانلس ستيل عالي الجودة"
      },
      {
        "label": "عدد القطع",
        "value": "9"
      },
      {
        "label": "لون التشطيب",
        "value": "كلاسيك"
      },
      {
        "label": "مناسب لغسالة الصحون",
        "value": "يُغسل باليد"
      },
      {
        "label": "الضمان",
        "value": "سنة واحدة"
      }
    ],
    "reviews": [
      {
        "id": "r1",
        "author": "سارة أحمد",
        "rating": 5,
        "date": "2026-05-12",
        "text": "جودة ممتازة وتغليف رائع، تستحق السعر بكل تأكيد."
      },
      {
        "id": "r2",
        "author": "محمد علي",
        "rating": 4,
        "date": "2026-04-28",
        "text": "منتج جميل ووصل بسرعة، أنصح به."
      }
    ]
  },
  {
    "id": "p40",
    "slug": "linens-40",
    "name": "تشريفة سفرة راقية",
    "nameEn": "linens item 40",
    "brandId": "b1",
    "categorySlug": "linens",
    "price": 230,
    "rating": 4.3,
    "reviewsCount": 128,
    "images": [
      "/assets/products/p40.jpg",
      "/assets/products/p41.jpg",
      "/assets/products/p42.jpg"
    ],
    "inStock": true,
    "isFeatured": true,
    "isBestseller": true,
    "isNew": false,
    "description": "قطعة فاخرة بتصميم عصري أنيق تضيف لمسة من الرقي إلى مائدتك. مصنوعة من خامات عالية الجودة مقاومة للاستخدام اليومي وسهلة التنظيف. مثالية للضيافة والمناسبات الخاصة، وتأتي بتشطيب راقٍ يدوم طويلاً.",
    "specs": [
      {
        "label": "الخامة",
        "value": "سيراميك / ستانلس ستيل عالي الجودة"
      },
      {
        "label": "عدد القطع",
        "value": "10"
      },
      {
        "label": "لون التشطيب",
        "value": "أبيض"
      },
      {
        "label": "مناسب لغسالة الصحون",
        "value": "نعم"
      },
      {
        "label": "الضمان",
        "value": "سنة واحدة"
      }
    ],
    "reviews": [
      {
        "id": "r1",
        "author": "سارة أحمد",
        "rating": 5,
        "date": "2026-05-12",
        "text": "جودة ممتازة وتغليف رائع، تستحق السعر بكل تأكيد."
      },
      {
        "id": "r2",
        "author": "محمد علي",
        "rating": 4,
        "date": "2026-04-28",
        "text": "منتج جميل ووصل بسرعة، أنصح به."
      }
    ]
  },
  {
    "id": "p41",
    "slug": "linens-41",
    "name": "مفرش طاولة مزخرف — تشكيلة 2",
    "nameEn": "linens item 41",
    "brandId": "b2",
    "categorySlug": "linens",
    "price": 235,
    "rating": 5,
    "reviewsCount": 145,
    "images": [
      "/assets/products/p41.jpg",
      "/assets/products/p42.jpg",
      "/assets/products/p43.jpg"
    ],
    "inStock": true,
    "isFeatured": false,
    "isBestseller": false,
    "isNew": false,
    "description": "قطعة فاخرة بتصميم عصري أنيق تضيف لمسة من الرقي إلى مائدتك. مصنوعة من خامات عالية الجودة مقاومة للاستخدام اليومي وسهلة التنظيف. مثالية للضيافة والمناسبات الخاصة، وتأتي بتشطيب راقٍ يدوم طويلاً.",
    "specs": [
      {
        "label": "الخامة",
        "value": "سيراميك / ستانلس ستيل عالي الجودة"
      },
      {
        "label": "عدد القطع",
        "value": "11"
      },
      {
        "label": "لون التشطيب",
        "value": "رمادي"
      },
      {
        "label": "مناسب لغسالة الصحون",
        "value": "يُغسل باليد"
      },
      {
        "label": "الضمان",
        "value": "سنة واحدة"
      }
    ],
    "reviews": [
      {
        "id": "r1",
        "author": "سارة أحمد",
        "rating": 5,
        "date": "2026-05-12",
        "text": "جودة ممتازة وتغليف رائع، تستحق السعر بكل تأكيد."
      },
      {
        "id": "r2",
        "author": "محمد علي",
        "rating": 4,
        "date": "2026-04-28",
        "text": "منتج جميل ووصل بسرعة، أنصح به."
      }
    ]
  },
  {
    "id": "p42",
    "slug": "linens-42",
    "name": "تشريفة طاولة فاخرة — تشكيلة 2",
    "nameEn": "linens item 42",
    "brandId": "b1",
    "categorySlug": "linens",
    "price": 215,
    "oldPrice": 270,
    "rating": 4.1,
    "reviewsCount": 22,
    "images": [
      "/assets/products/p42.jpg",
      "/assets/products/p43.jpg",
      "/assets/products/p44.jpg"
    ],
    "inStock": true,
    "isFeatured": false,
    "isBestseller": false,
    "isNew": false,
    "badge": "خصم",
    "description": "قطعة فاخرة بتصميم عصري أنيق تضيف لمسة من الرقي إلى مائدتك. مصنوعة من خامات عالية الجودة مقاومة للاستخدام اليومي وسهلة التنظيف. مثالية للضيافة والمناسبات الخاصة، وتأتي بتشطيب راقٍ يدوم طويلاً.",
    "specs": [
      {
        "label": "الخامة",
        "value": "سيراميك / ستانلس ستيل عالي الجودة"
      },
      {
        "label": "عدد القطع",
        "value": "12"
      },
      {
        "label": "لون التشطيب",
        "value": "ذهبي"
      },
      {
        "label": "مناسب لغسالة الصحون",
        "value": "نعم"
      },
      {
        "label": "الضمان",
        "value": "سنة واحدة"
      }
    ],
    "reviews": [
      {
        "id": "r1",
        "author": "سارة أحمد",
        "rating": 5,
        "date": "2026-05-12",
        "text": "جودة ممتازة وتغليف رائع، تستحق السعر بكل تأكيد."
      },
      {
        "id": "r2",
        "author": "محمد علي",
        "rating": 4,
        "date": "2026-04-28",
        "text": "منتج جميل ووصل بسرعة، أنصح به."
      }
    ]
  },
  {
    "id": "p43",
    "slug": "linens-43",
    "name": "طقم مفارش جلوس — تشكيلة 2",
    "nameEn": "linens item 43",
    "brandId": "b2",
    "categorySlug": "linens",
    "price": 220,
    "rating": 4.8,
    "reviewsCount": 39,
    "images": [
      "/assets/products/p43.jpg",
      "/assets/products/p44.jpg",
      "/assets/products/p45.jpg"
    ],
    "inStock": true,
    "isFeatured": false,
    "isBestseller": false,
    "isNew": false,
    "description": "قطعة فاخرة بتصميم عصري أنيق تضيف لمسة من الرقي إلى مائدتك. مصنوعة من خامات عالية الجودة مقاومة للاستخدام اليومي وسهلة التنظيف. مثالية للضيافة والمناسبات الخاصة، وتأتي بتشطيب راقٍ يدوم طويلاً.",
    "specs": [
      {
        "label": "الخامة",
        "value": "سيراميك / ستانلس ستيل عالي الجودة"
      },
      {
        "label": "عدد القطع",
        "value": "13"
      },
      {
        "label": "لون التشطيب",
        "value": "كلاسيك"
      },
      {
        "label": "مناسب لغسالة الصحون",
        "value": "يُغسل باليد"
      },
      {
        "label": "الضمان",
        "value": "سنة واحدة"
      }
    ],
    "reviews": [
      {
        "id": "r1",
        "author": "سارة أحمد",
        "rating": 5,
        "date": "2026-05-12",
        "text": "جودة ممتازة وتغليف رائع، تستحق السعر بكل تأكيد."
      },
      {
        "id": "r2",
        "author": "محمد علي",
        "rating": 4,
        "date": "2026-04-28",
        "text": "منتج جميل ووصل بسرعة، أنصح به."
      }
    ]
  },
  {
    "id": "p44",
    "slug": "linens-44",
    "name": "مفرش دانتيل أنيق — تشكيلة 2",
    "nameEn": "linens item 44",
    "brandId": "b1",
    "categorySlug": "linens",
    "price": 200,
    "rating": 3.9,
    "reviewsCount": 56,
    "images": [
      "/assets/products/p44.jpg",
      "/assets/products/p45.jpg",
      "/assets/products/p46.jpg"
    ],
    "inStock": false,
    "isFeatured": false,
    "isBestseller": true,
    "isNew": false,
    "description": "قطعة فاخرة بتصميم عصري أنيق تضيف لمسة من الرقي إلى مائدتك. مصنوعة من خامات عالية الجودة مقاومة للاستخدام اليومي وسهلة التنظيف. مثالية للضيافة والمناسبات الخاصة، وتأتي بتشطيب راقٍ يدوم طويلاً.",
    "specs": [
      {
        "label": "الخامة",
        "value": "سيراميك / ستانلس ستيل عالي الجودة"
      },
      {
        "label": "عدد القطع",
        "value": "14"
      },
      {
        "label": "لون التشطيب",
        "value": "أبيض"
      },
      {
        "label": "مناسب لغسالة الصحون",
        "value": "نعم"
      },
      {
        "label": "الضمان",
        "value": "سنة واحدة"
      }
    ],
    "reviews": [
      {
        "id": "r1",
        "author": "سارة أحمد",
        "rating": 5,
        "date": "2026-05-12",
        "text": "جودة ممتازة وتغليف رائع، تستحق السعر بكل تأكيد."
      },
      {
        "id": "r2",
        "author": "محمد علي",
        "rating": 4,
        "date": "2026-04-28",
        "text": "منتج جميل ووصل بسرعة، أنصح به."
      }
    ]
  },
  {
    "id": "p45",
    "slug": "linens-45",
    "name": "رانر طاولة عصري — تشكيلة 2",
    "nameEn": "linens item 45",
    "brandId": "b2",
    "categorySlug": "linens",
    "price": 180,
    "oldPrice": 225,
    "rating": 4.6,
    "reviewsCount": 73,
    "images": [
      "/assets/products/p45.jpg",
      "/assets/products/p46.jpg",
      "/assets/products/p47.jpg"
    ],
    "inStock": true,
    "isFeatured": true,
    "isBestseller": false,
    "isNew": false,
    "badge": "خصم",
    "description": "قطعة فاخرة بتصميم عصري أنيق تضيف لمسة من الرقي إلى مائدتك. مصنوعة من خامات عالية الجودة مقاومة للاستخدام اليومي وسهلة التنظيف. مثالية للضيافة والمناسبات الخاصة، وتأتي بتشطيب راقٍ يدوم طويلاً.",
    "specs": [
      {
        "label": "الخامة",
        "value": "سيراميك / ستانلس ستيل عالي الجودة"
      },
      {
        "label": "عدد القطع",
        "value": "15"
      },
      {
        "label": "لون التشطيب",
        "value": "رمادي"
      },
      {
        "label": "مناسب لغسالة الصحون",
        "value": "يُغسل باليد"
      },
      {
        "label": "الضمان",
        "value": "سنة واحدة"
      }
    ],
    "reviews": [
      {
        "id": "r1",
        "author": "سارة أحمد",
        "rating": 5,
        "date": "2026-05-12",
        "text": "جودة ممتازة وتغليف رائع، تستحق السعر بكل تأكيد."
      },
      {
        "id": "r2",
        "author": "محمد علي",
        "rating": 4,
        "date": "2026-04-28",
        "text": "منتج جميل ووصل بسرعة، أنصح به."
      }
    ]
  },
  {
    "id": "p46",
    "slug": "linens-46",
    "name": "مفرش سفرة قطني — تشكيلة 2",
    "nameEn": "linens item 46",
    "brandId": "b1",
    "categorySlug": "linens",
    "price": 185,
    "rating": 3.7,
    "reviewsCount": 90,
    "images": [
      "/assets/products/p46.jpg",
      "/assets/products/p47.jpg",
      "/assets/products/p48.jpg"
    ],
    "inStock": true,
    "isFeatured": false,
    "isBestseller": false,
    "isNew": false,
    "description": "قطعة فاخرة بتصميم عصري أنيق تضيف لمسة من الرقي إلى مائدتك. مصنوعة من خامات عالية الجودة مقاومة للاستخدام اليومي وسهلة التنظيف. مثالية للضيافة والمناسبات الخاصة، وتأتي بتشطيب راقٍ يدوم طويلاً.",
    "specs": [
      {
        "label": "الخامة",
        "value": "سيراميك / ستانلس ستيل عالي الجودة"
      },
      {
        "label": "عدد القطع",
        "value": "16"
      },
      {
        "label": "لون التشطيب",
        "value": "ذهبي"
      },
      {
        "label": "مناسب لغسالة الصحون",
        "value": "نعم"
      },
      {
        "label": "الضمان",
        "value": "سنة واحدة"
      }
    ],
    "reviews": [
      {
        "id": "r1",
        "author": "سارة أحمد",
        "rating": 5,
        "date": "2026-05-12",
        "text": "جودة ممتازة وتغليف رائع، تستحق السعر بكل تأكيد."
      },
      {
        "id": "r2",
        "author": "محمد علي",
        "rating": 4,
        "date": "2026-04-28",
        "text": "منتج جميل ووصل بسرعة، أنصح به."
      }
    ]
  },
  {
    "id": "p47",
    "slug": "linens-47",
    "name": "طقم مفارش تقديم — تشكيلة 2",
    "nameEn": "linens item 47",
    "brandId": "b2",
    "categorySlug": "linens",
    "price": 165,
    "rating": 4.4,
    "reviewsCount": 107,
    "images": [
      "/assets/products/p47.jpg",
      "/assets/products/p48.jpg",
      "/assets/products/p49.jpg"
    ],
    "inStock": true,
    "isFeatured": false,
    "isBestseller": false,
    "isNew": false,
    "description": "قطعة فاخرة بتصميم عصري أنيق تضيف لمسة من الرقي إلى مائدتك. مصنوعة من خامات عالية الجودة مقاومة للاستخدام اليومي وسهلة التنظيف. مثالية للضيافة والمناسبات الخاصة، وتأتي بتشطيب راقٍ يدوم طويلاً.",
    "specs": [
      {
        "label": "الخامة",
        "value": "سيراميك / ستانلس ستيل عالي الجودة"
      },
      {
        "label": "عدد القطع",
        "value": "17"
      },
      {
        "label": "لون التشطيب",
        "value": "كلاسيك"
      },
      {
        "label": "مناسب لغسالة الصحون",
        "value": "يُغسل باليد"
      },
      {
        "label": "الضمان",
        "value": "سنة واحدة"
      }
    ],
    "reviews": [
      {
        "id": "r1",
        "author": "سارة أحمد",
        "rating": 5,
        "date": "2026-05-12",
        "text": "جودة ممتازة وتغليف رائع، تستحق السعر بكل تأكيد."
      },
      {
        "id": "r2",
        "author": "محمد علي",
        "rating": 4,
        "date": "2026-04-28",
        "text": "منتج جميل ووصل بسرعة، أنصح به."
      }
    ]
  },
  {
    "id": "p48",
    "slug": "linens-48",
    "name": "تشريفة سفرة راقية — تشكيلة 2",
    "nameEn": "linens item 48",
    "brandId": "b1",
    "categorySlug": "linens",
    "price": 170,
    "oldPrice": 215,
    "rating": 3.5,
    "reviewsCount": 124,
    "images": [
      "/assets/products/p48.jpg",
      "/assets/products/p49.jpg",
      "/assets/products/p50.jpg"
    ],
    "inStock": true,
    "isFeatured": false,
    "isBestseller": true,
    "isNew": false,
    "badge": "خصم",
    "description": "قطعة فاخرة بتصميم عصري أنيق تضيف لمسة من الرقي إلى مائدتك. مصنوعة من خامات عالية الجودة مقاومة للاستخدام اليومي وسهلة التنظيف. مثالية للضيافة والمناسبات الخاصة، وتأتي بتشطيب راقٍ يدوم طويلاً.",
    "specs": [
      {
        "label": "الخامة",
        "value": "سيراميك / ستانلس ستيل عالي الجودة"
      },
      {
        "label": "عدد القطع",
        "value": "18"
      },
      {
        "label": "لون التشطيب",
        "value": "أبيض"
      },
      {
        "label": "مناسب لغسالة الصحون",
        "value": "نعم"
      },
      {
        "label": "الضمان",
        "value": "سنة واحدة"
      }
    ],
    "reviews": [
      {
        "id": "r1",
        "author": "سارة أحمد",
        "rating": 5,
        "date": "2026-05-12",
        "text": "جودة ممتازة وتغليف رائع، تستحق السعر بكل تأكيد."
      },
      {
        "id": "r2",
        "author": "محمد علي",
        "rating": 4,
        "date": "2026-04-28",
        "text": "منتج جميل ووصل بسرعة، أنصح به."
      }
    ]
  },
  {
    "id": "p49",
    "slug": "linens-49",
    "name": "مفرش طاولة مزخرف — تشكيلة 3",
    "nameEn": "linens item 49",
    "brandId": "b2",
    "categorySlug": "linens",
    "price": 150,
    "rating": 4.2,
    "reviewsCount": 141,
    "images": [
      "/assets/products/p49.jpg",
      "/assets/products/p50.jpg",
      "/assets/products/p51.jpg"
    ],
    "inStock": true,
    "isFeatured": false,
    "isBestseller": false,
    "isNew": false,
    "description": "قطعة فاخرة بتصميم عصري أنيق تضيف لمسة من الرقي إلى مائدتك. مصنوعة من خامات عالية الجودة مقاومة للاستخدام اليومي وسهلة التنظيف. مثالية للضيافة والمناسبات الخاصة، وتأتي بتشطيب راقٍ يدوم طويلاً.",
    "specs": [
      {
        "label": "الخامة",
        "value": "سيراميك / ستانلس ستيل عالي الجودة"
      },
      {
        "label": "عدد القطع",
        "value": "19"
      },
      {
        "label": "لون التشطيب",
        "value": "رمادي"
      },
      {
        "label": "مناسب لغسالة الصحون",
        "value": "يُغسل باليد"
      },
      {
        "label": "الضمان",
        "value": "سنة واحدة"
      }
    ],
    "reviews": [
      {
        "id": "r1",
        "author": "سارة أحمد",
        "rating": 5,
        "date": "2026-05-12",
        "text": "جودة ممتازة وتغليف رائع، تستحق السعر بكل تأكيد."
      },
      {
        "id": "r2",
        "author": "محمد علي",
        "rating": 4,
        "date": "2026-04-28",
        "text": "منتج جميل ووصل بسرعة، أنصح به."
      }
    ]
  },
  {
    "id": "p50",
    "slug": "linens-50",
    "name": "تشريفة طاولة فاخرة — تشكيلة 3",
    "nameEn": "linens item 50",
    "brandId": "b1",
    "categorySlug": "linens",
    "price": 130,
    "rating": 4.9,
    "reviewsCount": 18,
    "images": [
      "/assets/products/p50.jpg",
      "/assets/products/p51.jpg",
      "/assets/products/p52.jpg"
    ],
    "inStock": true,
    "isFeatured": true,
    "isBestseller": false,
    "isNew": false,
    "description": "قطعة فاخرة بتصميم عصري أنيق تضيف لمسة من الرقي إلى مائدتك. مصنوعة من خامات عالية الجودة مقاومة للاستخدام اليومي وسهلة التنظيف. مثالية للضيافة والمناسبات الخاصة، وتأتي بتشطيب راقٍ يدوم طويلاً.",
    "specs": [
      {
        "label": "الخامة",
        "value": "سيراميك / ستانلس ستيل عالي الجودة"
      },
      {
        "label": "عدد القطع",
        "value": "20"
      },
      {
        "label": "لون التشطيب",
        "value": "ذهبي"
      },
      {
        "label": "مناسب لغسالة الصحون",
        "value": "نعم"
      },
      {
        "label": "الضمان",
        "value": "سنة واحدة"
      }
    ],
    "reviews": [
      {
        "id": "r1",
        "author": "سارة أحمد",
        "rating": 5,
        "date": "2026-05-12",
        "text": "جودة ممتازة وتغليف رائع، تستحق السعر بكل تأكيد."
      },
      {
        "id": "r2",
        "author": "محمد علي",
        "rating": 4,
        "date": "2026-04-28",
        "text": "منتج جميل ووصل بسرعة، أنصح به."
      }
    ]
  },
  {
    "id": "p51",
    "slug": "linens-51",
    "name": "طقم مفارش جلوس — تشكيلة 3",
    "nameEn": "linens item 51",
    "brandId": "b2",
    "categorySlug": "linens",
    "price": 135,
    "oldPrice": 170,
    "rating": 4,
    "reviewsCount": 35,
    "images": [
      "/assets/products/p51.jpg",
      "/assets/products/p52.jpg",
      "/assets/products/p53.jpg"
    ],
    "inStock": true,
    "isFeatured": false,
    "isBestseller": false,
    "isNew": false,
    "badge": "خصم",
    "description": "قطعة فاخرة بتصميم عصري أنيق تضيف لمسة من الرقي إلى مائدتك. مصنوعة من خامات عالية الجودة مقاومة للاستخدام اليومي وسهلة التنظيف. مثالية للضيافة والمناسبات الخاصة، وتأتي بتشطيب راقٍ يدوم طويلاً.",
    "specs": [
      {
        "label": "الخامة",
        "value": "سيراميك / ستانلس ستيل عالي الجودة"
      },
      {
        "label": "عدد القطع",
        "value": "21"
      },
      {
        "label": "لون التشطيب",
        "value": "كلاسيك"
      },
      {
        "label": "مناسب لغسالة الصحون",
        "value": "يُغسل باليد"
      },
      {
        "label": "الضمان",
        "value": "سنة واحدة"
      }
    ],
    "reviews": [
      {
        "id": "r1",
        "author": "سارة أحمد",
        "rating": 5,
        "date": "2026-05-12",
        "text": "جودة ممتازة وتغليف رائع، تستحق السعر بكل تأكيد."
      },
      {
        "id": "r2",
        "author": "محمد علي",
        "rating": 4,
        "date": "2026-04-28",
        "text": "منتج جميل ووصل بسرعة، أنصح به."
      }
    ]
  },
  {
    "id": "p52",
    "slug": "linens-52",
    "name": "مفرش دانتيل أنيق — تشكيلة 3",
    "nameEn": "linens item 52",
    "brandId": "b1",
    "categorySlug": "linens",
    "price": 115,
    "rating": 4.7,
    "reviewsCount": 52,
    "images": [
      "/assets/products/p52.jpg",
      "/assets/products/p53.jpg",
      "/assets/products/p54.jpg"
    ],
    "inStock": true,
    "isFeatured": false,
    "isBestseller": true,
    "isNew": false,
    "description": "قطعة فاخرة بتصميم عصري أنيق تضيف لمسة من الرقي إلى مائدتك. مصنوعة من خامات عالية الجودة مقاومة للاستخدام اليومي وسهلة التنظيف. مثالية للضيافة والمناسبات الخاصة، وتأتي بتشطيب راقٍ يدوم طويلاً.",
    "specs": [
      {
        "label": "الخامة",
        "value": "سيراميك / ستانلس ستيل عالي الجودة"
      },
      {
        "label": "عدد القطع",
        "value": "22"
      },
      {
        "label": "لون التشطيب",
        "value": "أبيض"
      },
      {
        "label": "مناسب لغسالة الصحون",
        "value": "نعم"
      },
      {
        "label": "الضمان",
        "value": "سنة واحدة"
      }
    ],
    "reviews": [
      {
        "id": "r1",
        "author": "سارة أحمد",
        "rating": 5,
        "date": "2026-05-12",
        "text": "جودة ممتازة وتغليف رائع، تستحق السعر بكل تأكيد."
      },
      {
        "id": "r2",
        "author": "محمد علي",
        "rating": 4,
        "date": "2026-04-28",
        "text": "منتج جميل ووصل بسرعة، أنصح به."
      }
    ]
  },
  {
    "id": "p53",
    "slug": "linens-53",
    "name": "رانر طاولة عصري — تشكيلة 3",
    "nameEn": "linens item 53",
    "brandId": "b2",
    "categorySlug": "linens",
    "price": 120,
    "rating": 3.8,
    "reviewsCount": 69,
    "images": [
      "/assets/products/p53.jpg",
      "/assets/products/p54.jpg",
      "/assets/products/p55.jpg"
    ],
    "inStock": true,
    "isFeatured": false,
    "isBestseller": false,
    "isNew": false,
    "description": "قطعة فاخرة بتصميم عصري أنيق تضيف لمسة من الرقي إلى مائدتك. مصنوعة من خامات عالية الجودة مقاومة للاستخدام اليومي وسهلة التنظيف. مثالية للضيافة والمناسبات الخاصة، وتأتي بتشطيب راقٍ يدوم طويلاً.",
    "specs": [
      {
        "label": "الخامة",
        "value": "سيراميك / ستانلس ستيل عالي الجودة"
      },
      {
        "label": "عدد القطع",
        "value": "23"
      },
      {
        "label": "لون التشطيب",
        "value": "رمادي"
      },
      {
        "label": "مناسب لغسالة الصحون",
        "value": "يُغسل باليد"
      },
      {
        "label": "الضمان",
        "value": "سنة واحدة"
      }
    ],
    "reviews": [
      {
        "id": "r1",
        "author": "سارة أحمد",
        "rating": 5,
        "date": "2026-05-12",
        "text": "جودة ممتازة وتغليف رائع، تستحق السعر بكل تأكيد."
      },
      {
        "id": "r2",
        "author": "محمد علي",
        "rating": 4,
        "date": "2026-04-28",
        "text": "منتج جميل ووصل بسرعة، أنصح به."
      }
    ]
  },
  {
    "id": "p54",
    "slug": "linens-54",
    "name": "مفرش سفرة قطني — تشكيلة 3",
    "nameEn": "linens item 54",
    "brandId": "b1",
    "categorySlug": "linens",
    "price": 100,
    "oldPrice": 125,
    "rating": 4.5,
    "reviewsCount": 86,
    "images": [
      "/assets/products/p54.jpg",
      "/assets/products/p55.jpg",
      "/assets/products/p56.jpg"
    ],
    "inStock": true,
    "isFeatured": false,
    "isBestseller": false,
    "isNew": false,
    "badge": "خصم",
    "description": "قطعة فاخرة بتصميم عصري أنيق تضيف لمسة من الرقي إلى مائدتك. مصنوعة من خامات عالية الجودة مقاومة للاستخدام اليومي وسهلة التنظيف. مثالية للضيافة والمناسبات الخاصة، وتأتي بتشطيب راقٍ يدوم طويلاً.",
    "specs": [
      {
        "label": "الخامة",
        "value": "سيراميك / ستانلس ستيل عالي الجودة"
      },
      {
        "label": "عدد القطع",
        "value": "6"
      },
      {
        "label": "لون التشطيب",
        "value": "ذهبي"
      },
      {
        "label": "مناسب لغسالة الصحون",
        "value": "نعم"
      },
      {
        "label": "الضمان",
        "value": "سنة واحدة"
      }
    ],
    "reviews": [
      {
        "id": "r1",
        "author": "سارة أحمد",
        "rating": 5,
        "date": "2026-05-12",
        "text": "جودة ممتازة وتغليف رائع، تستحق السعر بكل تأكيد."
      },
      {
        "id": "r2",
        "author": "محمد علي",
        "rating": 4,
        "date": "2026-04-28",
        "text": "منتج جميل ووصل بسرعة، أنصح به."
      }
    ]
  },
  {
    "id": "p55",
    "slug": "linens-55",
    "name": "طقم مفارش تقديم — تشكيلة 3",
    "nameEn": "linens item 55",
    "brandId": "b2",
    "categorySlug": "linens",
    "price": 80,
    "rating": 3.6,
    "reviewsCount": 103,
    "images": [
      "/assets/products/p55.jpg",
      "/assets/products/p56.jpg",
      "/assets/products/p57.jpg"
    ],
    "inStock": false,
    "isFeatured": true,
    "isBestseller": false,
    "isNew": false,
    "description": "قطعة فاخرة بتصميم عصري أنيق تضيف لمسة من الرقي إلى مائدتك. مصنوعة من خامات عالية الجودة مقاومة للاستخدام اليومي وسهلة التنظيف. مثالية للضيافة والمناسبات الخاصة، وتأتي بتشطيب راقٍ يدوم طويلاً.",
    "specs": [
      {
        "label": "الخامة",
        "value": "سيراميك / ستانلس ستيل عالي الجودة"
      },
      {
        "label": "عدد القطع",
        "value": "7"
      },
      {
        "label": "لون التشطيب",
        "value": "كلاسيك"
      },
      {
        "label": "مناسب لغسالة الصحون",
        "value": "يُغسل باليد"
      },
      {
        "label": "الضمان",
        "value": "سنة واحدة"
      }
    ],
    "reviews": [
      {
        "id": "r1",
        "author": "سارة أحمد",
        "rating": 5,
        "date": "2026-05-12",
        "text": "جودة ممتازة وتغليف رائع، تستحق السعر بكل تأكيد."
      },
      {
        "id": "r2",
        "author": "محمد علي",
        "rating": 4,
        "date": "2026-04-28",
        "text": "منتج جميل ووصل بسرعة، أنصح به."
      }
    ]
  },
  {
    "id": "p56",
    "slug": "cutlery-56",
    "name": "طقم ملاعق ستانلس 24 قطعة",
    "nameEn": "cutlery item 56",
    "brandId": "b1",
    "categorySlug": "cutlery",
    "price": 85,
    "rating": 4.3,
    "reviewsCount": 120,
    "images": [
      "/assets/products/p56.jpg",
      "/assets/products/p57.jpg",
      "/assets/products/p58.jpg"
    ],
    "inStock": true,
    "isFeatured": false,
    "isBestseller": true,
    "isNew": false,
    "description": "قطعة فاخرة بتصميم عصري أنيق تضيف لمسة من الرقي إلى مائدتك. مصنوعة من خامات عالية الجودة مقاومة للاستخدام اليومي وسهلة التنظيف. مثالية للضيافة والمناسبات الخاصة، وتأتي بتشطيب راقٍ يدوم طويلاً.",
    "specs": [
      {
        "label": "الخامة",
        "value": "سيراميك / ستانلس ستيل عالي الجودة"
      },
      {
        "label": "عدد القطع",
        "value": "8"
      },
      {
        "label": "لون التشطيب",
        "value": "أبيض"
      },
      {
        "label": "مناسب لغسالة الصحون",
        "value": "نعم"
      },
      {
        "label": "الضمان",
        "value": "سنة واحدة"
      }
    ],
    "reviews": [
      {
        "id": "r1",
        "author": "سارة أحمد",
        "rating": 5,
        "date": "2026-05-12",
        "text": "جودة ممتازة وتغليف رائع، تستحق السعر بكل تأكيد."
      },
      {
        "id": "r2",
        "author": "محمد علي",
        "rating": 4,
        "date": "2026-04-28",
        "text": "منتج جميل ووصل بسرعة، أنصح به."
      }
    ]
  },
  {
    "id": "p57",
    "slug": "cutlery-57",
    "name": "طقم أدوات مائدة فاخر",
    "nameEn": "cutlery item 57",
    "brandId": "b2",
    "categorySlug": "cutlery",
    "price": 65,
    "oldPrice": 80,
    "rating": 5,
    "reviewsCount": 137,
    "images": [
      "/assets/products/p57.jpg",
      "/assets/products/p58.jpg",
      "/assets/products/p59.jpg"
    ],
    "inStock": true,
    "isFeatured": false,
    "isBestseller": false,
    "isNew": false,
    "badge": "خصم",
    "description": "قطعة فاخرة بتصميم عصري أنيق تضيف لمسة من الرقي إلى مائدتك. مصنوعة من خامات عالية الجودة مقاومة للاستخدام اليومي وسهلة التنظيف. مثالية للضيافة والمناسبات الخاصة، وتأتي بتشطيب راقٍ يدوم طويلاً.",
    "specs": [
      {
        "label": "الخامة",
        "value": "سيراميك / ستانلس ستيل عالي الجودة"
      },
      {
        "label": "عدد القطع",
        "value": "9"
      },
      {
        "label": "لون التشطيب",
        "value": "رمادي"
      },
      {
        "label": "مناسب لغسالة الصحون",
        "value": "يُغسل باليد"
      },
      {
        "label": "الضمان",
        "value": "سنة واحدة"
      }
    ],
    "reviews": [
      {
        "id": "r1",
        "author": "سارة أحمد",
        "rating": 5,
        "date": "2026-05-12",
        "text": "جودة ممتازة وتغليف رائع، تستحق السعر بكل تأكيد."
      },
      {
        "id": "r2",
        "author": "محمد علي",
        "rating": 4,
        "date": "2026-04-28",
        "text": "منتج جميل ووصل بسرعة، أنصح به."
      }
    ]
  },
  {
    "id": "p58",
    "slug": "cutlery-58",
    "name": "طقم شوك وملاعق مذهّب",
    "nameEn": "cutlery item 58",
    "brandId": "b1",
    "categorySlug": "cutlery",
    "price": 260,
    "rating": 4.1,
    "reviewsCount": 14,
    "images": [
      "/assets/products/p58.jpg",
      "/assets/products/p59.jpg",
      "/assets/products/p60.jpg"
    ],
    "inStock": true,
    "isFeatured": false,
    "isBestseller": false,
    "isNew": true,
    "badge": "جديد",
    "description": "قطعة فاخرة بتصميم عصري أنيق تضيف لمسة من الرقي إلى مائدتك. مصنوعة من خامات عالية الجودة مقاومة للاستخدام اليومي وسهلة التنظيف. مثالية للضيافة والمناسبات الخاصة، وتأتي بتشطيب راقٍ يدوم طويلاً.",
    "specs": [
      {
        "label": "الخامة",
        "value": "سيراميك / ستانلس ستيل عالي الجودة"
      },
      {
        "label": "عدد القطع",
        "value": "10"
      },
      {
        "label": "لون التشطيب",
        "value": "ذهبي"
      },
      {
        "label": "مناسب لغسالة الصحون",
        "value": "نعم"
      },
      {
        "label": "الضمان",
        "value": "سنة واحدة"
      }
    ],
    "reviews": [
      {
        "id": "r1",
        "author": "سارة أحمد",
        "rating": 5,
        "date": "2026-05-12",
        "text": "جودة ممتازة وتغليف رائع، تستحق السعر بكل تأكيد."
      },
      {
        "id": "r2",
        "author": "محمد علي",
        "rating": 4,
        "date": "2026-04-28",
        "text": "منتج جميل ووصل بسرعة، أنصح به."
      }
    ]
  },
  {
    "id": "p59",
    "slug": "cutlery-59",
    "name": "طقم سكاكين تقديم",
    "nameEn": "cutlery item 59",
    "brandId": "b2",
    "categorySlug": "cutlery",
    "price": 240,
    "rating": 4.8,
    "reviewsCount": 31,
    "images": [
      "/assets/products/p59.jpg",
      "/assets/products/p60.jpg",
      "/assets/products/p61.jpg"
    ],
    "inStock": true,
    "isFeatured": false,
    "isBestseller": false,
    "isNew": true,
    "badge": "جديد",
    "description": "قطعة فاخرة بتصميم عصري أنيق تضيف لمسة من الرقي إلى مائدتك. مصنوعة من خامات عالية الجودة مقاومة للاستخدام اليومي وسهلة التنظيف. مثالية للضيافة والمناسبات الخاصة، وتأتي بتشطيب راقٍ يدوم طويلاً.",
    "specs": [
      {
        "label": "الخامة",
        "value": "سيراميك / ستانلس ستيل عالي الجودة"
      },
      {
        "label": "عدد القطع",
        "value": "11"
      },
      {
        "label": "لون التشطيب",
        "value": "كلاسيك"
      },
      {
        "label": "مناسب لغسالة الصحون",
        "value": "يُغسل باليد"
      },
      {
        "label": "الضمان",
        "value": "سنة واحدة"
      }
    ],
    "reviews": [
      {
        "id": "r1",
        "author": "سارة أحمد",
        "rating": 5,
        "date": "2026-05-12",
        "text": "جودة ممتازة وتغليف رائع، تستحق السعر بكل تأكيد."
      },
      {
        "id": "r2",
        "author": "محمد علي",
        "rating": 4,
        "date": "2026-04-28",
        "text": "منتج جميل ووصل بسرعة، أنصح به."
      }
    ]
  },
  {
    "id": "p60",
    "slug": "cutlery-60",
    "name": "أدوات مائدة عصرية",
    "nameEn": "cutlery item 60",
    "brandId": "b1",
    "categorySlug": "cutlery",
    "price": 220,
    "oldPrice": 275,
    "rating": 3.9,
    "reviewsCount": 48,
    "images": [
      "/assets/products/p60.jpg",
      "/assets/products/p61.jpg",
      "/assets/products/p62.jpg"
    ],
    "inStock": true,
    "isFeatured": true,
    "isBestseller": true,
    "isNew": true,
    "badge": "خصم",
    "description": "قطعة فاخرة بتصميم عصري أنيق تضيف لمسة من الرقي إلى مائدتك. مصنوعة من خامات عالية الجودة مقاومة للاستخدام اليومي وسهلة التنظيف. مثالية للضيافة والمناسبات الخاصة، وتأتي بتشطيب راقٍ يدوم طويلاً.",
    "specs": [
      {
        "label": "الخامة",
        "value": "سيراميك / ستانلس ستيل عالي الجودة"
      },
      {
        "label": "عدد القطع",
        "value": "12"
      },
      {
        "label": "لون التشطيب",
        "value": "أبيض"
      },
      {
        "label": "مناسب لغسالة الصحون",
        "value": "نعم"
      },
      {
        "label": "الضمان",
        "value": "سنة واحدة"
      }
    ],
    "reviews": [
      {
        "id": "r1",
        "author": "سارة أحمد",
        "rating": 5,
        "date": "2026-05-12",
        "text": "جودة ممتازة وتغليف رائع، تستحق السعر بكل تأكيد."
      },
      {
        "id": "r2",
        "author": "محمد علي",
        "rating": 4,
        "date": "2026-04-28",
        "text": "منتج جميل ووصل بسرعة، أنصح به."
      }
    ]
  },
  {
    "id": "p61",
    "slug": "cutlery-61",
    "name": "طقم ملاعق شاي",
    "nameEn": "cutlery item 61",
    "brandId": "b2",
    "categorySlug": "cutlery",
    "price": 225,
    "rating": 4.6,
    "reviewsCount": 65,
    "images": [
      "/assets/products/p61.jpg",
      "/assets/products/p62.jpg",
      "/assets/products/p63.jpg"
    ],
    "inStock": true,
    "isFeatured": false,
    "isBestseller": false,
    "isNew": true,
    "badge": "جديد",
    "description": "قطعة فاخرة بتصميم عصري أنيق تضيف لمسة من الرقي إلى مائدتك. مصنوعة من خامات عالية الجودة مقاومة للاستخدام اليومي وسهلة التنظيف. مثالية للضيافة والمناسبات الخاصة، وتأتي بتشطيب راقٍ يدوم طويلاً.",
    "specs": [
      {
        "label": "الخامة",
        "value": "سيراميك / ستانلس ستيل عالي الجودة"
      },
      {
        "label": "عدد القطع",
        "value": "13"
      },
      {
        "label": "لون التشطيب",
        "value": "رمادي"
      },
      {
        "label": "مناسب لغسالة الصحون",
        "value": "يُغسل باليد"
      },
      {
        "label": "الضمان",
        "value": "سنة واحدة"
      }
    ],
    "reviews": [
      {
        "id": "r1",
        "author": "سارة أحمد",
        "rating": 5,
        "date": "2026-05-12",
        "text": "جودة ممتازة وتغليف رائع، تستحق السعر بكل تأكيد."
      },
      {
        "id": "r2",
        "author": "محمد علي",
        "rating": 4,
        "date": "2026-04-28",
        "text": "منتج جميل ووصل بسرعة، أنصح به."
      }
    ]
  },
  {
    "id": "p62",
    "slug": "cutlery-62",
    "name": "طقم أدوات مائدة كامل",
    "nameEn": "cutlery item 62",
    "brandId": "b1",
    "categorySlug": "cutlery",
    "price": 205,
    "rating": 3.7,
    "reviewsCount": 82,
    "images": [
      "/assets/products/p62.jpg",
      "/assets/products/p63.jpg",
      "/assets/products/p64.jpg"
    ],
    "inStock": true,
    "isFeatured": false,
    "isBestseller": false,
    "isNew": true,
    "badge": "جديد",
    "description": "قطعة فاخرة بتصميم عصري أنيق تضيف لمسة من الرقي إلى مائدتك. مصنوعة من خامات عالية الجودة مقاومة للاستخدام اليومي وسهلة التنظيف. مثالية للضيافة والمناسبات الخاصة، وتأتي بتشطيب راقٍ يدوم طويلاً.",
    "specs": [
      {
        "label": "الخامة",
        "value": "سيراميك / ستانلس ستيل عالي الجودة"
      },
      {
        "label": "عدد القطع",
        "value": "14"
      },
      {
        "label": "لون التشطيب",
        "value": "ذهبي"
      },
      {
        "label": "مناسب لغسالة الصحون",
        "value": "نعم"
      },
      {
        "label": "الضمان",
        "value": "سنة واحدة"
      }
    ],
    "reviews": [
      {
        "id": "r1",
        "author": "سارة أحمد",
        "rating": 5,
        "date": "2026-05-12",
        "text": "جودة ممتازة وتغليف رائع، تستحق السعر بكل تأكيد."
      },
      {
        "id": "r2",
        "author": "محمد علي",
        "rating": 4,
        "date": "2026-04-28",
        "text": "منتج جميل ووصل بسرعة، أنصح به."
      }
    ]
  },
  {
    "id": "p63",
    "slug": "cutlery-63",
    "name": "شوك وملاعق راقية",
    "nameEn": "cutlery item 63",
    "brandId": "b2",
    "categorySlug": "cutlery",
    "price": 210,
    "oldPrice": 265,
    "rating": 4.4,
    "reviewsCount": 99,
    "images": [
      "/assets/products/p63.jpg",
      "/assets/products/p64.jpg",
      "/assets/products/p65.jpg"
    ],
    "inStock": true,
    "isFeatured": false,
    "isBestseller": false,
    "isNew": true,
    "badge": "خصم",
    "description": "قطعة فاخرة بتصميم عصري أنيق تضيف لمسة من الرقي إلى مائدتك. مصنوعة من خامات عالية الجودة مقاومة للاستخدام اليومي وسهلة التنظيف. مثالية للضيافة والمناسبات الخاصة، وتأتي بتشطيب راقٍ يدوم طويلاً.",
    "specs": [
      {
        "label": "الخامة",
        "value": "سيراميك / ستانلس ستيل عالي الجودة"
      },
      {
        "label": "عدد القطع",
        "value": "15"
      },
      {
        "label": "لون التشطيب",
        "value": "كلاسيك"
      },
      {
        "label": "مناسب لغسالة الصحون",
        "value": "يُغسل باليد"
      },
      {
        "label": "الضمان",
        "value": "سنة واحدة"
      }
    ],
    "reviews": [
      {
        "id": "r1",
        "author": "سارة أحمد",
        "rating": 5,
        "date": "2026-05-12",
        "text": "جودة ممتازة وتغليف رائع، تستحق السعر بكل تأكيد."
      },
      {
        "id": "r2",
        "author": "محمد علي",
        "rating": 4,
        "date": "2026-04-28",
        "text": "منتج جميل ووصل بسرعة، أنصح به."
      }
    ]
  },
  {
    "id": "p64",
    "slug": "home-64",
    "name": "طقم تنسيق سفرة",
    "nameEn": "home item 64",
    "brandId": "b1",
    "categorySlug": "home",
    "price": 190,
    "rating": 3.5,
    "reviewsCount": 116,
    "images": [
      "/assets/products/p64.jpg",
      "/assets/products/p65.jpg",
      "/assets/products/p66.jpg"
    ],
    "inStock": true,
    "isFeatured": false,
    "isBestseller": true,
    "isNew": true,
    "badge": "جديد",
    "description": "قطعة فاخرة بتصميم عصري أنيق تضيف لمسة من الرقي إلى مائدتك. مصنوعة من خامات عالية الجودة مقاومة للاستخدام اليومي وسهلة التنظيف. مثالية للضيافة والمناسبات الخاصة، وتأتي بتشطيب راقٍ يدوم طويلاً.",
    "specs": [
      {
        "label": "الخامة",
        "value": "سيراميك / ستانلس ستيل عالي الجودة"
      },
      {
        "label": "عدد القطع",
        "value": "16"
      },
      {
        "label": "لون التشطيب",
        "value": "أبيض"
      },
      {
        "label": "مناسب لغسالة الصحون",
        "value": "نعم"
      },
      {
        "label": "الضمان",
        "value": "سنة واحدة"
      }
    ],
    "reviews": [
      {
        "id": "r1",
        "author": "سارة أحمد",
        "rating": 5,
        "date": "2026-05-12",
        "text": "جودة ممتازة وتغليف رائع، تستحق السعر بكل تأكيد."
      },
      {
        "id": "r2",
        "author": "محمد علي",
        "rating": 4,
        "date": "2026-04-28",
        "text": "منتج جميل ووصل بسرعة، أنصح به."
      }
    ]
  },
  {
    "id": "p65",
    "slug": "home-65",
    "name": "إكسسوار منزلي فاخر",
    "nameEn": "home item 65",
    "brandId": "b2",
    "categorySlug": "home",
    "price": 170,
    "rating": 4.2,
    "reviewsCount": 133,
    "images": [
      "/assets/products/p65.jpg",
      "/assets/products/p66.jpg",
      "/assets/products/p67.jpg"
    ],
    "inStock": true,
    "isFeatured": true,
    "isBestseller": false,
    "isNew": true,
    "badge": "جديد",
    "description": "قطعة فاخرة بتصميم عصري أنيق تضيف لمسة من الرقي إلى مائدتك. مصنوعة من خامات عالية الجودة مقاومة للاستخدام اليومي وسهلة التنظيف. مثالية للضيافة والمناسبات الخاصة، وتأتي بتشطيب راقٍ يدوم طويلاً.",
    "specs": [
      {
        "label": "الخامة",
        "value": "سيراميك / ستانلس ستيل عالي الجودة"
      },
      {
        "label": "عدد القطع",
        "value": "17"
      },
      {
        "label": "لون التشطيب",
        "value": "رمادي"
      },
      {
        "label": "مناسب لغسالة الصحون",
        "value": "يُغسل باليد"
      },
      {
        "label": "الضمان",
        "value": "سنة واحدة"
      }
    ],
    "reviews": [
      {
        "id": "r1",
        "author": "سارة أحمد",
        "rating": 5,
        "date": "2026-05-12",
        "text": "جودة ممتازة وتغليف رائع، تستحق السعر بكل تأكيد."
      },
      {
        "id": "r2",
        "author": "محمد علي",
        "rating": 4,
        "date": "2026-04-28",
        "text": "منتج جميل ووصل بسرعة، أنصح به."
      }
    ]
  },
  {
    "id": "p66",
    "slug": "home-66",
    "name": "طقم تقديم للضيافة",
    "nameEn": "home item 66",
    "brandId": "b1",
    "categorySlug": "home",
    "price": 175,
    "oldPrice": 220,
    "rating": 4.9,
    "reviewsCount": 10,
    "images": [
      "/assets/products/p66.jpg",
      "/assets/products/p67.jpg",
      "/assets/products/p01.jpg"
    ],
    "inStock": false,
    "isFeatured": false,
    "isBestseller": false,
    "isNew": true,
    "badge": "خصم",
    "description": "قطعة فاخرة بتصميم عصري أنيق تضيف لمسة من الرقي إلى مائدتك. مصنوعة من خامات عالية الجودة مقاومة للاستخدام اليومي وسهلة التنظيف. مثالية للضيافة والمناسبات الخاصة، وتأتي بتشطيب راقٍ يدوم طويلاً.",
    "specs": [
      {
        "label": "الخامة",
        "value": "سيراميك / ستانلس ستيل عالي الجودة"
      },
      {
        "label": "عدد القطع",
        "value": "18"
      },
      {
        "label": "لون التشطيب",
        "value": "ذهبي"
      },
      {
        "label": "مناسب لغسالة الصحون",
        "value": "نعم"
      },
      {
        "label": "الضمان",
        "value": "سنة واحدة"
      }
    ],
    "reviews": [
      {
        "id": "r1",
        "author": "سارة أحمد",
        "rating": 5,
        "date": "2026-05-12",
        "text": "جودة ممتازة وتغليف رائع، تستحق السعر بكل تأكيد."
      },
      {
        "id": "r2",
        "author": "محمد علي",
        "rating": 4,
        "date": "2026-04-28",
        "text": "منتج جميل ووصل بسرعة، أنصح به."
      }
    ]
  },
  {
    "id": "p67",
    "slug": "home-67",
    "name": "تنسيق طاولة كامل",
    "nameEn": "home item 67",
    "brandId": "b2",
    "categorySlug": "home",
    "price": 155,
    "rating": 4,
    "reviewsCount": 27,
    "images": [
      "/assets/products/p67.jpg",
      "/assets/products/p01.jpg",
      "/assets/products/p02.jpg"
    ],
    "inStock": true,
    "isFeatured": false,
    "isBestseller": false,
    "isNew": true,
    "badge": "جديد",
    "description": "قطعة فاخرة بتصميم عصري أنيق تضيف لمسة من الرقي إلى مائدتك. مصنوعة من خامات عالية الجودة مقاومة للاستخدام اليومي وسهلة التنظيف. مثالية للضيافة والمناسبات الخاصة، وتأتي بتشطيب راقٍ يدوم طويلاً.",
    "specs": [
      {
        "label": "الخامة",
        "value": "سيراميك / ستانلس ستيل عالي الجودة"
      },
      {
        "label": "عدد القطع",
        "value": "19"
      },
      {
        "label": "لون التشطيب",
        "value": "كلاسيك"
      },
      {
        "label": "مناسب لغسالة الصحون",
        "value": "يُغسل باليد"
      },
      {
        "label": "الضمان",
        "value": "سنة واحدة"
      }
    ],
    "reviews": [
      {
        "id": "r1",
        "author": "سارة أحمد",
        "rating": 5,
        "date": "2026-05-12",
        "text": "جودة ممتازة وتغليف رائع، تستحق السعر بكل تأكيد."
      },
      {
        "id": "r2",
        "author": "محمد علي",
        "rating": 4,
        "date": "2026-04-28",
        "text": "منتج جميل ووصل بسرعة، أنصح به."
      }
    ]
  }
];

export const featuredProducts = products.filter(p => p.isFeatured);
export const bestsellers = products.filter(p => p.isBestseller);
export const newArrivals = products.filter(p => p.isNew);

export function getProduct(slug: string) { return products.find(p => p.slug === slug); }
export function getBrand(id: string) { return brands.find(b => b.id === id); }
export function getCategory(slug: string) { return categories.find(c => c.slug === slug); }
export function productsByCategory(slug: string) { return products.filter(p => p.categorySlug === slug); }
export function relatedProducts(p: Product, n = 4) {
  return products.filter(x => x.categorySlug === p.categorySlug && x.id !== p.id).slice(0, n);
}
