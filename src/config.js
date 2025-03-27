// src/config.js
// src/config.js
export const API_URL = window.location.hostname.includes("theiadockernext") 
  ? "https://ezeamara212-8181.theiadockernext-1-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai"
  : "http://localhost:8181";
console.log(
    "API_URL :",
    API_URL
);