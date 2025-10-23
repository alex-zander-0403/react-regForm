export function validatePassword(password) {
  const passwordRegEx = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return passwordRegEx.test(password);
}

export function checkPasswordMatch(password, confirmPassword) {
  return password === confirmPassword;
}

export function checkFieldsFilled(fieldsArray) {
  return fieldsArray.every((field) => field.trim() !== "");
}
