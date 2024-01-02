import axios from "axios";

const loginUser = async (loginData) => {
  const { data } = await axios.post("https://sensibly-destined-chigger.ngrok-free.app/login", loginData,
  {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "ngrok-skip-browser-warning": "any value",
    },
  });
  localStorage.setItem("user", JSON.stringify(data));
  return data;
};

export default {
  loginUser,
};
