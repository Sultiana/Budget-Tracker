import React, { useContext } from "react";
import styles from "./Login.module.css";
import toast, { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";
import handlers from "./Login.handler";
import UserContext from "../../contexts/UserContext";
import { Link } from "react-router-dom";

const { loginUser } = handlers;
const Login = () => {
    const { setUser } = useContext(UserContext);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = async (loginData) => {
        try {
            const data = await loginUser(loginData);
            setUser({
                username: data.username,
                isLoggedIn: true,
                // token: data.accessToken,
            }); 
            reset();
            toast.success("Login Successful");
        } catch (error) {
            console.log(error);
            toast.error("Login Failed. Please Try Again");
        }
    };

    return (
        <>
            <div>
                <Toaster />
            </div>
            <div className={styles.login}>
                <h1>Login</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label>Username</label>
                    <input
                        type="text"
                        id="username"
                        {...register("username", {
                            required: "*Username is required",
                        })}
                    />
                    {errors.username && <p>{errors.username.message}</p>}

                    <label>Password</label>
                    <input
                        type="password"
                        id="password"
                        {...register("password", {
                            required: "*Password is required",
                        })}
                    />
                    {errors.password && <p>{errors.password.message}</p>}
                    <div className={styles.submit}>
                        <input type="submit" value="Log In"/>
                    </div>
                </form>
                <br />
                <Link to="registration" className={styles.register}>
                    Register as a new user
                </Link>
            </div>
        </>
    );
};

export default Login;
