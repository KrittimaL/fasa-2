import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import Header from "../components/header/header";
import BackSvg from "../svgs/backSvg";

function MapDetail() {

    const [link, setLink] = useState('')
    const location = useLocation()
    const alertDetail = location.state.alertDetail

    useEffect(() => {
        setLink("https://www.google.com/maps/search/?api=1&query=" +
            alertDetail.location.latitude +
            "," +
            alertDetail.location.longitude)
    }, [])

    return (
        <div className="flex flex-col w-full h-full">
            <Header />
            <div className="w-full flex flex-col py-6 px-[120px] gap-5 mt-[60px]">
                <div className="flex w-full items-center justify-start gap-3">
                    <button className="flex items-center justify-center w-12 h-12 hover:bg-[#e5e5e5] hover:opacity-70 rounded-lg" onClick={() => {
                        window.history.back()
                    }}>
                        <BackSvg />
                    </button>
                    <p className="text-3xl font-semibold text-primary">Map</p>
                    <div className="flex ml-8 items-center">
                        <a href={link} className="flex text-p font-bold">{alertDetail.location.latitude}, {alertDetail.location.longitude}</a>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default MapDetail;