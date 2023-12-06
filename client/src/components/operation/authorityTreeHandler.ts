import React from 'react';

/** 전체 편집 클릭*/
export const clickAllEdit = ({
  setIsEditAllChecked,
  setIsEditCreateChecked,
  setIsEditCreateListChecked,
  setIsEditWorksheetChecked,
  setIsEditManagementChecked,
  setIsEditManagementListChecked,
  setIsEditTreeChecked,
  setIsEditOperationChecked,
  setIsEditMemberChecked,
  setIsEditAuthorityChecked,
  setIsManageAllChecked,
  setIsManageCreateChecked,
  setIsManageCreateListChecked,
  setIsManageWorksheetChecked,
  setIsManageManagementChecked,
  setIsManageManagementListChecked,
  setIsManageTreeChecked,
  setIsManageOperationChecked,
  setIsManageMemberChecked,
  setIsManageAuthorityChecked,
}: any) => {
  setIsEditAllChecked((prevAllChecked: any) => {
    const newAllChecked = !prevAllChecked;
    setIsEditCreateChecked(newAllChecked);
    setIsEditCreateListChecked(newAllChecked);
    setIsEditWorksheetChecked(newAllChecked);
    setIsEditManagementChecked(newAllChecked);
    setIsEditManagementListChecked(newAllChecked);
    setIsEditTreeChecked(newAllChecked);
    setIsEditOperationChecked(newAllChecked);
    setIsEditMemberChecked(newAllChecked);
    setIsEditAuthorityChecked(newAllChecked);
    return newAllChecked;
  });
  setIsManageAllChecked(false);
  setIsManageCreateChecked(false);
  setIsManageCreateListChecked(false);
  setIsManageWorksheetChecked(false);
  setIsManageManagementChecked(false);
  setIsManageManagementListChecked(false);
  setIsManageTreeChecked(false);
  setIsManageOperationChecked(false);
  setIsManageMemberChecked(false);
  setIsManageAuthorityChecked(false);
};

/** 콘텐츠 제작 편집 클릭*/
export const clickCreateEdit = ({
  isEditCreateChecked,
  isEditCreateListChecked,
  isEditWorksheetChecked,
  setIsEditCreateListChecked,
  setIsEditWorksheetChecked,
  setIsEditCreateChecked,
  setIsManageCreateChecked,
  setIsManageCreateListChecked,
  setIsManageWorksheetChecked,
}: any) => {
  const newCreateChecked = isEditCreateChecked;
  const newCreateListChecked = isEditCreateListChecked;
  const newWorksheetChecked = isEditWorksheetChecked;
  if (newCreateListChecked === false && newWorksheetChecked === false) {
    setIsEditCreateChecked(true);
    setIsEditCreateListChecked(true);
    setIsEditWorksheetChecked(true);
  }
  if (
    newCreateChecked === true &&
    newCreateListChecked === true &&
    newWorksheetChecked === true
  ) {
    setIsEditCreateChecked(false);
    setIsEditCreateListChecked(false);
    setIsEditWorksheetChecked(false);
  } else if (newCreateListChecked === true || newWorksheetChecked === true) {
    setIsEditCreateChecked(true);
    setIsEditCreateListChecked(true);
    setIsEditWorksheetChecked(true);
  }
  setIsManageCreateChecked(false);
  setIsManageCreateListChecked(false);
  setIsManageWorksheetChecked(false);
};
/** 콘텐츠 제작/문항 편집 클릭*/
export const clickListEdit = ({
  setIsEditCreateListChecked,
  setIsManageCreateListChecked,
}: any) => {
  setIsEditCreateListChecked((prevCreateListChecked: any) => {
    const newCreateListChecked = !prevCreateListChecked;
    return newCreateListChecked;
  });
  setIsManageCreateListChecked(false);
};

/** 콘텐츠 제작/학습지 편집 클릭*/
export const clickWorksheetEdit = ({
  setIsEditWorksheetChecked,
  setIsManageWorksheetChecked,
}: any) => {
  setIsEditWorksheetChecked((prevCreateListChecked: any) => {
    const newCreateListChecked = !prevCreateListChecked;
    return newCreateListChecked;
  });
  setIsManageWorksheetChecked(false);
};

