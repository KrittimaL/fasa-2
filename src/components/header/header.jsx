import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import NotificationSvg from "../../svgs/notification";
import AlertCard from "../card/alert_card";
import Modal from "../modal/modal";

function Header() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [allRead, setAllRead] = useState(false);
  const [unreadAlert, setUnreadAlert] = useState(false);
  const [recentAlert, setRecentAlert] = useState(false);

  const [cases, setCases] = useState([]);

  async function getCases() {
    const response = await fetch(`http://localhost:3001/case/`);
    if (!response.ok) {
      const message = `An error occurred: ${response.statusText}`;
      window.alert(message);
      return;
    }
    const cases = await response.json();
    setCases(cases);
  }

  useEffect(() => {
    getCases();
  }, [cases.length]);

  function backToDashboard() {
    navigate("/");
  }

  function onToggle() {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }

  function markAsAllRead() {
    for (let i = 0; i < cases.length; i++) {
      if (!cases[i].status) {
        setAllRead(true);
        cases[i].status = allRead;
      }
    }
  }

  useEffect(() => {
    let checkUnread = cases.some((alert) => alert.status === false);
    setUnreadAlert(checkUnread);
  }, [cases]);

  useEffect(() => {
    let checkRecent = cases.some((alert) => alert.status === true);
    setRecentAlert(checkRecent);
  }, [cases]);

  return (
    <>
      <div className="fixed flex w-full h-[60px] bg-primary px-4 py-[18px] border items-center">
        <div className="flex w-full justify-start">
          <button className="w-fit" onClick={backToDashboard}>
            <p className="text-xl text-secondary font-semibold">FASA</p>
          </button>
        </div>

        <div className="flex w-full justify-end">
          <button className="w-fit" onClick={onToggle}>
            <NotificationSvg />
          </button>
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={onToggle}>
        <div className="flex flex-col w-full items-center">
          <div className="flex w-full border-b border-b-[#737373] p-4">
            <p className="text-xl font-semibold">Notification Alert</p>
          </div>
          <div className="flex flex-col w-full gap-3">
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
                              notification={true}
                            />
                          </div>
                        );
                      }
                    })}
                  </>
                ) : null}
              </div>
            ) : null}
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
                              notification={true}
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
      </Modal>
    </>
  );
}

export default Header;
