exports.loginSuccess = (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successfull",
      user: req.user
    });
  }
}

exports.loginFail = (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
}