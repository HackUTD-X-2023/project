'use client';

import data from '/public/data.json'
import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title} from "chart.js";
import { Doughnut, Bar } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

ChartJS.defaults.borderColor = '#555555';
ChartJS.defaults.color = '#FFFFFF';

export const options = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: "Why didn't I qualify?",
    },
  },
};

export const options2 = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: "Approval Rate",
    },
  },
};

const formattedDataSuccess = {
  labels: ['Qualified', 'Did not Qualify'],
  datasets: [{
      label: 'Number of People',
      data: [0,0],
      backgroundColor:[
          'rgba(0, 255, 0, 0.4)',
          'rgba(255, 0, 0, 0.4)',
        ],
        borderColor:[
          'rgba(0, 255, 0, 1)',
          'rgba(255, 0, 0, 1)',
        ],
        borderwidth: 1,
      },
  ],
};
for(var i = 0; i < 10000; i++) {
  if(data[i].Success === 1) {
      formattedDataSuccess.datasets[0].data[0]++;
  }
  else {
      formattedDataSuccess.datasets[0].data[1]++;
  }
}
const formattedDataLossReasons = {
  labels: ['Credit Score', 'LTV (Loan to Value Ratio)', 'DTI (Debt-to-Income Ratio)', 'FEDTI (Front-end Debt-to-Income Ratio)'],
  datasets: [{
      label: 'Percentage of people',
      data: [0,0,0,0],
      backgroundColor: 'rgba(60, 180, 240, 0.9)',
      },
  ],
};
var numFails = 0;
var nums = [0,0,0,0];
for(var i = 0; i < 10000; i++) {
  if(data[i].Success === 0) {
      numFails++;
      if(data[i].CreditBool === 0) nums[0]++;
      if(data[i].LTVBool === 0) nums[1]++;
      if(data[i].DTIBool === 0) nums[2]++;
      if(data[i].FEDTIBool === 0) nums[3]++;
  }
}
for(var i = 0; i < 4; i++)
  formattedDataLossReasons.datasets[0].data[i] = nums[i]/numFails * 100;

export default function Home() {

  const [carPayment, setCarPayment] = useState();
  const handleCarPaymentChange = (e) => {
    setCarPayment(e.target.value);
  }
  const [studentLoan, setStudentLoan] = useState();
  const handleStudentLoanChange = (e) => {
    setStudentLoan(e.target.value);
  }

  const [mortgage, setMortgage] = useState();
  const handleMortgageChange = (e) => {
    setMortgage(e.target.value);
  }

  const [creditScore, setCreditScore] = useState();
  const handleCreditScoreChange = (e) => {
    setCreditScore(e.target.value);
  }

  const [income, setIncome] = useState();
  const handleIncomeChange = (e) => {
    setIncome(e.target.value);
  }

  const [cardPayment, setCardPayment] = useState();
  const handleCardPaymentChange = (e) => {
    setCardPayment(e.target.value);
  }

  const [homeValue, setHomeValue] = useState();
  const handleHomeValueChange = (e) => {
    setHomeValue(e.target.value);
  }

  const [downPayment, setDownPayment] = useState();
  const handleDownPaymentChange = (e) => {
    setDownPayment(e.target.value);
  }

  const [res, setRes] = useState('');
  const [loading, setLoading] = useState(false);
  const [subbed, setSubbed] = useState(false);
  const [inputPage, setPageState] = useState(true);
  const handleChartChange = (e) => {
    setPageState(false);
  }
  const handleFormChange = (e) => {
    setPageState(true);
  }

  useEffect(() => {
    console.log("Loading: " + loading);
  }, [loading]);

  useEffect(() => {
    console.log("res: " + res);
  }, [res]);

  const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubbed(true);
    setLoading(true);

    if(inputPage)
      document.getElementById("goated").scrollIntoView({ block: 'end',  behavior: 'smooth' });

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
    setRes(resJson.response.choices[0].message.content)

    // setRes("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit aliquam etiam erat velit scelerisque in dictum. Tincidunt praesent semper feugiat nibh sed pulvinar proin gravida. Sed tempus urna et pharetra pharetra massa. Interdum consectetur libero id faucibus nisl tincidunt eget. Nulla at volutpat diam ut. Mauris sit amet massa vitae tortor condimentum lacinia quis. Vel eros donec ac odio tempor orci dapibus ultrices in. Est ante in nibh mauris. Quam pellentesque nec nam aliquam sem et. Odio pellentesque diam volutpat commodo sed egestas egestas fringilla. Fames ac turpis egestas sed tempus. Nisl nunc mi ipsum faucibus vitae aliquet nec. Condimentum mattis pellentesque id nibh tortor id aliquet lectus proin. Diam phasellus vestibulum lorem sed risus. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit aliquam etiam erat velit scelerisque in dictum. Tincidunt praesent semper feugiat nibh sed pulvinar proin gravida. Sed tempus urna et pharetra pharetra massa. Interdum consectetur libero id faucibus nisl tincidunt eget. Nulla at volutpat diam ut. Mauris sit amet massa vitae tortor condimentum lacinia quis. Vel eros donec ac odio tempor orci dapibus ultrices in. Est ante in nibh mauris. Quam pellentesque nec nam aliquam sem et. Odio pellentesque diam volutpat commodo sed egestas egestas fringilla. Fames ac turpis egestas sed tempus. Nisl nunc mi ipsum faucibus vitae aliquet nec. Condimentum mattis pellentesque id nibh tortor id aliquet lectus proin. Diam phasellus vestibulum lorem sed risus.")

    setLoading(false);
    if(inputPage)
      document.getElementById("goated").scrollIntoView({ block: 'end',  behavior: 'smooth' });
  }

  const inputComp = [<div className="bg-gradient-to-r from-gray-700 to-gray-700 relative mt-24 w-1/2 py-10 px-2 rounded-3xl">
  <form className='flex flex-row justify-center gap-8'>
    <div class="flex-col">

    <div className='flex flex-col gap-x-3'>
      <label htmlFor="CarPayment">Monthly Car Payment: </label>
      <input type="number" value={carPayment} onChange={handleCarPaymentChange} name="CarPayment" className='input-field' /><br />
    </div>

    <div className='flex flex-col gap-x-3'>
      <label htmlFor="StudentLoan">Student Loan Payment: </label>
      <input type="number" value={studentLoan} onChange={handleStudentLoanChange} name="StudentLoan" class="input-field"/><br />
    </div>

    <div className='flex flex-col gap-x-3'>
      <label htmlFor="Mortgage">Est. Monthly Mortgage Payment: </label>
      <input type="number" value={mortgage} onChange={handleMortgageChange} name="Mortgage" class="input-field"/><br />
    </div>

    <div className='flex flex-col gap-x-3'>
      <label htmlFor="CreditScore">Credit Score: </label>
      <input type="number" value={creditScore} onChange={handleCreditScoreChange} name="CreditScore" className='input-field' /><br />
    </div>

    </div>

    <div class="flex-col">

    <div className='flex flex-col gap-x-3'>
      <label htmlFor="Income">Gross Monthly Income: </label>
      <input type="Number" value={income} onChange={handleIncomeChange} name="Income" className='input-field' /><br />
    </div>
    

    <div className='flex flex-col gap-x-3'>
      <label htmlFor="CreditCardPayment">Monthly Credit Card Payment: </label>
      <input type="number" value={cardPayment} onChange={handleCardPaymentChange} name="CreditCardPayment" className='input-field' /><br />
    </div>

    <div className='flex flex-col gap-x-3'>
      <label htmlFor="HomeAppraisedValue">Home Appraised Value: </label>
      <input type="number" value={homeValue} onChange={handleHomeValueChange} name="HomeAppraisedValue" className='input-field' /><br />
    </div>

    <div className='flex flex-col gap-x-3'>
      <label htmlFor="DownPayment">Down Payment Amount: </label>
      <input type="number" value={downPayment} onChange={handleDownPaymentChange} name="DownPayment" className='input-field' /><br />
    </div>
    </div>
  </form>
  <div className='flex flex-row justify-center'>
        <button className="rounded-2xl mt-6 text-xl text-white bg-sky-400 h-16 w-64 hover:bg-sky-500 transition duration-150 focus:ring focus:ring-sky-300" type="submit" name="submit" onClick={handleSubmit}>Submit</button>
      </div>
</div>,

(subbed ? <div className='bg-gradient-to-r from-gray-700 to-gray-700 relative mt-2 w-5/6 text-center py-4 px-2 rounded-3xl text-white m-4 whitespace-pre-wrap center-content'>
  {loading ? <div className='flex flex-row justify-center'>
    <svg aria-hidden="true" className="w-20 h-20 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
  <span class="sr-only">Loading...</span>
  </div>
  : <p className='h-[50rem] whitespace-normal text-xl'>{res}</p>}
  </div>
: <div></div>)]

