import { NextResponse } from "next/server";
import openai from "@/openai";


export async function POST(request:Request) {

    const {weatherData} = await request.json();
    console.log(weatherData);

    const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        temperature: 0.8,
        n:1,
        stream: false,
        messages: [
            {
                role:"system",
                content: "Pretend you're a weather news presenter presenting live on television.be energetic and full of charisma.Introduce yourself as Raj.State the city you are porviding a summary for.Then give summary of todays weather only.Make it easy for the viewer to understand and know what to be prepared for those weather conditions such as wear SPF if the UV is high etc.use the uv_indx data provided to provide the UV advice.Provide a joke regarding the weather.Assume the data come from the team at the news office and not the user",
            },
            {
                role: "user",
                content:`Hi there can i get a summmary of todays weather, use the following information to get the weather
                 data: ${JSON.stringify(
                    weatherData
                )}`,
            },
        ],

    });
    console.log(response);

    const {data} = response;

    console.log('DATA is:',data);

    return NextResponse.json(data.choices[0].message);
}