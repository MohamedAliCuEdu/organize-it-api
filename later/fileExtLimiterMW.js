const path = require("path");

function fileExtLimiterMW(allwoedExtArr) {
  return (req, res, nxt) => {
    // check if there is files upladed:
    let files = req.files;
    if (!files) return res.status(400).json({ msg: "there is no files!" });
    // create array of all file extenstions:
    let fileExtenstions = [];

    Object.keys(files).forEach((key) => {
      fileExtenstions.push(path.extname(files[key].name.toLowerCase()));
    });

    // check if files extinsion allowes:
    const allowed = fileExtenstions.every((ext) => allwoedExtArr.includes(ext));

    if (!allowed) {
      let msg = `upload failed. only ${allwoedExtArr
        .toString()
        .replace(",", ", ")} files allowed`;
      return res.status(422).json({ msg });
    }
    nxt();
  };
}

module.exports = fileExtLimiterMW;
