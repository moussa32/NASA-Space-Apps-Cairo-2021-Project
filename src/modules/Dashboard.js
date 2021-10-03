import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import BottomNavigation from "./Layout/BottomNavigation";
import UserNavbar from "./Layout/UserNavbar";
import { TiWeatherCloudy } from "react-icons/ti";
import { getWeather } from "../api/WeatherApi";
import { weatherApiKey } from "../api/Constant";
import { GiHeartPlus, GiTombstone } from "react-icons/gi";
import { RiVirusLine } from "react-icons/ri";
import { FaUserInjured } from "react-icons/fa";
import { getCountryCovidVaccine, getCovidStats, getGlobalCovidStats } from "../api/CovidStatsApi";
import { Line, PolarArea } from "react-chartjs-2";
import { BiStats } from "react-icons/bi";
import "./Dashboard.css";
import { getUserInfo } from "../api/UserInfoApi";

const options = {
  maintainAspectRatio: false,
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

const Dashboard = () => {
  const [weather, setWeather] = useState({});
  const [covidStat, setCovidStat] = useState({});
  const [chartType, setChartType] = useState("bar");
  const [lastMonth, setLastMonth] = useState([]);
  const [lastMonthVaccine, setLastMonthVaccine] = useState([]);
  const [totalCountrySet, setTotalCountrySet] = useState([]);

  const lastMonthDate = [...lastMonth.map(item => item.date)];
  const lastMonthCases = [...lastMonth.map(item => item.cases)];

  const accesstoken = localStorage.getItem("accesstoken");
  const userCountryName = JSON.parse(localStorage.getItem("user-info"))?.country;

  const data = {
    labels: lastMonthDate,
    datasets: [
      {
        label: `Last 30 days of cases in ${userCountryName}`,
        data: lastMonthCases,
        fill: false,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(255, 99, 132, 0.2)",
      },
      {
        label: `Last 30 days of vacined in ${userCountryName}`,
        data: [...lastMonthVaccine.map(item => item.number)],
        fill: false,
        backgroundColor: "rgb(54, 162, 235)",
        borderColor: "rgba(54, 162, 235, 0.2)",
        yAxisID: "y-axis-2",
      },
    ],
  };

  const totalCountryData = {
    labels: ["Active", "Cases", "Healthy", "Deaths"],
    datasets: [
      {
        legend: "dddd",
        label: "# of Votes",
        data: [
          totalCountrySet.active,
          totalCountrySet.cases,
          totalCountrySet.recovered,
          totalCountrySet.deaths,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
        ],
        borderWidth: 1,
      },
    ],
  };

  useEffect(() => {
    getUserInfo(accesstoken).then(res => {
      localStorage.setItem("user-info", JSON.stringify(res));
    });

    getWeather(weatherApiKey).then(res => {
      setWeather({ temp: res?.main?.temp, status: res?.weather[0]?.description });
    });

    getCovidStats(userCountryName).then(res => {
      setCovidStat(res);
      setTotalCountrySet({
        cases: res?.cases,
        deaths: res?.deaths,
        active: res?.active,
        recovered: res?.recovered,
      });
    });

    getGlobalCovidStats(userCountryName).then(res => {
      const lastMonthDataFormat = Object.entries(res.timeline.cases).map((item, index) => ({
        id: index,
        date: item[0],
        cases: item[1],
      }));
      setLastMonth(lastMonthDataFormat);
    });

    getCountryCovidVaccine(userCountryName).then(res => {
      const lastMonthVaccineFormat = Object.entries(res.timeline).map((item, index) => ({
        id: index,
        date: item[0],
        number: item[1],
      }));
      setLastMonthVaccine(lastMonthVaccineFormat);
      console.log(res);
    });
  }, []);

  const convertWeather = temp => {
    const Celsius = temp - 273.15;
    return Celsius.toFixed(1);
  };
  return (
    <>
      <UserNavbar />
      <Container>
        <div className="weather-temp d-flex justify-content-between">
          <p className="temp mb-0">{convertWeather(weather?.temp)}</p>
          <div>
            <TiWeatherCloudy size={"3rem"} />
            <p className="weather-status">{weather?.status}</p>
          </div>
        </div>
        <Row className="mt-3">
          <h2 className="heading-line text-center small d-flex align-items-center justify-content-center">
            <BiStats size={"1.3rem"} />
            Today stats in {userCountryName}
          </h2>
          <Col
            className="stat-item align-items-center justify-content-center d-flex flex-column"
            xs={3}
          >
            <GiHeartPlus className="stat-icon" style={{ background: "#2ecc71" }} />
            <div className="stat-container stat-container-1">
              <p className="mb-0">{covidStat?.todayRecovered}</p>
              <p className="mb-0 small">Healthy</p>
            </div>
          </Col>
          <Col
            className="stat-item align-items-center justify-content-center d-flex flex-column"
            xs={3}
          >
            <GiTombstone className="stat-icon" style={{ background: "#34495e" }} />
            <div className="stat-container stat-container-2">
              <p className="mb-0">{covidStat?.todayDeaths}</p>
              <p className="mb-0 small">Death</p>
            </div>
          </Col>
          <Col className="stat-item align-items-center justify-content-center" xs={3}>
            <RiVirusLine className="stat-icon" style={{ background: "#ffc952" }} />
            <div className="stat-container">
              <p className="mb-0">{covidStat?.todayCases}</p>
              <p className="mb-0 small">Cases</p>
            </div>
          </Col>
          <Col
            className="stat-item align-items-center justify-content-center d-flex flex-column"
            xs={3}
          >
            <FaUserInjured className="stat-icon" style={{ background: "#e74c3c" }} />
            <div className="stat-container stat-container-4">
              <p className="mb-0">{covidStat?.active}</p>
              <p className="mb-0 small">Active</p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="mt-3">
            <Line data={data} options={options} style={{ height: "240px" }} />
          </Col>
        </Row>
        <Row>
          <Col className="mt-3">
            <h2 className="heading-line text-center small d-flex align-items-center justify-content-center">
              <BiStats size={"1.3rem"} />
              Total {userCountryName} covid19 stat
            </h2>
            <PolarArea data={totalCountryData} />
          </Col>
        </Row>
      </Container>
      <BottomNavigation />
    </>
  );
};

export default Dashboard;
