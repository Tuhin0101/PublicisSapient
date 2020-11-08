import React,{useState,useEffect} from 'react'

function Years(props) {
const {getYear} = props
const [year,setYear] = useState()
const [yearList,setYearList] = useState(["2006","2007","2008","2009","2010","2011","2012","2013","2014","2015","2016","2017","2018","2019","2020",])
    
const select=(yr)=>{
    if(year==yr){
        setYear("")
    }
    setYear(year)
}

return (
        <div className="row">
            {
                yearList && yearList.map((data,i)=>{
                    return(
                        <div className="col-6" key={i} onClick={()=>{getYear(data);select(data);}}>
                        <p className={`my-1 yearlist text-center ${year==data?"newColor":""}`}>{data}</p>
                        </div>
                    )
                })
            }
           
        </div>
    )
}

export default Years
