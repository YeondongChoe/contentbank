export const emailRegex =
  /[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]$/i;

//한글, 영어, 숫자만을 허용
export const nameRegex = /^[ㄱ-ㅎ가-힣a-zA-Z0-9]+$/;

// 띄워쓰기 없이 영문(소문자)과 숫자만
export const idRegex = /^[A-Za-z0-9]+$/;

// 영문, 숫자, 특수문자 혼용 8자리 이상
export const passwordRegex =
  /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_]).{8,16}$/;
