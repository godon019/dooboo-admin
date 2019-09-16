import './styles.css';

import { CategoryTableLabel, ServiceFront } from '../../../types';
import React, { Component, useContext } from 'react';

import Button from '../../shared/Button';
import Pagination from 'react-js-pagination';
import ServiceTable from './ServiceTable';
import { getString } from '../../../../STRINGS';
import styled from 'styled-components';
import { withServiceModal } from '../../shared/ServiceModal/withServiceModal';
import { withServicesApollo } from './withApollo';

const fontSize = `16px`;

const TableWrapper = styled.div`
  font-size: ${fontSize};
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

export interface IMain {
  history?: any;
  // Those Service related click handlers are used in test
  onAddServiceClick: () => void;
  onServiceClick: (serviceInfo: ServiceFront) => void;
  onUpdateServiceClick: (serviceInfo: ServiceFront) => void;
  onDeleteServiceClick: (serviceId: string) => void;
  serviceList: Array<ServiceFront>;
}

const Search = styled.input`
  width: 15em;
  font-size: 0.8em;
  padding-left: 1em;
  ::placeholder {
    color: #d7d8d9;
  }
`;

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

const usePage = (serviceList, numberOfItemsOnPage) => {
  const [activePage, setActivePage] = React.useState(1);
  const firstIndex = (activePage - 1) * numberOfItemsOnPage;
  const lastIndex = activePage * numberOfItemsOnPage;
  const serviceListOnItsPage = serviceList.slice(firstIndex, lastIndex);
  const numberOfPages = Math.ceil(serviceList.length / numberOfItemsOnPage);
  return { activePage, setActivePage, serviceListOnItsPage, numberOfPages };
};

export const NUMBER_OF_ITEMS_ON_PAGE = 10;

function Main({
  history,
  onAddServiceClick,
  serviceList,
  ...propsToServiceTable
}: IMain) {
  const {
    keyword,
    setKeyword,
    filteredObjList: filteredServiceList,
  } = useFilter(serviceList, ['id', 'keyName', 'name', 'nameKr']);
  const {
    activePage,
    setActivePage,
    serviceListOnItsPage,
    numberOfPages,
  } = usePage(filteredServiceList, NUMBER_OF_ITEMS_ON_PAGE);

  // const toDisplay = {
  //   totalLength: serviceList.length,
  //   filteredLength: filteredServiceList.length,
  //   activePage,
  //   numberOnItsPage: serviceListOnItsPage.length,
  //   numberOfPages,
  // };
  return (
    <TableWrapper>
      <TableLabelAndControl>
        <Button
          data-testid='addServiceButton'
          text={getString('SERVICE_ADD_BUTTON')}
          outline={true}
          customStyle={{
            marginBottom: 0,
            width: '120px',
            height: '40px',
            borderRadius: 0,
          }}
          onClick={() => {
            onAddServiceClick && onAddServiceClick();
          }}
        />
        <Search
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder={` 🔍 텍스트를 입력하세요`}
        />
      </TableLabelAndControl>
      <ServiceTable
        serviceList={serviceListOnItsPage}
        {...propsToServiceTable}
      />
      <PaginationContainer>
        <Pagination
          activePage={activePage}
          itemsCountPerPage={NUMBER_OF_ITEMS_ON_PAGE}
          totalItemsCount={filteredServiceList.length}
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

const MainWithServiceModal = withServiceModal(Main);
export default withServicesApollo(MainWithServiceModal);
// for storybook
export { Main as PureMain };
