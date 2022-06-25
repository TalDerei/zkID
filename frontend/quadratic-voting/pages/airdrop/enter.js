import Head from "next/head";
import { useEffect, useRef, useState } from 'react';
import NET from "vanta/dist/vanta.net.min";
import * as THREE from "three";
import GoBack from "../../components/goBack";
import Link from "next/link";
import Footer from "../../components/footer";
import ViewSourceCode from "../../components/viewSourceCode";
import AIRDROP_JSON from "../../abi/Minting.json";
import { providers, Contract, ethers, BigNumber } from 'ethers';

export default function Enter() {
    const [state, setState] = useState ({
        transactionHash: "",
    });

    let collectTokens = () => {
        collect();
    }

    async function collect() {
      let provider = new providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      let signer = provider.getSigner();
      let address = await signer.getAddress();
      console.log("address is: " + address)

      // need to fix
      let contract = new Contract("0x9Cb4Fb9728aE2b5494eee172FF978d84c8e938F6", AIRDROP_JSON.abi, provider.getSigner());

      try {
          let tx = await contract.random();
          console.log(tx.hash)
          state.transactionHash = tx.hash;
          alert("ERC-20 collected. Transaction hash is: " + state.transactionHash);
      } catch (error) {
          alert("Airdrop collection failed: " + error['data']['message'])
      }
      setState({...state})
    }

  const [vantaEffect, setVantaEffect] = useState(0);
  const vantaRef = useRef(null);
  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        NET({
          el: vantaRef.current,
          THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 500.00,
          scale: 1.00,
          scaleMobile: 1.00,
          color: 0x463131,
          backgroundColor: 0x6b6b82,
          maxDistance: 13.00
        })
      )
    }
    return () => {
      if (vantaEffect) {
        vantaEffect.destroy()
      }
    }
  }, [vantaEffect])

  return (
    <main ref={vantaRef}>
      <section class="general">
        <br></br>
        <br></br>
        <div class="wager">
            <large><b>GET TOKENS</b></large>
          <br></br>
          <br></br>
          <div class="homepag-sub">
            {/* <small>kdmnksd</small> */}
          </div>
          <button class="button button1 key" onClick={collectTokens}>Recieve Random Amount of Tokens</button>
        </div>
          <div class="card-commitment">
            <div class="card-header">
            <b>Transaction Hash:</b>
            </div>
            <div class="card-body">
              {state.commitment === ''?
                <div>
                </div> 
              :
                <div>
                  {state.commitment}
                </div>
              }
            </div>
          </div>
          <div>
            <br></br>
            <br></br>
          </div>
          <div>
        </div>
        <div class="test-lottery">
          <p>
          <Link href='/airdrop/test' passHref>
            <a class="test">
            </a>
          </Link>
          </p>
        </div>
        <div className="mb-10">
          <GoBack />
        </div>
        <div>
            <Footer />
        </div>
        <div>
            <ViewSourceCode />
        </div>
      </section>
      
    </main>
  )
}