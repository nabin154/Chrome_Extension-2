const field = document.querySelector(".first-input");
const btn = document.querySelector("#btn");
const result = document.querySelector("#result");

// field.addEventListener("change", async () => {
//   let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

//   chrome.scripting.executeScript({
//     target: { tabId: tab.id },
//     function: postDetails,
//   });
// });

field.addEventListener("change", async () => {
  const pics = field.files[0];
  if (!pics) {
    window.alert("Please select an image");
    return;
  }

  if (pics.type.startsWith("image/")) {
    const data = new FormData();
    data.append("file", pics);
    data.append("upload_preset", "****");
    data.append("cloud_name", "******");

    fetch("https://api.cloudinary.com/v1_1/*****/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        result.value = data.url.toString();
        console.log(data.url.toString());
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    window.alert("Please select a valid image");
    return;
  }
});


btn.addEventListener("click" , ()=>{
  
    navigator.clipboard.writeText(result.value)
      .then(() => {
        btn.innerHTML = 'copied';
        })
        .catch(err => {
            console.error('Unable to copy text to clipboard', err);
        });
});