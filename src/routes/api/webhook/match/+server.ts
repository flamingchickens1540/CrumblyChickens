import { json } from "@sveltejs/kit";
import updateMatch from "@/updateTeamMatch";
export const POST = async ({request }: any) => {
    const res = await request.json();
    if (res.message_type === "ping") {
        return json({status: 200});
    }
    const match = res.match;
    try {
    updateMatch(match);
    } catch (e) {
        return json({status: 500});
    }
    return json({status: 200});

}

