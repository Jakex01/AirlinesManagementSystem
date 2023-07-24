import {ExploreTopFlights} from "./components/ExploreTopFlights";
import {Carousel} from "./components/Carousel";
import {Heros} from "./components/Heros";
import {FlightsServices} from "./components/FlightsServices";
import React from "react";

export const HomePage = () => {

    return(
        <>
        <ExploreTopFlights/>
        <Carousel/>
        <Heros/>
        <FlightsServices/>
        </>
    );
}