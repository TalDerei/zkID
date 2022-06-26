import Head from "next/head";
import { useEffect, useRef, useState } from 'react';
import NET from "vanta/dist/vanta.net.min";
import * as THREE from "three";
import GoBack from "../../components/goBack";
import Link from "next/link";
import Footer from "../../components/footer";
import ViewSourceCode from "../../components/viewSourceCode";
import AIRDROP_JSON from "../../abi/Minting.json";
import VOTING_JSON from "../../abi/Voting.json";
import { providers, Contract, ethers, BigNumber } from 'ethers';
import worldID from "@worldcoin/id";

export default function Enter() {
    const [state, setState] = useState ({
        candidateAScore: "",
        candidateBScore:""
    });

    let VoteCandidateA = () => {
        voteA();
    }

    let VoteCandidateB = () => {
        voteB();
    }
    
    async function voteA() {
        let providerERC20 = new providers.Web3Provider(window.ethereum);
        await providerERC20.send("eth_requestAccounts", []);
        let contractERC20 = new Contract("0xf732888FcCad9DEc322AC365Da0341f25fCFff06", AIRDROP_JSON.abi, providerERC20.getSigner());

        let provider = new providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        let contract = new Contract("0x7cfC78f1C21041a476000773AcA2731AecC6FEc8", VOTING_JSON.abi, provider.getSigner());
        let signer = provider.getSigner();
        let address = await signer.getAddress();
        console.log(address)
        let balance = await (contractERC20.balanceOf(address)) / 1000000000000000000
        console.log(balance)

        try {
            let tx = await contract.voteForCandidate(0, address, 3232323232, balance);

            let votesCast = await contract.voterVotesCast(address)
            let votesRecognized = await contract.voterVotesRecognised(address)
            alert("Vote successfull! You had a balance of: " + votesCast);
            alert("This equates to voting power of: " + votesRecognized);
            
            let votesTotal = await contract.totalVotesFor(0);
            console.log("total votes are: " + votesTotal)

            state.candidateAScore = votesTotal * 1;
            
            alert("candidateAScore is: " + state.candidateAScore);

        } catch (error) {
            alert("Airdrop collection failed: " + error['data']['message'])
        }
        setState({...state})
    }

    async function voteB() {
        let providerERC20 = new providers.Web3Provider(window.ethereum);
        await providerERC20.send("eth_requestAccounts", []);
        let contractERC20 = new Contract("0xf732888FcCad9DEc322AC365Da0341f25fCFff06", AIRDROP_JSON.abi, providerERC20.getSigner());

        let provider = new providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        let contract = new Contract("0x7cfC78f1C21041a476000773AcA2731AecC6FEc8", VOTING_JSON.abi, provider.getSigner());
        let signer = provider.getSigner();
        let address = await signer.getAddress();
        console.log(address)
        let balance = await (contractERC20.balanceOf(address)) / 1000000000000000000
        console.log(balance)

        try {
            let tx = await contract.voteForCandidate(1, address, 3232323233, balance);

            let votesCast = await contract.voterVotesCast(address)
            let votesRecognized = await contract.voterVotesRecognised(address)
            alert("Vote successfull! You had a balance of: " + votesCast);
            alert("This equates to voting power of: " + votesRecognized);
            
            let votesTotal = await contract.totalVotesFor(1);
            console.log("total votes are: " + votesTotal)

            state.candidateBScore = votesTotal * 1;
            
            alert("candidateBScore is: " + state.candidateBScore);

        } catch (error) {
            alert("Airdrop collection failed: " + error['data']['message'])
        }
        setState({...state})
    }

    async function voteAEffect() {
        let provider = new providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        let contract = new Contract("0x7cfC78f1C21041a476000773AcA2731AecC6FEc8", VOTING_JSON.abi, provider.getSigner());

        try {
            let votesTotal = await contract.totalVotesFor(0);
            state.candidateAScore = votesTotal * 1;
    
        } catch (error) {
            alert("Airdrop collection failed: " + error['data']['message'])
        }
        setState({...state})
    }

    async function voteBEffect() {
        let provider = new providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        let contract = new Contract("0x7cfC78f1C21041a476000773AcA2731AecC6FEc8", VOTING_JSON.abi, provider.getSigner());

        try {
            let votesTotal = await contract.totalVotesFor(1);
            state.candidateBScore = votesTotal * 1;
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

  useEffect(() => {
    if (typeof window == 'undefined') {
        console.log("woooooo")
    }
    voteAEffect()
    voteBEffect()
}, []);

  return (
    <main ref={vantaRef}>
      <section className="general">
        <br></br>
        <br></br>
        <div className="wager">
            <large><b>VOTING POLL</b></large>
          <br></br>
          <br></br>
          <div className="homepag-sub">
            {/* <small>kdmnksd</small> */}
          </div>
          <button className="button button1 key" onClick={VoteCandidateA}>Candidate A</button>
          <button className="button button1 key" onClick={VoteCandidateB}>Candidate B</button>
        </div>
          <div>
            <br></br>
            <br></br>
          </div>
          <div>
        </div>
        <div className="proof-new">
            <div className="card-header">
                <b>Score:</b>
            </div>
            <div className="card-body">
                {state.candidateAScore === ''?
            <div>
            </div> :
            <div>
                {state.candidateAScore}
            </div>
            }
            </div>
        </div>
        <div className="proof-new-2">
            <div className="card-header">
                <b>Score:</b>
            </div>
            <div className="card-body">
                {state.candidateBScore === ''?
            <div>
            </div> :
            <div>
                {state.candidateBScore}
            </div>
            }
            </div>
        </div>
        <div className="test-lottery">
          <p>
          <Link href='/airdrop/test' passHref>
            <a className="test">
            </a>
          </Link>
          </p>
        </div>
        <div classNameName="mb-10">
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