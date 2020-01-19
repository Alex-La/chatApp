import { useState, useCallback } from "react";
import validator from "validator";

export const useValidation = () => {
  const [email, setEmail] = useState(false);
  const [password, setPassword] = useState(false);
  const [login, setLogin] = useState(false);

  const checkEmail = useCallback(e => {
    if (validator.isEmail(e)) {
      setEmail(false);
    } else {
      setEmail(true);
    }
  }, []);

  const checkPassword = useCallback((p, cp) => {
    if (p === cp) {
      setPassword(false);
    } else {
      setPassword(true);
    }
  }, []);

  const checkLogin = useCallback(l => {
    if (validator.isLength(l, { min: 1 })) {
      setLogin(false);
    } else {
      setLogin(true);
    }
  }, []);

  return { email, password, checkEmail, checkPassword, login, checkLogin };
};
