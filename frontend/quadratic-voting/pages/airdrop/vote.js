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
import worldID from "@worldcoin/id";

export default function Enter() {
    const [state, setState] = useState ({
        transactionHash: "",
    });

    let VoteCandidateA = () => {
        voteA();
    }

    let VoteCandidateB = () => {
        voteB();
    }
    
    async function voteA() {
        console.log('voting A')
    }

    async function voteB() {
        console.log('voting B')
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
            <large><b>VOTING POLL</b></large>
          <br></br>
          <br></br>
          <div class="homepag-sub">
            {/* <small>kdmnksd</small> */}
          </div>
          <button class="button button1 key" onClick={VoteCandidateA}>Candidate A</button>
          <button class="button button1 key" onClick={VoteCandidateB}>Candidate B</button>
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
        <div id="world-id-container"></div>
      </section>
      
    </main>
  )
}