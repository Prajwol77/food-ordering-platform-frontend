import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const initialData = {
  labels: ["Momo", "Cheese Pizza"],
  datasets: [
    {
      label: "Most Sold",
      data: [300, 50],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
      ],
      borderWidth: 2,
    },
  ],
};

const PieChart = () => {

  return (
    <>
      <Pie data={initialData} />
    </>
  );
};

export default PieChart;
