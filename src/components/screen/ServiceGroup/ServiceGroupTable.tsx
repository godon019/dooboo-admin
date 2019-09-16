import {
  Cell,
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
import { ServiceGroup, ServiceGroupTableLabel } from '../../../types';
import styled, { css } from 'styled-components';

import { WhenNarrow } from '../../../utils/Styles';
import { colors } from '../../../theme';
import { getString } from '../../../../STRINGS';

const SERVICE_GROUP_LABEL: ServiceGroupTableLabel = {
  id: 'SERVICE_GROUP_LIST_TABLE_LABEL_ID',
  nameEn: '영문',
  nameKr: '국문',
  key: 'SERVICE_GROUP_LIST_TABLE_LABEL_KEY',
  description: 'SERVICE_GROUP_LIST_TABLE_LABEL_DESCRIPTION',
  setting: 'SERVICE_GROUP_LIST_TABLE_LABEL_SETTING',
};

interface IProps {
  onUpdateServiceGroupClick?: (serviceGroupInfo: ServiceGroup) => void;
  onDeleteServiceGroupClick?: (serviceGroupId: string) => void;
  onServiceGroupClick?: (serviceGroupId: string) => void;
  serviceGroupList: Array<ServiceGroupTableLabel>;
}
const ServiceGroupTable: React.FC<IProps> = (props) => {
  const content = props.serviceGroupList.map((serviceGroup) => {
    const { id, key, nameEn, nameKr, description } = serviceGroup;
    return (
      <Tr
        data-testid={`tableRow-${id}`}
        key={id}
        onClick={(event: any) => {
          // Using bubbling events from clicking desired cells to fire navigation
          // Currently event condition fires with all cells except SettingCell. in SettingCell it uses `event.stopPropagation()` to prevent event to bubble up
          props.onServiceGroupClick && props.onServiceGroupClick(id);
        }}
      >
        <Cell maxWidth={'200px'} label={SERVICE_GROUP_LABEL.key}>
          {key}
        </Cell>
        <Cell maxWidth={'200px'} label={SERVICE_GROUP_LABEL.nameKr}>
          {nameKr}
        </Cell>
        <Cell maxWidth={'200px'} label={SERVICE_GROUP_LABEL.nameEn}>
          {nameEn}
        </Cell>
        <Cell maxWidth={'400px'} label={SERVICE_GROUP_LABEL.description}>
          {description}
        </Cell>

        <SettingCell
          label={SERVICE_GROUP_LABEL.setting}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <SettingButton
            data-testid={`updateServiceGroupButton-${id}`}
            onClick={() => {
              props.onUpdateServiceGroupClick &&
                props.onUpdateServiceGroupClick(serviceGroup);
            }}
          >
            <UpdateTextContainer>
              <SettingIcon src={IC_GEAR} />
              {`${getString('UPDATE_BUTTON')}`}
            </UpdateTextContainer>
          </SettingButton>
          <SettingButton
            data-testid={`deleteServiceGroupButton-${id}`}
            onClick={() => {
              props.onDeleteServiceGroupClick &&
                props.onDeleteServiceGroupClick(id);
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
            <Th>{getString(SERVICE_GROUP_LABEL.key)}</Th>
            <Th>{getString(SERVICE_GROUP_LABEL.nameKr)}</Th>
            <Th>{getString(SERVICE_GROUP_LABEL.nameEn)}</Th>
            <Th>{getString(SERVICE_GROUP_LABEL.description)}</Th>
            <Th>{getString(SERVICE_GROUP_LABEL.setting)}</Th>
          </Tr>
        </Thead>
        <Tbody>{content}</Tbody>
      </Table>
    </Container>
  );
};

export default ServiceGroupTable;
