import { type APIRoute } from "astro";
import { addComplaint } from "../../../database/client";

export const POST: APIRoute = async ({ request }) => {
    try {
        const data = await request.json();
        await addComplaint(data);
        return new Response("OK", { status: 200 });
    } catch (error) {
        return new Response("Error:" + error, { status: 400 });
    }

}