//async function postData(url) {
//  try {
//    const response = await fetch(url, {
//      
//});
//const data = await response.json();
//return data;
//} catch (error) {
//   console.error(error);
//   return error;
// }
//}

//const data = postData('https://discordapp.com/api/webhooks/1071546043235324004/TMnzF4ITFoUi5dunMqx8FfG19BSL5QjUjwUSSvojx8wZV1lm03gdWypWN4DYaQFFrFbg');
//data.then(response => {
//   console.log(response);
//});

/*
    content: content
*/



async function postData(url, data) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    return response.status
  } catch (error) {
    console.error(error);
    return error;
  }
}

const result = postData('https://discordapp.com/api/webhooks/1071546043235324004/TMnzF4ITFoUi5dunMqx8FfG19BSL5QjUjwUSSvojx8wZV1lm03gdWypWN4DYaQFFrFbg', { content: JSON.stringify({
  sscc: 'garblegarble'
}) });
result.then(async (response) => {
  console.log(response);
});



