import { type APIRoute } from "astro";
import { updateComplaint } from "../../../database/client";

export const POST: APIRoute = async ({ request }) => {
    try {
        const data = await request.json();
        await updateComplaint(data);
        return new Response("OK", { status: 200 });
    } catch (error) {
        return new Response("Error", { status: 400 });
    }

}