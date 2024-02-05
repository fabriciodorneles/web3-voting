import Web3 from "web3";
import ABI from "./ABI.json";

const CONTRACT_ADDRESS = "0x6827192b97E9FE29107b2116aFE77F43bc0B518C";

export async function doLogin() {
    if (!window.ethereum) throw new Error("No MetaMask found.");

    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.requestAccounts();
    if (!accounts || !accounts.length) throw new Error("Wallet not found/allowed");

    localStorage.setItem("wallet", accounts[0]);
    return accounts[0];
}

const getContract = () => {
    const wallet = localStorage.getItem('wallet');
    if(!wallet) throw new Error("Unhautorized");

    const web3 = new Web3(window.ethereum);
    return new web3.eth.Contract(ABI, CONTRACT_ADDRESS, { from: wallet});
};

export async function getCurrentVoting(){
    const contract = getContract();
    return contract.methods.getCurrentVoting().call();
}

export async function addVote(choice){
    const contract = getContract();
    return contract.methods.addVote(choice).send();
}
