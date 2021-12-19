import React from "react"
import { render } from "react-dom"
import Router from '../router/router'
import { BrowserRouter, Route } from "react-router-dom";
//import problemDisplay from '../components/problemDisplay/problemDisplay';
import Header from "@layouts/header";
import Login from "@components/login/login";
// function App() {
//   return (
//     <h1>Hello</h1>
//   );

// function App() {
//     return (
//       <BrowserRouter>
//         <div>
//           <header className="title">
//             <Link to="/">首页</Link>
//             <Link to="/login">登录</Link>
//           </header>
//           <br/>
//           <br/>
//           <Route path="/" component = {Header} />
//           <Route path="/login" component = {Login} />
//         </div>
//       </BrowserRouter>
  
//     );
  
// }

export default class extends React.Component {
  render()  {
    return (
      <Router>
      </Router>
      // <div>
      // <Header></Header>
      // <TabPanel></TabPanel>
      // <Login></Login>
      
      // </div>
    )
  }
}


// export default App;
