import React, { useState, useEffect } from "react";
import Transaction from "./Transaction";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);

  const [newTransaction, setNewTransaction] = useState({
    id: "",
    date: "",
    category: "",
    amount: 0,
    description: "",
  });

  useEffect(() => {
    const storedTransactions = localStorage.getItem("transactions");
    if (storedTransactions) {
      const parsedTransactions = JSON.parse(storedTransactions);
      setTransactions(parsedTransactions);
    }
  }, []);
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTransaction({ ...newTransaction, [name]: value });
  };

  const addTransaction = () => {
    if (
      !newTransaction.date ||
      !newTransaction.category ||
      !newTransaction.amount ||
      !newTransaction.description
    ) {
      alert("Please fill in all fields");
      return;
    }
    setTransactions((prevTransactions) => {
        const updatedTransactions = [
          ...prevTransactions,
          { ...newTransaction, id: Date.now(), description: newTransaction.description },
        ];
        localStorage.setItem("transactions", JSON.stringify(updatedTransactions));
        return updatedTransactions;
      });
    setNewTransaction({ id: "", date: "", category: "", amount: 0, description: "" });
  };

  const deleteTransaction = (id) => {
    const updatedTransactions = transactions.filter((t) => t.id !== id);
    setTransactions(updatedTransactions);
  };

  const summarizeByDate = () => {
    const summary = transactions.reduce((acc, transaction) => {
      const date = transaction.date;
      if (!acc[date]) {
        acc[date] = Number(transaction.amount);
      } else {
        acc[date] += Number(transaction.amount);
      }
      return acc;
    }, {});
    console.log("Summary by date:", summary);
  };

  const summarizeByMonth = () => {
    const summary = transactions.reduce((acc, transaction) => {
      const month = transaction.date.slice(0, 7); // "YYYY-MM"
      if (!acc[month]) {
        acc[month] = Number(transaction.amount);
      } else {
        acc[month] += Number(transaction.amount);
      }
      return acc;
    }, {});
    console.log("Summary by month:", summary);
  };

  const summarizeByYear = () => {
    const summary = transactions.reduce((acc, transaction) => {
      const year = transaction.date.slice(0, 4); // "YYYY"
      if (!acc[year]) {
        acc[year] = Number(transaction.amount);
      } else {
        acc[year] += Number(transaction.amount);
      }
      return acc;
    }, {});
    console.log("Summary by year:", summary);
  };

  const summarizeByCategory = () => {
    const summary = transactions.reduce((acc, transaction) => {
      const category = transaction.category;
      if (!acc[category]) {
        acc[category] = Number(transaction.amount);
      } else {
        acc[category] += Number(transaction.amount);
      }
      return acc;
    }, {});
    console.log("Summary by category:", summary);
  };
  
  return (
    <div>
      <h1>Transactions</h1>
      <input
        name="date"
        type="date"
        value={newTransaction.date}
        onChange={handleInputChange}
      />
      <input
        name="category"
        type="text"
        value={newTransaction.category}
        onChange={handleInputChange}
      />
      <input
        name="amount"
        type="number"
        value={newTransaction.amount}
        onChange={handleInputChange}
      />
      <input
        name="description"
        type="text"
        value={newTransaction.description}
        onChange={handleInputChange}
      />
      <button onClick={addTransaction}>Add Transaction</button>
      <br></br>
      <div>
        <br></br>
        <button onClick={summarizeByDate}>Summary by date</button>
        <button onClick={summarizeByMonth}>Summary by month</button>
        <button onClick={summarizeByYear}>Summary by year</button>
        <button onClick={summarizeByCategory}>Summary by category</button>
        <br></br>
        <br></br>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Description</th>
              <th>Operation</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <Transaction
                key={transaction.id}
                transaction={transaction}
                onDelete={deleteTransaction}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transactions;
