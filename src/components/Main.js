import React, { Component } from "react";
import axios from "axios";
import SatSetting from "./SatSetting";
import SatelliteList from "./SatelliteList";
import WorldMap from "./WorldMap";
import { NEARBY_SATELLITE, SAT_API_KEY, STARLINK_CATEGORY } from "../constants";

class Main extends Component {
    constructor() {
        super();
        this.state = {
            satInfo: null,
            settings: null,
            //receive selected satellites
            satList:null,
            isLoadingList: false
        };
    }
    showNearbySatellite = setting => {
        this.setState({
            settings: setting
        });
        this.fetchSatellite(setting);
    };

    fetchSatellite = setting => {
        const { latitude, longitude, elevation, altitude } = setting;
        const url = `/api/${NEARBY_SATELLITE}/${latitude}/${longitude}/${elevation}/${altitude}/${STARLINK_CATEGORY}/&apiKey=${SAT_API_KEY}`;

        this.setState({
            isLoadingList: true
        });

        axios
            .get(url)
            .then(response => {
                console.log(response.data);
                this.setState({
                    satInfo: response.data,
                    isLoadingList: false
                });
            })
            .catch(error => {
                console.log("err in fetch satellite -> ", error);
            });
    };

    showMap = selected => {
        // get all the selected satellites
        this.setState(preState => ({
            ...preState,
            isLoadingMap: true,
            satList: [...selected]
        }));
    };

    render() {
        const { satInfo, isLoadingList, settings, satList} = this.state;
        return (
            <div className="main">
                <div className="left-side">
                    <SatSetting onShow={this.showNearbySatellite} />
                    <SatelliteList
                        satInfo={satInfo}
                        isLoad={this.state.isLoadingList}
                        onShowMap={this.showMap}
                    />
                </div>
                <div className="right-side">
                    <WorldMap satData={satList} observerData={settings}/>
                </div>
            </div>
        );
    }
}

export default Main;
