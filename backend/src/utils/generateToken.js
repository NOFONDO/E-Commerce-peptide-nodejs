const jwt = require('jsonwebtoken');

const generateToken = (adminId) => {
  return jwt.sign({ id: adminId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};

const setTokenCookie = (res, token) => {
  const expiresDays = Number(process.env.JWT_COOKIE_EXPIRES_DAYS) || 7;
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: expiresDays * 24 * 60 * 60 * 1000,
    path: '/',
  });
};

module.exports = { generateToken, setTokenCookie };
