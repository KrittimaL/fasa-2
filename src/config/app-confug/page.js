import AlertDetail from "../../pages/alert_detail";
import Dashboard from "../../pages/dashboard";
import MapDetail from "../../pages/map_detail";

export const routePath = [
    {
        name: "dashboard",
        path: "/",
        component: () => {
            return <Dashboard />;
        }
    },
    {
        name: "alertDetail",
        path: "/:id",
        component: () => {
            return <AlertDetail />;
        }

    },
    {
        name: "mapDetail",
        path: "/map_detail",
        component: () => {
            return <MapDetail />;
        }
    }

]