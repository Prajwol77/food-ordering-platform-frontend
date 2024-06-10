import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useEffect } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

const initialData = {
  labels: ["Momo", "Cheese Pizza"],
  datasets: [
    {
      label: "Food Sold",
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

const options = {
  plugins: {
    tooltip: {
      callbacks: {
        label: function (context: any) {
          let label = context.label;
          if (context.label === "Momo") {
            label = "Food";
          } else if (context.label === "Cheese Pizza") {
            label = "Sold";
          }
          return `${label}: ${context.raw}`;
        },
      },
    },
  },
};

const PieChart = ({
  titles,
  count,
  label,
}: {
  titles?: string[];
  count?: number[];
  label?: string;
}) => {
  useEffect(() => {
    if (titles && titles.length > 0) {
      initialData.labels = titles;
    }
    if (count && count.length > 0) {
      initialData.datasets[0].data = count;
    }
    if (label) {
      
      initialData.datasets[0].label = label;
    }

  }, [titles]);

  return (
    <>
      <Pie data={initialData} options={options}/>
    </>
  );
};

export default PieChart;
