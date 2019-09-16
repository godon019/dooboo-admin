import React, { useContext, useState } from 'react';
import ServiceGroupModal, {
  ServiceGroupModalProps,
  ServiceGroupModalWithApollo,
} from './ServiceGroupModal';

import { IServiceGroupScreen } from '../../screen/ServiceGroup/ServiceGroup';
import { ServiceGroup } from '../../../types';

type ModalPropsToExclude = Pick<
  ServiceGroupModalProps,
  'isVisible' | 'isNew' | 'onClose' | 'serviceGroup' | 'onSubmit'
>;

type ComponentPropsToExclude = Pick<
  IServiceGroupScreen,
  'onAddServiceGroupClick' | 'onUpdateServiceGroupClick'
>;

const createNewServiceGroup = (): ServiceGroup => ({
  id: '',
  key: '',
  description: '',
});

export function withServiceGroupModal<T extends ComponentPropsToExclude>(
  WrappedComponent: React.FC<T>,
) {
  const ComponentToReturn = (props: Omit<T, keyof ComponentPropsToExclude>) => {
    const [show, setShow] = useState<boolean>(false);
    const [ServiceGroup, setServiceGroup] = useState<ServiceGroup>(
      createNewServiceGroup(),
    );
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
      serviceGroup: ServiceGroup,
    };

    const componentPropsToExclude: ComponentPropsToExclude = {
      onAddServiceGroupClick: () => {
        setServiceGroup(createNewServiceGroup());
        setShow(true);
        setIsNew(true);
      },
      onUpdateServiceGroupClick: (ServiceGroup: ServiceGroup) => {
        setServiceGroup(ServiceGroup);
        setShow(true);
        setIsNew(false);
      },
    };
    const wholeComponentProps = {
      ...props,
      ...componentPropsToExclude,
    } as T;

    return (
      <>
        <ServiceGroupModalWithApollo {...modalProps} />
        <WrappedComponent {...wholeComponentProps} />
      </>
    );
  };

  return ComponentToReturn;
}
