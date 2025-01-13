import { createClient } from "@liveblocks/client";
import { createRoomContext, createLiveblocksContext } from "@liveblocks/react";

const publicApiKey = "pk_dev_ZeTngNxZCGfnP3B8D6VEPodeCQ-37FL4p8ZcMDywSGI7yGPG1ckG4oWRNGqM4icY"

// Define Liveblocks types for your application
// https://liveblocks.io/docs/api-reference/liveblocks-react#Typing-your-data
declare global {
    interface Liveblocks {
        // Each user's Presence, for useMyPresence, useOthers, etc.
        Presence: {
            // Example, real-time cursor coordinates
            // cursor: { x: number; y: number };
        };

        // The Storage tree for the room, for useMutation, useStorage, etc.
        Storage: {
            // Example, a conflict-free list
            // animals: LiveList<string>;
        };

        // Custom user info set when authenticating with a secret key
        UserMeta: {
            id: string;
            info: {
                // Example properties, for useSelf, useUser, useOthers, etc.
                // name: string;
                // avatar: string;
            };
        };

        // Custom events, for useBroadcastEvent, useEventListener
        RoomEvent: {};
        // Example has two events, using a union
        // | { type: "PLAY" } 
        // | { type: "REACTION"; emoji: "🔥" };

        // Custom metadata set on threads, for useThreads, useCreateThread, etc.
        ThreadMetadata: {
            // Example, attaching coordinates to a thread
            // x: number;
            // y: number;
        };

        // Custom room info set with resolveRoomsInfo, for useRoomInfo
        RoomInfo: {
            // Example, rooms with a title and url
            // title: string;
            // url: string;
        };
    }
}

const client = createClient({
    publicApiKey,
    // Authenticated,
});

export const { RoomProvider } = createRoomContext(client);

export const {
    LiveblocksProvider,
    useInboxNotifications,

    // Other hooks
} = createLiveblocksContext(client);

export {
    client
};
