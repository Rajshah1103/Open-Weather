import { getClient } from "@/apollo-client"
import { CalloutCard, HumidityChart, InformationPanel, RainChart, StatCard,TempChart } from "@/components";
import fetchWeatherQuery from "@/graphql/queries/fetchWeatherQueries";
import { Metadata } from "next";

export const metadata:Metadata = {
    title: "Open Weather App | INFO",
    description: "An AI powered Weather App which uses ChatGPT to summarize the data for the user"
}

export const revalidate = 60;

interface WeatherProps{
    params: {
        city:string,
        lat:string,
        long:string
    }
}


async function WeatherPage({params: {city,lat,long} }:WeatherProps) {
    const client = getClient();

    const { data } = await client.query({
        query: fetchWeatherQuery,
        variables: {
            current_weather: "true",
            longitude:long,
            latitude: lat,
            timezone: "GMT"
        }
    })

    const results: Root = data.myQuery;

    // console.log(results);

    // const dataToSend = cleanData(results,city);
    // console.log(dataToSend);

    // const res = await fetch("http://localhost:3000/api/getWeatherSummary",{
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //         weatherData: dataToSend
    //     })
    // })

    // const gptData = await res.json();
    // const {content} = gptData;

    return(
        <div className="flex flex-col min-h-screen md:flex-row">
            <InformationPanel city = {city} long={long} lat = {lat} results = {results}/>
            <div className="flex-1 p-5 lg:p-10">
                <div className="p-5">
                    <div className="pb-5">
                        <h2 className="text-xl font-bold">Today's Overview</h2>
                        <p className="text-sm text-gray-400">Last Updated at: {" "}
                            {new Date(results.current_weather.time).toLocaleString()}({results.timezone})
                        </p>
                    </div>

                    {/* <div className="m-2 mb-10">
                        <CalloutCard message={content}/>
                    </div> */}

                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 m-2">
                        <StatCard
                            title="Current Temperature"
                            metric={`${results.current_weather.temperature} ℃`}
                            color="yellow"
                        />
                        <StatCard
                            title="Relative Humidity"
                            metric={`${results.hourly.relativehumidity_2m[0].toFixed(1)}`}
                            color="cyan"
                        />
                        <div>
                            <StatCard
                                title="UV Index"
                                metric={`${results.hourly.uv_index[0].toFixed(1)}`}
                                color="rose"
                            />
                            {Number(results.hourly.uv_index[0].toFixed(1)) > 0 && (
                                <CalloutCard 
                                    message={"The UV is high today,be sure to wear SPF!"}
                                    warning
                                />
                            )}
                        </div>

                        <div className="flex space-x-3">
                                <StatCard
                                    title="Wind Speed"
                                    metric={`${results.current_weather.windspeed.toFixed(1)}m/s `}
                                    color="cyan"
                                />
                                <StatCard
                                    title="Wind Direction"
                                    metric={`${results.current_weather.winddirection.toFixed(1)} ℃`}
                                    color="violet"

                                />
                        </div>

                    </div>

                </div>

                <hr className="mb-5" />

                <div className="space-y-3">
                        <TempChart results = {results}/>
                        <RainChart results={results}/>
                        <HumidityChart results = {results}/>
                </div>
            </div>
        </div>
    )
}

export default WeatherPage