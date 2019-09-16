import React, {
  FormEventHandler,
  MouseEventHandler,
  SyntheticEvent,
  useRef,
} from 'react';
import styled, { CSSProp } from 'styled-components';

import Button from './Button';
import { ButtonPrimaryLight } from '../ui/Buttons';
import { useImgUpload } from './ServiceModal/imageControl';

const CustomFileInput = styled.div`
  display: flex;
  width: 100%;
  border: 1px solid #d9d9da;
  padding: 0.7rem;
  box-sizing: border-box;
  background-color: #fff;
`;
const FileInputDom = styled.input`
  display: none;
`;
const ContentView = styled.div`
  display: flex;
  align-items: center;
  flex: 4;
`;
const UploadBtnView = styled.div`
  flex: 1;
`;
const PreviewMsg = styled.span`
  font-size: 0.8rem;
`;
const PreviewName = styled.span`
  margin: 0 0.8rem;
  font-size: 0.8rem;
`;
const PreviewImg = styled.img`
  width: 10%;
  height: 100%;
`;
const FileInputArea = styled.div`
  display: flex;
  flex: 3;
  flex-direction: column;
  justify-content: center;
`;

type FileInputProps = {
  name: string;
  id: string;
  previewImg?: any;
  previewName?: string;
  readOnly?: boolean;
  customCss?: CSSProp;
  onChange?: FormEventHandler;
};

const FileInput: React.FC<
  FileInputProps & React.HTMLAttributes<HTMLDivElement>
> = ({ name, id, previewImg, previewName, readOnly, customCss, onChange }) => {
  const fileInputRef = useRef(null);
  const triggerFileInput = () => {
    if (fileInputRef) {
      fileInputRef.current.click();
    }
  };
  return (
    <CustomFileInput>
      <ContentView>
        {previewImg ? (
          <PreviewImg src={previewImg} data-testid={`${name}-preview`} />
        ) : (
          <PreviewMsg data-testid={'defaultPreview'}>
            이미지를 첨부해주세요. ( 형식 : jpg, png, gif | 크기 : 512x512 )
          </PreviewMsg>
        )}
        {previewName ? <PreviewName>{previewName}</PreviewName> : null}
        <FileInputDom
          data-testid={`${name}-file`}
          type='file'
          name={name}
          id={id}
          ref={fileInputRef}
          onChange={onChange}
        />
      </ContentView>
      <UploadBtnView>
        <Button
          data-testid={`${name}-upload-btn`}
          text={'이미지 첨부'}
          outline={true}
          customStyle={{ marginBottom: 0, height: null, padding: '.7rem' }}
          onClick={triggerFileInput}
        />
      </UploadBtnView>
    </CustomFileInput>
  );
};

export default FileInput;
