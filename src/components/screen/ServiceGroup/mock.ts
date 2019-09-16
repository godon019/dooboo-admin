import {
  Category,
  CategoryTableLabel,
  ServiceFront,
  ServiceGroup,
  ServiceGroupFront,
  ServiceGroupTableLabel,
} from '../../../types';

import faker from 'faker';

// This function is being used to create below SERVICE_LIST

// const createFakeCategoryList = () => {
//   let list: Array<ServiceGroupTableLabel> = [];
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

export const SERVICE_GROUP_LIST: Array<ServiceGroupFront> = [
  {
    id: '056a2f1a-b5cd-4487-bdaa-4e8c58475386',
    key: '111',
    nameKr: '국문',
    nameEn: '영문',
    description:
      'Dolor omnis explicabo eaque at consequuntur. Quod aspernatur ut occaecati est. Reiciendis ullam et velit facilis ratione.\n \rMinus sed velit sequi blanditiis eum est voluptatem. Dolor et impedit qui. Est similique modi voluptates molestiae facilis cum.\n \rD',
  },
  {
    id: '19228712-d40c-431d-bcab-fadd2e94c961',
    key: 'Borders',
    nameKr: '국문',
    nameEn: '영문',
    description:
      'Dolor omnis explicabo eaque at consequuntur. Quod aspernatur ut occaecati est. Reiciendis ullam et velit facilis ratione.\n \rMinus sed velit sequi blanditiis eum est voluptatem. Dolor et impedit qui. Est similique modi voluptates molestiae facilis cum.\n \rD',
  },
];
