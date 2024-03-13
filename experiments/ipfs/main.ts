import fetch from 'node-fetch';
const FormData = require('form-data');

const ipfsAPI = 'http://127.0.0.1:5001/api/v0';

async function uploadAndPinJSONData(data) {
  const jsonData = { content: data };
  const jsonBuffer = Buffer.from(JSON.stringify(jsonData));

  const formData = new FormData();
  formData.append('file', jsonBuffer, 'data.json');
  try {
    const addResponse = await fetch(`${ipfsAPI}/add`, {
      method: 'POST',
      body: formData,
    });
    const addResult = await addResponse.json();

    const cid = addResult.Hash;

    const pinResponse = await fetch(`${ipfsAPI}/pin/add?arg=${cid}`, {
      method: 'POST',
    });
    const pinResult = await pinResponse.json();

    console.log('Pinned CID:', cid);
    return cid;
  } catch (error) {
    console.error('Error uploading and pinning JSON data:', error);
    throw error;
  }
}

const userData = "User provided text here";
uploadAndPinJSONData(userData)
  .then(cid => console.log(`JSON data successfully uploaded and pinned with CID: ${cid}`))
  .catch(error => console.error(error));
