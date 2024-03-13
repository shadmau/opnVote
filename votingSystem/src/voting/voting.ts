import { ethers } from "ethers";
import { validateSignature, validateToken } from "../utils/utils";
import { Signature, Token } from "../types/types";

signVotingTransaction()
async function signVotingTransaction(){
// function signVotingTransaction(electionID:number, voter:ethers.AddressLike, unblindedElectionToken:Token, unblindedSignature:Signature ){
    // validateSignature(unblindedSignature)
    // validateToken(unblindedElectionToken)
    const wallet = new ethers.Wallet("")
    const message = ethers.solidityPackedKeccak256(
        ['uint256', 'address', 'bytes', 'bytes', 'bytes'],
        [0,"0xf9562D5EaC0ACFAe5274Aa30F7231d62818B593C", "0xa8b2511c3fd5b7991438bae77d1c886a26c5938873352df14fe1eb592e6323fdc238ebb4e838dc6aedc01ec995ed7f9b0c24a6553418c6363419d6f7e50977bd6e92d022e1ff3c5d8b39ed62f317fe06d7d118e1d3db7e6d111dfa88fedc0eaad30014c1d68c312426f2485821671a91afad6be65cfa0cc77edfb95c9ba9013ee6769d608aa51078b5bdd2e5825415881e4b3470da9af81298ed8416e08374ef0056a047d74e5d7e5245e444c29b757faf9cb49fd0abacf4f16534fb46c37d2810134002c987503c6371f9bc6900a6df2c9f8b2d686ebe5536e7caa3b8f160bc1ead3644e1493a380505cdd333dc9a6837f140b7251ff9fb9a30863b56d59981"
    , "0x0d00c14777a356fe09e16c92a8e0dca9fbf0aed4ef95ece383e03de3fe860f79","0x12d6d3f3f695b2d9858596982b04f91249aff17d018a7ef3909bcfe91acf611fb133109ac1e5c85478b4248a24498651aa9c5db09836c4b4343ff5c2b643b6d7"  ]
    );
    const signature = await wallet.signMessage(ethers.toBeArray(message));


    // address voter = address(0x3F854aeCA2cc8A77C5341475D71e4D2BA3E95839);
    // bytes memory svsSignature = hex"5a349e942454c1c323fb1711177be509da4c71931fb6e4eab8a2059c2d2917197b503353082e419e3c84d91677c694f530ce0ca642b461e05e7be85284848ed61c"; // Dummy data
    // bytes memory unblindedElectionToken = hex"0d00c14777a356fe09e16c92a8e0dca9fbf0aed4ef95ece383e03de3fe860f79"; // Dummy data
    // bytes memory unblindedSignature = hex"12d6d3f3f695b2d9858596982b04f91249aff17d018a7ef3909bcfe91acf611fb133109ac1e5c85478b4248a24498651aa9c5db09836c4b4343ff5c2b643b6d7"; // Dummy data
    // bytes memory vote_encrypted = hex"a8b2511c3fd5b7991438bae77d1c886a26c5938873352df14fe1eb592e6323fdc238ebb4e838dc6aedc01ec995ed7f9b0c24a6553418c6363419d6f7e50977bd6e92d022e1ff3c5d8b39ed62f317fe06d7d118e1d3db7e6d111dfa88fedc0eaad30014c1d68c312426f2485821671a91afad6be65cfa0cc77edfb95c9ba9013ee6769d608aa51078b5bdd2e5825415881e4b3470da9af81298ed8416e08374ef0056a047d74e5d7e5245e444c29b757faf9cb49fd0abacf4f16534fb46c37d2810134002c987503c6371f9bc6900a6df2c9f8b2d686ebe5536e7caa3b8f160bc1ead3644e1493a380505cdd333dc9a6837f140b7251ff9fb9a30863b56d59981"; // Your encrypted vote data



    // uint256 electionID,
    // address voter,
    // bytes calldata vote_encrypted,
    // bytes calldata unblindedElectionToken,
    // bytes calldata unblindedSignature

console.log(signature)

    // const messageHashBinary = ethers.utils.arrayify(messageHash)
    // const signature = await addr1.signMessage(messageHashBinary);
    
    //dummy AP: 0x6C4fFD7787b77283e245ab614e96ED9C54f9A637:0xdfe7e1156fb34fdbd40c12ca0fc9f66a5b5f739547b35fb2da8b549a345e728f
//dummy SVS: 0x3F854aeCA2cc8A77C5341475D71e4D2BA3E95839:0x01456d6e4795f26ef6b04a8a1627c53f08e1490448972d644157befed1b71ad1
//dummy Register: 0xb3A15aE9B6F4DcF6c1F2FCbfA2a54D549B543243:0xf4187aec80a997ef7a0546c426213efbd37bf96d62f8661bffdd0b149497cc45
}

//        opnVote.vote(0, voter, svsSignature, vote_encrypted, unblindedElectionToken, unblindedSignature);


// const crypto = require('crypto');


// export function encryptVote() {

//     const vote = "0120120120"; // Simplified encoding for demonstration

// }


// function generateRsaKeyPair() {
//     const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
//         modulusLength: 2048,  // Bits
//         publicKeyEncoding: {
//             type: 'spki',
//             format: 'pem'
//         },
//         privateKeyEncoding: {
//             type: 'pkcs8',
//             format: 'pem'
//         }
//     });

//     return { publicKey, privateKey };
// }

// function rsaEncrypt(publicKey: any, data: WithImplicitCoercion<string> | { [Symbol.toPrimitive](hint: "string"): string; }) {
//     const buffer = Buffer.from(data, 'utf8');
//     const encrypted = crypto.publicEncrypt(publicKey, buffer);
//     return encrypted.toString('base64');  // Convert encrypted data to base64 for easier handling
// }

// function rsaEncryptToHex(publicKey: any, data: WithImplicitCoercion<string> | { [Symbol.toPrimitive](hint: "string"): string; }) {
//     const buffer = Buffer.from(data, 'utf8');
//     const encrypted = crypto.publicEncrypt(publicKey, buffer);
//     return encrypted.toString('hex');  // Convert encrypted data to hex
// }

// // Example usage
// const { publicKey, privateKey } = generateRsaKeyPair();
// const encryptedVote = rsaEncryptToHex(publicKey, "0120120120");
// console.log('Encrypted Vote:', encryptedVote);

