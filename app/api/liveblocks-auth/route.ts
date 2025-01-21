import { currentUser, auth } from '@clerk/nextjs/server'

import { Liveblocks } from "@liveblocks/node";
import { ConvexClient } from "convex/browser";

import { api } from "@/convex/_generated/api";

const convexURl = process.env.NEXT_PUBLIC_CONVEX_URL!
const convex = new ConvexClient(convexURl)

const liveblocks = new Liveblocks({
    secret: process.env.LIVEBLOCKS_SECRET_KEY!,
});


export async function POST(request: Request) {

    // 1.获取授权信息
    const user = await currentUser()
    const { redirectToSignIn, orgId } = await auth()

    if (!user) return redirectToSignIn()

    // 2.获取页面参数
    const { room } = await request.json()
    const board = await convex.query(api.board.get, {
        id: room
    })

    if (board?.orgId !== orgId) {
        return new Response('Unauthrized', { status: 403 })
    }

    // 对应: liveblocks.config.ts 的 UserMeta
    const userInfo = {
        name: (user.firstName ?? 'Anonymous') + ' ' + (user.lastName ?? '') || 'Anonymous',
        picture: user.imageUrl,
    }

    // 3. 开始 Liveblocks 会话
    const session = liveblocks.prepareSession(
        user.id,
        {
            userInfo
        }
    )

    if (room) {
        session.allow(room, session.FULL_ACCESS);
    }

    // Authorize the user and return the result
    const { status, body } = await session.authorize();

    return new Response(body, { status });
}