import React, { useEffect, useState } from "react";
import IDataList from "../model/IDataList";
import { getDataFromServer } from "../service/menu";
import ExpenseTracker from "./ExpenseTracker";

const ShowData = () => {
    // Create state and local variable
    const [items, setItems] = useState<IDataList[]>([]);
    const [error, setError] = useState<Error | null>(null);
    const [sum, setSum] = useState<number | null>(0);
    const [rahulSpent, setRahulSpent] = useState<number>(0);
    const [rameshSpent, setRameshSpent] = useState<number>(0);
    const [showForm, setShowForm] = useState<boolean>(false);

    let rahulSpent1: number = 0;
    let rameshSpent1: number = 0;

    const shares = (data: IDataList[]) => {
        data.map((exp) => (exp.payeeName === "Rahul" ? (rahulSpent1 += exp.price) : (rameshSpent1 += exp.price)));
        setRahulSpent(rahulSpent1);
        setRameshSpent(rameshSpent1);
    }

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const data = await getDataFromServer();
                setItems(data);
                setSum(data.reduce((result, v) => (result + v.price), 0))
                shares(data);
            } catch (error) {
                setError(error as Error);
            }
        }

        fetchMenu();
    }, [showForm]);

    return (
        <>
            <header id="page-header">Expense Tracker</header>
            <button id="Add-Button" onClick={() => { setShowForm(true) }}>Add</button>
            {
                showForm && (
                    <div>
                        <ExpenseTracker onTrue={() => setShowForm(false)} onClose={() => setShowForm(false)} />
                    </div>
                )
            }
            <>
                <div className="use-inline date header-color">Date</div>
                <div className="use-inline header-color">Product Purchased</div>
                <div className="use-inline price header-color">Price</div>
                <div className="use-inline header-color" style={{ width: 112 }}>Payee Name</div>
            </>
            {
                items && items.map((user, idx) => (
                    <div key={user.id}>
                        <div className="use-inline date">{user.setDate}</div>
                        <div className="use-inline">{user.product}</div>
                        <div className="use-inline price">{user.price}</div>
                        <div className="use-inline">{user.payeeName}</div>
                    </div>
                ))
            }
            <hr />
            <div className="use-inline">Total: </div>
            <span className="use-inline total">{sum}</span><br />

            <div className="use-inline">Rahul Paid: </div>
            <span className="use-inline total Rahul">{rahulSpent}</span><br />

            <div className="use-inline">Ramesh Paid: </div>
            <span className="use-inline total Ramesh">{rameshSpent}</span><br />

            <div className="use-inline payable">
                {rahulSpent > rameshSpent ? "Pay Rahul" : "Pay Ramesh"}
            </div>
            <span className="use-inline payable price">
                {Math.abs(rahulSpent - rameshSpent) / 2}
            </span><br />

            {error && <>{error?.message}</>}
        </>
    );
};

export default ShowData;