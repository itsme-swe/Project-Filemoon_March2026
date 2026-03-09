const getSession = async () => {
  try {
    const session = localStorage.getItem("authToken");

    if (!session) {
      location.href = "../index.html";
      return;
    }

    const payload = {
      token: session,
    };
    const { data } = await axios.post(
      "http://localhost:8080/token/verify",
      payload,
    );
    console.log(data);
  } catch (error) {
    localStorage.clear();
    location.href = "../index.html";
  }
};

getSession();
