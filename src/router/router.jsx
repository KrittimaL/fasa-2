import { CircularProgress } from '@mui/material'
import React, { Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import { routePath } from '../config/app-confug/page'

const RouterPath = () => {

    const getChildPage = (route) => {
        if (!route.childPage) {
            return null
        }
        const childRoute = []
        route.childPage.forEach((child) => {
            childRoute.push({
                path: child.path,
                element: (
                    <child.component />
                ),
            })
        })

        return childRoute
    }

    const route = () => {
        const routeObject = []
        const cimct = 1;
        routePath.forEach((route) => {
            routeObject.push({
                path: route.path,
                element: (
                    <Suspense fallback={<CircularProgress></CircularProgress>}>
                        <route.component />
                    </Suspense>
                ),
                children: getChildPage(route)
            })
        })
        return routeObject
    }
    const routes = useRoutes(route())
    return routes
}

export default RouterPath