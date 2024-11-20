let MB = 5;
let FILE_SIZE_LIMIT = 5 * 1024 * 1024;

function fileSizeLimiterMW(req, res, nxt) {
  // check file size:
  let files = req.files;
  if (!files) return res.status(400).json({ msg: "there is no files!" });

  // create array for over size files:
  let overLimitFiles = [];
  Object.keys(files).forEach((key) => {
    if (files[key].size > FILE_SIZE_LIMIT) {
      overLimitFiles.push(files[key].name);
    }
  });

  // check array have files:
  if (overLimitFiles.length > 0) {
    // create error message:
    let properVerb = overLimitFiles.length > 1 ? "are" : "is";
    let fileNames =
      overLimitFiles.length < 3
        ? overLimitFiles.toString().replace(",", " and ")
        : overLimitFiles.toString().replace(",", ", ");
    let msg = `Upload faild. ${fileNames} ${properVerb} over the file size limit of ${MB}MB`;

    return res.status(413).json({ msg });
  }
  nxt();
}

module.exports = fileSizeLimiterMW;
