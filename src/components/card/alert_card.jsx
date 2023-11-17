import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import LocationSvg from "../../svgs/locationSvg";

function AlertCard(props) {

    const { alertDetail, notification } = props
    const [readStatus, setReadStatus] = useState(false)
    const navigate = useNavigate()

    function goToAlertDetail() {
        navigate(`/${alertDetail.id}`, { state: { alertDetail: alertDetail } })
    }

    useEffect(() => {
        if (!alertDetail.status) {
            setReadStatus(true)
            alertDetail.status = readStatus
        }
    })

    return (

        <button className="flex w-full flex-col p-4 gap-2" style={{ backgroundColor: alertDetail.status == false ? 'rgba(85, 144, 126, .2)' : '', borderRadius: notification ? '' : '0.25rem' }} onClick={goToAlertDetail}>
            <div className="flex w-full gap-2 items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-[#9B0032]"></div>
                <p className="text-sm text-primary font-semibold">Alert#{alertDetail.id}</p>
            </div>
            <div className="border border-[#637282] border-opacity-10 rounded px-1 py-2 gap-2 flex w-full items-center">
                <LocationSvg />
                <p className="flex w-full text-sm">{alertDetail.address}</p>
            </div>
            <p className="text-xs text-[#737373]">{alertDetail.date}</p>
        </button>
    );
}

export default AlertCard;