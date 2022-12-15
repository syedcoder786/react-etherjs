import React from 'react';
import { connect } from "../wrapper/contactWrapper"
import { ethers } from  "ethers"
function Ethers(props) {
    const pay = async () => {
        const provider = connect()
        const signer = provider.getSigner()
        console.log(signer)
        try{
            const tx = await signer.sendTransaction({
                to:"0x85b808cd15D31A1Fa94dfF276c16Ee9C659e60Ea",
                value: ethers.utils.parseEther("1")
            })
            const rc = await tx.wait()
            console.log(rc)
        }catch(e){
            console.log(e.error.message)
        }
    }
    return (
        <div>
            <h1>Send Transaction</h1>
            <button onClick={pay}>Pay</button>
        </div>
    );
}

export default Ethers;