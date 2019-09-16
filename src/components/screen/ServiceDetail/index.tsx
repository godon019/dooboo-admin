import React, { Component } from 'react';
import {
  ServiceForServiceDetail,
  ServiceFront,
  SubsNOp,
  SubsNOpFront,
} from '../../../types';

import Button from '../../shared/Button';
import SubsTable from './SubsTable';
import Title from '../../shared/Title';
import { WhenNarrow } from '../../../utils/Styles';
import { getString } from '../../../../STRINGS';
import styled from 'styled-components';
import { withServiceDetailApollo } from './withApollo';
import { withSubsModal } from '../../ui/SubsModal/withModal';

export interface IServiceDetail {
  history?: any;
  // Those Subs related click handlers are used in test
  onAddSubsClick?: (serviceId: string) => void;
  onUpdateSubsClick?: (subs: SubsNOp) => void;
  onDeleteSubsClick?: (subsId: string) => void;
  serviceDetail: ServiceForServiceDetail;
  subsList: Array<SubsNOpFront>;
}

function ServiceDetail(props: IServiceDetail) {
  const { history, onAddSubsClick, serviceDetail, ...propsToSubsTable } = props;
  const { id, name, homepage, memo, thumbnail } = serviceDetail;
  return (
    <TableWrapper>
      <Detail>
        <img
          src={thumbnail}
          style={{ width: '50px', borderRadius: '5px', marginRight: '0.5em' }}
        />
        <BigContent>{name}</BigContent>
      </Detail>
      <Detail>
        <Label>URL</Label>
        <Content>{homepage}</Content>
      </Detail>
      <Detail>
        <Label>설명</Label>
        <Content>{memo}</Content>
      </Detail>

      <TableLabelAndControl>
        <SubsListTitle>{getString('SUBS_LIST')}</SubsListTitle>
        <Button
          data-testid='addSubsButton'
          text={getString('SUBS_ADD_BUTTON')}
          outline={true}
          customStyle={{
            marginBottom: 0,
            width: '9em',
            height: '40px',
            borderRadius: 0,
          }}
          onClick={() => {
            props.onAddSubsClick && props.onAddSubsClick(id);
          }}
        />
      </TableLabelAndControl>
      <SubsTable {...propsToSubsTable} />
    </TableWrapper>
  );
}
export { ServiceDetail as PureServiceDetail };
export default withServiceDetailApollo(withSubsModal(ServiceDetail));

const Detail = styled.div`
  margin: 0.3em 5%;
  align-self: flex-start;
  display: flex;
  justify-content: flex-start;
`;
const Label = styled.div`
  font-weight: 800;
  flex: 0 0 5em;
`;
const BigContent = styled.div`
  font-weight: 800;
  font-size: 2em;
`;

const SubsListTitle = styled.div`
  font-weight: 800;
  font-size: 1.2em;
  text-align: left;
`;

const TableWrapper = styled.div`
  font-size: 16px;
  align-self: center;
  width: 100%;
  /* max-width: 1100px; */

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TableLabelAndControl = styled.div`
  flex: 0 0 auto;
  display: flex;
  justify-content: space-between;
  width: 90%;
  margin: 1em 1% 0.5em 1%;
`;

const Content = styled.div`
  color: ${({ theme }) => theme.tableContentFontColor};
`;
