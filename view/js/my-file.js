axios.defaults.baseURL = SERVER;

const logout = () => {
  localStorage.clear();
  location.href = "/login";
};

const toggleDrawer = () => {
  const drawer = document.getElementById("drawer");
  const rightValue = drawer.style.right;

  if (rightValue === "0px") {
    drawer.style.right = "-33.33%";
  } else {
    drawer.style.right = "0px";
  }
};

const uploadFile = async (e) => {
  try {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const { data } = await axios.post("/api/file", formData);
    console.log(data);
  } catch (error) {
    console.log(error.message);
  }
};
