import {
  ClickableCell,
  Container,
  SettingButton,
  SettingCell,
  SettingIcon,
  Table,
  Tbody,
  Th,
  Thead,
  ThumbnailPreviewCell,
  Tr,
  UpdateTextContainer,
} from '../../shared/TableUi';
import { IC_GEAR, IC_PREVIEW, IC_TRASH } from '../../../utils/Icons';
import React, { useContext, useState } from 'react';
import { ServiceFront, ServiceTableLabel } from '../../../types';

import { getString } from '../../../../STRINGS';

const SERVICE_LABEL: ServiceTableLabel = {
  keyName: '키',
  name: 'SERVICE_LIST_TABLE_LABEL_NAME',
  nameKr: 'SERVICE_LIST_TABLE_LABEL_NAME_KR',
  thumbnail: 'SERVICE_LIST_TABLE_LABEL_THUMBNAIL',
  setting: 'SERVICE_LIST_TABLE_LABEL_SETTING',
};

// used for test
export const TEST_ID_OF_CELL = {
  keyName: { prefix: 'nameCell-', clickBehavior: 'onServiceClick' },
  name: { prefix: 'nameCell-', clickBehavior: 'onServiceClick' },
  nameKr: { prefix: 'nameKrCell-', clickBehavior: 'onServiceClick' },
  thumbnail: { prefix: 'thumbnailCell-', clickBehavior: 'onServiceClick' },
  setting: { prefix: 'settingCell-', clickBehavior: 'none' },
};

interface IProps {
  onUpdateServiceClick?: (serviceInfo: ServiceFront) => void;
  onDeleteServiceClick?: (serviceId: string) => void;
  onServiceClick?: (serviceInfo: ServiceFront) => void;
  serviceList: Array<ServiceFront>;
}
const ServiceTable: React.FC<IProps> = (props) => {
  const content = props.serviceList.map((service) => {
    const { id, keyName, name, nameKr, thumbnail } = service;
    // scale up some cells when mouse is hovering on its parent's row -> visual feedback for user
    return (
      <Tr
        data-testid={`tableRow-${id}`}
        key={id}
        onClick={(event: any) => {
          // Using bubbling events from clicking desired cells to fire navigation
          // Currently event condition fires with all cells except SettingCell. in SettingCell it uses `event.stopPropagation()` to prevent event to bubble up
          props.onServiceClick && props.onServiceClick(service);
          // TODO: Integrate 'ServiceDetail' screen navigation. remove below 'console.log()' afterwards
          // console.log(`Navigate to 'ServiceDetail' Screen with Service ID:${id}`);
        }}
      >
        <ClickableCell
          data-testid={`${TEST_ID_OF_CELL.keyName.prefix}${id}`}
          label={SERVICE_LABEL.keyName}
        >
          {keyName}
        </ClickableCell>
        <ClickableCell
          data-testid={`${TEST_ID_OF_CELL.name.prefix}${id}`}
          label={SERVICE_LABEL.name}
        >
          {name}
        </ClickableCell>
        <ClickableCell
          data-testid={`${TEST_ID_OF_CELL.nameKr.prefix}${id}`}
          label={SERVICE_LABEL.nameKr}
        >
          {nameKr}
        </ClickableCell>
        <ThumbnailPreviewCell
          data-testid={`${TEST_ID_OF_CELL.thumbnail.prefix}${id}`}
          label={SERVICE_LABEL.thumbnail}
        >
          {thumbnail}
        </ThumbnailPreviewCell>
        <SettingCell
          data-testid={`${TEST_ID_OF_CELL.setting.prefix}${id}`}
          label={SERVICE_LABEL.setting}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <SettingButton
            data-testid={`updateServiceButton-${id}`}
            onClick={() => {
              props.onUpdateServiceClick && props.onUpdateServiceClick(service);
            }}
          >
            <UpdateTextContainer>
              <SettingIcon src={IC_GEAR} />
              {`${getString('UPDATE_BUTTON')}`}
            </UpdateTextContainer>
          </SettingButton>
          <SettingButton
            data-testid={`deleteServiceButton-${id}`}
            onClick={() => {
              props.onDeleteServiceClick && props.onDeleteServiceClick(id);
            }}
          >
            <UpdateTextContainer>
              <SettingIcon src={IC_TRASH} />
              {`${getString('DELETE_BUTTON')}`}
            </UpdateTextContainer>
          </SettingButton>
        </SettingCell>
      </Tr>
    );
  });
  return (
    <Container>
      <Table>
        <Thead>
          <Tr>
            <Th>{SERVICE_LABEL.keyName}</Th>
            <Th>{getString(SERVICE_LABEL.name)}</Th>
            <Th>{getString(SERVICE_LABEL.nameKr)}</Th>
            <Th>{getString(SERVICE_LABEL.thumbnail)}</Th>
            <Th>{getString(SERVICE_LABEL.setting)}</Th>
          </Tr>
        </Thead>
        <Tbody>{content}</Tbody>
      </Table>
    </Container>
  );
};

export default ServiceTable;
