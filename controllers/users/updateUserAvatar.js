const fs = require("fs/promises");
const path = require("path");

const { User } = require("../../schemas/userSchema");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateUserAvatar = async (req, res) => {
  const { _id } = req.user; //чтобы знать куда(для кого) сохранять аватар
  const { path: tempUpload, originalname } = req.file; //место временной загрузки + полное имя файла
  //чтобы сохранить название файла(аватара) под уник.именем(_id):
  const extention = originalname.split(".").pop(); //вытаскиваем расширение файла (.jpg)
  const filename = `${_id}.${extention}`; //создаём новое название файла
  const resultUpload = path.join(avatarsDir, filename); //создаём ссылку resultUpload на место где будет храниться аватар и записываем под именем filename
  await fs.rename(tempUpload, resultUpload); //перемещаем из tempUpload в resultUpload
  const avatarURL = path.join("avatars", filename); //создаём новый avatarURL
  await User.findByIdAndUpdate(_id, { avatarURL }); //обновляем ссылку на аватар в базе

  res.json({
    avatarURL,
  });
};

module.exports = updateUserAvatar;
