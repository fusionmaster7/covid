const clickHandler = () => {
  document.getElementsByClassName("db-search")[0].style.display = "block";
};
console.log("Graphs here");

const backgroundColor = Array(32).fill("#fa5dbb");
Chart.defaults.global.defaultFamily = "Lato";
Chart.defaults.global.defaultColor = "red";

const renderBarGraph = (states, stateData) => {
  let ctx = document.getElementById("bar-chart").getContext("2d");
  let myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: [...states],
      datasets: [
        {
          label: "# of Active Cases",
          data: [...stateData],
          backgroundColor: backgroundColor,
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
      maintainAspectRatio: false,
    },
  });
};

const renderPieChart = (label, dataset) => {
  let ctx = document.getElementById("pie-chart").getContext("2d");
  let myChart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: [...label],
      datasets: [
        {
          data: [...dataset],
          backgroundColor: ["#040d5a", " #fa5dbb", "#fdee6a"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
    },
  });
};

const getBarData = async () => {
  const res = await axios.get(
    "https://api.covid19india.org/v2/state_district_wise.json"
  );
  let states = [];
  let stateData = [];
  res.data.forEach((newState) => {
    states.push(newState.state);
    let totalCases = 0;
    newState.districtData.forEach((district) => {
      totalCases +=
        district.active +
        district.recovered +
        district.confirmed +
        district.deceased;
    });
    stateData.push(totalCases);
  });
  renderBarGraph(states, stateData);
};
(async () => {
  await getBarData();
})();

const getPieData = async () => {
  const res = await axios.get(
    "https://api.covid19india.org/v2/state_district_wise.json"
  );
  let active = 0;
  let deceased = 0;
  let recovered = 0;
  res.data.forEach((newState) => {
    newState.districtData.forEach((district) => {
      active += district.active;
      deceased += district.deceased;
      recovered += district.recovered;
    });
  });
  document.getElementById("active").innerHTML = `Active: ${active}`;
  document.getElementById("deceased").innerHTML = `Deceased: ${deceased}`;
  document.getElementById("recovered").innerHTML = `Recovered: ${recovered}`;
  const dataset = [active, deceased, recovered];
  const label = ["Active", "Deceased", "Recovered"];
  renderPieChart(label, dataset);
};

(async () => {
  getPieData();
})();
