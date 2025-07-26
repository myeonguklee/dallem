'use client';

import { useGetGatherings } from '@/entities/gathering/api/queries';
import { useGetUser } from '@/entities/user/api';

export default function GatheringsCreated() {
  const { data: user } = useGetUser();
  const { data } = useGetGatherings({
    createdBy: user?.id,
  });

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
