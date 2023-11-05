'use client';
import React, { use, useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title} from "chart.js";
import { Doughnut, Bar } from "react-chartjs-2";
import data from '/public/data.json'

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

ChartJS.defaults.borderColor = '#555555';
ChartJS.defaults.color = '#FFFFFF';

export const options = {
    responsive: true,
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

export default function Data() {
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
    console.log(formattedDataLossReasons.datasets);
  return (
    <main>
        <div className="bg-black opacity-90">
          <Doughnut data={formattedDataSuccess}></Doughnut>
          <Bar options={options} data={formattedDataLossReasons} />
        </div>
    </main>
  )
}
