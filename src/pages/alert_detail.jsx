import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import Header from "../components/header/header";

function AlertDetail() {

    const location = useLocation()
    const navigate = useNavigate()
    const alertDetail = location.state.alertDetail
    const [focusImage, setFocusImage] = useState('')
    const [responseStatus, setResponseStatus] = useState('')
    const [link, setLink] = useState('')

    // const [status, setStatus] = useState('')

    function falsePositive() {
        alertDetail.response = false
        if (!alertDetail.response) {
            navigate('/')
        }
    }

    function dispatch() {
        alertDetail.response = true
        if (alertDetail.response) {
            navigate('/')
        }
    }

    useEffect(() => {
        if (alertDetail.status) {
            // setStatus("Already Checked")
            if (alertDetail.response) {
                setResponseStatus('Already Dispatched')
            } else {
                setResponseStatus('False Detection')
            }
        } else {
            // setStatus("Unchecked")
        }
        setLink("https://www.google.com/maps/search/?api=1&query=" +
            alertDetail.location.latitude +
            "," +
            alertDetail.location.longitude)


    }, [])

    return (
        <div className="flex flex-col w-full h-full">
            <Header />
            <div className="w-full flex flex-col py-6 px-[120px] gap-5 mt-[60px]">
                <div className="flex w-full items-center justify-center">
                    <p className="text-3xl font-semibold text-primary">Alert #{alertDetail.id}</p>
                    {alertDetail.status ? (
                        <p className="flex text-p font-bold ml-8 text-red">-{responseStatus}</p>
                    ) : (null)}
                </div>
                <div className="flex flex-col w-full gap-4 ">
                    <div className="flex w-full justify-center">

                        <img className="max-h-[506px] max-w-[1200px] w-full rounded-lg border-2 border-[#D9D9D9]" src={focusImage ? focusImage : alertDetail.images[0]} alt={focusImage ? focusImage : alertDetail.images[0]} />
                    </div>
                    <div className="flex flex-row w-full items-center justify-center gap-3">
                        {alertDetail.images.map((image, index) => {
                            return (
                                <button key={index} onClick={() => {
                                    setFocusImage(image)
                                }}>
                                    <img className="max-w-[200px] max-h-[120px] aspect-square rounded-lg border border-[#D9D9D9] " src={image} alt={image} />
                                </button>
                            )

                        })}
                    </div>
                </div>
                <div className="border-t-2 border-t-[#D9D9D9] w-full flex flex-col pt-4 gap-6 ">
                    <div className="w-full flex gap-3 items-center">
                        <p className="text-xl font-semibold">Location:</p>
                        <a href={link} target="_blank" className="text-xl text-[#528FFE] underline underline-offset-2 hover:text-[#0047FF] font-semibold" >{alertDetail.address}</a>

                    </div>
                    <div className="flex w-full gap-3">
                        <button className="py-1 px-1.5 rounded-lg bg-[#F83030] hover:bg-[#DD2929] w-fit h-fit" onClick={falsePositive}>
                            <p className="text-xl text-secondary font-semibold">False Positive</p>
                        </button>
                        <button className="py-1 px-1.5 rounded-lg bg-[#0C6937] hover:bg-[#095A2F] w-fit h-fit" onClick={dispatch}>
                            <p className="text-xl text-secondary font-semibold">Dispatch</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AlertDetail;