import { BoardCanvas } from '@/components/board/board-canvas'

interface BoardIdPageProps {
    params: {
        boardId: string
    }
}

const BoardIdPage = async ({ params }: BoardIdPageProps) => {
    const { boardId } = await params
    
    return (
        <div className='w-full h-full'>
            <BoardCanvas boardId={boardId} />
        </div>
    )
}

export default BoardIdPage
