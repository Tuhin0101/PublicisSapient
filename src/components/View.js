import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Years from './Years';
import Data from './Data';
import Loader from 'react-loader';

function View() {
    const [arr, setArr] = useState([])
    const [year, setYear] = useState("")
    const [launch, setlaunch] = useState("")
    const [land, setland] = useState("")
    const [getLaunghVal, setGetLaunchVal] = useState("")
    const [getLandVal, setGetLandVal] = useState("")
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getData();
    }, [])

    const getData = () => {
        window.history.pushState({},null,`/` );
        setLoading(false)
        axios.get('https://api.spacexdata.com/v3/launches?limit=100')
            .then((response) => {
                if (response.status == 200) {
                    setLoading(true)
                    setArr(response.data)
                }

            })
            .catch((error) => {
                console.log(error);
                setLoading(true)
            })

    }


    const filterData = (year, lau, lan) => {
        setLoading(false)
        window.history.pushState({},null,`/&launch_success=${lau}&land_success=${lan}&launch_year=${year}` );
        axios.get(`https://api.spacexdata.com/v3/launches?limit=100${lau !== "" ? `&launch_success=${lau}` : ""}${lan !== "" ? `&land_success=${lan}` : ""}${year ? `&launch_year=${year}` : ""}`)
            .then((response) => {
                setLoading(true)
                setArr(response.data)
            })
            .catch((error) => {
                console.log(error);
                setLoading(true)
            })
    }


    const getYear = (year) => {
        setYear(year)
        filterData(year, launch, land)
    }

    const launching = (res, e) => {
        if (getLaunghVal == e.target.outerText) {
            setGetLaunchVal("")
            filterData(year, res = "", land)
        } else {
            setGetLaunchVal("")
            setGetLaunchVal(e.target.outerText)
            filterData(year, res, land)
        }
        setlaunch(res)
    }

    const landing = (res, e) => {
        if (getLandVal == e.target.outerText) {
            setGetLandVal("")
            filterData(year, launch, res = "")
        } else {
            setGetLandVal("")
            setGetLandVal(e.target.outerText)
            filterData(year, launch, res)
        }
        setland(res)
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <h5 className="my-3">SpaceEx Launch Programs</h5>
                </div>
            </div>
            <div className="row">
                <div className="col-md-2 col-12">
                    <div className="filter" style={{ backgroundColor: "#ffffff", padding: "10px 10px" }}>
                        <p>Filters</p>
                        <p className="text-center" style={{ fontSize: 12 + "px" }}>Launch Year</p>
                        <hr className="m-0" />
                        <Years getYear={getYear} />
                        <div className="my-3">
                            <p className="text-center mb-0" style={{ fontSize: 12 + "px" }}>Successful Launch</p>
                            <hr className="mb-2 mt-0" />
                            <span className={`text-center yearlist px-2 ${getLaunghVal == "True" ? "newColor" : ""}`} onClick={(e) => launching(true, e)}>True</span>
                            <span className={`text-center yearlist float-right px-2 ${getLaunghVal == "False" ? "newColor" : ""}`} onClick={(e) => launching(false, e)}>False</span>
                        </div>


                        <div className="my-3">
                            <p className="text-center mt-2 mb-0" style={{ fontSize: 12 + "px" }}>Successful Landing</p>
                            <hr className="mb-2 mt-0" />
                            <span className={`text-center yearlist px-2 ${getLandVal == "True" ? "newColor" : ""}`} onClick={(e) => landing(true, e)}>True</span>
                            <span className={`text-center yearlist float-right px-2 ${getLandVal == "False" ? "newColor" : ""}`} onClick={(e) => landing(false, e)}>False</span>
                        </div>

                    </div>
                </div>
                <div className="col-md-10 col-12">
                    <Loader loaded={loading}>
                        <div className="row h-100">
                            <Data arr={arr && arr} />
                        </div>
                        <p className="text-center">Developed By : Tuhin Roy</p>
                    </Loader>
                </div>
            </div>
        </div>
    )
}

export default View
