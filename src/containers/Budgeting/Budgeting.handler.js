import axios from "axios";

const fetchCategories = async () => {
    try {
        const data = JSON.parse(localStorage.getItem("user"))
        const response = await axios.get(`https://sensibly-destined-chigger.ngrok-free.app/budgets/${category}`, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "ngrok-skip-browser-warning": "any value",
                'Authorization': `Bearer ${data.token}`,
            },
        });
        return response.data.category;
    } catch (error) {
        if (error.response.status == 401) {
            localStorage.removeItem("user")
        }
        console.error(error);
        throw new Error("Failed to fetch categories");
    }
};

const fetchBudgets = async (categories) => {
    try {
        const data = JSON.parse(localStorage.getItem("user"))
        const response = await axios.get(`https://sensibly-destined-chigger.ngrok-free.app/budgets/${categories}`, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "ngrok-skip-browser-warning": "any value",
                'Authorization': `Bearer ${data.token}`,
            },
        });
        console.log(response.data)
        return response.data;
    } catch (error) {
        if (error.response.status == 401) {
            localStorage.removeItem("user")
        }
        console.error(error);
        throw new Error("Failed to fetch budgets");
    }
};

const saveBudget = async (category, amount) => {
    try {
        const data = JSON.parse(localStorage.getItem("user"))
        const budget = await axios.post("https://sensibly-destined-chigger.ngrok-free.app/budgets", { category, amount }, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "ngrok-skip-browser-warning": "any value",
                'Authorization': `Bearer ${data.token}`,
            },
        });
        return budget.data
    } catch (error) {
        if (error.response.status == 401) {
            localStorage.removeItem("user")
        }
        console.error(error);
        throw new Error("Failed to save budget");
    }
};

const updateBudget = async (category, amount, id) => {
    try {
        const data = JSON.parse(localStorage.getItem("user"))
        const budget = await axios.patch(`https://sensibly-destined-chigger.ngrok-free.app/budgets/${id}`, { category, amount }, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "ngrok-skip-browser-warning": "any value",
                'Authorization': `Bearer ${data.token}`,
            },
        });
        return budget.data
    } catch (error) {
        if (error.response.status == 401) {
            localStorage.removeItem("user")
        }
        console.error(error);
        throw new Error("Failed to save budget");
    }
}

const getList = async () => {
    try {
        const data = JSON.parse(localStorage.getItem("user"))
        const response = await axios.get(`https://sensibly-destined-chigger.ngrok-free.app/budgets`, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "ngrok-skip-browser-warning": "any value",
                'Authorization': `Bearer ${data.token}`,
            },
        });
        console.log("get all", response.data)
        return response.data;
    } catch (error) {
        if (error.response.status == 401) {
            localStorage.removeItem("user")
        }
        console.error(error);
        throw new Error("Failed to fetch budgetsList");
    }
};


export { fetchCategories, fetchBudgets, saveBudget, updateBudget, getList };
