import {
  AlarmIcon,
  ArrowDownIcon,
  ArrowLeftIcon,
  ArrowLineRightIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  BlackStateIcon,
  CalendarIcon,
  CheckBoxIcon,
  CheckCircleIcon,
  CheckIcon,
  DalaemfitIcon,
  DarkCheckCircleIcon,
  DoubleHeartIcon,
  EditIcon,
  HeartBoxIcon,
  LikeIcon,
  LoginImageIcon,
  PencileIcon,
  PersonIcon,
  ProfileBGIcon,
  ProfileEditIcon,
  ProfileIcon,
  ThinDoubleHeartIcon,
  UnlikeIcon,
  VacantCheckBoxIcon,
  VisibilityOffIcon,
  VisibilityOnIcon,
  WhiteArrowDownIcon,
  WhiteStateIcon,
  WorkationIcon,
  XIcon,
} from '@/shared/ui/icon';

export default function IconTestPage() {
  const icons = [
    { name: 'AlarmIcon', component: AlarmIcon },
    { name: 'ArrowDownIcon', component: ArrowDownIcon },
    { name: 'ArrowLeftIcon', component: ArrowLeftIcon },
    { name: 'ArrowLineRightIcon', component: ArrowLineRightIcon },
    { name: 'ArrowRightIcon', component: ArrowRightIcon },
    { name: 'ArrowUpIcon', component: ArrowUpIcon },
    { name: 'BlackStateIcon', component: BlackStateIcon },
    { name: 'CalendarIcon', component: CalendarIcon },
    { name: 'CheckIcon', component: CheckIcon },
    { name: 'CheckBoxIcon', component: CheckBoxIcon },
    { name: 'CheckCircleIcon', component: CheckCircleIcon },
    { name: 'DalaemfitIcon', component: DalaemfitIcon },
    { name: 'DarkCheckCircleIcon', component: DarkCheckCircleIcon },
    { name: 'DoubleHeartIcon', component: DoubleHeartIcon },
    { name: 'EditIcon', component: EditIcon },
    { name: 'HeartBoxIcon', component: HeartBoxIcon },
    { name: 'LikeIcon', component: LikeIcon },
    { name: 'LoginImageIcon', component: LoginImageIcon },
    { name: 'PencileIcon', component: PencileIcon },
    { name: 'PersonIcon', component: PersonIcon },
    { name: 'ProfileBGIcon', component: ProfileBGIcon },
    { name: 'ProfileEditIcon', component: ProfileEditIcon },
    { name: 'ProfileIcon', component: ProfileIcon },
    { name: 'ThinDoubleHeartIcon', component: ThinDoubleHeartIcon },
    { name: 'UnlikeIcon', component: UnlikeIcon },
    { name: 'VacantCheckBoxIcon', component: VacantCheckBoxIcon },
    { name: 'VisibilityOffIcon', component: VisibilityOffIcon },
    { name: 'VisibilityOnIcon', component: VisibilityOnIcon },
    { name: 'WhiteArrowDownIcon', component: WhiteArrowDownIcon },
    { name: 'WhiteStateIcon', component: WhiteStateIcon },
    { name: 'WorkationIcon', component: WorkationIcon },
    { name: 'XIcon', component: XIcon },
  ];

  return (
    <div className="min-h-screen bg-white p-8">
      <h1 className="mb-8 text-2xl font-bold text-black">아이콘 테스트 페이지</h1>
      <div className="space-y-4">
        {icons.map(({ name, component: IconComponent }) => (
          <div
            key={name}
            className={`flex items-center space-x-4 rounded border p-4 ${
              name === 'AlarmIcon' || name === 'WhiteArrowDownIcon' || name === 'WhiteStateIcon'
                ? 'bg-black'
                : 'bg-white'
            }`}
          >
            <IconComponent />
            <span
              className={`text-lg font-medium ${
                name === 'AlarmIcon' || name === 'WhiteArrowDownIcon' || name === 'WhiteStateIcon'
                  ? 'text-white'
                  : 'text-black'
              }`}
            >
              {name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
