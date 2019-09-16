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
import React, { useState } from 'react';
import { SubsNOp, SubsNOpFront, SubsNOpTableLabel } from '../../../types';

import { getString } from '../../../../STRINGS';

// used for labeling cell and th(with getString())
const subsLabel: Record<keyof SubsNOpTableLabel, string> & {
  setting: string;
} = {
  // id: 'SERVICE_LABEL_ID',
  keyName: 'SERVICE_LABEL_NAME',
  nameKr: '국문',
  nameEn: '영문',
  currency: 'SERVICE_LABEL_PRICE_PLAN_CURRENCY',
  pricePlan: 'SERVICE_LABEL_PRICE',
  periodUnit: 'SERVICE_LABEL_PERIOD_UNIT',
  periodType: 'SERVICE_LABEL_PERIOD_TYPE',
  setting: 'SERVICE_LABEL_SETTING',
  case: '케이스',
};

interface IProps {
  onDeleteSubsClick?: (subsId: string) => void;
  onUpdateSubsClick?: (subs: SubsNOp) => void;
  subsList: Array<SubsNOpFront>;
}
const SubsTable: React.FC<IProps> = (props) => {
  const content = props.subsList.map((subs) => {
    const {
      id,
      keyName,
      nameKr,
      nameEn,
      currency,
      pricePlan,
      periodUnit,
      periodType,
      case: case1,
    } = subs;
    // scale up some cells when mouse is hovering on its parent's row -> visual feedback for user
    return (
      <Tr data-testid={`tableRow-${id}`} key={id}>
        <Cell label={subsLabel.keyName}>{keyName}</Cell>
        <Cell label={subsLabel.nameKr}>{nameKr}</Cell>
        <Cell label={subsLabel.nameEn}>{nameEn}</Cell>
        <Cell label={subsLabel.currency}>{currency}</Cell>
        <Cell label={subsLabel.pricePlan}>{pricePlan}</Cell>
        <Cell label={subsLabel.periodType}>{periodType}</Cell>
        <Cell label={subsLabel.periodUnit}>{periodUnit}</Cell>
        <Cell label={subsLabel.case}>{case1}</Cell>

        <SettingCell
          label={subsLabel.setting}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <SettingButton
            data-testid={`updateServiceButton-${id}`}
            onClick={() => {
              props.onUpdateSubsClick && props.onUpdateSubsClick(subs);
            }}
          >
            <UpdateTextContainer>
              <SettingIcon src={IC_GEAR} />
              {`${getString('UPDATE_BUTTON')}`}
            </UpdateTextContainer>
          </SettingButton>
          <SettingButton
            data-testid={`deleteSubsButton-${id}`}
            onClick={() => {
              props.onDeleteSubsClick && props.onDeleteSubsClick(id);
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
            {/* <Th>{getString(subsLabel.id)}</Th> */}
            <Th>{getString(subsLabel.keyName)}</Th>
            <Th>{subsLabel.nameKr}</Th>
            <Th>{subsLabel.nameEn}</Th>

            <Th>{getString(subsLabel.currency)}</Th>
            <Th>{getString(subsLabel.pricePlan)}</Th>
            <Th>{getString(subsLabel.periodType)}</Th>
            <Th>{getString(subsLabel.periodUnit)}</Th>
            <Th>{subsLabel.case}</Th>

            <Th>{getString(subsLabel.setting)}</Th>
          </Tr>
        </Thead>
        <Tbody>{content}</Tbody>
      </Table>
    </Container>
  );
};

export default SubsTable;
