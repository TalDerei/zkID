import Link from "next/link";
import { Button } from "reactstrap";

export default function Home() {
  return (
    <div class="homepage-buttons">
        <Link href='/airdrop/verify' passHref>
          <button class="button button2 draw">VERIFY AND VOTE</button>
        </Link>
    </div>
  );
}