import { useGetGatheringsJoined } from '@/entities/gathering/api/queries';

export default function GatheringsJoined() {
  const { data } = useGetGatheringsJoined();

  return (
    <div>
      <div className="flex flex-col gap-4">
        {data?.map((gathering) => (
          <div key={gathering.id}>{gathering.name}</div>
        ))}
      </div>
    </div>
  );
}
