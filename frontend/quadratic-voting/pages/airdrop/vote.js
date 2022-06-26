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
        let contractERC20 = new Contract("0x8a841773f69C245E45654536d552baa0A086FAf6", AIRDROP_JSON.abi, providerERC20.getSigner());

        let provider = new providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        let contract = new Contract("0x6608434e5b85D4567eb9c70fabC2480f7d33d343", VOTING_JSON.abi, provider.getSigner());
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
        let contractERC20 = new Contract("0x8a841773f69C245E45654536d552baa0A086FAf6", AIRDROP_JSON.abi, providerERC20.getSigner());

        let provider = new providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        let contract = new Contract("0x6608434e5b85D4567eb9c70fabC2480f7d33d343", VOTING_JSON.abi, provider.getSigner());
        let signer = provider.getSigner();
        let address = await signer.getAddress();
        console.log(address)
        let balance = await (contractERC20.balanceOf(address)) / 1000000000000000000
        console.log(balance)

        try {
            let tx = await contract.voteForCandidate(1, address, 3232323232, balance);
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
        let contract = new Contract("0x6608434e5b85D4567eb9c70fabC2480f7d33d343", VOTING_JSON.abi, provider.getSigner());

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
        let contract = new Contract("0x6608434e5b85D4567eb9c70fabC2480f7d33d343", VOTING_JSON.abi, provider.getSigner());

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
    voteAEffect()
    voteBEffect()
}, []);

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
        <div class="proof-new">
            <div class="card-header">
                <b>Score:</b>
            </div>
            <div class="card-body">
                {state.candidateAScore === ''?
            <div>
            </div> :
            <div>
                {state.candidateAScore}
            </div>
            }
            </div>
        </div>
        <div class="proof-new-2">
            <div class="card-header">
                <b>Score:</b>
            </div>
            <div class="card-body">
                {state.candidateBScore === ''?
            <div>
            </div> :
            <div>
                {state.candidateBScore}
            </div>
            }
            </div>
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