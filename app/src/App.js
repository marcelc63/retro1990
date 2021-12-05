import React from "react";
import { useEffect, useState } from "react";
import "./App.css";
import twitterLogo from "./assets/twitter-logo.svg";
import CandyMachine from "./CandyMachine";

// Constants
const TWITTER_HANDLE = "_buildspace";
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {
  const [walletAddress, setWalletAddress] = useState(null);

  // Actions

  /*
   * Declare your function
   */
  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window;

      if (solana) {
        if (solana.isPhantom) {
          console.log("Phantom wallet found!");
          const response = await solana.connect({ onlyIfTrusted: true });
          console.log(
            "Connected with Public Key:",
            response.publicKey.toString()
          );

          /*
           * Set the user's publicKey in state to be used later!
           */
          setWalletAddress(response.publicKey.toString());
        }
      } else {
        alert("Solana object not found! Get a Phantom Wallet 👻");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const connectWallet = async () => {
    const { solana } = window;

    if (solana) {
      const response = await solana.connect();
      console.log("Connected with Public Key:", response.publicKey.toString());
      setWalletAddress(response.publicKey.toString());
    }
  };

  const renderNotConnectedContainer = () => (
    <button
      className="cta-button connect-wallet-button"
      onClick={connectWallet}
    >
      Connect to Wallet
    </button>
  );

  /*
   * When our component first mounts, let's check to see if we have a connected
   * Phantom Wallet
   */
  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  return (
    <div className="App">
      <div className="app-bg">
        <img src="/images/image1.jpeg" className="app-bg--image1" alt="" />
        <img src="/images/image2.jpeg" className="app-bg--image2" alt="" />
        <img src="/images/image3.jpeg" className="app-bg--image3" alt="" />
        <img src="/images/image4.png" className="app-bg--image4" alt="" />
      </div>
      <div className="container">
        <div className="container--inner">
          <div className="header-container">
            <p className="header">🎞 Retro 1990</p>
            <p className="sub-text">
              300 Retro PFP inspired from the 1990s fashion style in Asia
            </p>
            {!walletAddress && renderNotConnectedContainer()}
          </div>
        </div>

        {walletAddress && <CandyMachine walletAddress={window.solana} />}

        <div className="container--inner">
          Created by{" "}
          <a
            className="sub-text"
            href={`https://twitter.com/marcelc63`}
            target="_blank"
            rel="noreferrer"
          >
            @marcelc63
          </a>{" "}
          for a{" "}
          <a
            className="sub-text"
            href={`@_buildspace`}
            target="_blank"
            rel="noreferrer"
          >
            @_buildspace
          </a>{" "}
          Solana NFT project
        </div>
      </div>
    </div>
  );
};

export default App;