/** 콘텐츠 관리 편집 클릭*/
export const clickManagemantEdit = ({
  isEditManagementChecked,
  isEditManagementListChecked,
  isEditTreeChecked,
  setIsEditManagementChecked,
  setIsEditManagementListChecked,
  setIsEditTreeChecked,
  setIsManageManagementChecked,
  setIsManageManagementListChecked,
  setIsManageTreeChecked,
}: any) => {
  const newManagementChecked = isEditManagementChecked;
  const newManagementListChecked = isEditManagementListChecked;
  const newTreeChecked = isEditTreeChecked;
  if (newManagementListChecked === false && newTreeChecked === false) {
    setIsEditManagementChecked(true);
    setIsEditManagementListChecked(true);
    setIsEditTreeChecked(true);
  }
  if (
    newManagementChecked === true &&
    newManagementListChecked === true &&
    newTreeChecked === true
  ) {
    setIsEditManagementChecked(false);
    setIsEditManagementListChecked(false);
    setIsEditTreeChecked(false);
  } else if (newManagementListChecked === true || newTreeChecked === true) {
    setIsEditManagementChecked(true);
    setIsEditManagementListChecked(true);
    setIsEditTreeChecked(true);
  }
  setIsManageManagementChecked(false);
  setIsManageManagementListChecked(false);
  setIsManageTreeChecked(false);
};
/** 콘텐츠 관리/문항 편집 클릭*/
export const clickManagemantListEdit = ({
  setIsEditManagementListChecked,
  setIsManageManagementListChecked,
}: any) => {
  setIsEditManagementListChecked((prevCreateListChecked: any) => {
    const newCreateListChecked = !prevCreateListChecked;
    return newCreateListChecked;
  });
  setIsManageManagementListChecked(false);
};

/** 콘텐츠 관리/트리 편집 클릭*/
export const clickTreeEdit = ({
  setIsEditTreeChecked,
  setIsManageTreeChecked,
}: any) => {
  setIsEditTreeChecked((prevCreateListChecked: any) => {
    const newCreateListChecked = !prevCreateListChecked;
    return newCreateListChecked;
  });
  setIsManageTreeChecked(false);
};

/** 운영 관리 편집 클릭*/
// export const clickOperationEdit = ({
//   isEditOperationChecked,
//   isEditMemberChecked,
//   isEditAuthorityChecked,
//   setIsEditOperationChecked,
//   setIsEditMemberChecked,
//   setIsEditAuthorityChecked,
//   setIsManageOperationChecked,
//   setIsManageMemberChecked,
//   setIsManageAuthorityChecked,
// }: any) => {
//   const newOperationChecked = isEditOperationChecked;
//   const newMemberChecked = isEditMemberChecked;
//   const newAuthorityChecked = isEditAuthorityChecked;
//   if (newMemberChecked === false && newAuthorityChecked === false) {
//     setIsEditOperationChecked(true);
//     setIsEditMemberChecked(true);
//     setIsEditAuthorityChecked(true);
//   }
//   if (
//     newOperationChecked === true &&
//     newMemberChecked === true &&
//     newAuthorityChecked === true
//   ) {
//     setIsEditOperationChecked(false);
//     setIsEditMemberChecked(false);
//     setIsEditAuthorityChecked(false);
//   } else if (newMemberChecked === true || newAuthorityChecked === true) {
//     setIsEditOperationChecked(true);
//     setIsEditMemberChecked(true);
//     setIsEditAuthorityChecked(true);
//   }
//   setIsManageOperationChecked(false);
//   setIsManageMemberChecked(false);
//   setIsManageAuthorityChecked(false);
// };

/** 운영 관리/회원 편집 클릭*/
// export const clickMemberEdit = ({
//   setIsEditMemberChecked,
//   setIsManageMemberChecked,
// }: any) => {
//   setIsEditMemberChecked((prevCreateListChecked: any) => {
//     const newCreateListChecked = !prevCreateListChecked;
//     return newCreateListChecked;
//   });
//   setIsManageMemberChecked(false);
// };

/** 운영 관리/권한 편집 클릭*/
// export const clickAuthorityEdit = ({
//   setIsEditAuthorityChecked,
//   setIsManageAuthorityChecked,
// }: any) => {
//   setIsEditAuthorityChecked((prevCreateListChecked: any) => {
//     const newCreateListChecked = !prevCreateListChecked;
//     return newCreateListChecked;
//   });
//   setIsManageAuthorityChecked(false);
// };

