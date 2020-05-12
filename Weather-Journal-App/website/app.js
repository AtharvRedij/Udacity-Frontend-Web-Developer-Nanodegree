/* Global Variables */
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const API_KEY = "72d4d799de2aecd4c7267456faf6e47b";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

// Async GET
const retrieveData = async (zipcode = "", userResponse = "") => {
  const queryUrl = BASE_URL + zipcode + "&appid=" + API_KEY;
  const request = await fetch(queryUrl);
  try {
    // Transform into JSON
    const allData = await request.json();
    const data = {
      temperature: allData.main.temp,
      date: newDate,
      userResponse
    };
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

// Async POST
const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

// Async function to update UI
const updateUI = async () => {
  const request = await fetch("http://localhost:3000/all");

  try {
    const data = await request.json();
    document.getElementById("date").innerHTML = "Date " + data.date;
    document.getElementById("temp").innerHTML =
      "Temperature " + data.temperature;
    document.getElementById("content").innerHTML =
      "User Response " + data.userResponse;
  } catch (error) {
    console.log("error", error);
  }
};

const zipInput = document.getElementById("zip");
const userResponseInput = document.getElementById("feelings");
const generateButton = document.getElementById("generate");

generateButton.addEventListener("click", () => {
  retrieveData(zipInput.value, userResponseInput.value)
    .then(data => {
      postData("http://localhost:3000/add", data);
    })
    .then(() => {
      updateUI();
    });
});
