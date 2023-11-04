'use client';

import React, { useState, useEffect } from 'react';

export default function Home() {

  const [carPayment, setCarPayment] = useState(0);
  const handleCarPaymentChange = (e) => {
    setCarPayment(e.target.value);
  }
  const [studentLoan, setStudentLoan] = useState(0);
  const handleStudentLoanChange = (e) => {
    setStudentLoan(e.target.value);
  }

  const [mortgage, setMortgage] = useState(0);
  const handleMortgageChange = (e) => {
    setMortgage(e.target.value);
  }

  const [creditScore, setCreditScore] = useState(0);
  const handleCreditScoreChange = (e) => {
    setCreditScore(e.target.value);
  }

  const [income, setIncome] = useState(0);
  const handleIncomeChange = (e) => {
    setIncome(e.target.value);
  }

  const [cardPayment, setCardPayment] = useState(0);
  const handleCardPaymentChange = (e) => {
    setCardPayment(e.target.value);
  }

  const [homeValue, setHomeValue] = useState(0);
  const handleHomeValueChange = (e) => {
    setHomeValue(e.target.value);
  }

  const [downPayment, setDownPayment] = useState(0);
  const handleDownPaymentChange = (e) => {
    setDownPayment(e.target.value);
  }

  const [res, setRes] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("Loading: " + loading);
  }, [loading]);

  useEffect(() => {
    console.log("res: " + res);
  }, [res]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    console.log("Loading: " + loading)

    const loanAmount = homeValue - downPayment;
    const debt = Number(carPayment) + Number(studentLoan) + Number(cardPayment);
    const ltv = loanAmount / homeValue;
    const dti = (Number(mortgage) + debt) / income;
    const fedti = mortgage / income;

    const res = await fetch('/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ creditScore: creditScore, ltv: (ltv * 100).toFixed(2) + '%', dti: (dti * 100).toFixed(2) + '%', fedti: (fedti * 100).toFixed(2) + '%' }),
    });

    const resJson = await res.json();
    console.log(resJson.response.choices[0].message.contentson)

    setRes(resJson.response.choices[0].message.content)

    setLoading(false);
  }

  return (
    <main>
      <form className='flex flex-col gap-y-8 w-full'>
        <div className='flex flex-row'>
          <label htmlFor="email">Email: </label>
          <input type="email" name="email" /> <br />
        </div>

        <div>
          <label htmlFor="CarPayment">Monthly Car Payment: </label>
          <input type="number" value={carPayment} onChange={handleCarPaymentChange} name="CarPayment" className='border-2 focus:ring-indigo-500 ring-2 outline-0' /><br />
        </div>

        <div className='flex flex-row'>
          <label htmlFor="StudentLoan">Student Loan Payment: </label>
          <input type="number" value={studentLoan} onChange={handleStudentLoanChange} name="StudentLoan" /><br />
        </div>

        <div className='flex flex-row'>
          <label htmlFor="Mortgage">Est. Monthly Mortgage Payment: </label>
          <input type="number" value={mortgage} onChange={handleMortgageChange} name="Mortgage" /><br />
        </div>

        <div className='flex flex-row'>
          <label htmlFor="CreditScore">Credit Score: </label>
          <input type="number" value={creditScore} onChange={handleCreditScoreChange} name="CreditScore" /><br />
        </div>

        <div className='flex flex-row'>
          <label htmlFor="Income">Gross Monthly Income: </label>
          <input type="Number" value={income} onChange={handleIncomeChange} name="Income" /><br />
        </div>

        <div className='flex flex-row'>
          <label htmlFor="CreditCardPayment">Monthly Credit Card Payment: </label>
          <input type="number" value={cardPayment} onChange={handleCardPaymentChange} name="CreditCardPayment" /><br />
        </div>

        <div className='flex flex-row'>
          <label htmlFor="HomeAppraisedValue">Home Appraised Value: </label>
          <input type="number" value={homeValue} onChange={handleHomeValueChange} name="HomeAppraisedValue" /><br />
        </div>

        <div className='flex flex-row'>
          <label htmlFor="DownPayment">Down Payment Amount: </label>
          <input type="number" value={downPayment} onChange={handleDownPaymentChange} name="DownPayment" /><br />
        </div>

        <button type="submit" name="submit" onClick={handleSubmit}>Submit</button>
      </form>
      {loading ? <p>Loading...</p> : <p>{res}</p>}
    </main>
  )
}
