export default function GatheringDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-2xl font-bold">모임 상세 페이지 - ID: {params.id}</div>
    </div>
  );
}
