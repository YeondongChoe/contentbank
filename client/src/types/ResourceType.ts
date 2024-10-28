export type MenuDataType = {
  companyCode: string;
  createdAt: string;
  createdBy: string;
  idx: number;
  isUse: boolean;
  lastModifiedAt: string;
  lastModifiedBy: string;
  name: string;
  serviceType: string;
  sort: number;
  type: string;
  url: string;
  urlName: string;
};

export type MenuDataListProps = {
  code: string;
  detailIdx: string;
  idx: number;
  isCheck: boolean;
  name: string;
  nameList: string;
  searchList: string;
  typeList: string;
  viewList: string;
};
