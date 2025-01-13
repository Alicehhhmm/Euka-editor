import { BoardCanvas } from '@/components/board/board-canvas'
import { BoardRoom } from '@/components/board/board-room'
import { CanvasLoading } from '@/components/board/loading'

interface BoardIdPageProps {
    params: {
        boardId: string
    }
}

const BoardIdPage = async ({ params }: BoardIdPageProps) => {
    const { boardId } = await params

    return (
        <div className='w-full h-full'>
            <BoardRoom roomId={boardId} fallback={<CanvasLoading />}>
                <BoardCanvas boardId={boardId} />
            </BoardRoom>
        </div>
    )
}

export default BoardIdPage
