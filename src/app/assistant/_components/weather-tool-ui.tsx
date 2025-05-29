import { makeAssistantToolUI } from "@assistant-ui/react"
import { Spinner } from "@radix-ui/themes"

type WeatherArgs = {
  location: string
  unit: "celsius" | "fahrenheit"
}

type WeatherResult = {
  temperature: number
  description: string
  humidity: number
  windSpeed: number
}

export const WeatherToolUI = makeAssistantToolUI<WeatherArgs, WeatherResult>({
  toolName: "getWeather",
  render: ({ args, status, result }) => {
    if (status.type === "running") {
      return (
        <div className="flex items-center gap-2">
          <Spinner />
          <span>Checking weather in {args.location}...</span>
        </div>
      )
    }

    if (status.type === "incomplete" && status.reason === "error") {
      return <div className="text-red-500">Failed to get weather for {args.location}</div>
    }

    return (
      <div className="weather-card rounded-lg bg-blue-50 p-4">
        <h3 className="text-lg font-bold">{args.location}</h3>
        <div className="mt-2 grid grid-cols-2 gap-4">
          <div>
            <p className="text-2xl">
              {result?.temperature}°{args.unit === "celsius" ? "C" : "F"}
            </p>
            <p className="text-gray-600">{result?.description}</p>
          </div>
          <div className="text-sm">
            <p>Humidity: {result?.humidity}%</p>
            <p>Wind: {result?.windSpeed} km/h</p>
          </div>
        </div>
      </div>
    )
  }
})
