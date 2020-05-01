import React from "react";
import { Redirect } from "react-router-dom";

import Home from "../application/Home";
import Recommend from "../application/Recommend";
import Rank from "../application/Rank";
import Singer from "../application/Singers";
import Album from '../application/Album';

export default [
    {
        path: "/",
        component: Home,
        routes: [
            {
                path: "/",
                exact: true,
                render: () => (
                    <Redirect to={"/recommend"}/>
                )
            },
            {
                path: "/recommend",
                component: Recommend,
                routes: [
                    {
                        path: "/recommend/:id",
                        component: Album
                    }
                ]
            },
            {
                path: "/singer",
                component: Singer
            },
            {
                path: "/rank",
                component: Rank
            },
        ]
    }
]
