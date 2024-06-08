import { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import PieChart from "./PieChart";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type GraphDataType = {
  labels: string[];
  datasets: [GraphDataSetsType];
};

type GraphDataSetsType = {
  label: string;
  backgroundColor: string;
  borderColor: string;
  data: number[];
};

const initialData: GraphDataType = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "My First dataset",
      backgroundColor: "rgba(75,192,192,0.2)",
      borderColor: "rgba(75,192,192,1)",
      data: [65, 59, 80, 81, 56, 55, 40],
    },
  ],
};

const Graph = () => {
  const [chartData, setChartData] = useState<GraphDataType>(initialData);

  const updateData = (newData: GraphDataType) => {
    setChartData(newData);
  };

  const handleFirstDataset = () => {
    updateData({
      labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      datasets: [
        {
          label: "Monthly Sales",
          backgroundColor: "rgba(75,192,192,0.2)",
          borderColor: "rgba(75,192,192,1)",
          data: [65, 59, 80, 81, 56, 55, 40],
        },
      ],
    });
  };

  const handleSecondDataset = () => {
    updateData({
      labels: ["2020", "2021", "2022", "2023", "2024"],
      datasets: [
        {
          label: "Yearly Sales",
          backgroundColor: "rgba(153,102,255,0.2)",
          borderColor: "rgba(153,102,255,1)",
          data: [45, 67, 78, 88, 99],
        },
      ],
    });
  };

  return (
    <>
      <div>
        <button onClick={handleFirstDataset} className="bg-gray-400">
          Show First Dataset
        </button>
        <button onClick={handleSecondDataset} className="bg-gray-500">
          Show Second Dataset
        </button>
      </div>
      <div className="h-[22rem] flex justify-between">
        <Line data={chartData} />
        <PieChart/>
      </div>
    </>
  );
};

export default Graph;
