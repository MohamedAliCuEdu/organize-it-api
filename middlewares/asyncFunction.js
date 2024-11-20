function asyncFunction(routeHndlr) {
  return async function (req, res, nxt) {
    try {
      // logic:
      await routeHndlr(req, res, nxt);
    } catch (err) {
      nxt(err);
    }
  };
}

module.exports = asyncFunction;
