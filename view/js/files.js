axios.defaults.baseURL = SERVER;

//🌟 Third party library used to give notification on UI
const toast = new Notyf({
  position: { x: "center", y: "top" },
});

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
    const progress = document.getElementById("progress");
    const uploadBtn = document.getElementById("upload-btn");
    const form = e.target;
    const formData = new FormData(form);
    const options = {
      onUploadProgress: (e) => {
        const loaded = e.loaded;
        const total = e.total;
        const percentValue = Math.floor((loaded * 100) / total);
        progress.style.width = percentValue + "%";
        progress.innerHTML = percentValue + "%";
      },
    };
    uploadBtn.disabled = true;
    const { data } = await axios.post("/api/file", formData, options);
    toast.success(`${data.filename} has been uploaded !`);
    uploadBtn.disabled = false;
    progress.style.width = 0;
    progress.innerHTML = "";
    form.reset();
    toggleDrawer();
  } catch (error) {
    console.log(error.message);
  }
};
