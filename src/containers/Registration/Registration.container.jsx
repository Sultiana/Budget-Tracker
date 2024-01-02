import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import UserContext from "../../contexts/UserContext";
import handlers from "./Registration.handler";
import styles from "./Registration.module.css";

const { registerUser } = handlers;
const Registration = () => {
  const { setUser } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (registrationData) => {
    try {
      const data = await registerUser(registrationData);
      reset();
      // setUser({
      //   username: data.username,
      //   token: data.accessToken,
      // });
      toast.success("Registration successful");
    } catch (error) {
      console.log(error);
      toast.error("Registration Failed. Please Try Again");
    }
  };
  return (
    <>
      <div>
        <Toaster />
      </div>
      <div className={styles.registration}>
        <h1>Registration</h1>
        <form onSubmit={handleSubmit(onSubmit)}>

         <label>Name</label>
          <input
            type="text"
            id="name"
            {...register("name", { required: "*Name is required" })}
          />
          {errors.name && <p>{errors.name.message}</p>}  

          <label>Username</label>
          <input
            type="text"
            id="username"
            {...register("username", { required: "*Username is required" })}
          />
          {errors.username && <p>{errors.username.message}</p>}

          <label>Password</label>
          <input
            type="password"
            id="password"
            {...register("password", { required: "*Password is required" })}
          />
          {errors.password && <p>{errors.password.message}</p>}
          <div className={styles.submit}>
            <input type="submit" value="Register" />
          </div>
        </form>
      </div>
    </>
  );
};

export default Registration;
