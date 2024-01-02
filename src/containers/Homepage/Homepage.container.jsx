import React, { useState, useEffect } from "react";
import {
    fetchTransactions,
    fetchBalance,
    postTransactions,
    fetchFinancialStatement,
} from "./Homepage.handler";
import styles from "./Homepage.module.css";

const Homepage = () => {
    const [balance, setBalance] = useState("");
    const [totalIncomeValue, setTotalIncomeValue] = useState("");
    const [totalExpenseValue, setTotalExpenseValue] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [category, setCategories] = useState("");
    const [transactions, setTransactions] = useState([]);

    const getBalance = async () => {
        try {
            const responseBalance = await fetchBalance();
            setBalance(responseBalance.balance);
        } catch (error) {
            console.error(error);
        }
    };

    const getFinancialStatement = async () => {
        try {
            const financialStatement = await fetchFinancialStatement();
            setTotalExpenseValue(financialStatement.totalExpenditure);
            setTotalIncomeValue(financialStatement.totalIncome);
        } catch (error) {
            console.error(error);
        }
    };
    const getTransactions = async () => {
        try {
            const allTransactions = await fetchTransactions();
            setTransactions([...allTransactions.content]);
        } catch (error) {
            console.log(error);
        }
    };

    const postTransactionsFiltered = async (startDate, endDate, category) => {
        try {
            const responseTransactions = await postTransactions(
                startDate,
                endDate,
                category
            );
            return responseTransactions;
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const user = localStorage.getItem("user");
        if (!user) {
            Navigate("/");
        }
        console.log("test");
        getBalance();
        getFinancialStatement();
        getTransactions();
        console.log({
            balance,
            totalIncomeValue,
            totalExpenseValue,
            transactions,
        });
    }, []);

    const handleFilterTransactions = async () => {
        const responseFilteredTrnsactions = await postTransactionsFiltered(
            startDate,
            endDate,
            category
        );
        setTransactions([...responseFilteredTrnsactions.content]);
    };

    const formatDate = (createdAt) => {
        const date = new Date(createdAt);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    return (
        <div className={styles.homepageContent}>
            <h1>MyWallet Homepage</h1>
            <h2>{balance ? balance : "Rp. 0;"}</h2><br/>
            <div className={styles.totalIncomeExpense}>
                <h3 className={styles.income}>
                    Total Income <br />
                    {totalIncomeValue ? totalIncomeValue : "Rp. 0;"}
                </h3>
                <h3 className={styles.expense}>
                    Total Expense <br />
                    {totalExpenseValue ? totalExpenseValue : "Rp. 0;"}
                </h3>
            </div>
            <div className={styles.filteringContent}>
                <h3>Transaction History</h3>
                <div className={styles.filteringSection}>
                    <label>Category:</label>
                    <select
                        id="category"
                        onChange={(e) => setCategories(e.target.value)}
                    >
                        <option value="">All</option>
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
                    <label>Start</label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                    <label>End</label>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                    <button
                        onClick={handleFilterTransactions}
                        className={styles.search}
                    >
                        Search
                    </button>
                </div>
            </div>
            <div className={styles.historyContent}>
                <ul className={styles.historyList}>
                    {transactions &&
                        transactions.map(
                            (
                                {
                                    amount,
                                    description,
                                    category,
                                    type,
                                    createdAt,
                                },
                                index
                            ) => (
                                <li key={index} className={styles.card}>
                                    <div className={styles.leftCard}>
                                        <strong>{description}</strong>
                                        <br />
                                        <small>
                                            Category :{" "}
                                            {category
                                                .replaceAll("_", " ")
                                                .toLowerCase()}{" "}
                                            <br />
                                            {formatDate(createdAt)}
                                        </small>{" "}
                                    </div>
                                    <div className={styles.rightCard}>
                                        <big>
                                            {amount} <br />
                                        </big>
                                        <small>
                                            Type : {type.toLowerCase()} <br />
                                        </small>
                                    </div>
                                </li>
                            )
                        )}
                </ul>
            </div>
        </div>
    );
};

export default Homepage;
