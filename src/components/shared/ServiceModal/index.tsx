import * as Yup from 'yup';

import {
  Category,
  ServiceFront,
  ServiceServerOnlyValues,
} from '../../../types';
import {
  ErrorMessage,
  Field,
  Formik,
  FormikActions,
  FormikProps,
} from 'formik';
import { LabelSize, WhenNarrow } from '../../../utils/Styles';
import React, { forwardRef, useCallback, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

import Button from '../Button';
import Cell from '../Cell';
import { DisplayState } from '../../../utils/DisplayState';
import ImgFileInput from '../ImgFileInput';
import Input from '../Input';
import Select from '../Select';
import TextArea from '../TextArea';
import Title from '../Title';
import config from '../../../utils/Config';
import { getString } from '../../../../STRINGS';
import { useImgUpload } from './imageControl';
import { withServiceModalApollo } from './withApollo';

interface ISCWrapperProps {
  show: boolean;
}
export interface ServiceModalProps {
  show: boolean;
  isNew: boolean;
  onCloseServiceClick: () => void;
  serviceInfo: ServiceServerOnlyValues;
  categories: Array<Category>;
  onSubmitFinishedSuccess: (service: ServiceServerOnlyValues) => void;
  onHandleImgChange?: () => void;
  children?: React.ReactNode;
}

// Validation
const ServiceModalSchema = Yup.object().shape<ServiceServerOnlyValues>({
  id: Yup.string(),
  keyName: Yup.string().required(
    getString('SERVICE_NAME_KEY') + ' ' + getString('INPUT_REQUIRED'),
  ),
  thumbnail: Yup.string(),
  homepage: Yup.string(),
  categoryId: Yup.string().required('카테고리를 선택해 주세요'),
  memo: Yup.string(),
});

const useOptions = (list: Array<{ id: string; key: string }>) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    setOptions(
      list.map((item) => ({
        value: item.id,
        label: item.key,
      })),
    );
    // eslint-disable-next-line no-console
    console.log('set options');
  }, [list]);

  return { options };
};

// Modal
const ServiceModal = forwardRef<HTMLDivElement, ServiceModalProps>(
  (
    {
      show,
      isNew,
      onCloseServiceClick,
      onSubmitFinishedSuccess,
      onHandleImgChange,
      categories,
      serviceInfo,
      children,
    },
    ref,
  ) => {
    const {
      onFileChange: onThumbnailFileChange,
      uploadedFilename: thumbnailFileName,
    } = useImgUpload();

    const { options: categoryOptions } = useOptions(categories);

    const initialValuesObj: ServiceServerOnlyValues = serviceInfo;

    // type OnSubmit = (
    //   values: ServiceServerOnlyValues,
    //   formikActions: FormikActions<ServiceServerOnlyValues>,
    // ) => void;
    // const onSubmitForm: OnSubmit = (values, { setSubmitting, resetForm }) => {
    //   // passing values as copying, for safety(worried if resetForm will clear the values use the values onSubmit)
    //   onSubmitFinishedSuccess({ ...values });
    //   setSubmitting(false);
    //   resetForm();
    // };

    // Component
    const ServiceContentsInputDom: React.ComponentType<
      FormikProps<ServiceServerOnlyValues>
    > = (formikProps) => {
      const {
        handleSubmit,
        handleChange,
        handleBlur,
        setFieldValue,
        setTouched,
        setFieldError,
        setErrors,
        touched,
        values,
        errors,
        resetForm,
      } = formikProps;

      const inputCss = `
        width: 100%;
      `;
      return (
        <form onSubmit={handleSubmit}>
          <Title text={getString('SERVICE_ADD_BUTTON')} />
          <InputContentArea>
            <InputRowRoot>
              <InputRowKey>{getString('SERVICE_NAME_KEY')}</InputRowKey>
              <InputRowValue>
                <Input
                  data-testid={'keyName'}
                  type='text'
                  name='keyName'
                  id='keyName'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.keyName}
                  customCss={inputCss}
                  placeholder={'key 를 입력하세요'}
                />
                <ErrorMessage component={AlertArea} name='keyName' />
              </InputRowValue>
            </InputRowRoot>
            <InputRowRoot>
              <InputRowKey>{getString('THUMBNAIL')}</InputRowKey>
              <InputRowValue>
                <ImgFileInput
                  previewImg={values.thumbnail}
                  previewName={thumbnailFileName}
                  name='thumbnail'
                  id='thumbnail'
                  onChange={onThumbnailFileChange({
                    ...formikProps,
                    field: 'thumbnail',
                  })}
                />
                {errors && errors.thumbnail && (
                  <FileUploadErrorMessage>
                    {errors.thumbnail}
                  </FileUploadErrorMessage>
                )}
              </InputRowValue>
            </InputRowRoot>

            <InputRowRoot>
              <InputRowKey>{getString('WEB_PAGE')}</InputRowKey>
              <InputRowValue>
                <Input
                  data-testid={'homepage'}
                  type='text'
                  name='homepage'
                  id='homepage'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.homepage}
                  customCss={inputCss}
                />
                <ErrorMessage component={AlertArea} name='homepage' />
              </InputRowValue>
            </InputRowRoot>
            <Cell
              errors={errors}
              label={'카테고리 키'}
              htmlFor='categoryId'
              labelCss={LabelCss}
            >
              <Select
                name='categoryId'
                options={categoryOptions}
                value={values.categoryId}
                onClick={(value) => setFieldValue('categoryId', value)}
              />
            </Cell>

            <InputRowRoot>
              <InputRowKey>{getString('MEMO')}</InputRowKey>
              <InputRowValue>
                <TextArea
                  data-testid={'memo'}
                  name='memo'
                  id='memo'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.memo}
                  customCss={inputCss}
                  rows={10}
                  placeholder={`키 번역 값 및 기타 설명을 입력하세요. \n예) \n이름키 kr - 그룹1 / en - group1`}
                />
                <ErrorMessage component={AlertArea} name='memo' />
              </InputRowValue>
            </InputRowRoot>
          </InputContentArea>
          <RowAlignRight>
            <Button
              data-testid={`serviceModalCloseBtn`}
              text={'닫기'}
              onClick={() => {
                resetForm(serviceInfo);
                onCloseServiceClick();
              }}
              customStyle={{
                width: '25%',
              }}
              inverted
            />
            <Button
              data-testid={`serviceSubmit`}
              type='submit'
              text={isNew ? '생성' : '수정'}
              customStyle={{
                width: '25%',
              }}
            />
          </RowAlignRight>

          <DisplayState
            mappedCategory={categoryOptions}
            error={errors}
            values={values}
          />
          {children}
        </form>
      );
    };

    return (
      <Wrapper ref={ref} show={show}>
        <Container>
          <Formik<ServiceServerOnlyValues>
            onSubmit={(values, { setSubmitting, resetForm }) => {
              // passing values as copying, for safety(worried if resetForm will clear the values use the values onSubmit)
              onSubmitFinishedSuccess({ ...values });
              setSubmitting(false);
              resetForm();
            }}
            initialValues={initialValuesObj}
            enableReinitialize={true}
            validationSchema={ServiceModalSchema}
            component={ServiceContentsInputDom}
          />
        </Container>
      </Wrapper>
    );
  },
);

