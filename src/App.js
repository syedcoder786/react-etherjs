import React, { useEffect, useState } from 'react';

import { getUserAddress, getContract } from "./wrapper/contactWrapper"
import {ethers} from "ethers"
import Ethers from './components/Ethers';

const App = (props) => {
  const { ethereum } = window;
  const [address, setAddress] = useState()
  const [value, setValue] = useState()
  const [input, setInput] = useState()

  useEffect(() => {
    getAddress()
  },[])
  const getAddress = async () => {
    await window.ethereum.request({
      method: 'eth_requestAccounts',
    });
    const accounts = await getUserAddress()
    setAddress(accounts[0]);
  }
  if(!ethereum){
    return (
      <div>
        <center>
            <h1>Wallet(Metamask) Not Installed</h1>
            <a href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en" style={{ fontSize:"20px" }}>Install Wallet</a>
        </center>
      </div>
    );
  }else{

    const retrieve = async () => {
      const accounts = await window.ethereum.request({ method: 'eth_accounts' })
      if(accounts.length > 0){
        try{
          const contract = getContract()
          console.log(contract)
          const hexValue = await contract.retrieve()
          const strValue = ethers.utils.formatEther( hexValue )
          const intValue = Math.round(parseFloat(strValue) * (10 ** 18))
          console.log(intValue)
          setValue(intValue)
        }catch(e){
          console.log(e)
          // alert(e)
        }
      }else{
        alert("Account Not Connected.")
      }
    }

    const store = async () => {
      const accounts = await window.ethereum.request({ method: 'eth_accounts' })
      if(accounts.length > 0){
          try{
            const contract = getContract()
            console.log(contract)
            const tx = await contract.store(input)
            console.log(tx)
            const rc = await tx.wait();
            console.log(rc)
            setInput("")
          }catch(e){
            console.log(e)
            // alert(e)
          }
      }else{
        alert("Account Not Connected.")
      }
    }

    return(
      <div>
        <center>
          <h1>Smart Contract On Rinkeby Test Network</h1>
          <button onClick={getAddress}>{address?address:"Connect Wallet"}</button>
          <br/>
          <input 
            placeholder='Store Value...'
            type="number"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          ></input>
          <button onClick={store}>Store</button><br/>
          <span style={{display: "flex", justifyContent: "center"}}>
            <a style={{paddingRight: "40px"}}>{value}</a>
          <button onClick={retrieve}>Retrieve</button>
          </span>
          <Ethers/>
        </center>
      </div>
    )
  }
}

export default App;
