import { openai } from "@ai-sdk/openai"
import { auth } from "@clerk/nextjs/server"
import { streamText, tool } from "ai"
import { z } from "zod"
const fetchWeatherAPI = async (location: string) => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 2000))

  // Return mock weather data
  return {
    temp: Math.floor(Math.random() * 30) + 5, // Random temperature between 5-35
    condition: ["Sunny", "Cloudy", "Light Rain", "Heavy Rain", "Thunderstorm", "Overcast"][Math.floor(Math.random() * 6)],
    humidity: Math.floor(Math.random() * 50) + 30, // Random humidity between 30-80%
    wind: Math.floor(Math.random() * 30) + 5, // Random wind speed between 5-35 km/h
    location: location // Return the requested location
  }
}

export async function POST(req: Request) {
  console.log("authData pre")
  const authData = await auth()
  console.log("authData post", authData)
  const { messages } = await req.json()

  const result = streamText({
    model: openai("gpt-4o"),
    messages,
    tools: {
      getWeather: tool({
        description: "Get current weather for a location",
        parameters: z.object({
          location: z.string(),
          unit: z.enum(["celsius", "fahrenheit"])
        }),
        execute: async ({ location, unit }) => {
          const weather = await fetchWeatherAPI(location)
          console.log("weather", weather)
          return {
            temperature: weather.temp,
            description: weather.condition,
            humidity: weather.humidity,
            windSpeed: weather.wind
          }
        }
      })
    }
  })

  return result.toDataStreamResponse()
}