export default withServiceModalApollo(ServiceModal);

const inputCommonStyle = `
  width: 100%;
  border-radius: .3rem;
  padding: 0.5em;
  background: papayawhip;
  border: none;
  font-size: 1rem;
`;
const flexMiddle = `
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  overflow: scroll;
  display: flex;
  opacity: ${({ show }: ISCWrapperProps) => (show ? 1 : 0)};
  flex-direction: column;
  ${flexMiddle}
  transition: visibility 0s, opacity 0.2s linear;
  z-index: 2;
  visibility: ${({ show }: ISCWrapperProps) => (show ? 'visible' : 'hidden')};
`;
const Container = styled.div`
  background: ${(props) => props.theme.background};
  color: ${(props) => props.theme.fontColor};
  align-self: stretch;
  padding: 2rem;
  overflow: scroll;
  border-radius: 0.5rem;
  margin: 2rem 15%;
  box-shadow: 2px 4px 0.5rem 0 #323232;
  max-width: 70%;
  box-sizing: border-box;
  ${WhenNarrow} {
    margin: 2rem 5%;
    max-width: 90%;
  }
`;
const InputContentArea = styled.div`
  margin: 1rem 0;
`;
const RowAlignRight = styled.div`
  display: flex;
  justify-content: flex-end;
  text-align: right;
`;

const FileUploadErrorMessage = styled.div`
  color: red;
  font-size: 0.8rem;
  padding: 0.2rem;
  width: 100%;
`;

const InputRowRoot = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 0.2rem;
  ${WhenNarrow} {
    display: block;
  }
`;
const InputRowKey = styled.div`
  /* flex: 1; */
  ${LabelSize}
  padding-top: 1rem;
  padding-bottom: 0.5rem;
  font-weight: bold;
  font-size: 1.2rem;
`;
const InputRowValue = styled.div`
  flex: 2;
`;
const AlertArea = styled.div`
  width: 100%;
  padding: 0.2rem;
  font-size: 0.8rem;
  color: red;
`;
const LabelCss = css`
  font-size: 22px;
  font-weight: bold;
`;
