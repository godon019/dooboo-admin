import './styles.css';

import React, { Component, useContext } from 'react';
import { ServiceGroup, ServiceGroupFront } from '../../../types';

import Button from '../../shared/Button';
import { DisplayState } from '../../../utils/DisplayState';
import Pagination from 'react-js-pagination';
import ServiceGroupTable from './ServiceGroupTable';
import SimpleButton from '../../shared/SimpleButton';
import Title from '../../shared/Title';
import { WhenNarrow } from '../../../utils/Styles';
import { getString } from '../../../../STRINGS';
import styled from 'styled-components';
import { withServiceGroupApollo } from './withApollo';
import { withServiceGroupModal } from '../../ui/ServiceGroupModal/withModal';

export interface IServiceGroupScreen {
  history?: any;
  // Those ServiceGroup related click handlers are used in test
  onAddServiceGroupClick: () => void;
  onUpdateServiceGroupClick: (serviceGroup: ServiceGroup) => void;
  onDeleteServiceGroupClick: (serviceGroupId: string) => void;
  serviceGroupList: Array<ServiceGroupFront>;
}

function searchKeyword<T extends object>(
  obj: T,
  keyword: string,
  keys: Array<keyof T>,
  caseSensitive?: boolean,
) {
  for (const [curr, currElem] of Object.entries(obj)) {
    if (keys.find((el) => el === curr)) {
      if (
        (caseSensitive ? currElem : currElem.toLowerCase()).includes(
          caseSensitive ? keyword : keyword.toLowerCase(),
        )
      ) {
        return true;
      }
    }
  }
  return false;
}

function useFilter<T extends object>(
  objList: T[],
  propertiesToFilter: Array<keyof T>,
) {
  const [keyword, setKeyword] = React.useState('');
  const filteredObjList = objList.filter((obj) =>
    searchKeyword(obj, keyword, propertiesToFilter),
  );
  return { keyword, setKeyword, filteredObjList };
}

const usePage = (list, numberOfItemsOnPage) => {
  const [activePage, setActivePage] = React.useState(1);
  const firstIndex = (activePage - 1) * numberOfItemsOnPage;
  const lastIndex = activePage * numberOfItemsOnPage;
  const itemListOnItsPage = list.slice(firstIndex, lastIndex);
  const numberOfPages = Math.ceil(list.length / numberOfItemsOnPage);
  return { activePage, setActivePage, itemListOnItsPage, numberOfPages };
};

export const NUMBER_OF_ITEMS_ON_PAGE = 10;

function ServiceGroupScreen({
  history,
  onAddServiceGroupClick,
  serviceGroupList,
  ...propsToServiceGroupTable
}: IServiceGroupScreen) {
  const {
    keyword,
    setKeyword,
    filteredObjList: filteredServiceGroupList,
  } = useFilter(serviceGroupList, [
    'id',
    'key',
    'nameEn',
    'nameKr',
    'description',
  ]);
  const {
    activePage,
    setActivePage,
    itemListOnItsPage: serviceGroupListOnItsPage,
    numberOfPages,
  } = usePage(filteredServiceGroupList, NUMBER_OF_ITEMS_ON_PAGE);

  return (
    <TableWrapper>
      <TableLabelAndControl>
        <Button
          data-testid='addServiceGroupButton'
          text={getString('SERVICE_GROUP_ADD_BUTTON')}
          outline={true}
          customStyle={{
            marginBottom: 0,
            maxWidth: '12em',
            height: '40px',
            borderRadius: 0,
          }}
          onClick={() => {
            onAddServiceGroupClick && onAddServiceGroupClick();
          }}
        />
        <Search
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder={` 🔍 ${getString('INPUT_TEXT_TO_SEARCH')}`}
        />
      </TableLabelAndControl>
      <ServiceGroupTable
        serviceGroupList={serviceGroupListOnItsPage}
        {...propsToServiceGroupTable}
      />
      <PaginationContainer>
        <Pagination
          activePage={activePage}
          itemsCountPerPage={NUMBER_OF_ITEMS_ON_PAGE}
          totalItemsCount={filteredServiceGroupList.length}
          pageRangeDisplayed={numberOfPages}
          onChange={(pageNumber) => setActivePage(pageNumber)}
          innerClass='pg-ul'
          activeLinkClass='pg-active-item'
          linkClass='pg-item'
        />
      </PaginationContainer>
    </TableWrapper>
  );
}

export { ServiceGroupScreen as PureServiceGroupScreen };
export const ServiceGroupScreenWModal = withServiceGroupModal(
  ServiceGroupScreen,
);
export default withServiceGroupApollo(ServiceGroupScreenWModal);

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
  width: 95%;
  margin: 0 1% 1em 1%;
`;

const PaginationContainer = styled.div`
  margin-top: 1em;
  /* background-color: white; */
`;

const Search = styled.input`
  width: 15em;
  font-size: 0.8em;
  padding-left: 1em;
  ::placeholder {
    color: #d7d8d9;
  }
`;
