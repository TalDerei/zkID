import Head from "next/head";
import { useEffect, useRef, useState } from 'react';
import NET from "vanta/dist/vanta.net.min";
import * as THREE from "three";
import GoBack from "../../components/goBack";
import Link from "next/link";
import Footer from "../../components/footer";
import ViewSourceCode from "../../components/viewSourceCode";
import AIRDROP_JSON from "../../abi/Minting.json";
import WORLDID_JSON from "../../abi/Contract.json";
import { providers, Contract, ethers, BigNumber } from 'ethers';
import worldID from "@worldcoin/id";

export default function Enter() {
    const [state, setState] = useState ({
        transactionHash: "",        
    });

    let Collect = () => {
        collect();
    }

    let Verify = () => {
        verify();
    }
    
    async function collect() {
        let provider = new providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        let contract = new Contract("0x8a841773f69C245E45654536d552baa0A086FAf6", AIRDROP_JSON.abi, provider.getSigner());

        try {
            let tx = await contract.mint();
            await tx.wait()
            console.log(tx.hash)
            state.transactionHash = tx.hash;
            alert("Airdrop collected. Transaction hash is: " + state.transactionHash);
        } catch (error) {
            alert("Airdrop collection failed: " + error['data']['message'])
        }
        setState({...state})
      }

    async function verify() {
        console.log("Verify on Worldcoin!")
        try {
            worldID.init("world-id-container", {
                enable_telemetry: true,
                action_id: "wid_staging_28d5da7ab7b8ee3c993c951857641097",
                signal: "yourSignal"
            });
        }
            catch (failure) {
        }

        const result = await worldID.enable();
        console.log(result)

        // console.log("Verify on our own smart contract!")
        // let provider = new providers.Web3Provider(window.ethereum);
        // await provider.send("eth_requestAccounts", []);
        // let contract = new Contract("0x3b19c587766613D4fb3208FB954241381Fb98243", WORLDID_JSON.abi, provider.getSigner());
        // let signer = provider.getSigner();
        // let address = await signer.getAddress();

        // try {
        //     let tx = await contract.verifyAndExecute(address, result.merkle_root, result.nullifier_hash, result.proof);
        //     await tx;
        // } catch (error) {
        //     alert("Airdrop collection failed: " + error['data']['message'])
        // }

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
            <large><b>WORLD ID VERIFICATION</b></large>
          <br></br>
          <br></br>
          <div class="homepag-sub">
            {/* <small>kdmnksd</small> */}
          </div>
          <button class="button button1 key" onClick={Collect}>Airdrop Tokens</button>
          <button class="button button1 key" onClick={Verify}>Verify Worldcoin ID</button>
              <Link href='/airdrop/vote' passHref>
                <button class="button button1 key">Vote in Poll</button>
              </Link>
        </div>
          <div class="card-commitment">
            <div class="card-header">
            <b>Transaction Hash:</b>
            </div>
            <div class="card-body">
              {state.transactionHash === ''?
                <div>
                </div> 
              :
                <div>
                  {state.transactionHash}
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
        <div class="widget">
          <div id="world-id-container"></div>
        </div>
      </section>
      
    </main>
  )
}