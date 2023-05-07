import React,{useState} from "react";
import "./styles.css";
import ToDo from './ToDo';
import About from './About';
import NavBar from './NavBar';
import Main from './Main';
import Transactions from './Transactions';

export default function App(){
  let [page,setPage]=useState('Main')

  let theApp
  if        (page=='ToDo')  {theApp= <ToDo />
  } else if (page=="About") {theApp = <About />
  } else if (page=="Main")  {theApp = <Main />
  } else if (page=="Transactions") {
    theApp = <Transactions />
  }
  return(
    <>
      <NavBar setPage={setPage} />
      {theApp}
    </>

  )
}

