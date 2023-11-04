'use client';

import React from 'react';
export default function Home() {

  const [carPayment, setCarPayment] = React.useState();
  const handleCarPaymentChange = (e) => {
    setCarPayment(e.target.value);
  }
  const [studentLoan, setStudentLoan] = React.useState();
  const handleStudentLoanChange = (e) => {
    setStudentLoan(e.target.value);
  }

  const [mortgage, setMortgage] = React.useState();
  const handleMortgageChange = (e) => {
    setMortgage(e.target.value);
  }

  const [creditScore, setCreditScore] = React.useState();
  const handleCreditScoreChange = (e) => {
    setCreditScore(e.target.value);
  }

  const [income, setIncome] = React.useState();
  const handleIncomeChange = (e) => {
    setIncome(e.target.value);
  }

  const [cardPayment, setCardPayment] = React.useState();
  const handleCardPaymentChange = (e) => {
    setCardPayment(e.target.value);
  }

  const [homeValue, setHomeValue] = React.useState();
  const handleHomeValueChange = (e) => {
    setHomeValue(e.target.value);
  }

  const [downPayment, setDownPayment] = React.useState();
  const handleDownPaymentChange = (e) => {
    setDownPayment(e.target.value);
  }

  return (
    <main>
      <form>
        <label htmlFor="email">Email: </label>
        <input type="email" name="email"/> <br/>

        <label htmlFor="CarPayment">Monthly Car Payment: </label>
        <input type="number" value = {carPayment} onChange={handleCarPaymentChange} name="CarPayment"/><br/>

        <label htmlFor="StudentLoan">Student Loan Payment: </label>
        <input type="number" value={studentLoan} onChange={handleStudentLoanChange} name="StudentLoan"/><br/>

        <label htmlFor="Mortgage">Est. Monthly Mortgage Payment: </label>
        <input type="number" value={mortgage} onChange={handleMortgageChange} name="Mortgage"/><br/>

        <label htmlFor="CreditScore">Credit Score: </label>
        <input type="number" value={creditScore} onChange={handleCreditScoreChange} name="CreditScore"/><br/>

        <label htmlFor="Income">Gross Monthly Income: </label>
        <input type="Number" value={income} onChange={handleIncomeChange} name="Income"/><br/>

        <label htmlFor="CreditCardPayment">Monthly Credit Card Payment: </label>
        <input type="number" value={cardPayment} onChange={handleCardPaymentChange} name="CreditCardPayment"/><br/>

        <label htmlFor="HomeAppraisedValue">Home Appraised Value: </label>
        <input type="number" value={homeValue} onChange={handleHomeValueChange} name="HomeAppraisedValue"/><br/>

        <label htmlFor="DownPayment">Down Payment Amount: </label>
        <input type="number" value={downPayment} onChange={handleDownPaymentChange} name="DownPayment"/><br/>

        <input type="submit" name="submit"/>
      </form>
    </main>
  )
}
