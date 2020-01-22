import { useCallback } from "react";
import validator from "validator";

export const useValidation = () => {
  const checkEmail = useCallback(e => {
    if (validator.isEmail(e)) {
      return "";
    } else {
      return "Email введен неверно!";
    }
  }, []);

  const checkPassword = useCallback((p, cp) => {
    if (validator.isLength(p, { min: 6 })) {
      if (p === cp) {
        return "";
      } else {
        return "Пароли не совпадают!";
      }
    } else return "Пароль слишком короткий!";
  }, []);

  const checkLogin = useCallback(l => {
    if (validator.isLength(l, { min: 1 })) {
      return "";
    } else {
      return "Пусто!";
    }
  }, []);

  return {
    checkEmail,
    checkPassword,
    checkLogin
  };
};
