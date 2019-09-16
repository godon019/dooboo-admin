import * as Yup from 'yup';

import styled, { css } from 'styled-components';

import Button from '../../shared/Button';
import { Category } from '../../../types';
import Cell from '../../shared/Cell';
import { Formik } from 'formik';
import Input from '../../shared/Input';
import Modal from '../../shared/Modal';
import React from 'react';
import Select from '../../shared/Select';
import Title from '../../shared/Title';
import { getString } from '../../../../STRINGS';
import { withCategoryModalApollo } from './withApollo';

export interface CategoryModalProps {
  isVisible: boolean;
  isNew: boolean; // true when create, false when update
  onClose: () => void;
  onSubmit: (values) => void;
  category: Category;
  children?: React.ReactNode;
}

const SubsModalSchema = Yup.object().shape<Category>({
  id: Yup.string(),
  key: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
  released: Yup.boolean().required('Required'),
});

const CategoryModal: React.FC<CategoryModalProps> = ({
  isVisible,
  onClose,
  category,
  onSubmit,
  isNew,
  children,
}) => {
  const initialValues: Category = category;
  return (
    <Modal isVisible={isVisible}>
      <ContainerDiv>
        <HeaderDiv>
          <Title
            text={
              isNew
                ? getString('SERVICE_GROUP_MODAL_CREATE_TITLE')
                : getString('SERVICE_GROUP_MODAL_UPDATE_TITLE')
            }
            src={
              'https://github.com/dooboolab/dooboolab-mobile/blob/master/assets/splash.gif?raw=true'
            }
          />
        </HeaderDiv>
        <Formik<Category>
          // enableReinitialize={true}
          initialValues={initialValues}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            // console.log(values);
            onSubmit({ ...values });
            setSubmitting(false);
            resetForm();
          }}
          validationSchema={SubsModalSchema}
          render={({
            errors,
            handleSubmit,
            handleChange,
            setFieldValue,
            values,
          }) => {
            if (Object.getOwnPropertyNames(errors).length !== 0) {
              // eslint-disable-next-line no-console
              console.log('formik errors', errors);
            }

            return (
              <form onSubmit={handleSubmit}>
                {!isNew && (
                  <Cell
                    errors={errors}
                    label={'ID'}
                    htmlFor='id'
                    labelCss={LabelCss}
                  >
                    <Input
                      name='id'
                      type='text'
                      id='id'
                      value={values.id}
                      readOnly
                      // onChange={handleChange}
                      placeholder='id'
                    />
                  </Cell>
                )}
                <Cell
                  errors={errors}
                  label={getString('CAT_MODAL_KEY')}
                  htmlFor='key'
                  labelCss={LabelCss}
                >
                  <Input
                    name='key'
                    type='text'
                    id='key'
                    value={values.key}
                    onChange={handleChange}
                    placeholder='key'
                  />
                </Cell>

                <Cell
                  errors={errors}
                  label={getString('CAT_MODAL_RELEASED')}
                  htmlFor='released'
                  labelCss={LabelCss}
                >
                  <Select
                    name='released'
                    options={[
                      { value: true, label: 'true' },
                      { value: false, label: 'false' },
                    ]}
                    value={values.released}
                    onClick={(value) => setFieldValue('released', value)}
                  />
                </Cell>

                <Cell
                  errors={errors}
                  label={getString('CAT_MODAL_DESC')}
                  htmlFor='description'
                  labelCss={LabelCss}
                >
                  <MemoTextArea
                    name='description'
                    id='description'
                    value={values.description}
                    onChange={handleChange}
                    placeholder={`키 번역 값 및 기타 설명을 입력하세요.\n예) kr - 카테고리1 / en - category1`}
                  />
                </Cell>

                <FooterDiv>
                  <ButtonWrapperDiv>
                    <Button text='닫기' inverted={true} onClick={onClose} />
                  </ButtonWrapperDiv>
                  <ButtonWrapperDiv>
                    <Button
                      text={isNew ? '생성' : '수정'}
                      onClick={handleSubmit}
                    />
                  </ButtonWrapperDiv>
                </FooterDiv>
              </form>
            );
          }}
        />
        {children}
      </ContainerDiv>
    </Modal>
  );
};

export { CategoryModal as PureCategoryModal };

export default withCategoryModalApollo(CategoryModal);

const ContainerDiv = styled.div`
  width: 800px;
  margin: 0 auto;
  /* padding-top: 75px; */
`;
const HeaderDiv = styled.div`
  text-align: left;
`;

const ButtonWrapperDiv = styled.div`
  width: 210px;
  position: relative;
  &:first-child {
    margin-right: 30px;
  }
`;

const FooterDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

const MemoTextArea = styled.textarea`
  padding: 20px 16px;
  font-size: 14px;
  width: 100%;
  height: 300px;
  border: 1px solid #dee2e6;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: rgb(215, 216, 217);
    font-size: 14px;
  }
`;

const LabelCss = css`
  font-size: 22px;
  font-weight: bold;
`;
