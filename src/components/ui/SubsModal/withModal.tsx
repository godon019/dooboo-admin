import React, { useContext, useState } from 'react';
import SubsModal, { SubsModalProps } from './SubsModal';

import { IServiceDetail } from '../../screen/ServiceDetail';
import { SubsNOp } from '../../../types';

type ModalPropsToExclude = Pick<
  SubsModalProps,
  'isVisible' | 'isNew' | 'onClose' | 'subs' | 'onSubmit'
>;

type ComponentPropsToExclude = Pick<
  IServiceDetail,
  'onAddSubsClick' | 'onUpdateSubsClick'
>;

const createNewSubs = (serviceId: string): SubsNOp => ({
  id: '',
  case: 1,
  folderKeyName: '',
  directLink: '',
  keyName: '',
  pricePlan: 0,
  currency: 'KRW',
  periodUnit: 1,
  periodType: 'MONTHLY',
  memo: '',
  serviceId,
  promotion: '',
});

export function withSubsModal<T>(WrappedComponent: React.FC<T>) {
  const ComponentToReturn = (props: Omit<T, keyof ComponentPropsToExclude>) => {
    const [show, setShow] = useState<boolean>(false);
    const [subs, setSubs] = useState<SubsNOp>(createNewSubs(''));
    const [isNew, setIsNew] = useState<boolean>(false);

    const modalProps: ModalPropsToExclude = {
      isVisible: show,
      isNew: isNew,
      onClose: () => {
        setShow(false);
      },
      onSubmit: () => {
        setShow(false);
      },
      subs: subs,
    };

    const componentPropsToExclude: ComponentPropsToExclude = {
      onAddSubsClick: (serviceId: string) => {
        setSubs(createNewSubs(serviceId));
        setShow(true);
        setIsNew(true);
      },
      onUpdateSubsClick: (subs: SubsNOp) => {
        setSubs(subs);
        setShow(true);
        setIsNew(false);
      },
    };
    const componentProps = {
      ...props,
      ...componentPropsToExclude,
    } as T;

    return (
      <>
        <SubsModal {...modalProps} />
        <WrappedComponent {...componentProps} />
      </>
    );
  };

  return ComponentToReturn;
}
