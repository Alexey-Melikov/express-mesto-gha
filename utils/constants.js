const ERROR_CODE_INCORRECT_DATA = {
  code: 400,
  message: "Переданы некорректные данные",
};
const ERROR_CODE_NOT_FOUND = { code: 404, message: "Данные не найдены" };
const ERROR_CODE_DEFAULT = {
  code: 500,
  message: "На сервере произошла ошибка!",
};

module.exports = {
  ERROR_CODE_DEFAULT,
  ERROR_CODE_INCORRECT_DATA,
  ERROR_CODE_NOT_FOUND,
};
