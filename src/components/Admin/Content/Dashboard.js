import './Dashboard.scss';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from 'recharts';
import { getOverview } from '../../../services/apiService';
import { useEffect, useState } from 'react';

const Dashboard = (props) => {
  const [dataOverView, setDataOverView] = useState([]);
  const [dataChart, setDataChart] = useState([]);

  useEffect(() => {
    fetchDataOverView();
  }, []);

  const fetchDataOverView = async () => {
    let response = await getOverview();

    if (response && response.EC === 0) {
      setDataOverView(response.DT);
      let Qz = 0;
      let Qs = 0;
      let As = 0;
      Qz = response?.DT?.others?.countQuiz;
      Qs = response?.DT?.others?.countQuestions;
      As = response?.DT?.others?.countAnswers;
      const data = [
        {
          name: 'Quizzes',
          Qz: Qz,
        },
        {
          name: 'Questions',
          Qs: Qs,
        },
        {
          name: 'Answers',
          As: As,
        },
      ];
      setDataChart(data);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="title">Analytics Dashboard</div>

      <div className="content">
        <div className="content-left">
          <div className="child">
            <span className="text-1">Total Users</span>
            <span className="text-2">
              {dataOverView && dataOverView.users && dataOverView.users.total ? (
                <>{dataOverView.users.total}</>
              ) : (
                <>0</>
              )}
            </span>
          </div>
          <div className="child">
            <span className="text-1">Total Quizzes</span>
            <span className="text-2">
              {dataOverView && dataOverView.others && dataOverView.others.countQuiz ? (
                <>{dataOverView.others.countQuiz}</>
              ) : (
                <>0</>
              )}
            </span>
          </div>
          <div className="child">
            <span className="text-1">Total Question</span>
            <span className="text-2">
              {dataOverView && dataOverView.others && dataOverView.others.countQuestions ? (
                <>{dataOverView.others.countQuestions}</>
              ) : (
                <>0</>
              )}
            </span>
          </div>
          <div className="child">
            <span className="text-1"> Total Answer</span>
            <span className="text-2">
              {dataOverView && dataOverView.others && dataOverView.others.countAnswers ? (
                <>{dataOverView.others.countAnswers}</>
              ) : (
                <>0</>
              )}
            </span>
          </div>
        </div>
        <div className="content-right">
          <ResponsiveContainer width={'95%'} height={'90%'}>
            <BarChart data={dataChart}>
              {/* <CartesianGrid strokeDasharray="3 3" /> */}
              <XAxis dataKey="name" />
              {/* <YAxis /> */}
              <Tooltip />
              <Legend />
              <Bar dataKey="Qz" fill="#8884d8" />
              <Bar dataKey="Qs" fill="#82ca9d" />
              <Bar dataKey="As" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
