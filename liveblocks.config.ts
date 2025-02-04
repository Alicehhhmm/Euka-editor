import { createClient, LiveList, LiveMap, LiveObject } from "@liveblocks/client";
import { createRoomContext, createLiveblocksContext } from "@liveblocks/react";
import {
    useSelf,
    useOther,
    useOthers,
    useHistory,
    useUndo,
    useRedo,
    useCanUndo,
    useCanRedo,
    useMutation,
    useStorage,
    useOthersConnectionIds,
    useOthersMapped
} from "@liveblocks/react/suspense";

import { Layer, Color } from "@/euka-core/types/canvas";

// Define Liveblocks types for your application
// https://liveblocks.io/docs/api-reference/liveblocks-react#Typing-your-data
declare global {
    interface Liveblocks {
        // Each user's Presence, for useMyPresence, useOthers, etc.
        Presence: {
            cursor: {
                x: number;
                y: number
            } | null;
            selection: string[]
            pencilDraft: [x: number, y: number, pressure: number][] | null;
            penColor: Color | null
        };

        // The Storage tree for the room, for useMutation, useStorage, etc.
        Storage: {
            // animals: LiveList<string>;
            layers: LiveMap<string, LiveObject<Layer>>
            layerIds: LiveList<string>
        };

        // 对应：app\api\liveblocks-auth\route.ts
        UserMeta: {
            id?: string;
            info?: {
                name?: string;
                picture: string;
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
    throttle: 16,
    authEndpoint: '/api/liveblocks-auth'
});

export const { RoomProvider } = createRoomContext(client);

export const {
    LiveblocksProvider,
    useInboxNotifications,

    // Other hooks
} = createLiveblocksContext(client);

export {
    client,
    useSelf,
    useOther,
    useOthers,
    useHistory,
    useUndo,
    useRedo,
    useCanUndo,
    useCanRedo,
    useMutation,
    useStorage,
    useOthersConnectionIds,
    useOthersMapped
};
