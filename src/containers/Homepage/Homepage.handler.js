import axios from "axios";

const fetchBalance = async () => {
    try {
        const data = JSON.parse(localStorage.getItem("user"))
        const response = await axios.get(`https://sensibly-destined-chigger.ngrok-free.app/balance`, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "ngrok-skip-browser-warning": "any value",
                'Authorization': `Bearer ${data.token}`,
            },
        });
        return response.data;
    } catch (error) {
        if (error.response.status == 401) {
            localStorage.removeItem("user")
        }
        console.error(error);
        throw new Error("Failed to fetch transactions");
    }
}

const fetchTransactions = async () => {
    try {
        const data = JSON.parse(localStorage.getItem("user"))
        const response = await axios.get(`https://sensibly-destined-chigger.ngrok-free.app/transactions`, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "ngrok-skip-browser-warning": "any value",
                'Authorization': `Bearer ${data.token}`,
            },
        });
        return response.data;
    } catch (error) {
        if (error.response.status == 401) {
            localStorage.removeItem("user")
        }
        console.error(error);
        throw new Error("Failed to fetch transactions");
    }
};

const fetchFinancialStatement = async () => {
    const data = JSON.parse(localStorage.getItem("user"))
    try {
        const response = await axios.get(`https://sensibly-destined-chigger.ngrok-free.app/financial-statements`
            , {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "ngrok-skip-browser-warning": "any value",
                    'Authorization': `Bearer ${data.token}`,
                },
            });
        return response.data;
    } catch (error) {
        if (error.response.status == 401) {
            localStorage.removeItem("user")
        }
        console.error(error);
        throw new Error("Failed to add expense");
    }
}

const postTransactions = async (startDate, endDate, category) => {
    const data = JSON.parse(localStorage.getItem("user"))
    try {
        const response = await axios.get(`https://sensibly-destined-chigger.ngrok-free.app/transactions?start_date=${startDate}&end_date=${endDate}&category=${category}`
            , {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "ngrok-skip-browser-warning": "any value",
                    'Authorization': `Bearer ${data.token}`,
                },
            });
        return response.data;
    } catch (error) {
        if (error.response.status == 401) {
            localStorage.removeItem("user")
        }
        console.error(error);
        throw new Error("Failed to add expense");
    }
}

export { fetchTransactions, fetchFinancialStatement, postTransactions, fetchBalance };
