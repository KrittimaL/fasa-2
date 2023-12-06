import { useLocation, useNavigate } from "react-router";
import { useEffect } from "react";
import Header from "../components/header/header";
import BackSvg from "../svgs/backSvg";

function RealTimeCamera() {
  const location = useLocation();
  const navigate = useNavigate();
  const alertDetail = location.state.alertDetail;

  useEffect(()=>{
    return () => {
        socket.close()
    }
  }, [])

  const socket = new WebSocket("ws://54.206.23.65:8765");

  // Handle incoming messages from the WebSocket server
  socket.onmessage = function (event) {
    const imageUrl = event.data;
    displayImage(imageUrl);
  };

  // Function to display the image on the webpage
  function displayImage(imageUrl) {
    imageUrl.text().then((txt) => {
      document.getElementById(
        "image"
      ).src = `data:image/jpeg;charset=utf-8;base64,${txt}`;
    });

    // data:image/jpeg;charset=utf-8;base64,
  }

  return (
    <div className="flex flex-col w-full h-full">
      <Header />
      <div className="w-full flex flex-col py-6 px-[120px] gap-5 mt-[60px] ">
        <div className="flex w-full items-center  ">
          <button
            className="flex justify-start "
            onClick={() => {
              navigate(`/${alertDetail.id}`, {
                state: { alertDetail: alertDetail },
              });
            }}
          >
            <BackSvg />
          </button>
          <div className="flex justify-center w-full">
            <p className="text-3xl flex font-semibold text-primary">
              Real Time Camera
            </p>
          </div>
        </div>
        <div className="flex w-full justify-center">
          {/* TODO: place real time video here */}
          <img
            id="image"
            className="max-h-[506px] max-w-[1200px] w-full rounded-lg border-2 border-[#D9D9D9]"
            src=""
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default RealTimeCamera;
