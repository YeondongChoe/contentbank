import React from 'react';
import {
  questionInstance,
  AuthInstance,
  handleAuthorizationRenewal,
} from './Axios';

interface DeleteAuthority {
  setIsAlertOpen: (result: boolean) => void;
}

export const DeleteAuthority = async (
  { setIsAlertOpen }: DeleteAuthority,
  code: string,
) => {
  try {
    const response = await AuthInstance.delete(`/authority/${code}`);
    if (response.status === 200) {
      handleAuthorizationRenewal(response);
      setIsAlertOpen(false);
      window.location.reload();
    }
  } catch (error: unknown) {
    alert(error);
  }
};
