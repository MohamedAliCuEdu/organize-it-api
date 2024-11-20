const favouriteTypeMWValidator = async (req, res, nxt, val) => {
  try {
    let favouriteTypes = [
      "favHoppies",
      "favMovies",
      "favSongs",
      "favFoods",
      "favDrinks",
    ];
    // 1. check favouriteType is exist:
    if (!val)
      return res.status(403).json({ errMsg: "favourite type is undefined" });
    let isValid = favouriteTypes.includes(val);
    // 2. check if favouriteType value is valid:
    if (!isValid)
      return res
        .status(403)
        .json({ errMsg: "favourite type is invalid" });
    // 3. add favouriteType to body:
    req.favouriteType = val.toLoweCase();
    nxt();
  } catch (err) {
    res
      .status(500)
      .json({ errMsg: `Error - from favouriteTypeValidator: ${err.message}` });
  }
};

module.exports = favouriteTypeMWValidator;
