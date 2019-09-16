// import {
//   RenderResult,
//   act,
//   fireEvent,
//   render,
//   waitForDomChange,
//   waitForElement,
// } from '@testing-library/react';
// import ServiceModal, { ServiceModalProps } from '../ServiceModal';
// import renderer, { ReactTestRendererJSON } from 'react-test-renderer';

// import React from 'react';
// import { ServiceFront } from '../../../types';
// import ThemeProvider from '../../../providers/ThemeProvider';
// import { getString } from '../../../../STRINGS';

// let component: React.ReactElement;
// let testingLib: any;
// const serviceMock: ServiceFront = {
//   id: '87355',
//   keyName: 'KEYNAME',
//   name: 'Davis, Howell and Lindgren',
//   nameKr: '국문이름',
//   thumbnail:
//     'https://s3.amazonaws.com/uifaces/faces/twitter/primozcigler/128.jpg',
//   image: 'https://s3.amazonaws.com/uifaces/faces/twitter/primozcigler/128.jpg',
//   homepage: 'http://whats.sub',
//   memo: 'whatssub',
//   iosAppStoreUrl: '',
//   androidPlayStoreUrl: '',
//   categoryId: '',
//   serviceGroupId: '',
// };
// // let initProps: Service = {
// //   thumbnail: null,
// //   image: null,
// //   name: '',
// //   homepage: '',
// //   memo: '',
// // };
// const SUPPORTED_FORMATS = ['image/gif', 'image/png'];
// const imageChangeValidation = (file) =>
//   file && SUPPORTED_FORMATS.includes(file.type);

// // const serviceInfo: Service = {
// //   id: '',
// //   name: initProps.name,
// //   thumbnail: initProps.thumbnail,
// // };

// let props: ServiceModalProps = {
//   onCloseServiceClick: jest.fn(),
//   onSubmitFinishedSuccess: jest.fn((arg) => arg),
//   onHandleImgChange: jest.fn(),
//   show: false,
//   serviceInfo: serviceMock,
// };

// describe('[ServiceModal] render', () => {
//   it('renders without crashing', () => {
//     const rendered: ReactTestRendererJSON = renderer
//       .create(
//         <ThemeProvider>
//           <ServiceModal {...props} />
//         </ThemeProvider>,
//       )
//       .toJSON();
//     expect(rendered).toMatchSnapshot();
//     expect(rendered).toBeTruthy();
//   });
// });

// // describe('[ServiceModal] interactions', () => {
// //   // const component = <ServiceModal {...props} />;
// //   const component = (
// //     <ThemeProvider>
// //       <ServiceModal {...props} />
// //     </ThemeProvider>
// //   );
// //   let renderResult: RenderResult;

// //   beforeAll(() => {
// //     renderResult = render(component);
// //   });
// //   it('modal closed inline method triggered', () => {
// //     const modalCloseButton = renderResult.getByTestId('serviceModalCloseBtn');
// //     fireEvent.click(modalCloseButton);
// //     expect(props.onCloseServiceClick).toHaveBeenCalled();
// //   });
// //   it('file type check when user upload thumbnail image file', async () => {
// //     let thumbnail = 'uploadThumbnail';
// //     let thumbnailInput = renderResult.getByTestId(`${thumbnail}-file`);
// //     const invalidFile = new File(['invalidfile'], 'invalidfile.pdf', {
// //       type: 'application/pdf',
// //     });
// //     fireEvent.change(thumbnailInput, { target: { files: [invalidFile] } });
// //     const defaultPreview = await waitForElement(() =>
// //       renderResult.getByTestId('defaultPreview'),
// //     );
// //     expect(defaultPreview).toBeTruthy();

// //     const validFile = new File(['validfile'], 'validfile.png', {
// //       type: 'image/png',
// //     });
// //     fireEvent.change(thumbnailInput, { target: { files: [validFile] } });
// //     const imageAreaAfterChange = await waitForElement(() =>
// //       renderResult.getByTestId(`${thumbnail}-preview`),
// //     );
// //     expect(imageAreaAfterChange).toBeTruthy();
// //   });
// //   it('existed data is rendered well on modal', () => {
// //     let newProps = {
// //       ...props,
// //       serviceInfo: serviceMock,
// //     };
// //     renderResult.rerender(
// //       <ThemeProvider>
// //         <ServiceModal {...newProps} />
// //       </ThemeProvider>,
// //     );

// //     const serviceNameInput = renderResult.getByTestId(
// //       'keyName',
// //     ) as HTMLInputElement;
// //     const serviceNameKorInput = renderResult.getByTestId(
// //       'serviceNameKor',
// //     ) as HTMLInputElement;
// //     const webPageInput = renderResult.getByTestId('homepage') as HTMLInputElement;
// //     const memoInput = renderResult.getByTestId('memo') as HTMLInputElement;

// //     expect(serviceNameInput.value).toBe(serviceMock.name);
// //     expect(serviceNameKorInput.value).toBe(serviceMock.nameKr);
// //     expect(webPageInput.value).toBe(serviceMock.homepage);
// //     expect(memoInput.value).toBe(serviceMock.memo);
// //   });
// //   it('onSubmit inline method triggered', async () => {
// //     // TODO: get to be triggered
// //     const modalSaveButton = renderResult.getByTestId('serviceSubmit');
// //     fireEvent.submit(modalSaveButton);
// //     setTimeout(() => {
// //       expect(props.onSubmitClick).toHaveBeenCalled();
// //     }, 410);
// //   });
// // });
