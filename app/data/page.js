'use client';
import React, { use, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import data from '/public/data.json'

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Data() {
    const formattedData1 = {
        labels: ['Qualified', 'Did not Qualify'],
        datasets: [{
            label: 'Number of People',
            data: [0,0],
            backgroundColor:[
                'rgba(0, 255, 0, 0.2)',
                'rgba(255, 0, 0, 0.2)',
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
            formattedData1.datasets[0].data[0]++;
        }
        else {
            formattedData1.datasets[0].data[1]++;
        }
    }
  return (
    <main>
          <Doughnut data={formattedData1}></Doughnut>
    </main>
  )
}
