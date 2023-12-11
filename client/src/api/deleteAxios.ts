import * as React from 'react';

import {
  questionInstance,
  authInstance,
  handleAuthorizationRenewal,
} from './axios';

type DeleteAuthorityProps = {
  setIsAlertOpen: (result: boolean) => void;
};

export const DeleteAuthority = async (
  { setIsAlertOpen }: DeleteAuthorityProps,
  code: string,
) => {
  try {
    const response = await authInstance.delete(`/authority/${code}`);
    if (response.status === 200) {
      handleAuthorizationRenewal(response);
      setIsAlertOpen(false);
      window.location.reload();
    }
  } catch (error: unknown) {
    alert(error);
  }
};
