import { Category, CategoryTableLabel, ServiceFront } from '../../../types';

import faker from 'faker';

// This function is being used to create below SERVICE_LIST

// const createFakeCategoryList = () => {
//   let list: Array<Category> = [];
//   const length = 10;
//   for (let i = 0; i < length; i++) {
//     list.push({
//       id: faker.random.uuid(),
//       key: faker.random.word(),
//       description: faker.lorem.paragraphs(),
//     });
//   }
//   // you can copy the result of it and paste it to 'ServiceList'
//   console.log('fake category list', JSON.stringify(list, null, 2));
//   return list;
// };
// createFakeCategoryList();

export const CATEGORY_LIST: Array<Category> = [
  {
    id: 'ac06d5bb-68f2-4773-b2fe-0eb3134645a9',
    key: 'Borders',
    description:
      'Dolor omnis explicabo eaque at consequuntur. Quod aspernatur ut occaecati est. Reiciendis ullam et velit facilis ratione.\n \rMinus sed velit sequi blanditiis eum est voluptatem. Dolor et impedit qui. Est similique modi voluptates molestiae facilis cum.\n \rDolorem qui optio adipisci amet expedita qui nisi consequatur. Tempora possimus quasi recusandae reprehenderit debitis nisi. Earum temporibus porro quia tempore non aut et sit.',
    released: false,
  },
  {
    id: 'e241e726-0a01-4dda-bc8d-1fbac776cc2b',
    key: 'transmitting',
    description:
      'Repellat repellat fuga fuga et sed saepe non. Facere et ratione magnam. Dolorem amet debitis ea sed voluptatibus doloribus deserunt.\n \rDeserunt adipisci doloremque eligendi itaque at inventore qui suscipit. Fugiat deleniti reiciendis et. Odio harum architecto sunt. Eaque maxime quaerat culpa minima.\n \rEarum molestiae omnis eaque et sit tempore porro et. Mollitia molestiae ut. Assumenda aut nemo suscipit.',
    released: false,
  },
  {
    id: '91ae9af1-5990-4ebb-94b3-57d0437c0061',
    key: 'Lebanese Pound',
    description:
      'Repellat veritatis ipsa natus distinctio inventore consequuntur voluptatibus dolor. Nisi adipisci quis repellendus qui labore voluptatem explicabo quasi iure. Ratione quia et dolorem mollitia rerum consequatur minus temporibus fuga. Et quo et.\n \rNon sunt rem inventore qui dolorem. Est molestias voluptatem enim maiores quia et. Labore commodi saepe quidem eligendi quisquam numquam magnam ut.\n \rVel ut eos tempora consequuntur. Iusto omnis ullam quia facilis enim eum ea illum distinctio. Et recusandae fugiat qui inventore sunt temporibus ullam dolor eaque.',
    released: true,
  },
  {
    id: 'a33497d1-8689-40e3-95c0-e3c62fb33764',
    key: 'Bedfordshire',
    description:
      'Quasi et eum excepturi quae eum ut sint aut et. Sunt iusto nulla. Omnis deserunt ipsa aut nulla dolor cumque sed itaque. Corrupti aut sunt quis. Fugiat rerum qui et ipsum saepe.\n \rAperiam quae excepturi et. Sit porro iusto nam. Harum cumque quia vitae quae et placeat qui dolores.\n \rNon similique cumque occaecati et quisquam iusto eum consequatur. Id quaerat et accusantium voluptatibus. Consequatur minus iure reiciendis aliquam saepe. Veniam quis exercitationem laborum et eligendi distinctio.',
    released: false,
  },
  {
    id: 'd2172333-7787-4d1f-9bf7-a0973cd412f1',
    key: 'Music',
    description:
      'Officia et rerum optio mollitia qui. Dolor soluta quidem. Voluptatum dolor voluptatem porro qui ea aspernatur architecto sed. In ducimus ex veritatis.\n \rSit velit tempora quis. Molestias incidunt inventore sunt. Nemo assumenda cum est quia minima iusto iusto unde possimus.\n \rSed nostrum at tenetur quasi quod. Perspiciatis non dolores impedit error. Esse tempora et. A molestiae numquam et corporis dolorem. Natus ut quis pariatur placeat vel et nemo voluptate iste. Magni sit quae occaecati eos modi enim in totam voluptate.',
    released: false,
  },
  {
    id: '2157b531-86fa-4d0a-afae-38a459578bcf',
    key: 'Metal',
    description:
      'Culpa iusto quidem eos. Ea accusamus enim qui dignissimos consequatur laudantium aut soluta expedita. Esse quas id et dicta at eum rem. Consectetur vel id rem aliquam ut ut recusandae vitae. Unde sunt voluptates qui.\n \rAliquid quidem adipisci et aut. Maiores hic et rerum tempora voluptas sed et molestiae. Hic quis consequatur porro. Sunt molestiae est dignissimos iste. In expedita quos omnis occaecati qui voluptas quia doloremque corporis. Pariatur minus debitis saepe non qui accusamus tempore ullam.\n \rEt molestiae quasi ut repudiandae omnis voluptatum eos. Cum et et voluptates quia. Rerum fuga cumque voluptas iste ex.',
    released: false,
  },
  {
    id: '6216dd2d-9447-4927-b1e8-3f0d6148fd2c',
    key: 'copy',
    description:
      'Nesciunt enim quidem sit molestiae. Et nobis voluptatibus illo est accusantium. Accusamus odit iste rerum et placeat id eos voluptatem voluptatibus.\n \rIure et voluptatem dolor qui amet repellat. Cum dolor ducimus. Officiis placeat accusantium enim quidem et. Ipsa quam rem velit consequatur cum quo eos. Rerum soluta eum eum architecto est eos animi quod sint. Hic qui nostrum illo odio minus et.\n \rSuscipit voluptas minima ducimus itaque dicta. Minus itaque pariatur qui. Suscipit esse illo est velit reprehenderit error est corrupti. Quis possimus possimus vel id delectus architecto. Corrupti unde at nihil. Expedita cumque tenetur asperiores dolores.',
    released: false,
  },
  {
    id: '6fd53a91-2cf2-40d2-9b91-1efe88d1bdfc',
    key: 'Fantastic Rubber Chips',
    description:
      'Qui excepturi qui beatae delectus quia adipisci. Ullam tenetur voluptatem enim perspiciatis deserunt libero. Sed doloribus aspernatur quaerat est in labore. Quia hic rerum distinctio maiores doloribus. Maiores mollitia autem est dolore minima adipisci voluptates qui non.\n \rAperiam voluptate illum similique temporibus voluptas ea placeat. Aliquid modi laborum quia tempore dolorem consectetur voluptatem. Quasi velit dolore et. Vitae provident voluptatem. Quas nam hic maxime.\n \rNatus deleniti eveniet voluptatum deserunt reprehenderit et in quia rerum. Qui laudantium aut aut sit porro. Mollitia nulla et repellat maiores quae consequatur voluptatibus iusto et.',
    released: false,
  },
  {
    id: '85ac43a0-c14c-49dc-9280-96736b27de24',
    key: 'Rustic Plastic Cheese',
    description:
      'Fugit iusto et et at ut. Ipsam recusandae et voluptas nihil et esse libero. Ducimus a autem ab quaerat.\n \rVoluptas amet atque eum tempora cumque illum accusantium occaecati voluptatibus. Velit ut ipsam incidunt ducimus. Voluptate nulla odio quia adipisci est qui et ut. Esse reiciendis voluptas eum est voluptatum. Ratione qui libero ab non voluptas quidem voluptate aut voluptatum. Quia tempora ipsum impedit dolore asperiores quo.\n \rPorro eum quibusdam harum est itaque dolor reiciendis quis. Aliquid consequuntur deleniti tempora iusto accusamus ut. Hic rem in veritatis sint ut delectus nisi. Similique neque tenetur quod et at ipsum dolor consequuntur. Eveniet reiciendis in.',
    released: false,
  },
  {
    id: '292f6a2f-ff4b-4d6f-95f4-a3763da95dfd',
    key: 'streamline',
    description:
      'Voluptatem sed animi voluptate deleniti. Eos earum commodi. Odit omnis porro sit fuga.\n \rArchitecto et excepturi sequi laboriosam qui recusandae porro debitis omnis. Ab recusandae voluptates corporis id est exercitationem ut magni. Labore magnam rerum ratione sequi corrupti non. Cumque rem officia eius nisi non a aliquam aspernatur. Qui autem aperiam consequatur. Voluptates necessitatibus voluptatem.\n \rDolorum eveniet qui ut omnis occaecati tenetur error temporibus qui. Quae non enim dolorum vel non sed omnis minima voluptas. Labore ipsam nulla. Et quasi sed.',
    released: false,
  },
];
