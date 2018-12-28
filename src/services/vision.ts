export async function identify(blob: Blob) {
  const response = await fetch('https://southcentralus.api.cognitive.microsoft.com/customvision/v2.0/Prediction/216d2186-e826-4d9e-9ab4-b42b34ed65d4/image?iterationId=778e2d68-a120-45c1-bbeb-e18fc243d970', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/octet-stream',
      'Prediction-Key': '2a58718ea5834c3bab8f64e0f5ce67e3'
    },
    body: blob
  });

  const data = await response.json();
  console.log(data);
  
  return data;
}