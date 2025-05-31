import axios from "axios";
import config from "config";

/**
 * Generate grocery recommendations using Gemini API.
 * @param {Object} userData - The user data submitted in the form.
 * @param {Array} groceryData - The researched grocery dataset.
 * @returns {Promise<string>} - AI-generated grocery recommendations.
 */
export async function generateGroceryRecommendations(userData, groceryData) {
  try {
    // ✅ Correct API Key Retrieval
    const apiKey = config.get("geminiApiKey");

    if (!apiKey) {
      console.error("⚠️ Error: GEMINI_API_KEY is missing in config!");
      return "Error: AI recommendation service unavailable.";
    }

    console.log("✅ Gemini API Key Loaded");

    // ✅ Constructing API URL correctly
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    // ✅ Construct AI Prompt
    const prompt = `
      User Profile:
      - Name: ${userData.name}
      - Age: ${userData.age}
      - Gender: ${userData.gender}
      - Religion: ${userData.religion}
      - City: ${userData.city}
      - Household Type: ${userData.householdType}
      - Family Composition: ${userData.familyComposition}
      - Health Goals: ${userData.healthGoals}
      - Dietary Preference: ${userData.dietaryPreference}
      - Allergies: ${userData.allergies}
      - Health Conditions: ${userData.healthConditions}

      Based on the following researched grocery dataset:
      ${JSON.stringify(groceryData, null, 2)}

      You are an AI that recommends groceries based on researched data. Given the following structured data, contain various how consumption of different families analyse this data and give me suggestions of only groceries for userinput.
      output structure includes userinput data and suggestions.

###researched data
[
  {
    "Age": 45,
    "Religion": "Hindu",
    "City": "Vijayawada",
    "Household Type": "Joint Family (6)",
    "Family Composition": "6 persons: 1 elder, 3 middle-aged, 2 children",
    "Notes": "Multi-generational; prefers traditional low-sugar options for elders",
    "Grocery Items": {
      "Grains": ["Rice (15 kg)", "Idli Rice (5 kg)"],
      "Pulses": ["Toor Dal (5 kg)", "Moong Dal (2 kg)"],
      "Vegetables": ["Onions (5 kg)", "Tomatoes (4 kg)", "Potatoes (3 kg)", "Spinach (1 kg)"],
      "Dairy": ["Milk", "Curd"],
      "Oils": ["Sunflower Oil (5 L)", "Sesame Oil (1 L)"],
      "Others": ["Pickles (1 kg)", "Turmeric Powder (500 g)", "Chicken Masala (100 g)", "Chat Masala (100 g)"]
    }
  },
  {
    "Age": 32,
    "Religion": "Muslim",
    "City": "Hyderabad",
    "Household Type": "Nuclear Family (4)",
    "Family Composition": "4 persons: 2 adults, 2 children",
    "Notes": "Balanced meals; organic preferences",
    "Grocery Items": {
      "Grains": ["Rice (10 kg)", "Brown Rice (5 kg)", "Basmati Rice (2 kg)"],
      "Pulses": ["Chana Dal (3 kg)", "Moong Dal (2 kg)"],
      "Vegetables": ["Onions (3 kg)", "Carrots (2 kg)", "Bell Peppers (2 kg)"],
      "Dairy": ["Organic Milk", "Yogurt"],
      "Oils": ["Olive Oil (1 L)", "Sunflower Oil (3 L)"]
    }
  },
  {
    "Age": 42,
    "Religion": "Christian",
    "City": "Hyderabad",
    "Household Type": "Nuclear Family (5)",
    "Family Composition": "5 persons: 2 adults, 2 children, 1 elder",
    "Notes": "Balanced diet with mix of vegetarian and non-veg items",
    "Grocery Items": {
      "Grains": ["Rice (12 kg)", "Jeera Rice (4 kg)", "Basmati Rice (6 kg)"],
      "Pulses": ["Toor Dal (4 kg)"],
      "Vegetables": ["Onions (3 kg)", "Broccoli (1 kg)", "Tomatoes (4 kg)"],
      "Dairy": ["Low-Fat Milk (8 L)", "Greek Yogurt (1 kg)"],
      "Oils": ["Olive Oil (1 L)", "Sunflower Oil (2 L)"]
    }
  },
  {
    "Age": 22,
    "Religion": "Hindu",
    "City": "Warangal",
    "Household Type": "Single (1)",
    "Family Composition": "1 person",
    "Notes": "Urban lifestyle; prefers quick and ready-to-eat meals",
    "Grocery Items": {
      "Grains": ["Instant Rice Packets (1.5 kg)"],
      "Vegetables": ["Onions (1 kg)", "Pre-washed Salad Mix (500 g)"],
      "Dairy": ["Milk"],
      "Oils": ["Sunflower Oil (1 L)"],
      "Others": ["Instant Noodles (5 packets)", "Snack Chips (200 g)"]
    }
  },
  {
    "Age": 40,
    "Religion": "Hindu",
    "City": "Warangal",
    "Household Type": "Joint Family (7)",
    "Family Composition": "7 persons: 2 elders, 3 middle-aged, 2 children",
    "Notes": "Large family with diverse dietary preferences",
    "Grocery Items": {
      "Grains": ["Boiled Rice (35 kg)", "Idli Rice (10 kg)"],
      "Pulses": ["Toor Dal (8 kg)", "Moong Dal (3 kg)"],
      "Vegetables": ["Onions (6 kg)", "Tomatoes (5 kg)", "Spinach (2.5 kg)"],
      "Dairy": ["Milk", "Curd"],
      "Oils": ["Sunflower Oil (8 L)", "Sesame Oil (2.5 L)"]
    }
  },
  {
    "Religion": "Hindu",
    "City": "Vijayawada",
    "Household Type": "Joint Family (6)",
    "Family Composition": "6 persons: 1 elder, 3 middle-aged, 2 children",
    "Notes": "Family-centric meals with traditional recipes",
    "Grocery Items": {
      "Grains": ["Sona Masuri Rice (30 kg)", "Idli Rice (8 kg)"],
      "Pulses": ["Toor Dal (6 kg)", "Chana Dal (2 kg)"],
      "Vegetables": ["Onions (5 kg)", "Tomatoes (4 kg)", "Spinach (3 kg)"],
      "Dairy": ["Milk", "Curd"],
      "Oils": ["Sunflower Oil (7 L)", "Sesame Oil (2 L)"]
    }
  },
  {
    "Religion": "Hindu",
    "City": "Guntur",
    "Household Type": "Joint Family (5)",
    "Family Composition": "5 persons: 2 elders, 3 middle-aged",
    "Notes": "Regional meals; large quantities for family",
    "Grocery Items": {
      "Grains": ["Boiled Rice (30 kg)", "Idli Rice (7 kg)"],
      "Pulses": ["Toor Dal (5 kg)"],
      "Vegetables": ["Onions (5 kg)", "Spinach (2 kg)", "Tomatoes (4 kg)"],
      "Dairy": ["Milk", "Paneer (1 kg)"],
      "Oils": ["Sunflower Oil (5 L)", "Sesame Oil (2 L)"]
    }
  },
  {
    "Religion": "Hindu",
    "City": "Vijayawada",
    "Household Type": "Joint Family (6)",
    "Family Composition": "6 persons: 2 elders, 3 middle-aged, 1 child",
    "Notes": "Traditional meals with weekly stocking",
    "Grocery Items": {
      "Grains": ["Sona Masuri Rice (28 kg)", "Idli Rice (6 kg)"],
      "Pulses": ["Toor Dal (6 kg)"],
      "Vegetables": ["Onions (5 kg)", "Spinach (2 kg)", "Potatoes (4 kg)"],
      "Dairy": ["Milk", "Curd"],
      "Oils": ["Sesame Oil (1 L)", "Sunflower Oil (7 L)"]
    }
  },
  {
    "Age": 36,
    "Religion": "Muslim",
    "City": "Hyderabad",
    "Household Type": "Nuclear Family (5)",
    "Family Composition": "5 persons: 2 adults, 2 children, 1 elder",
    "Notes": "Prioritizes organic ingredients and mild spices",
    "Grocery Items": {
      "Grains": ["Basmati Rice (10 kg)", "Whole Wheat Flour (5 kg)"],
      "Pulses": ["Chana Dal (3 kg)"],
      "Vegetables": ["Onions (3 kg)", "Spinach (2 kg)", "Carrots (1.5 kg)"],
      "Dairy": ["Organic Milk", "Yogurt (2.5 kg)"],
      "Oils": ["Olive Oil (1 L)", "Sunflower Oil (3 L)"]
    }
  },
  {
    "Age": 50,
    "Religion": "Hindu",
    "City": "Vijayawada",
    "Household Type": "Joint Family (8)",
    "Family Composition": "8 persons: 2 elders, 4 middle-aged, 2 children",
    "Notes": "Large joint family; bulk purchases of staples",
    "Grocery Items": {
      "Grains": ["Sona Masuri Rice (35 kg)", "Idli Rice (10 kg)"],
      "Pulses": ["Toor Dal (8 kg)", "Moong Dal (3 kg)"],
      "Vegetables": ["Onions (6 kg)", "Tomatoes (5 kg)", "Spinach (3 kg)", "Potatoes (4 kg)"],
      "Dairy": ["Milk", "Curd"],
      "Oils": ["Sunflower Oil (8 L)", "Sesame Oil (2 L)"]
    }
  }
]
### Task:
1. Identify the closest match in the researched data.
2. Generate a grocery list based on that match, adjusting quantities if needed.
3. If no exact match is found, suggest a new list based on patterns in the research data.


give output in plain text 



    `;

    // ✅ Send API Request
    const response = await axios.post(
      apiUrl,
      {
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }],
          },
        ],
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    // ✅ Extract AI-generated response
    const aiResponse =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No recommendations available.";

    return aiResponse;
  } catch (error) {
    console.error(
      "❌ Gemini API Error:",
      error.response?.data || error.message
    );
    return "Error: Unable to fetch AI recommendations.";
  }
}
