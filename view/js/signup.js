//🌟 Third party library used to give notification on UI
const toast = new Notyf({
  position: { x: "center", y: "top" },
});

const signup = async (e) => {
  try {
    e.preventDefault();
    const form = e.target;
    const elements = form.elements;
    const payload = {
      fullname: elements.fullname.value,
      mobile: elements.mobile.value,
      email: elements.email.value,
      password: elements.password.value,
    };

    const { data } = await axios.post("http://localhost:8080/signup", payload);
    form.reset();
    toast.success(data.message);

    //🌟 Redirecting user to login page after successfully signup
    setTimeout(() => {
      location.href = "index.html";
    }, 3000);
  } catch (error) {
    // console.log(error.response.data.message); // This returned exact error message by API instead of generic error message.

    // Below code means "kya API sae error response aaya toh API error print karo varna generic error print karo"
    toast.error(error.response ? error.response.data.message : error.message);
  }
};
