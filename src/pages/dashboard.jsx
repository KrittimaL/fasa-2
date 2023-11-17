import { useEffect, useState } from "react";
import AlertCard from "../components/card/alert_card";
import Header from "../components/header/header";

function Dashboard() {
    const [allRead, setAllRead] = useState(false)
    const [unreadAlert, setUnreadAlert] = useState(false)
    const [recentAlert, setRecentAlert] = useState(false)

    const alerts = [
        {
            id: "00001",
            status: true,
            response: true,
            address: '234 Mary Rd.',
            date: '20/05/2023',
            cameraId: '1',
            location: {
                latitude: '13.730139020808489',
                longitude: '100.77829666898829'
            },
            images: ['https://pbs.twimg.com/profile_images/1340371283876458498/WdTSOW3w_400x400.jpg', 'https://pbs.twimg.com/media/Epn3BS9XMAUysOQ.jpg', 'https://i.pinimg.com/originals/c0/ab/76/c0ab763660bc4417ec30a4f91d36a09b.jpg', 'https://pbs.twimg.com/media/Epn1XkwWwAQuUdX.jpg']
        },
        {
            id: "2",
            status: false,
            response: true,
            address: '11/4 John Rd.',
            date: '20/05/2023',
            cameraId: '1',
            location: {
                latitude: '13.730139020808489',
                longitude: '100.77829666898829'
            },
            images: ['https://pbs.twimg.com/profile_images/1340371283876458498/WdTSOW3w_400x400.jpg', 'https://pbs.twimg.com/media/Epn3BS9XMAUysOQ.jpg', 'https://i.pinimg.com/originals/c0/ab/76/c0ab763660bc4417ec30a4f91d36a09b.jpg', 'https://pbs.twimg.com/media/Epn1XkwWwAQuUdX.jpg']

        },
    ]

    function markAsAllRead() {
        for (let i = 0; i < alerts.length; i++) {
            if (!alerts[i].status) {
                setAllRead(true)
                alerts[i].status = allRead
            }
        }

    }

    useEffect(() => {
        let checkUnread = alerts.some((alert) => alert.status === false)
        setUnreadAlert(checkUnread)


    }, [alerts])

    useEffect(() => {
        let checkRecent = alerts.some((alert) => alert.status === true)
        setRecentAlert(checkRecent)
    }, [alerts])

    return (
        <div className="flex flex-col w-full h-full">
            <Header />
            <div className="w-full flex flex-col py-6 px-[120px] gap-5 mt-[60px]">
                <div className="flex w-full items-center">
                    <p className="text-3xl font-semibold text-primary">Notification alert</p>
                </div>
                {/* NOTE: unread content */}
                {unreadAlert ? (
                    <div className="w-full flex flex-col gap-3">
                        <div className="flex w-full items-center px-3 py-4">
                            <p className="flex justify-start text-sm text-primary font-semibold">Unread</p>
                            <div className="flex w-full justify-end">
                                <button className="bg-[#E5E5E5] px-1.5 rounded" onClick={markAsAllRead}>
                                    <p className="text-sm text-[#1A1918]">Mark all as read</p>
                                </button>
                            </div>
                        </div>
                        {alerts ? (
                            <>
                                {alerts.map((alertDetail, index) => {
                                    if (!alertDetail.status) {
                                        return (
                                            <div key={index}>
                                                <AlertCard alertDetail={alertDetail} notification={false} />
                                            </div>
                                        )
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
                            <p className="flex justify-start text-sm text-primary font-semibold">Recent</p>
                        </div>
                        {alerts ? (
                            <>
                                {alerts.map((alertDetail, index) => {
                                    if (alertDetail.status) {
                                        return (
                                            <div key={index}>
                                                <AlertCard alertDetail={alertDetail} notification={false} />
                                            </div>
                                        )
                                    }

                                })}
                            </>
                        ) : null}

                    </div>
                ) : null}

            </div>
        </div>
    )
}

export default Dashboard;