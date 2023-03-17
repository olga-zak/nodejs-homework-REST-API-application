const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");

const { User } = require("../../schemas/userSchema");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateUserAvatar = async (req, res) => {
  const { _id } = req.user; //чтобы знать куда(для кого) сохранять аватар
  const { path: tempUpload, originalname } = req.file; //место временной загрузки + полное имя файла

  //чтобы сохранить название файла(аватара) под уник.именем(_id):
  const extention = originalname.split(".").pop(); //вытаскиваем расширение файла (.jpg)
  const filename = `${_id}.${extention}`; //создаём новое название файла

  //создаём ссылку resultUpload на место где будет храниться аватар и  под каким именем будем записывать filename
  const resultUpload = path.join(avatarsDir, filename);

  //Обработай аватарку пакетом jimp и задай для нее размеры 250 на 250
  const avatarFromTemp = await Jimp.read(tempUpload); //берём картинку из tmp
  avatarFromTemp.resize(250, Jimp.AUTO).write(resultUpload); // resize the width to 250 and scale the height accordingly and save

  fs.rename(tempUpload, resultUpload); //удаляем из tmp tempUpload(аватарку необработанную)
  const avatarURL = path.join("avatars", filename); //создаём новый avatarURL
  await User.findByIdAndUpdate(_id, { avatarURL }); //обновляем ссылку на аватар в базе

  res.json({
    avatarURL,
  });
};

module.exports = updateUserAvatar;
