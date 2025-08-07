import HamburgerMenuIcon from './svg/hamburger-menu-icon.svg';

const iconMap = {
  'hamburger-menu': HamburgerMenuIcon,
};

export type IconMapProps = {
  name: keyof typeof iconMap;
} & React.ComponentProps<'svg'>;

export function Icon({ name, ...props }: IconMapProps) {
  const SvgIcon = iconMap[name as keyof typeof iconMap];
  if (!SvgIcon) return null;
  return <SvgIcon {...props} />;
}
