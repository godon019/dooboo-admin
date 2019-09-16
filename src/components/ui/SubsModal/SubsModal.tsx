import * as Yup from 'yup';

import { ErrorMessage, Formik } from 'formik';
import styled, { css } from 'styled-components';

import Button from '../../shared/Button';
import Cell from '../../shared/Cell';
import Config from '../../../utils/Config';
import { DisplayState } from '../../../utils/DisplayState';
import Input from '../../shared/Input';
import Modal from '../../shared/Modal';
import React from 'react';
import Select from '../../shared/Select';
import { SubsNOp } from '../../../types';
import Title from '../../shared/Title';
import { getString } from '../../../../STRINGS';
import { withApollo } from 'react-apollo';
import { withSubsModalApollo } from './withApollo';

export interface SubsModalProps {
  isVisible: boolean;
  isNew: boolean;
  onClose: () => void;
  onSubmit: (values: SubsNOp) => void;
  subs: SubsNOp;
}

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

const SubsModalSchema = Yup.object().shape<SubsNOp>({
  id: Yup.string(),
  directLink: Yup.string(),
  serviceId: Yup.string(),
  keyName: Yup.string().required('Required'),
  currency: Yup.string()
    .oneOf(['USD', 'KRW'])
    .required('Required') as any,
  pricePlan: Yup.number().required('Required'),
  periodUnit: Yup.number().required('Required'),
  periodType: Yup.string()
    .oneOf(['MONTHLY', 'YEARLY', 'WEEKLY', 'DAILY'])
    .required('Required') as any,
  case: Yup.number().required('Required'),
  memo: Yup.string(),
  folderKeyName: Yup.string(),
  promotion: Yup.string(),
});

const SubsModal: React.FC<SubsModalProps> = ({
  isVisible,
  onClose,
  subs,
  onSubmit,
  isNew,
  children,
}) => {
  const initialValues = subs;
  return (
    <Modal isVisible={isVisible}>
      <ContainerDiv>
        <HeaderDiv>
          <Title
            text={getString('SUBS_MODAL_TITLE')}
            src={
              'https://github.com/dooboolab/dooboolab-mobile/blob/master/assets/splash.gif?raw=true'
            }
          />
        </HeaderDiv>
        <Formik<SubsNOp>
          // enableReinitialize={true}
          initialValues={initialValues}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            // console.log(values);
            // passing value by copying(safety for not to be reset before use it)
            onSubmit({ ...values });
            setSubmitting(false);
            resetForm();
          }}
          validationSchema={SubsModalSchema}
          render={({
            errors,
            handleSubmit,
            handleChange,
            handleBlur,
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
                    />
                  </Cell>
                )}

                <Cell
                  errors={errors}
                  label={'service ID'}
                  htmlFor='serviceId'
                  labelCss={LabelCss}
                >
                  <Input
                    name='serviceId'
                    type='text'
                    id='serviceId'
                    value={values.serviceId}
                    readOnly
                  />
                </Cell>

                <Cell
                  errors={errors}
                  label={'이름 키'}
                  htmlFor='keyName'
                  labelCss={LabelCss}
                >
                  <Input
                    name='keyName'
                    type='text'
                    id='keyName'
                    value={values.keyName}
                    onChange={handleChange}
                    placeholder='이름 키를 입력하세요 (예: key_subs_netflix_basic)'
                  />
                </Cell>
                {/* <ErrorMessage component={AlertArea} name='keyName' /> */}
                <Cell
                  errors={errors}
                  label={'폴더이름 키'}
                  htmlFor='folderKeyName'
                  labelCss={LabelCss}
                >
                  <Input
                    name='folderKeyName'
                    type='text'
                    id='folderKeyName'
                    value={values.folderKeyName}
                    onChange={handleChange}
                    placeholder='폴더 키를 입력하세요 (예: key_netflix_folder_first)'
                  />
                </Cell>
                <Cell
                  errors={errors}
                  label={'링크'}
                  htmlFor='directLink'
                  labelCss={LabelCss}
                >
                  <Input
                    name='directLink'
                    type='text'
                    id='directLink'
                    value={values.directLink}
                    onChange={handleChange}
                    placeholder='링크를 입력하세요 (예: www.netflix.com/price/basic)'
                  />
                </Cell>
                <Cell
                  errors={errors}
                  label={getString('SUBS_MODAL_CURRENCY')}
                  htmlFor='pricePlanCurrency'
                  labelCss={LabelCss}
                >
                  <Select
                    name='pricePlanCurrency'
                    options={Config.subsModal.currency}
                    value={values.currency}
                    onClick={(value) =>
                      setFieldValue('pricePlanCurrency', value)
                    }
                  />
                </Cell>
                <Cell
                  errors={errors}
                  label={getString('SUBS_MODAL_PRICE')}
                  htmlFor='pricePlan'
                  labelCss={LabelCss}
                >
                  <Input
                    name='pricePlan'
                    type='number'
                    id='pricePlan'
                    value={values.pricePlan}
                    onChange={handleChange}
                    unit={'원'}
                    placeholder='가격을 입력하세요. (예 : 25,000)'
                  />
                </Cell>
                <Cell
                  errors={errors}
                  label={`${getString('SUBS_MODAL_PAYMENT_DATE_UNIT')}`}
                  htmlFor='periodUnit'
                  labelCss={LabelCss}
                >
                  <InputWrapper>
                    <Input
                      name='periodUnit'
                      type='number'
                      id='periodUnit'
                      value={values.periodUnit}
                      onChange={handleChange}
                      placeholder='단위를 입력하세요.'
                    />
                  </InputWrapper>
                  <InputWrapper>
                    <Select
                      name='periodType'
                      options={Config.subsModal.dateUnit}
                      value={values.periodType}
                      onClick={(value) => setFieldValue('periodType', value)}
                    />
                  </InputWrapper>
                </Cell>

                <Cell
                  errors={errors}
                  label={getString('SUBS_MODAL_MEMO')}
                  htmlFor='memo'
                  labelCss={LabelCss}
                >
                  <MemoTextArea
                    name='memo'
                    id='memo'
                    value={values.memo}
                    onChange={handleChange}
                    placeholder={`키 번역 값 및 기타 설명을 입력하세요. \n예) \n이름키 kr - 그룹1 / en - group1 \n폴더키 kr - 폴더그룹1 / en - folder group1 `}
                  />
                </Cell>
                <Cell
                  errors={errors}
                  label={getString('SUBS_MODAL_CASE')}
                  htmlFor='case'
                  labelCss={LabelCss}
                >
                  <Input
                    name='case'
                    type='number'
                    id='case'
                    value={values.case}
                    onChange={handleChange}
                    placeholder='case 번호를 입력하세요'
                  />
                </Cell>
                <Cell
                  errors={errors}
                  label={'케이스 정보'}
                  htmlFor='promotion'
                  labelCss={LabelCss}
                >
                  <MemoTextArea
                    name='promotion'
                    id='promotion'
                    value={values.promotion}
                    onChange={handleChange}
                    placeholder='case 관련 프로모션 상세정보를 입력하세요'
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
                <DisplayState {...errors} />
                {children}
              </form>
            );
          }}
        />
      </ContainerDiv>
    </Modal>
  );
};

export { SubsModal as PureSubsModal };

export default withSubsModalApollo(SubsModal);