/** 전체 관리 클릭*/
export const clickAllManage = ({
  isEditAllChecked,
  isManageAllChecked,
  setIsEditAllChecked,
  setIsEditCreateChecked,
  setIsEditCreateListChecked,
  setIsEditWorksheetChecked,
  setIsEditManagementChecked,
  setIsEditManagementListChecked,
  setIsEditTreeChecked,
  setIsEditOperationChecked,
  setIsEditMemberChecked,
  setIsEditAuthorityChecked,
  setIsManageAllChecked,
  setIsManageCreateChecked,
  setIsManageCreateListChecked,
  setIsManageWorksheetChecked,
  setIsManageManagementChecked,
  setIsManageManagementListChecked,
  setIsManageTreeChecked,
  setIsManageOperationChecked,
  setIsManageMemberChecked,
  setIsManageAuthorityChecked,
}: any) => {
  if (isEditAllChecked && isManageAllChecked) {
    setIsEditAllChecked(true);
    setIsEditCreateChecked(true);
    setIsEditCreateListChecked(true);
    setIsEditWorksheetChecked(true);
    setIsEditManagementChecked(true);
    setIsEditManagementListChecked(true);
    setIsEditTreeChecked(true);
    setIsEditOperationChecked(true);
    setIsEditMemberChecked(true);
    setIsEditAuthorityChecked(true);
    setIsManageAllChecked(false);
    setIsManageCreateChecked(false);
    setIsManageCreateListChecked(false);
    setIsManageWorksheetChecked(false);
    setIsManageManagementChecked(false);
    setIsManageManagementListChecked(false);
    setIsManageTreeChecked(false);
    setIsManageOperationChecked(false);
    setIsManageMemberChecked(false);
    setIsManageAuthorityChecked(false);
  } else if (isEditAllChecked) {
    setIsEditAllChecked(true);
    setIsEditCreateChecked(true);
    setIsEditCreateListChecked(true);
    setIsEditWorksheetChecked(true);
    setIsEditManagementChecked(true);
    setIsEditManagementListChecked(true);
    setIsEditTreeChecked(true);
    setIsEditOperationChecked(true);
    setIsEditMemberChecked(true);
    setIsEditAuthorityChecked(true);
    setIsManageAllChecked(true);
    setIsManageCreateChecked(true);
    setIsManageCreateListChecked(true);
    setIsManageWorksheetChecked(true);
    setIsManageManagementChecked(true);
    setIsManageManagementListChecked(true);
    setIsManageTreeChecked(true);
    setIsManageOperationChecked(true);
    setIsManageMemberChecked(true);
    setIsManageAuthorityChecked(true);
  } else {
    setIsManageAllChecked((prevAllChecked: any) => {
      const newAllChecked = !prevAllChecked;
      setIsManageCreateChecked(newAllChecked);
      setIsManageCreateListChecked(newAllChecked);
      setIsManageWorksheetChecked(newAllChecked);
      setIsManageManagementChecked(newAllChecked);
      setIsManageManagementListChecked(newAllChecked);
      setIsManageTreeChecked(newAllChecked);
      setIsManageOperationChecked(newAllChecked);
      setIsManageMemberChecked(newAllChecked);
      setIsManageAuthorityChecked(newAllChecked);
      return newAllChecked;
    });
    setIsEditAllChecked((prevAllChecked: any) => {
      const newAllChecked = !prevAllChecked;
      setIsEditCreateChecked(newAllChecked);
      setIsEditCreateListChecked(newAllChecked);
      setIsEditWorksheetChecked(newAllChecked);
      setIsEditManagementChecked(newAllChecked);
      setIsEditManagementListChecked(newAllChecked);
      setIsEditTreeChecked(newAllChecked);
      setIsEditOperationChecked(newAllChecked);
      setIsEditMemberChecked(newAllChecked);
      setIsEditAuthorityChecked(newAllChecked);
      return newAllChecked;
    });
  }
};

