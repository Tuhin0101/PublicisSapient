import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Years from './Years';
import Data from './Data';
function View() {
    const [arr, setArr] = useState([])
    const [year, setYear] = useState("")
    const [launch, setlaunch] = useState("")
    const [land, setland] = useState("")
    const [getLaunghVal, setGetLaunchVal] = useState("")
    const [getLandVal, setGetLandVal] = useState("")

    useEffect(() => {
        getData();
    }, [])

    const getData = () => {
        axios.get('https://api.spacexdata.com/v3/launches?limit=100')
            .then(function (response) {
                setArr(response.data)
            })
            .catch(function (error) {
                console.log(error);
            })

    }


    const filterData = (year, lau, lan) => {
        axios.get(`https://api.spacexdata.com/v3/launches?limit=100${lau !=="" ?`&launch_success=${lau}`:""}${lan!=="" ? `&land_success=${lan}`:""}${year?`&launch_year=${year}`:""}`)
            .then(function (response) {
                setArr(response.data)
            })
            .catch(function (error) {
                console.log(error);
            })
    }


    const getYear = (year) => {
        setYear(year)
        filterData(year, launch, land)
    }

    const launching = (res, e) => {
        setGetLaunchVal(e.target.outerText)
        setlaunch(res)
        filterData(year, res, land)
    }

    const landing = (res, e) => {
        setGetLandVal(e.target.outerText)
        setland(res)
        filterData(year, launch, res)
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
                    <div className="filter"  style={{ backgroundColor:"#ffffff", padding:"10px 10px"}}>
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
                    <div className="row">
                        <Data arr={arr && arr} />
                    </div>
                </div>
            </div>
            <p className="text-center">Developed By : Tuhin Roy</p>
        </div>
    )
}

export default View
