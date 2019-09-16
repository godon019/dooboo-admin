import './styles.css';

import { Category, CategoryFront } from '../../../types';
import React, { Component, useContext } from 'react';

import Button from '../../shared/Button';
import CategoryTable from './CategoryTable';
import { DisplayState } from '../../../utils/DisplayState';
import Pagination from 'react-js-pagination';
import SimpleButton from '../../shared/SimpleButton';
import Title from '../../shared/Title';
import { WhenNarrow } from '../../../utils/Styles';
import { getString } from '../../../../STRINGS';
import styled from 'styled-components';
import { withCategoriesApollo } from './withApollo';
import { withCategoryModal } from '../../ui/CategoryModal/withModal';

export interface CategoryScreen {
  history?: any;
  // Those Category related click handlers are used in test
  onAddCategoryClick: () => void;
  onUpdateCategoryClick: (category: Category) => void;
  onDeleteCategoryClick: (categoryId: string) => void;
  categoryList: Array<CategoryFront>;
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

function CategoryScreen({
  history,
  onAddCategoryClick,
  categoryList,
  ...propsToCategoryTable
}: CategoryScreen) {
  const {
    keyword,
    setKeyword,
    filteredObjList: filteredCategoryList,
  } = useFilter(categoryList, ['id', 'key', 'nameEn', 'nameKr', 'description']);
  const {
    activePage,
    setActivePage,
    itemListOnItsPage: categoryListOnItsPage,
    numberOfPages,
  } = usePage(filteredCategoryList, NUMBER_OF_ITEMS_ON_PAGE);

  return (
    <TableWrapper>
      <TableLabelAndControl>
        <Button
          data-testid='addCategoryButton'
          text={getString('CATEGORY_ADD_BUTTON')}
          outline={true}
          customStyle={{
            marginBottom: 0,
            width: '120px',
            height: '40px',
            borderRadius: 0,
          }}
          onClick={() => {
            onAddCategoryClick && onAddCategoryClick();
          }}
        />
        <Search
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder={` 🔍 ${getString('INPUT_TEXT_TO_SEARCH')}`}
        />
      </TableLabelAndControl>
      <CategoryTable
        categoryList={categoryListOnItsPage}
        {...propsToCategoryTable}
      />
      <PaginationContainer>
        <Pagination
          activePage={activePage}
          itemsCountPerPage={NUMBER_OF_ITEMS_ON_PAGE}
          totalItemsCount={filteredCategoryList.length}
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

export { CategoryScreen as PureCategoryScreen };
const CategoryWithModal = withCategoryModal(CategoryScreen);
export default withCategoriesApollo(CategoryWithModal);

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
