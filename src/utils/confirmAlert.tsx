import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

import { confirmAlert } from 'react-confirm-alert';

export const deleteConfirmation = (onClickYes) => (id: string) => {
  confirmAlert({
    title: '삭제 확인',
    message: '정말 삭제하시겠습니까?',
    buttons: [
      {
        label: 'Yes',
        onClick: () => {
          onClickYes({ id });
        },
      },
      {
        label: 'No',
        onClick: () => {
          // do nothing
        },
      },
    ],
  });
};
