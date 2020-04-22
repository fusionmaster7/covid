const renderState = (stateObj) => {
  let stateDiv = document.createElement("div");
  stateDiv.classList.add("states-table-header");
  stateDiv.setAttribute("id", "state-row");
  let nameDiv = document.createElement("div");
  nameDiv.classList.add("state");
  nameDiv.innerText = stateObj.name;
  stateDiv.appendChild(nameDiv);
  let activeDiv = document.createElement("div");
  activeDiv.classList.add("state");
  activeDiv.innerText = stateObj.active;
  stateDiv.appendChild(activeDiv);
  let confirmedDiv = document.createElement("div");
  confirmedDiv.classList.add("state");
  confirmedDiv.innerText = stateObj.confirmed;
  stateDiv.appendChild(confirmedDiv);
  let deceasedDiv = document.createElement("div");
  deceasedDiv.classList.add("state");
  deceasedDiv.innerText = stateObj.deceased;
  stateDiv.appendChild(deceasedDiv);
  let recoveredDiv = document.createElement("div");
  recoveredDiv.classList.add("state");
  recoveredDiv.innerText = stateObj.recovered;
  stateDiv.appendChild(recoveredDiv);
  document.getElementsByClassName("states")[1].appendChild(stateDiv);
};

const renderDistrict = (districtObj) => {
  let districtDiv = document.createElement("div");
  districtDiv.classList.add("states-table-header");
  districtDiv.setAttribute("id", "state-row");
  let nameDiv = document.createElement("div");
  nameDiv.classList.add("state");
  nameDiv.innerText = districtObj.district;
  districtDiv.appendChild(nameDiv);
  let activeDiv = document.createElement("div");
  activeDiv.classList.add("state");
  activeDiv.innerText = districtObj.active;
  districtDiv.appendChild(activeDiv);
  let confirmedDiv = document.createElement("div");
  confirmedDiv.classList.add("state");
  confirmedDiv.innerText = districtObj.confirmed;
  districtDiv.appendChild(confirmedDiv);
  let deceasedDiv = document.createElement("div");
  deceasedDiv.classList.add("state");
  deceasedDiv.innerText = districtObj.deceased;
  districtDiv.appendChild(deceasedDiv);
  let recoveredDiv = document.createElement("div");
  recoveredDiv.classList.add("state");
  recoveredDiv.innerText = districtObj.recovered;
  districtDiv.appendChild(recoveredDiv);
  document.getElementsByClassName("states")[0].appendChild(districtDiv);
};

const renderStates = async () => {
  const res = await axios.get(
    "https://api.covid19india.org/v2/state_district_wise.json"
  );
  res.data.forEach((newState) => {
    let stateObj = {
      name: newState.state,
      active: 0,
      deceased: 0,
      confirmed: 0,
      recovered: 0,
    };
    newState.districtData.forEach((district) => {
      stateObj.active += district.active;
      stateObj.recovered += district.recovered;
      stateObj.confirmed += district.confirmed;
      stateObj.deceased += district.deceased;
    });
    renderState(stateObj);
  });
};
(async () => {
  renderStates();
})();

const renderDistricts = () => {
  document.getElementById("district-table").style.display = "block";
  const element = document.getElementsByClassName("states")[1];
  element.style.display = "none";
  const textField = document.getElementById("search-state");
  axios
    .get("https://api.covid19india.org/v2/state_district_wise.json")
    .then((resp) => {
      const myState = resp.data.find((e) => e.state === textField.value);
      if (myState) {
        myState.districtData.forEach((e) => {
          let districtObj = { ...e };
          renderDistrict(districtObj);
        });
      }
    });
};
