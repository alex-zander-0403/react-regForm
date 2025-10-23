import { useState } from "react";
import {
  validatePassword,
  checkPasswordMatch,
  checkFieldsFilled,
} from "./validators";
import "./RegForm.css";

//
function RegForm() {
  //
  const [name, setName] = useState(""); // имя
  const [email, setEmail] = useState(""); // почта

  const [password, setPassword] = useState(""); // пароль 1
  const [isPasswordValid, setIsPasswordValid] = useState(true); // валидность пароля

  const [confirmPassword, setConfirmPassword] = useState(""); // пароль 2
  const [passwordMatch, setPasswordMatch] = useState(true); // проверка совпадения пароль 1 = пароль 2

  const [selectedYear, setSelectedYear] = useState(""); // год

  const [requiredFieldsError, setRequiredFieldsError] = useState(false); // ошибка заполнения всех полей
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // ----------------------------

  const handleNameChange = (event) => {
    const newName = event.target.value;
    setName(newName);
  };

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
  };

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    setIsPasswordValid(validatePassword(newPassword));
    setPasswordMatch(checkPasswordMatch(newPassword, confirmPassword));
  };

  const handleConfirmPasswordChange = (event) => {
    const newConfirmPassword = event.target.value;
    setConfirmPassword(newConfirmPassword);
    setPasswordMatch(checkPasswordMatch(password, newConfirmPassword));
  };

  //

  const years = Array.from(
    { length: 40 },
    (_, i) => new Date().getFullYear() - i
  );

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  // функция регистрации
  const handleSubmit = (event) => {
    event.preventDefault();

    const allFieldsFilled = checkFieldsFilled([
      name,
      email,
      password,
      confirmPassword,
      selectedYear,
    ]);

    const isFormValid = allFieldsFilled && isPasswordValid && passwordMatch;

    if (!isFormValid) {
      setRequiredFieldsError(true);
      setShowSuccessMessage(false);
      return;
    }
    setRequiredFieldsError(false);
    setShowSuccessMessage(true);

    const formData = {
      name,
      email,
      password,
      confirmPassword,
      selectedYear,
    };

    alert(JSON.stringify(formData, null, 2));

    handleReset();
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setSelectedYear("");
  };

  //
  return (
    <div className="reg-form">
      <h1>Форма регистрации</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="имя" onChange={handleNameChange} />
        <input type="email" placeholder="email" onChange={handleEmailChange} />

        <input
          type="password"
          placeholder="пароль"
          value={password}
          onChange={handlePasswordChange}
        />

        {!isPasswordValid && (
          <div className="error-message">
            Пароль должен состоять из латинских букв и цифр, а также быть не
            менее 8-ми символов
          </div>
        )}

        <input
          type="password"
          placeholder="подтвердите пароль"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />

        {!passwordMatch && (
          <div className="error-message">Пароли должны совпадать</div>
        )}

        <select value={selectedYear} onChange={handleYearChange}>
          <option value="">Дата</option>
          {years.map((year) => (
            <option key={year.toString()} value={year}>
              {year}
            </option>
          ))}
        </select>

        {requiredFieldsError && (
          <div className="error-message">Заполните все поля</div>
        )}
        {showSuccessMessage && <div className="success-message">Успешно</div>}

        <button type="submit">Зарегистрироваться</button>
        <button type="reset" onClick={handleReset}>
          Очистить форму
        </button>
      </form>
    </div>
  );
}

export default RegForm;
