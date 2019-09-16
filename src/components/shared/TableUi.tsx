import React, { useContext, useState } from 'react';
import styled, { css } from 'styled-components';

import { IC_PREVIEW } from '../../utils/Icons';
import { WhenNarrow } from '../../utils/Styles';
import { colors } from '../../theme';
import { getString } from '../../../STRINGS';

export const Hide = css`
  position: absolute;
  top: -9999px;
  left: -9999px;
`;

export const cellPadding = css`
  padding: 0 0 0 0.5em;
`;

export const Container = styled.div`
  width: 100%;
  overflow-x: scroll;
  /* give thumbnail space at the bottom */
  padding-bottom: 3em;
`;

export const Table = styled.table`
  margin: auto;

  width: 95%;
  ${WhenNarrow} {
    display: block;
  }
`;

export const Thead = styled.thead`
  ${WhenNarrow} {
    ${Hide}
  }
`;

export const Th = styled.th`
  /* z-index: 1; */
  /* position: sticky; */
  /* top: 0; */
  /* background:#ccc; */
  height: 42px;
  vertical-align: middle;
  border-top: 2px solid #d7d8d9;
  border-bottom: 2px solid #d7d8d9;
  text-align: left;
  color: ${colors.darkBackgroundLight};

  ${cellPadding}
`;

export const Tr = styled.tr`
  color: ${({ theme }) => theme.tableContentFontColor};

  border-bottom: 2px solid #f0f1f2;
  ${WhenNarrow} {
    display: block;
    margin: 0 0 1rem 0;
  }
  &:hover {
    background-color: ${({ theme }) => theme.tableHoverColor};
  }
`;

export const Tbody = styled.tbody`
  ${WhenNarrow} {
    display: block;
  }
`;

export const leftSideOverRightSidePortion = `25%`;
export const labelMarginLift = `0.2em`;
export const labelContentWhenNarrow = css`
  /* like a table header */
  position: absolute;
  /* Top/left values mimic padding */
  top: 0;
  left: 0;

  margin-left: ${labelMarginLift};
  width: ${leftSideOverRightSidePortion}- ${labelMarginLift};
  white-space: nowrap;
`;
interface ICell {
  label: string;
  maxWidth?: string;
  notOverFlow?: boolean; // used for thumbnail
}
export const Cell = styled.td<ICell>`
  text-align: left;
  vertical-align: middle;

  word-break: normal;
  word-wrap: break-word;
  
  /* hide when it is over max-width then show when hover */
  /* max-width: ${(props) => props.maxWidth}; */
  max-width: 10em;
  overflow: ${(props) => !props.notOverFlow && 'hidden'};
  text-overflow: ellipsis;
  white-space: nowrap; 
  :hover{
    white-space: normal;
  }
  ${WhenNarrow} {
    max-width: unset;
    :hover{
      white-space: nowrap;
    }
  }
  
  ${cellPadding}

  ${WhenNarrow} {
    display: block;
    /* like a row */
    border: none;
    border-bottom: 1px solid #eee;
    position: relative;
    padding-left: ${leftSideOverRightSidePortion};

    text-align: left;
    &:before {
      ${labelContentWhenNarrow}
      content: '${(props) => getString(props.label)}';
    }
  }
`;

interface IClickableCell {
  scaleUp?: boolean;
}
export const ClickableCell = styled(Cell)<IClickableCell>`
  &:hover {
    cursor: pointer;
  }
`;

export const SettingCell = styled(Cell)`
  /* centering buttons */
  vertical-align: middle;
  height: 42px;
  ${WhenNarrow} {
    height: auto;
    display: flex;
  }

  display: flex;
  justify-content: flex-start;
  align-items: center;

  & > * {
    margin-right: 1em;
  }
`;

export const Thumbnail = styled.img<{ show: boolean }>`
  border-radius: 5px;
  position: absolute;
  z-index: 3;
  right: 11em;
  width: 80px;
  display: ${(props) => (props.show ? 'block' : 'none')};
  ${WhenNarrow} {
    position: relative;
    right: 0;
    width: 40px;
    display: block;
  }
`;
export const ThumbnailWrapper = styled.div`
  position: relative;
`;
export const PreviewTextContainer = styled.div`
  display: flex;
`;
export const ThumbnailPreviewText = styled.div`
  margin-left: 0.5em;
  color: #407fff;
  ${WhenNarrow} {
    display: none;
  }
`;
export const PrefixImage = styled.img`
  width: 1em;
  ${WhenNarrow} {
    display: none;
  }
`;
export const UpdateTextContainer = styled.div`
  display: flex;
`;
export const SettingIcon = styled.img`
  width: 1em;
`;
export const ThumbnailPreviewCell = (props) => {
  const [showPreview, setShowPreview] = React.useState(false);

  return (
    <ClickableCell
      notOverFlow
      {...props}
      onMouseEnter={() => setShowPreview(true)}
      onMouseLeave={() => setShowPreview(false)}
    >
      <ThumbnailWrapper>
        <Thumbnail src={props.children} show={showPreview} />
      </ThumbnailWrapper>
      <PreviewTextContainer>
        <PrefixImage src={IC_PREVIEW} />
        <ThumbnailPreviewText>{`${getString(
          'PREVIEW_ICON',
        )}`}</ThumbnailPreviewText>
      </PreviewTextContainer>
    </ClickableCell>
  );
};

export const SettingButton = styled.div`
  color: #407fff;
  :hover {
    cursor: pointer;
  }
`;
