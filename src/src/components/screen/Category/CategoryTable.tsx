import { Category, CategoryFront, CategoryTableLabel } from '../../../types';
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

import { getString } from '../../../../STRINGS';

const CATEGORY_LABEL: Record<keyof CategoryTableLabel, string> & {
  setting: string;
} = {
  id: 'CATEGORY_LIST_TABLE_LABEL_ID',
  key: 'CATEGORY_LIST_TABLE_LABEL_KEY',
  nameEn: '영문',
  nameKr: '국문',
  description: 'CATEGORY_LIST_TABLE_LABEL_DESCRIPTION',
  released: 'CATEGORY_LIST_TABLE_LABEL_RELEASED',
  setting: 'CATEGORY_LIST_TABLE_LABEL_SETTING',
};

interface IProps {
  onUpdateCategoryClick?: (categoryInfo: Category) => void;
  onDeleteCategoryClick?: (categoryId: string) => void;
  onCategoryClick?: (categoryId: string) => void;
  categoryList: Array<CategoryFront>;
}
const CategoryTable: React.FC<IProps> = (props) => {
  const content = props.categoryList.map((category) => {
    const { id, key, nameKr, nameEn, description, released } = category;
    // scale up some cells when mouse is hovering on its parent's row -> visual feedback for user
    return (
      <Tr
        data-testid={`tableRow-${id}`}
        key={id}
        onClick={(event: any) => {
          // Using bubbling events from clicking desired cells to fire navigation
          // Currently event condition fires with all cells except SettingCell. in SettingCell it uses `event.stopPropagation()` to prevent event to bubble up
          props.onCategoryClick && props.onCategoryClick(id);
        }}
      >
        <Cell label={CATEGORY_LABEL.key}>{key}</Cell>
        <Cell label={CATEGORY_LABEL.nameKr}>{nameKr}</Cell>
        <Cell label={CATEGORY_LABEL.nameEn}>{nameEn}</Cell>
        <Cell label={CATEGORY_LABEL.released}>{JSON.stringify(released)}</Cell>
        <Cell label={CATEGORY_LABEL.description}>{description}</Cell>

        <SettingCell
          label={CATEGORY_LABEL.setting}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <SettingButton
            data-testid={`updateCategoryButton-${id}`}
            onClick={() => {
              props.onUpdateCategoryClick &&
                props.onUpdateCategoryClick(category);
            }}
          >
            <UpdateTextContainer>
              <SettingIcon src={IC_GEAR} />
              {`${getString('UPDATE_BUTTON')}`}
            </UpdateTextContainer>
          </SettingButton>
          <SettingButton
            data-testid={`deleteCategoryButton-${id}`}
            onClick={() => {
              props.onDeleteCategoryClick && props.onDeleteCategoryClick(id);
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
            <Th>{getString(CATEGORY_LABEL.key)}</Th>
            <Th>{CATEGORY_LABEL.nameKr}</Th>
            <Th>{CATEGORY_LABEL.nameEn}</Th>
            <Th>{getString(CATEGORY_LABEL.released)}</Th>
            <Th>{getString(CATEGORY_LABEL.description)}</Th>
            <Th>{getString(CATEGORY_LABEL.setting)}</Th>
          </Tr>
        </Thead>
        <Tbody>{content}</Tbody>
      </Table>
    </Container>
  );
};

export default CategoryTable;
