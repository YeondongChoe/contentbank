import { useRecoilValue } from 'recoil';

import { myAuthorityAtom } from '../store/myAuthorityAtom';

interface Authority {
  idx: number;
  isEdit: boolean;
  isManage: boolean;
  menuCode: string;
  menuName: string;
}

export const useAuthority = (menuCode: string) => {
  const myAuthority = useRecoilValue<Authority[]>(myAuthorityAtom);

  // console.log('myAuthority', myAuthority);
  const authority = myAuthority.find(
    (authority) => authority.menuCode === menuCode,
  );
  const isEdit = authority ? authority.isEdit : null;
  const isManage = authority ? authority.isManage : null;

  return { isEdit, isManage, authority };
};

//  menuCode
// menuCode: 'QE', menuName: '문항 편집'
// menuCode: 'WE', menuName: '학습지 편집'
// menuCode: 'QM', menuName: '문항 관리'
// menuCode: 'AM', menuName: '운영 관리' - 회원
// menuCode: 'PM', menuName: '권한 관리' - 권한
