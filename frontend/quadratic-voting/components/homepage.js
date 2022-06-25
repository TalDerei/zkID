import Link from "next/link";
import { Button } from "reactstrap";

export default function Home() {
  return (
    <div class="homepage-buttons">
        <Link href='/airdrop/enter' passHref>
          <button class="button button1 enter">COLLECT TOKENS</button>
        </Link>
        <Link href='/airdrop/enter' passHref>
          <button class="button button2 draw">POLL VOTING</button>
        </Link>
    </div>
  );
}