/** 콘텐츠 제작 관리 클릭*/
export const clickCreateManage = ({
  isManageCreateChecked,
  isManageCreateListChecked,
  isManageWorksheetChecked,
  setIsManageCreateChecked,
  setIsManageCreateListChecked,
  setIsManageWorksheetChecked,
  isEditCreateChecked,
  isEditCreateListChecked,
  isEditWorksheetChecked,
  setIsEditCreateChecked,
  setIsEditCreateListChecked,
  setIsEditWorksheetChecked,
}: any) => {
  const newManageCreateChecked = isManageCreateChecked;
  const newManageCreateListChecked = isManageCreateListChecked;
  const newManageWorksheetChecked = isManageWorksheetChecked;
  if (
    newManageCreateListChecked === false &&
    newManageWorksheetChecked === false
  ) {
    setIsManageCreateChecked(true);
    setIsManageCreateListChecked(true);
    setIsManageWorksheetChecked(true);
  } else {
    setIsManageCreateChecked(false);
    setIsManageCreateListChecked(false);
    setIsManageWorksheetChecked(false);
    setIsEditCreateChecked(false);
    setIsEditCreateListChecked(false);
    setIsEditWorksheetChecked(false);
  }
  if (
    newManageCreateChecked === true &&
    newManageCreateListChecked === true &&
    newManageWorksheetChecked === true
  ) {
    setIsManageCreateChecked(false);
    setIsManageCreateListChecked(false);
    setIsManageWorksheetChecked(false);
  } else if (
    newManageCreateListChecked === true ||
    newManageWorksheetChecked === true
  ) {
    setIsManageCreateChecked(true);
    setIsManageCreateListChecked(true);
    setIsManageWorksheetChecked(true);
  }
  const newEditCreateChecked = isEditCreateChecked;
  const newEditCreateListChecked = isEditCreateListChecked;
  const newEditWorksheetChecked = isEditWorksheetChecked;
  if (newEditCreateListChecked === false && newEditWorksheetChecked === false) {
    setIsEditCreateChecked(true);
    setIsEditCreateListChecked(true);
    setIsEditWorksheetChecked(true);
  }
  if (
    newEditCreateChecked === true &&
    newEditCreateListChecked === true &&
    newEditWorksheetChecked === true
  ) {
    setIsEditCreateChecked(true);
    setIsEditCreateListChecked(true);
    setIsEditWorksheetChecked(true);
  } else if (
    newEditCreateListChecked === true ||
    newEditWorksheetChecked === true
  ) {
    setIsEditCreateChecked(true);
    setIsEditCreateListChecked(true);
    setIsEditWorksheetChecked(true);
  }
};

/** 콘텐츠 제작/문항 관리 클릭*/
export const clickListManage = ({
  isManageCreateListChecked,
  isEditCreateListChecked,
  setIsManageCreateListChecked,
  setIsEditCreateListChecked,
}: any) => {
  if (isManageCreateListChecked && isEditCreateListChecked) {
    setIsManageCreateListChecked(false);
    setIsEditCreateListChecked(true);
  } else if (isEditCreateListChecked) {
    setIsManageCreateListChecked(true);
    setIsEditCreateListChecked(true);
  } else {
    setIsManageCreateListChecked((prevCreateListChecked: any) => {
      const newCreateListChecked = !prevCreateListChecked;
      return newCreateListChecked;
    });
    setIsEditCreateListChecked((prevCreateListChecked: any) => {
      const newCreateListChecked = !prevCreateListChecked;
      return newCreateListChecked;
    });
  }
};
/** 콘텐츠 제작/학습지 관리 클릭*/
export const clickWorksheetManage = ({
  isManageWorksheetChecked,
  isEditWorksheetChecked,
  setIsManageWorksheetChecked,
  setIsEditWorksheetChecked,
}: any) => {
  if (isManageWorksheetChecked && isEditWorksheetChecked) {
    setIsManageWorksheetChecked(false);
    setIsEditWorksheetChecked(true);
  } else if (isEditWorksheetChecked) {
    setIsManageWorksheetChecked(true);
    setIsEditWorksheetChecked(true);
  } else {
    setIsManageWorksheetChecked((prevCreateListChecked: any) => {
      const newCreateListChecked = !prevCreateListChecked;
      return newCreateListChecked;
    });
    setIsEditWorksheetChecked((prevCreateListChecked: any) => {
      const newCreateListChecked = !prevCreateListChecked;
      return newCreateListChecked;
    });
  }
};

