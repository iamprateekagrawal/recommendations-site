// import React, { createContext, useState } from "react";

// const [data, setData] = useState({
//     call: '',
//     stop: '',
//     exchange: '',
//     instrument: '',
//     tradePrice: '',
//     stopLoss: '',
//     qty: '',
//     date: new Date()
// });

// ReferenceDataContext = createContext({ data, setData });

// const ReferenceDataContextProvider = ({ children }) => {
//   return (
//     <ReferenceDataContext.Provider value={{ data, setData }}>
//       {...children}
//     </ReferenceDataContext.Provider>
//   );
// };

// export { ReferenceDataContext, ReferenceDataContextProvider };


// import React, {useState, createContext} from 'react';

// export const MContext = createContext();  //exporting context object

// function Provider (props) {
//     const [data, setData] = useState({
//         call: '',
//         stop: '',
//         exchange: '',
//         instrument: '',
//         tradePrice: '',
//         stopLoss: '',
//         qty: '',
//         date: new Date()
//     });

//     return (
//         <MContext.Provider value={
//         {   data,
//             sendData: (value) => setData({message: value })}}>
//         {props.children}  
//         </MContext.Provider>)
// }

// export default Provider;

