import { useEffect, useState } from "react";
import AlertCard from "../components/card/alert_card";
import Header from "../components/header/header";

function Dashboard() {
  const [allRead, setAllRead] = useState(false);
  const [unreadAlert, setUnreadAlert] = useState(false);
  const [recentAlert, setRecentAlert] = useState(false);

  const [cases, setCases] = useState([]);

  async function getCases() {
    const response = await fetch(
      `http://ec2-54-206-23-65.ap-southeast-2.compute.amazonaws.com:3001/case/`
    );
    if (!response.ok) {
      const message = `An error occurred: ${response.statusText}`;
      window.alert(message);
      return;
    }
    const new_cases = await response.json();
    if (cases !== new_cases) {
      let checkUnread = new_cases.some((alert) => alert.status === false);
      setUnreadAlert(checkUnread);
      let checkRecent = new_cases.some((alert) => alert.status === true);
      setRecentAlert(checkRecent);
      setCases(new_cases);
    }
  }

  useEffect(() => {
    getCases();
    setInterval(() => {
      getCases();
    }, 2000);
  }, []);

  // useEffect(() => {
  //   getCases();
  // }, [cases.length]);

  async function markAsAllRead() {
    const response = await fetch(
      `http://ec2-54-206-23-65.ap-southeast-2.compute.amazonaws.com:3001/allread/`
    );
    if (!response.ok) {
      const message = `An error occurred: ${response.statusText}`;
      window.alert(message);
      return;
    }
    getCases();
  }

  return (
    <div className="flex flex-col w-full h-full">
      <Header />
      <div className="w-full flex flex-col py-6 px-[120px] gap-5 mt-[60px]">
        <div className="flex w-full items-center">
          <p className="text-3xl font-semibold text-primary">
            Notification alert
          </p>
        </div>
        {/* NOTE: unread content */}
        {unreadAlert ? (
          <div className="w-full flex flex-col gap-3">
            <div className="flex w-full items-center px-3 py-4">
              <p className="flex justify-start text-sm text-primary font-semibold">
                Unread
              </p>
              <div className="flex w-full justify-end">
                <button
                  className="bg-[#E5E5E5] px-1.5 rounded"
                  onClick={markAsAllRead}
                >
                  <p className="text-sm text-[#1A1918]">Mark all as read</p>
                </button>
              </div>
            </div>
            {cases ? (
              <>
                {cases.map((alertDetail, index) => {
                  if (!alertDetail.status) {
                    return (
                      <div key={index}>
                        <AlertCard
                          alertDetail={alertDetail}
                          notification={false}
                        />
                      </div>
                    );
                  }
                })}
              </>
            ) : null}
          </div>
        ) : null}

        {/* NOTE: recent content */}
        {recentAlert ? (
          <div className="w-full flex flex-col gap-3">
            <div className="flex w-full items-center px-3 py-4">
              <p className="flex justify-start text-sm text-primary font-semibold">
                Recent
              </p>
            </div>
            {cases ? (
              <>
                {cases.map((alertDetail, index) => {
                  if (alertDetail.status) {
                    return (
                      <div key={index}>
                        <AlertCard
                          alertDetail={alertDetail}
                          notification={false}
                        />
                      </div>
                    );
                  }
                })}
              </>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Dashboard;