/** 콘텐츠 관리 관리 클릭*/
export const clickManagemantManage = ({
  isManageManagementChecked,
  isManageManagementListChecked,
  isManageTreeChecked,
  setIsManageManagementChecked,
  setIsManageManagementListChecked,
  setIsManageTreeChecked,
  isEditManagementChecked,
  isEditManagementListChecked,
  isEditTreeChecked,
  setIsEditManagementChecked,
  setIsEditManagementListChecked,
  setIsEditTreeChecked,
}: any) => {
  const newManageManagementChecked = isManageManagementChecked;
  const newManageManagementListChecked = isManageManagementListChecked;
  const newManageTreeChecked = isManageTreeChecked;
  if (
    newManageManagementListChecked === false &&
    newManageTreeChecked === false
  ) {
    setIsManageManagementChecked(true);
    setIsManageManagementListChecked(true);
    setIsManageTreeChecked(true);
  } else {
    setIsManageManagementChecked(false);
    setIsManageManagementListChecked(false);
    setIsManageTreeChecked(false);
    setIsEditManagementChecked(false);
    setIsEditManagementListChecked(false);
    setIsEditTreeChecked(false);
  }
  if (
    newManageManagementChecked === true &&
    newManageManagementListChecked === true &&
    newManageTreeChecked === true
  ) {
    setIsManageManagementChecked(false);
    setIsManageManagementListChecked(false);
    setIsManageTreeChecked(false);
  } else if (
    newManageManagementListChecked === true ||
    newManageTreeChecked === true
  ) {
    setIsManageManagementChecked(true);
    setIsManageManagementListChecked(true);
    setIsManageTreeChecked(true);
  }
  const newEditManagementChecked = isEditManagementChecked;
  const newEditManagementListChecked = isEditManagementListChecked;
  const newEditTreeChecked = isEditTreeChecked;
  if (newEditManagementListChecked === false && newEditTreeChecked === false) {
    setIsEditManagementChecked(true);
    setIsEditManagementListChecked(true);
    setIsEditTreeChecked(true);
  }
  if (
    newEditManagementChecked === true &&
    newEditManagementListChecked === true &&
    newEditTreeChecked === true
  ) {
    setIsEditManagementChecked(true);
    setIsEditManagementListChecked(true);
    setIsEditTreeChecked(true);
  } else if (
    newEditManagementListChecked === true ||
    newEditTreeChecked === true
  ) {
    setIsEditManagementChecked(true);
    setIsEditManagementListChecked(true);
    setIsEditTreeChecked(true);
  }
};
/** 콘텐츠 관리/문항 관리 클릭*/
export const clickManagemantListManage = ({
  isManageManagementListChecked,
  isEditManagementListChecked,
  setIsManageManagementListChecked,
  setIsEditManagementListChecked,
}: any) => {
  if (isManageManagementListChecked && isEditManagementListChecked) {
    setIsManageManagementListChecked(false);
    setIsEditManagementListChecked(true);
  } else if (isEditManagementListChecked) {
    setIsManageManagementListChecked(true);
    setIsEditManagementListChecked(true);
  } else {
    setIsManageManagementListChecked((prevCreateListChecked: any) => {
      const newCreateListChecked = !prevCreateListChecked;
      return newCreateListChecked;
    });
    setIsEditManagementListChecked((prevCreateListChecked: any) => {
      const newCreateListChecked = !prevCreateListChecked;
      return newCreateListChecked;
    });
  }
};

/** 콘텐츠 관리/트리 관리 클릭*/
export const clickTreeManage = ({
  isManageTreeChecked,
  isEditTreeChecked,
  setIsManageTreeChecked,
  setIsEditTreeChecked,
}: any) => {
  if (isManageTreeChecked && isEditTreeChecked) {
    setIsManageTreeChecked(false);
    setIsEditTreeChecked(true);
  } else if (isEditTreeChecked) {
    setIsManageTreeChecked(true);
    setIsEditTreeChecked(true);
  } else {
    setIsManageTreeChecked((prevCreateListChecked: any) => {
      const newCreateListChecked = !prevCreateListChecked;
      return newCreateListChecked;
    });
    setIsEditTreeChecked((prevCreateListChecked: any) => {
      const newCreateListChecked = !prevCreateListChecked;
      return newCreateListChecked;
    });
  }
};

