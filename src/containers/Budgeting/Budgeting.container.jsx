import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
    fetchCategories,
    fetchBudgets,
    saveBudget,
    updateBudget,
    getList,
} from "./Budgeting.handler";
import { Navigate } from "react-router-dom";
import styles from "./Budgeting.module.css";

const BudgetingPage = () => {
    const [category, setCategory] = useState("");
    const [budget, setBudget] = useState(null);
    const [amount, setAmount] = useState(0);
    const [budgets, setBudgets] = useState([]);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = async () => {
        try {
            if (budget != null) {
                const updatedBudget = await updateBudget(
                    category,
                    amount,
                    budget.id
                );
                getAllListBudget();
                setAmount(updatedBudget.amount);
                setBudget(updatedBudget);
            } else {
                const savedBudget = await saveBudget(category, amount);
                getAllListBudget();
                setAmount(savedBudget.amount);
                setBudget(savedBudget);
            }
        } catch (error) {
            setAmount(0);
            setBudget(null);
            console.error(error);
        }
    };

    const getAllListBudget = async () => {
        try {
            const data = await getList();
            setBudgets(data.content);
            console.log("bebas deh", data);
        } catch (error) {
            setBudgets([]);
        }
    };

    useEffect(() => {
        console.log(category);
        const fetchData = async () => {
            try {
                const dataBudget = await fetchBudgets(category);
                setAmount(dataBudget.amount);
                console.log("ini mengambil budget", dataBudget.amount);
                setBudget(dataBudget);
            } catch (error) {
                setAmount(0);
                setBudget(null);
                console.error(error);
            }
        };
        fetchData();
    }, [category]);

    useEffect(() => {
        const user = localStorage.getItem("user");
        if (!user) {
            Navigate("/");
        }
        getAllListBudget();
    }, []);

    return (
        <div className={styles.budgetingPage}>
            <h1>Budgeting</h1>
            <form
                className={styles.budgetForm}
                onSubmit={handleSubmit(onSubmit)}
            >
                <label htmlFor="category">Category:</label>
                <select
                    id="category"
                    {...register("category")}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="" disabled>
                        Choose One
                    </option>
                    <option value="FOOD_DRINKS">Food & Drinks</option>
                    <option value="RENT">Rent</option>
                    <option value="TRANSPORTATION">Transportation</option>
                    <option value="TELEPHONE_CREDIT">Telephone Credit</option>
                    <option value="MEDICAL">Medical</option>
                    <option value="OTHER_EXPENSE">Other Expense</option>
                </select>
                <label htmlFor="amount">Amount:</label>
                <input
                    type="number"
                    id="amount"
                    value={amount}
                    {...register("amount", { required: "*Amount is required" })}
                    onChange={(e) => setAmount(e.target.value)}
                />
                {errors.amount && <span>This field is required</span>}
                <button type="submit">Save</button>
            </form>
            {budgets &&
                budgets.map(function (item, index) {
                    return (
                        <div key={index} className={styles.budgetList}>
                            <div className={styles.budgetCategory}>{item.category}</div>
                            <div>
                                <small className={styles.budgetText}>
                                    <p>
                                        Amount :
                                        {"Rp. " +
                                            new Intl.NumberFormat(
                                                "id-ID"
                                            ).format(item.amount)}
                                    </p>
                                    <p>
                                        Used :
                                        {"Rp. " +
                                            new Intl.NumberFormat(
                                                "id-ID"
                                            ).format(item.useAmount)}
                                    </p>
                                    <p>
                                        Remaining :
                                        {"Rp. " +
                                            new Intl.NumberFormat(
                                                "id-ID"
                                            ).format(item.diffAmount)}
                                    </p>
                                </small>
                            </div>
                        </div>
                    );
                })}
        </div>
    );
};

export default BudgetingPage;
