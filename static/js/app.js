// const image=document.getElementById("image");

// const preview=document.getElementById("preview");

// image.onchange=function(){

//     preview.src=URL.createObjectURL(image.files[0]);

//     preview.style.display="block";

// }

// function predict(){

//     if(image.files.length===0){

//         alert("Please choose an image.");

//         return;

//     }

//     let reader=new FileReader();

//     reader.onload=function(){

//         let base64=reader.result.split(",")[1];

//         fetch("/predict",{

//             method:"POST",

//             headers:{

//                 "Content-Type":"application/json"

//             },

//             body:JSON.stringify({

//                 image:base64

//             })

//         })

//         .then(res=>res.json())

//         .then(data=>{

//             document.getElementById("output").classList.remove("hidden");

//             document.getElementById("prediction").innerHTML=
//             "Prediction : "+data[0].image;

//             document.getElementById("confidence").innerHTML=
//             "Confidence : "+data[0].confidence+" %";

//             document.getElementById("bar").style.width=
//             data[0].confidence+"%";

//         });

//     }

//     reader.readAsDataURL(image.files[0]);

// }

const imageInput   = document.getElementById("image");
const scanZone      = document.getElementById("scan-zone");
const scanPrompt     = document.getElementById("scan-prompt");
const preview        = document.getElementById("preview");
const form           = document.getElementById("predict-form");
const analyzeBtn     = document.getElementById("analyze-btn");
const formMessage    = document.getElementById("form-message");
const resultSection  = document.getElementById("result");
const predictionEl   = document.getElementById("prediction");
const confidenceEl   = document.getElementById("confidence");
const gaugeFill      = document.getElementById("gauge-fill");

const ACCEPTED_TYPES = ["image/png", "image/jpeg"];

function setMessage(text){
  formMessage.textContent = text || "";
}

function showFile(file){
  if (!file) return;

  if (!ACCEPTED_TYPES.includes(file.type)){
    setMessage("Please choose a PNG or JPG image.");
    return;
  }

  setMessage("");
  preview.src = URL.createObjectURL(file);
  preview.style.display = "block";
  scanPrompt.style.display = "none";
  resultSection.classList.add("hidden");
}

imageInput.addEventListener("change", () => {
  showFile(imageInput.files[0]);
});

// Drag and drop support
["dragenter", "dragover"].forEach(evt =>
  scanZone.addEventListener(evt, (e) => {
    e.preventDefault();
    scanZone.classList.add("dragover");
  })
);

["dragleave", "drop"].forEach(evt =>
  scanZone.addEventListener(evt, (e) => {
    e.preventDefault();
    scanZone.classList.remove("dragover");
  })
);

scanZone.addEventListener("drop", (e) => {
  const file = e.dataTransfer.files[0];
  if (file){
    imageInput.files = e.dataTransfer.files;
    showFile(file);
  }
});

function setLoading(isLoading){
  analyzeBtn.disabled = isLoading;
  analyzeBtn.classList.toggle("loading", isLoading);
}

function tierFor(confidence){
  if (confidence >= 85) return "tier-high";
  if (confidence >= 60) return "tier-mid";
  return "";
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const file = imageInput.files[0];
  if (!file){
    setMessage("Choose an image before analyzing.");
    return;
  }

  setMessage("");
  setLoading(true);

  const reader = new FileReader();

  reader.onload = () => {
    const base64 = reader.result.split(",")[1];

    fetch("/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image: base64 })
    })
      .then(res => {
        if (!res.ok) throw new Error("Request failed");
        return res.json();
      })
      .then(data => {
        const result = Array.isArray(data) ? data[0] : data;
        const confidence = Number(result.confidence);

        predictionEl.textContent = result.image;
        confidenceEl.textContent = confidence.toFixed(1) + "%";

        gaugeFill.className = "gauge-fill " + tierFor(confidence);
        gaugeFill.style.width = "0%";
        resultSection.classList.remove("hidden");

        requestAnimationFrame(() => {
          gaugeFill.style.width = Math.min(confidence, 100) + "%";
        });
      })
      .catch(() => {
        setMessage("Couldn't reach the model. Try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  reader.onerror = () => {
    setMessage("Couldn't read that file. Try another image.");
    setLoading(false);
  };

  reader.readAsDataURL(file);
});