import axios from "axios";

const registerUser = async (registrationData) => {
  const { data } = await axios.post(
    "https://sensibly-destined-chigger.ngrok-free.app/register",
    registrationData,
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "ngrok-skip-browser-warning": "any value",
      },
    }
  );
  localStorage.setItem("user", JSON.stringify(data));
  return data;
};

export default {
  registerUser,
};
