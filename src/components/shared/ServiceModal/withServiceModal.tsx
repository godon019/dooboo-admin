import React, { useContext, useState } from 'react';
import { ServiceFront, ServiceServerOnlyValues } from '../../../types';
import ServiceModal, { ServiceModalProps } from '.';

import { IMain } from '../../screen/Main';

type ModalPropsToExclude = Pick<
  ServiceModalProps,
  | 'isNew'
  | 'show'
  | 'onCloseServiceClick'
  | 'serviceInfo'
  | 'onSubmitFinishedSuccess'
>;
type ComponentPropsToExclude = Pick<
  IMain,
  'onAddServiceClick' | 'onUpdateServiceClick'
>;
const createNewService = (): ServiceServerOnlyValues => ({
  id: '',
  keyName: '',
  thumbnail: '',
  homepage: '',
  memo: '',
  categoryId: '',
});

export function withServiceModal<T extends ComponentPropsToExclude>(
  WrappedComponent: React.FC<T>,
) {
  const ComponentToReturn = (props: Omit<T, keyof ComponentPropsToExclude>) => {
    const [show, setShow] = useState<boolean>(false);
    const [service, setService] = useState<ServiceServerOnlyValues>(
      createNewService(),
    );
    const [isNew, setIsNew] = useState<boolean>(false);

    const serviceModalProps: ModalPropsToExclude = {
      show,
      isNew,
      onCloseServiceClick: () => {
        setShow(false);
      },
      onSubmitFinishedSuccess: () => {
        setShow(false);
      },
      serviceInfo: service,
    };

    const componentPropsToExclude: ComponentPropsToExclude = {
      onAddServiceClick: () => {
        setService(createNewService());
        setShow(true);
        setIsNew(true);
      },
      onUpdateServiceClick: (service: ServiceServerOnlyValues) => {
        setService(service);
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
        <ServiceModal {...serviceModalProps} />
        <WrappedComponent {...componentProps} />
      </>
    );
  };

  return ComponentToReturn;
}
