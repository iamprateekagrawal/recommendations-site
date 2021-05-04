import React, { useContext, useState } from 'react'
import DatePicker from 'react-date-picker';
import { ThemeContext } from '../App';
// import axios from 'axios';

function PostReco(props) {

  const theme = useContext(ThemeContext);
  const [insData,setInsData]=useState([]);
  const [spin, setSpin] = useState('no-spin');

  var date = new Date();
  const [data, setData] = useState({
    call: '',
    stop: '',
    exchange: '',
    instrument: '',
    tradePrice: '',
    stopLoss: '',
    qty: '',
    targetPrice: '',
    date: new Date(date.getFullYear(), date.getMonth(), date.getDate()+10),
    submitted: false
  });

function onChange(event) {
  setData({...data,
      [event.target.name]: event.target.value,
    });
  
}

function insVal() {
    if(data.exchange===''){
      return "Please select an exchange first"
    }
    else{
      data.instrument = "GOLDSTAR-SM";
      return "GOLDSTAR-SM"
    }
}

const showIns = async () => {
  // try{
    // const res1 = await fetch('./instruments.json');
    const res1 = await fetch('./instruments.json'); 
    // if (!res1.ok) {
    //   throw new Error(`HTTP error! status: ${res1.status}`);
    // }else{
    //   console.log('the data', res1.data)
    // }
    const res2 = await res1.json();
    console.log('here', res2.data);
    setInsData(res2.data);
  // }catch(err){
  //   console.log(err);
  // }
//   fetch(instruments)
//     .then(response => { return response.text();})
//     .then(responseData => {console.log(responseData); return responseData;})
//     // .then(data => {this.setState({"questions" : data});})

//     // .catch(err => {
//     //     console.log("fetch error" + err);
//     // });
// // }
}
showIns();

function allFilled () {
  for (var key in data) {
    if (data[key] === '')
        return false;
}
return true;
}

function checkSubmission () {
  if(!allFilled()){
    return true;
  }
  if(data.qty!=='' && data.qty<=0){
    alert("Quantity should be a positive integer");
    data.qty = '';
    return true;
  }
  if(data.call === 'Buy' && parseFloat(data.stopLoss) >= parseFloat(data.tradePrice)){
      alert("For Buy call - stop loss cannot be greater than or same as trade price");
      data.stopLoss = data.tradePrice = '';
      return true;
  }
  if(data.call === 'Buy' && parseFloat(data.targetPrice) <= parseFloat(data.tradePrice)){
      alert("For Buy call - target price cannot be less than or same as trade price");
      data.targetPrice = data.tradePrice = '';
      return true;
  }
  if(data.call === 'Sell' && parseFloat(data.stopLoss) <= parseFloat(data.tradePrice)){
      alert("For Sell call - stop loss cannot be less than or same as trade price");
      data.stopLoss = data.tradePrice = '';
      return true;
  }
  if(data.call === 'Sell' && parseFloat(data.targetPrice) >= parseFloat(data.tradePrice)){
      alert("For Sell call - target price cannot be greater than or same as trade price");
      data.targetPrice = data.tradePrice = '';
      return true;
  }
  return false;
}

function sendData (event) {
    if(!checkSubmission()) {
        setSpin('spin');
        event.preventDefault();
        setTimeout(function() {
          data.submitted = true;
          props.callBack(data);
          console.log('sent', data);
          setSpin('no-spin');
          props.history.push(`/reco`);
        }, 0);  
    }
}

function showMessage() {
  if(props.location.message === "show"){
    return "No Recommendations found,create one!"
  }else{
    return <div></div>
  }
}

  return (
    <>
    <div>
    <div className="message">
      <div className='show-message'>{showMessage()}</div>
    </div>
      <div className="outer-box"  style={theme}>
        <div>
          Fill in the following details to send recommendations to your subscribers.
        </div>
        <form>
        <div className="middle-box">
        <div className="inner-box"  style={theme}>
          <div className="left-container">
          <div className="set">
            <div className='form-txt'>Is it buy call or sell call?</div>
            <div className='btn-pair'>
              <input id="buy-btn" name="call" type="radio" value="Buy" onChange={onChange} />
              <label htmlFor="buy-btn" >Buy</label>
              <input id="sell-btn" name="call" type="radio" value="Sell" onChange={onChange}/>
              <label htmlFor="sell-btn">Sell</label>
            </div>
          </div>

          <div className="set">
            <div className='form-txt'>Is it moving stop or closing stop?</div>
            <div className='btn-pair'>
              <input id="moving-btn" name="stop" type="radio" value="Moving" onChange={onChange}/>
              <label htmlFor="moving-btn">Moving</label>
              <input id="closing-btn" name="stop" type="radio" value="Closing" onChange={onChange}/>
              <label htmlFor="closing-btn">Closing</label>
            </div>
          </div>

          <div className="set">
            <label htmlFor="exchange-name" className='form-txt'>Exchange name</label>
            <div>
              <select name="exchange" id="exch-name" className="dropdown" onChange={onChange}>
                <option disabled selected className='display-none'>&nbsp;</option>
                <option value="NFO">NFO</option>
                <option value="CDS">CDS</option>
                <option value="NSE">NSE</option>
                <option value="BSE">BSE</option>
                <option value="MCX">MCX</option>
                <option value="BCD">BCD</option>
              </select>
            </div>
          </div>

          <div className="set">
            <label htmlFor="instrument-type" className='form-txt'>Instrument type</label>
            <div>
              <select name="instrument" id="ins-type" className="dropdown" disabled={data.exchange===''} onChange={onChange}>
                <option disabled selected className='display-none'>{insVal()}</option>
                {insData.map((data)=>{
                  return <option value ={data.tradingsymbol}>{data.tradingsymbol}</option>
                })}
              </select>
            </div>
          </div>
          </div>

          <div className="right-container">
            <div className="set">
              <label htmlFor="trade-price" className='form-txt'>Trade Price</label>
              <div><input className="right-inputs" id="trade-price" name='tradePrice' value={data.tradePrice} type="number" step="0.1" onChange={onChange}/></div>
            </div>

            <div className="set">
              <label htmlFor="stop-loss" className='form-txt'>Stop loss</label>
              <div><input className="right-inputs" id="stop-loss" name='stopLoss' value={data.stopLoss} type="number" step="0.1" onChange={onChange}/></div>
            </div>

            <div className="set">
              <label htmlFor="quantity" className='form-txt'>Quantity</label>
              <div><input className="right-inputs" id="quantity" name='qty' value={data.qty} type="number" onKeyPress= {(event)=>{return event.charCode >= 48}} min="1" onChange={onChange}/></div>
            </div>

            <div className="set">
              <label htmlFor="validity-date" className='form-txt'>Recommendation Validity</label>
              <div><DatePicker className="date-input" format='dd-MMM-yyyy' name='date' minDate={new Date()} value={data.date} onChange={(value) => {setData({...data, date: value})}}/></div>
            </div>
          </div>
        </div>
          <div className="last-input" style={theme}>
            <div className="set">
              <label htmlFor="target-price" className='form-txt'>Target Price: </label>
              <input className="right-inputs" id="trade-price" name='targetPrice' value={data.targetPrice} type="number" step="0.1" onChange={(event) => {onChange(event)}}/>
            </div>
          </div>
        </div>
        <div className='submit'>
            <input id='submit-btn' type="submit" value="Add Recommendation" disabled={checkSubmission()} onClick={sendData}/><span id="spinner" className={spin}></span>
        </div>
        
        </form>
      </div>
      </div>
    </>
  );
}

export default PostReco;