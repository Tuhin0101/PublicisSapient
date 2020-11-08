import React from 'react'

function Data(props) {
    const { arr } = props
    return (
        <>
            {
                arr && arr.length >0 ? arr.map((el, i) => {
                    return (
                        <div className="col-xl-3 col-md-6 col-12 my-2" key={el.flight_number}>
                            <div className="card">
                            <div className="img-container">
                                <img src={el && el.links && el.links.mission_patch_small} className="card-img-top w-100 img-fluid" alt="..." />
                                </div>
                                <div className="card-body">
                                    <p className="card-text font-weight-bold" style={{color:"blue"}}>{el.mission_name}</p>
                                    <p className="font-weight-bold">Mission Ids:</p>
                                    <ul>
                                        {
                                            el.mission_id && el.mission_id.map((mid, k) => {
                                                return (
                                                    <li key={k}>{mid}</li>
                                                )
                                            })
                                        }
                                    </ul>
                                    <p><span className="font-weight-bold">Launch Year:</span> {el.launch_year}</p>
                                    <p><span className="font-weight-bold">Successful Launch:</span> {el.launch_success == true ? "True" : "False"}</p>
                                    <p><span className="font-weight-bold">Successful Landing:</span> {el && el.rocket && el.rocket.first_stage && el.rocket.first_stage.cores && el.rocket.first_stage.cores[0] && el.rocket.first_stage.cores[0].land_success == true ? "True" : el.rocket.first_stage.cores[0].land_success == null? "":"False"}</p>
                                </div>
                            </div>
                        </div>
                    )
                })
                :
                <>
                <p className="w-100 d-flex justify-content-center align-items-center h-100">No SpaceEX program found!!!</p>
                </>
            }
        </>
    )
}

export default Data
