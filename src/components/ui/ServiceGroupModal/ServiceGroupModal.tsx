import * as Yup from 'yup';

import styled, { css } from 'styled-components';

import Button from '../../shared/Button';
import Cell from '../../shared/Cell';
import { DisplayState } from '../../../utils/DisplayState';
import { Formik } from 'formik';
import Input from '../../shared/Input';
import Modal from '../../shared/Modal';
import React from 'react';
import Select from '../../shared/Select';
import { ServiceGroup } from '../../../types';
import Title from '../../shared/Title';
import { WithServiceGroupApollo } from './withApollo';
import { getString } from '../../../../STRINGS';

export interface ServiceGroupModalProps {
  isVisible: boolean;
  isNew: boolean; // true when create, false when update
  onClose: () => void;
  onSubmit: (values: ServiceGroup) => void;
  serviceGroup: ServiceGroup;
  children?: React.ReactNode;
}

const SubsModalSchema = Yup.object().shape<ServiceGroup>({
  id: Yup.string(),
  key: Yup.string().required('Required'),
  description: Yup.string(),
});

const ServiceGroupModal: React.FC<ServiceGroupModalProps> = ({
  isVisible,
  onClose,
  serviceGroup,
  onSubmit,
  isNew,
  children,
}) => {
  const initialValues: ServiceGroup = serviceGroup;
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
        <Formik<ServiceGroup>
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
                <DisplayState values={values} />
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
                  label={getString('CAT_MODAL_DESC')}
                  htmlFor='description'
                  labelCss={LabelCss}
                >
                  <MemoTextArea
                    name='description'
                    id='description'
                    value={values.description}
                    onChange={handleChange}
                    placeholder={`키 번역 값 및 기타 설명을 입력하세요.\n예) kr - 그룹1 / en - group1`}
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

export default ServiceGroupModal;
export const ServiceGroupModalWithApollo = WithServiceGroupApollo(
  ServiceGroupModal,
);

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

const InputWrapper = styled.div`
  width: 330px;
  &:last-child {
    margin-left: 30px;
  }
`;

const LabelCss = css`
  font-size: 22px;
  font-weight: bold;
`;
