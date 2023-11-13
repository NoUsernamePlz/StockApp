


import React, { useState, useEffect } from 'react';
import * as echarts from 'echarts';

const StockGraph = ({ stockSymbol }) => {
  const chartId = 'stockchart';
  const [stockData, setStockData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStock = async () => {
      try {
        const API_KEY = "2a992fbe7a524fc88ca9d49cbd9ff123";
        // const API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stockSymbol}&outputsize=full&apikey=${API_KEY}`; premium
        const API_Call = `https://api.twelvedata.com/time_series?symbol=${stockSymbol}&interval=1day&apikey=${API_KEY}&source=docs&outputsize=3000`;
        const response = await fetch(API_Call);
        const data = await response.json();
        console.log(data.values);

 
        setStockData(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchStock();
  }, [stockSymbol]); 



  //for premium one's formating
//   const formatDataForECharts = () => {
//     const categoryData = [];
//     const valueData = [];

//     if (stockData) {
//       for (const date in stockData) {
//         categoryData.push(date);
//         valueData.push(stockData[date]['4. close']); // Assuming '4. close' is the closing price
//       }
//     }

//     return {
//       categoryData: categoryData,
//       valueData: valueData,
//     };
//   };

console.log(stockData);

const formatDataForECharts = () => {
    const categoryData = [];
    const valueData = [];
  
    if (stockData && stockData.values) {
      for (const dataPoint of stockData.values) {
 
        categoryData.push(new Date(dataPoint.datetime).toISOString().split('T')[0]);
  
        
        valueData.push(parseFloat(dataPoint.close)); 
      }
    }
  
    return {
      categoryData: categoryData,
      valueData: valueData,
    };
  };
  

  const data = formatDataForECharts();
  console.log(data);

  useEffect(() => {
    const chartElement = document.getElementById(chartId);

    if (chartElement && data.categoryData.length > 0) {
      const chart = echarts.init(chartElement);
      console.log(data);

      const option = {
        title: {
          text: `${stockSymbol} Stock Data`,
          left: 5,
        },
        toolbox: {
          feature: {
            dataZoom: {
              yAxisIndex: false,
            },
            saveAsImage: {
              pixelRatio: 2,
            },
          },
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        grid: {
          bottom: 90,
        },
        dataZoom: [
            {
              type: 'inside',
              show: true,
              start: 0,
              end: 100,
              backgroundColor: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: '#E323FF', // color at 0%
                  },
                  {
                    offset: 1,
                    color: '#7517F8', // color at 100%
                  },
                   ],
                global: false, // default is false
              },
            },
            {
              type: 'slider',
              show: true,
              start: 0,
              end: 100,
              backgroundColor: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: '#E323FF', // color at 0%
                  },
                  { offset: 1,
                    color: '#7517F8', // color at 100%
                  },
                ],
                global: false, // default is false
              },
            },
          ],
        xAxis: {
          data: data.categoryData,
          silent: false,
          splitLine: {
            show: false,
          },
          splitArea: {
            show: false,
          },
        },
        yAxis: {
          splitArea: {
            show: false,
          },
        },
        series: [
          {
            type: 'bar',
            data: data.valueData,
            large: true,
            itemStyle:{
                color:{
      type: 'linear',
      x: 0,
      y: 0,
      x2: 0,
      y2: 1,
      colorStops: [{
          offset: 0, color: '#E323FF' // color at 0%
      }, {
          offset: 1, color: '#7517F8' // color at 100%
      }],
      global: false // default is false
    },
  
}
          },
        ],
      };

      const handleResize = () => {
        chart.resize();
      };

      window.addEventListener('resize', handleResize);
      chart.setOption(option);

      return () => {
        window.removeEventListener('resize', handleResize);
        chart.dispose();
      };
    }
  }, [data, chartId]);

  return (
    <div className='h-[90vh] w-full flex justify-center items-center bg-[#05050f] xs:max-lg:mt-[20vh]'>
      <div id={chartId} style={{ height: '90%', width: '90%' }} />
    </div>
  );
};

export default StockGraph;