const chartPage = [
<div className='grid grid-cols-2 bg-gradient-to-r from-gray-700 to-gray-700 relative mt-24 mb-16 w-2/3 text-center py-6 px-2 rounded-3xl text-white w-screen m-8 whitespace-pre-wrap center-content'>
<div className='width-30'>
<Doughnut options={options2} data={formattedDataSuccess}></Doughnut>
</div>
<div className='w-38 justify-center align-center'>
<Bar options={options} data={formattedDataLossReasons} />
</div>
</div>]

  const heightStyle = res == '' ? "h-screen" : "h-full"

  return (
    <main id="goated" className={`bg-[url('/cover2.jpg')] items-center flex flex-col w-screen ${heightStyle} gap-y-16`}>
      <div class="grid grid-cols-2 fixed top-8 bg-gray-800 w-[15rem] h-12 rounded-xl flex-row place-content-evenly z-20 opacity-90">
        { inputPage ? <div className="nav-color absolute w-[6rem] rounded-lg h-[2rem] bg-sky-400 z-10 self-center ml-3"></div>
        : <div className="nav-color absolute w-[6rem] rounded-lg h-[2rem] bg-sky-400 z-10 self-center mr-3 justify-self-end"></div>
        }
        <button className="nav-button text-sky-100 z-20" name="input" onClick={handleFormChange}>Input</button>
        <button className="nav-button text-sky-100 z-20" name="data" onClick={handleChartChange}>Charts</button>
      </div>

      { inputPage ?  inputComp
      : chartPage
    }
    </main>
  )
}

/*
export default function nav(){
  return(
    <>
    <div className="static bg-[url('/cover2.jpg')]"></div>
    <div className="fixed flex flex-row justify-start ml-6 h-screen">
    <div className="fixed flex w-[16rem] flex-col justify-center h-screen ml-6">
      <div className="bg-slate-400 h-[24rem] rounded-3xl flex flex-col justify-evenly">
        <button className="nav-button text-black" name="input">Input</button>
        <button className="nav-button" name="results">Results</button>
        <button className="nav-button" name="data">Data</button>
      </div>
    </div>
    <div className="rounded-[24] flex flex-row justify-center w-5/6 h-5/6"></div>
    <div className="flex">
      <Home class="result"></Home>
    </div>
    </div>
    </>
  )
}*/