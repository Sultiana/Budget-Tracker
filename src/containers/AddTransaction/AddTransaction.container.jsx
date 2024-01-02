import React, { useState } from "react";
import styles from "./AddTransaction.module.css";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";

const AddTransaction = () => {
    const [category, setCategory] = useState("");
    const [type, setType] = useState("");
    const [amount, setAmount] = useState(0);
    const [description, setDescription] = useState("");

    const handleSave = (e) => {
        e.preventDefault();
        const user = JSON.parse(localStorage.getItem("user"));
        console.log(user);
        const payload = {
            amount,
            type,
            description,
            category,
        };

        axios
            .post(
                "https://sensibly-destined-chigger.ngrok-free.app/transactions",
                payload,
                {
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "ngrok-skip-browser-warning": "any value",
                        Authorization: `Bearer ${user.token}`,
                    },
                }
            )
            .then(() => {
                setDescription("");
                setAmount(0);
                setCategory("");
                setType("");
                toast.success("Transaction  successful");
            })
            .catch((error) => {
                if (error.response.status == 401) {
                    localStorage.removeItem("user");
                    return <Navigate to="/" replace />;
                }
                toast.error(error?.response?.data?.errors);
                console.log("debug", error);
            });
    };

    useEffect(() => {
        const user = localStorage.getItem("user");
        if (!user) {
            window.location.href = "/";
        }
    }, []);

    return (
        <>
            <div>
                <Toaster />
            </div>
            <div className={styles.transaction}>
                {/* <h3>Income</h3> */}
                <form onSubmit={handleSave}>
                    <label>Description</label>
                    <input
                        type="text"
                        id="description"
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        required={true}
                    />

                    <label>Amount</label>
                    <input
                        type="number"
                        id="amount"
                        onChange={(e) => setAmount(e.target.value)}
                        value={amount}
                        required={true}
                    />

                    <label>Type</label>
                    <select
                        id="type"
                        onChange={(e) => setType(e.target.value)}
                        value={type}
                        required={true}
                    >
                        <option value="" disabled>
                            --Choose One--
                        </option>
                        <option value="INCOME">Income</option>
                        <option value="EXPENSE">Expense</option>
                    </select>

                    <label>Category</label>
                    <select
                        id="category"
                        onChange={(e) => setCategory(e.target.value)}
                        value={category}
                        required={true}
                    >
                        <option value="">--Choose One--</option>
                        <option value="SALARY">Salary</option>
                        <option value="EXTRA_INCOME">Extra Income</option>
                        <option value="OTHER_INCOME">Other Income</option>
                        <option value="FOOD_DRINKS">Food & Drinks</option>
                        <option value="RENT">Rent</option>
                        <option value="TRANSPORTATION">Transportation</option>
                        <option value="TELEPHONE_CREDIT">
                            Telephone Credit
                        </option>
                        <option value="MEDICAL">Medical</option>
                        <option value="OTHER_EXPENSE">Other Expense</option>
                    </select>

                    <div className={styles.submit}>
                        <input type="submit" value="Save" />
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddTransaction;
