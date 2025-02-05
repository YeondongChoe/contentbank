export interface IdxNamePair {
  code?: string;
  idx: string;
  name: string;
  inputType: string;
  searchList: boolean;
  viewList: boolean;
}

export type accessMenuListProps = {
  sort: number;
  isLock: boolean;
  isUse: boolean;
  menuCode: string;
  menuName: string;
};
