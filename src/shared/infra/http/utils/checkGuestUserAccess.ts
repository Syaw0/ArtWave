const guestRegex =
  /\/logout|\/delProf|\/changeProf|\/changeInformation|\/artwork\/create|\/vote|\/removeVote|\/comment/;

const checkGuestUserAccess = (url: string) => {
  return guestRegex.test(url);
};
export default checkGuestUserAccess;
