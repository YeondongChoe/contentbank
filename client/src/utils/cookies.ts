import { Cookies } from 'react-cookie';
import { CookieSetOptions } from 'universal-cookie';

const cookies = new Cookies();

export const getAuthorityCookie = (name: string) => {
  try {
    return cookies.get(name);
  } catch (error) {
    console.error(error);
  }
};

export const setAuthorityCookie = (
  name: string,
  value: string,
  option?: CookieSetOptions,
) => {
  try {
    cookies.set(name, value, { ...option });
  } catch (error) {
    console.error(error);
  }
};

export const removeAuthorityCookie = (
  name: string,
  option?: CookieSetOptions,
) => {
  try {
    cookies.remove(name, { ...option });
  } catch (error) {
    console.error(error);
  }
};
