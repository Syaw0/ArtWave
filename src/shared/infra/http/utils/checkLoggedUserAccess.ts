const loggedUserRegex =
  /\/login|\/signup|\/checkLogin|\/checkLoginToken|\/checkSignup|\/checkSignupToken/;

const checkLoggedUserAccess = (url: string) => {
  return loggedUserRegex.test(url);
};

export default checkLoggedUserAccess;
