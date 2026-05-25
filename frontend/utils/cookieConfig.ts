const cookieConfig = {
  accessTokenConfig: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    maxAge: 1 * 60,
    path: '/',

  },
  refreshTokenConfig: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    maxAge: 7 * 24 * 60 * 60,
    path: '/',
  },
};

export default cookieConfig;
