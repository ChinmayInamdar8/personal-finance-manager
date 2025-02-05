import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
  } from "chart.js";
  import { useEffect, useState } from "react";
  import { Pie } from "react-chartjs-2";
  import axios from "axios";
  
  // Register Chart.js components
  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);
  
  // Set default chart color
  ChartJS.defaults.color = "#ffffff";
  
  // Define API response structure
  interface IncomeData {
    salary: number;
    stocks: number;
    bank_interest: number;
    bitcoion: number; // Verify if this is a typo
  }
  
  interface ExpenseData {
    electricity_bill: number;
    food_and_breverage: number;
    grocery: number;
    home_rent: number;
    investment: number;
    loan: number;
    mobile_internet: number;
    others: number;
    services: number;
  }
  
  interface TotalsResponse {
    totals: {
      income: IncomeData;
      expense: ExpenseData;
    };
  }
  
  export function DashboardChart() {
    const [income, setIncome] = useState<IncomeData | null>(null);
    const [expense, setExpense] = useState<ExpenseData | null>(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      async function fetchFinanceData() {
        try {
          const response = await axios.get<TotalsResponse>("http://localhost:3000/api/finance/total", {
            headers: {
              authorization: `Bearer ${window.localStorage.getItem("token")}`,
            },
          });
  
          console.log("Fetched Data:", response.data);
          if (response.data?.totals?.income) {
            setIncome(response.data.totals.income);
          }
          if (response.data?.totals?.expense) {
            setExpense(response.data.totals.expense);
          }
        } catch (error) {
          console.error("Error fetching financial data:", error);
        } finally {
          setLoading(false);
        }
      }
      fetchFinanceData();
    }, []);
  
    // Handle loading state
    if (loading) return <p>Loading financial data...</p>;
  
    // If no data, show a message
    if (!income && !expense) return <p>No financial data available.</p>;
  
    // Prepare Pie Chart Data for Income
    const incomeLabels = income ? Object.keys(income) : [];
    const incomeValues = income ? Object.values(income) : [];
    const incomeChartData = {
      labels: incomeLabels,
      datasets: [
        {
          label: "Income Distribution",
          data: incomeValues,
          backgroundColor: [
            "#FF6384", // Salary
            "#36A2EB", // Stocks
            "#FFCE56", // Bank Interest
            "#4BC0C0", // Bitcoin
          ],
          borderWidth: 1,
        },
      ],
    };
  
    // Prepare Pie Chart Data for Expense
    const expenseLabels = expense ? Object.keys(expense) : [];
    const expenseValues = expense ? Object.values(expense) : [];
    const expenseChartData = {
      labels: expenseLabels,
      datasets: [
        {
          label: "Expense Distribution",
          data: expenseValues,
          backgroundColor: [
            "#FF4500", // Electricity Bill
            "#FFD700", // Food & Beverage
            "#7FFF00", // Grocery
            "#4682B4", // Home Rent
            "#8A2BE2", // Investment
            "#FF69B4", // Loan
            "#00CED1", // Mobile & Internet
            "#D2691E", // Others
            "#708090", // Services
          ],
          borderWidth: 1,
        },
      ],
    };
  
    return (
      <div className="h-full w-full flex flex-col items-center gap-10">
        {/* Income Chart */}
        <div className="bg-slate-700 w-5/6 h-96 rounded-md shadow-lg opacity-80 flex justify-center">
          {income ? <Pie data={incomeChartData} /> : <p>No income data available</p>}
        </div>
  
        {/* Expense Chart */}
        <div className="bg-slate-700 w-5/6 h-96 rounded-md shadow-lg opacity-80 flex justify-center">
          {expense ? <Pie data={expenseChartData} /> : <p>No expense data available</p>}
        </div>
      </div>
    );
  }
  