import tailwindcss from "@tailwindcss/vite";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import wsConfig from "./ws.ts";

export default defineConfig({
    plugins: [
        tailwindcss(),
        sveltekit(),
        {
            name: "wsServer",
            configureServer(server) {
                if (!server.httpServer) return;
                wsConfig(server.httpServer);
            },
        },
    ],
    server: {
        allowedHosts: true,
    },
});
