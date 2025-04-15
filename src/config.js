export const API_URL = window.location.hostname === "localhost" 
  ? "http://localhost:8181" // Replace with your local API URL
  : "https://ezeamara212-8181.theiadockernext-0-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/";

console.log("API_URL:", API_URL);

// Example fetch request
fetch(API_URL)
  .then(response => response.json())
  .then(data => console.log("API Response:", data))
  .catch(error => console.error("Fetch Error:", error));