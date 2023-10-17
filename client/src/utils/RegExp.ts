/** @id :@.필수, TDL 2또는 3자*/
export const idRegExp =
  /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;

/** @Password :8 ~ 20자 영문, 숫자, 특수문자를 최소 한가지씩 조합 */
export const passwordRegExp =
  /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/;