/** 운영 관리 관리 클릭*/
export const clickOperationManage = ({
  isManageOperationChecked,
  isManageMemberChecked,
  isManageAuthorityChecked,
  setIsManageOperationChecked,
  setIsManageMemberChecked,
  setIsManageAuthorityChecked,
  isEditOperationChecked,
  isEditMemberChecked,
  isEditAuthorityChecked,
  setIsEditOperationChecked,
  setIsEditMemberChecked,
  setIsEditAuthorityChecked,
}: any) => {
  const newManageOperationChecked = isManageOperationChecked;
  const newManageMemberChecked = isManageMemberChecked;
  const newManageAuthorityChecked = isManageAuthorityChecked;
  if (newManageMemberChecked === false && newManageAuthorityChecked === false) {
    setIsManageOperationChecked(true);
    setIsManageMemberChecked(true);
    setIsManageAuthorityChecked(true);
  } else {
    setIsManageOperationChecked(false);
    setIsManageMemberChecked(false);
    setIsManageAuthorityChecked(false);
    setIsEditOperationChecked(false);
    setIsEditMemberChecked(false);
    setIsEditAuthorityChecked(false);
  }
  if (
    newManageOperationChecked === true &&
    newManageMemberChecked === true &&
    newManageAuthorityChecked === true
  ) {
    setIsManageOperationChecked(false);
    setIsManageMemberChecked(false);
    setIsManageAuthorityChecked(false);
  } else if (
    newManageMemberChecked === true ||
    newManageAuthorityChecked === true
  ) {
    setIsManageOperationChecked(true);
    setIsManageMemberChecked(true);
    setIsManageAuthorityChecked(true);
  }
  const newEditOperationChecked = isEditOperationChecked;
  const newEditMemberChecked = isEditMemberChecked;
  const newEditAuthorityChecked = isEditAuthorityChecked;
  if (newEditMemberChecked === false && newEditAuthorityChecked === false) {
    setIsEditOperationChecked(true);
    setIsEditMemberChecked(true);
    setIsEditAuthorityChecked(true);
  }
  if (
    newEditOperationChecked === true &&
    newEditMemberChecked === true &&
    newEditAuthorityChecked === true
  ) {
    setIsEditOperationChecked(true);
    setIsEditMemberChecked(true);
    setIsEditAuthorityChecked(true);
  } else if (
    newEditMemberChecked === true ||
    newEditAuthorityChecked === true
  ) {
    setIsEditOperationChecked(true);
    setIsEditMemberChecked(true);
    setIsEditAuthorityChecked(true);
  }
};

/** 운영 관리/회원 관리 클릭*/
export const clickMemberManage = ({
  isManageMemberChecked,
  isEditMemberChecked,
  setIsManageMemberChecked,
  setIsEditMemberChecked,
}: any) => {
  if (isManageMemberChecked && isEditMemberChecked) {
    setIsManageMemberChecked(false);
    setIsEditMemberChecked(true);
  } else if (isEditMemberChecked) {
    setIsManageMemberChecked(true);
    setIsEditMemberChecked(true);
  } else {
    setIsManageMemberChecked((prevCreateListChecked: any) => {
      const newCreateListChecked = !prevCreateListChecked;
      return newCreateListChecked;
    });
    setIsEditMemberChecked((prevCreateListChecked: any) => {
      const newCreateListChecked = !prevCreateListChecked;
      return newCreateListChecked;
    });
  }
};

/** 운영 관리/권한 관리 클릭*/
export const clickAuthorityManage = ({
  isManageAuthorityChecked,
  isEditAuthorityChecked,
  setIsManageAuthorityChecked,
  setIsEditAuthorityChecked,
}: any) => {
  if (isManageAuthorityChecked && isEditAuthorityChecked) {
    setIsManageAuthorityChecked(false);
    setIsEditAuthorityChecked(true);
  } else if (isEditAuthorityChecked) {
    setIsManageAuthorityChecked(true);
    setIsEditAuthorityChecked(true);
  } else {
    setIsManageAuthorityChecked((prevCreateListChecked: any) => {
      const newCreateListChecked = !prevCreateListChecked;
      return newCreateListChecked;
    });
    setIsEditAuthorityChecked((prevCreateListChecked: any) => {
      const newCreateListChecked = !prevCreateListChecked;
      return newCreateListChecked;
    });
  }
};
