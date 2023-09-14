const validate = (e, p) => {
  const email = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(e);
  const password = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(
    p
  );
  if (email === true && password === true) {
    return null;
  }
  if (email === false) {
    return "please check your email";
  }
  if (password === false) {
    return "please check your Password";
  }
};
export default validate;
