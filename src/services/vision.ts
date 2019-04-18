export async function identify(blob: Blob) {
  console.log(blob);
  const response = await fetch('https://westus2.api.cognitive.microsoft.com/customvision/v3.0/Prediction/1b66b7e0-4967-460a-af78-be04442be93f/classify/iterations/Iteration1/image', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/octet-stream',
      'Prediction-Key': '4206e2412f6c4e1685dfeeec2edd762d'
    },
    body: blob
  });

  const data = await response.json();
  console.log(data);
  
  return data;
}

