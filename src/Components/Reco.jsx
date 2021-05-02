import React from "react";
import "../Reco.css";

function Reco (props) {
    const fullData = props.data;

    function showDate(date, month, year) {
        var dd = '', mmm, yyyy = year.toString();
        if(date<10){
            dd.concat('0', date.toString())
        }
        else{
            dd=date.toString();
        }
        switch(month){
            case 2: mmm='Jan'; break;
            case 3: mmm='Feb'; break;
            case 4: mmm='Mar'; break;
            case 5: mmm='Apr'; break;
            case 6: mmm='May'; break;
            case 7: mmm='Jun'; break;
            case 8: mmm='Jul'; break;
            case 9: mmm='Aug'; break;
            case 10: mmm='Sep'; break;
            case 11: mmm='Oct'; break;
            case 12: mmm='Nov'; break;
            case 13: mmm='Dec'; break;
            default: break;
        }
        var res = '';
        res = res.concat(dd, '-',  mmm, '-', yyyy)
        return res;
    }

    return(
        <>
            {fullData.map((data, key) => {if(key!==0){
            return<div>
                <div className="box">
                    <div className="head">
                        <div className="tag">
                            <div className="data-call">{data.call}</div>
                            <div className="data-tradePrice">{data.tradePrice}</div>
                        </div>
                        <div className="label">
                            <h5 className="data-instrument">{data.instrument}</h5>
                            <div className="data-date">{showDate(data.date.getDate(), data.date.getMonth(), data.date.getFullYear())}</div>
                        </div>
                    </div>
                    <div className="content">
                        <div className="batch">
                            <div className="column">
                                <div className="entry-type">Quantity</div>
                                <div className="entry">{data.qty}</div>
                            </div>
                            <div className="column">
                                <div className="entry-type">Stop Loss</div>
                                <div className="entry">{data.stopLoss}</div>
                            </div>
                            <div className="column">
                                <div className="entry-type">Stop Loss Type</div>
                                <div className="entry">{data.stop}</div>
                            </div>
                        </div>
                        <div className="batch">
                            <div className="column">
                                <div className="entry-type">Exchnage Name</div>
                                <div className="entry">{data.exchange}</div>
                            </div>
                            <div className="column">
                                <div className="entry-type">Trade Price</div>
                                <div className="entry">{data.tradePrice}</div>
                            </div>
                            <div className="column">
                                {/* <div className="entry-type">Hello </div>
                                <div className="entry">Hello </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            }else{return<div></div>}})}
        <div className = 'moreReco-btn-div'>
            <button className = 'moreReco-btn' onClick={()=> {props.history.push(`/postReco`)}}>Post more recommendations</button>
        </div>
        </>
    )
}

export default Reco;