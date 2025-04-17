// config.js
export const API_URL = window.location.hostname === "localhost" 
  ? "http://localhost:8181" // Your local development server
  : "https://ezeamara212-8181.theiadockernext-1-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai"; // Remove trailing slash

console.log("Configured API_URL:", API_URL);