import { useQuery } from '@tanstack/react-query';

import { authInstance } from '../api/axios';

/** 회원리스트 가져오는 API*/
export const useQueryGetMemberList = ({
  searchValue,
  page,
  size,
  enabled,
}: {
  searchValue?: string;
  page: number;
  size: number;
  enabled?: string;
}) => {
  return useQuery({
    queryKey: ['get-memberlist'],
    queryFn: () => {
      const response = authInstance.get(`/v1/account`);
      return response;
    },
  });
};
