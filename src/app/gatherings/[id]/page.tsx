export default function GatheringDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="text-2xl font-bold">모임 상세 페이지 - ID: {params.id}</div>
    </div>
  );
}
