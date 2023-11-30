import { ethers } from 'ethers';
require('dotenv').config()
import axios from 'axios';
const GNOSIS_API_KEY = process.env.GNOSIS_API_KEY
const RPC_URL = process.env.RPC_URL
const provider = new ethers.JsonRpcProvider(RPC_URL)

if (!process.env.RPC_URL) {
    console.error("RPC not set!")
    process.exit(1)
}

if (!process.env.GNOSIS_API_KEY) {
    console.error("gnosis API Key not set!")
    process.exit(1)
}

const randomContractAddress = "0x4ecaba5870353805a9f068101a40e0f32ed605c6"
const txAmountToFetch = 10000
speedTest()

async function speedTest() {
    console.log(`Starting speed test for ${txAmountToFetch} transactions...`);
    const totalStartTime = Date.now();
    let gnosisApiDuration = 0;
    let nodeRequestsDuration = 0;

    try {
        console.log(`Getting ${txAmountToFetch} Hashes ${randomContractAddress} from Gnosis API`);
        const gnosisApiStartTime = Date.now();

        const url = "https://api.gnosisscan.io/api?module=account&action=txlist&address=" + randomContractAddress + "&startblock=0&endblock=29511197&page=1&offset=" + txAmountToFetch + "&sort=desc&apikey=" + GNOSIS_API_KEY;
        const response = await axios.get(url);
        gnosisApiDuration = (Date.now() - gnosisApiStartTime) / 1000; // Convert to seconds

        const transactions = response.data.result;
        const hashes = transactions.map((transaction: any) => transaction.hash);
        console.log(`Received ${hashes.length} Hashes from Gnosis API in ${gnosisApiDuration} seconds.`);

        console.log(`Getting Transaction Receipts for all hashes`);
        const nodeRequestsStartTime = Date.now();
        for (let i = 0; i < hashes.length; i++) {
            const hash = hashes[i];
            await provider.getTransactionReceipt(hash);
            if ((i + 1) % 100 === 0) {
                console.log(`${i + 1} transactions processed.`);
            }
        }
        nodeRequestsDuration = (Date.now() - nodeRequestsStartTime) / 1000; // Convert to seconds

        const totalEndTime = Date.now();
        const totalDuration = (totalEndTime - totalStartTime) / 1000; // Convert to seconds
        console.log(`Speed test for ${hashes.length} transactions took ${totalDuration} seconds.`);
        console.log(`Summary: Gnosis API request duration = ${gnosisApiDuration} seconds, Node requests duration = ${nodeRequestsDuration} seconds, Total duration = ${totalDuration} seconds.`);

    } catch (error) {
        console.error('There was an error!', error);
    }
}
