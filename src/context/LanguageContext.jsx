import React, { createContext, useState, useContext } from "react";

const LanguageContext  = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en"); // Default til: Inglizcha
  
  const translations = {
    en: { signIn: "Sign In", signUp: "Sign UP", createYourAccount: "Create Your Account", signIntoAccount: "Sign Into Your Account", noAccount: "Don't have an account?", alreadyHaveAnAccount: "Already have an account", signUp: "Sign Up" },
    ru: { signIn: "Войти", signUp: "Зарегистрироваться", createYourAccount: "Создайте свой аккаунт", signIntoAccount: "Войти в ваш аккаунт", noAccount: "Нет аккаунта?",  alreadyHaveAnAccount: "Уже есть аккаунт?", signUp: "Регистрация" },
    uz: { signIn: "Kirish", signUp: "Ro‘yxatdan o‘tish", createYourAccount: "Hisobingizni yarating", signIntoAccount: "Hisobingizga kiring", noAccount: "Hisobingiz yo'qmi?",  alreadyHaveAnAccount: "Allaqachon hisobingiz bormi?", signUp: "Ro'yxatdan o'tish" },
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translations }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage  = () => useContext(LanguageContext);