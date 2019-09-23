import React, { useCallback, useContext, useState } from 'react';

import { FormikProps } from 'formik';
import { ServiceServerOnlyValues } from '../../../types';
import { fileApi } from '../../../apis/fileApi';
import { getString } from '../../../../STRINGS';

const SUPPORTED_FORMATS = ['image/gif', 'image/png', 'image/jpg', 'image/jpeg'];

const USE_REAL_UPLOAD_API = true;

const imgValidation = (file, filename?: string) => {
  let thumbnailExt =
    filename && 'image/' + filename.substring(filename.lastIndexOf('.') + 1);
  let target = file || { type: thumbnailExt };
  return target && SUPPORTED_FORMATS.includes(target.type);
};

export const useImgUpload = (uploadFile?: (file) => string) => {
  const [uploadedFilename, setUploadedFilename] = useState('');

  const onFileChange = ({
    setFieldValue,
    setTouched,
    setFieldError,
    field,
  }: FormikProps<ServiceServerOnlyValues> & {
    field: keyof ServiceServerOnlyValues;
  }) => (e) => {
    let file = e.target.files[0];
    let filename = file.name || '';
    if (file) {
      const isPassed = imgValidation(file, filename);
      if (!isPassed) {
        setFieldError(field, getString('PNG_JPG_GIF_ONLY'));
      } else {
        setFieldError(field, '');

        // use real upload api
        if (USE_REAL_UPLOAD_API) {
          fileApi.uploadImage(file).then((result) => {
            console.log('result of image upload', result);
            const downloadUrl =
              'https://whatssubdev.blob.core.windows.net/defaults/' +
              result.message.name;
            // eslint-disable-next-line no-console
            console.log('downloadUrl', downloadUrl);
            setFieldValue(field, downloadUrl);
            setTouched({ [field]: true });
            setUploadedFilename(filename);
          });
        } else {
          // not using real api
          let reader = new FileReader();
          reader.onloadend = () => {
            // todo: setting field value here with file url later
            setFieldValue(field, reader.result);
            setTouched({ [field]: true });
            setUploadedFilename(filename);
          };
          reader.readAsDataURL(file);
        }
      }
    }
  };

  return {
    uploadedFilename,
    onFileChange,
  };
};
