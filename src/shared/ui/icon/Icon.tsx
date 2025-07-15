import HamburgerMenuIcon from './svg/hamburger-menu-icon.svg';

const iconMap = {
  'hamburger-menu': HamburgerMenuIcon,
};

type IconProps = {
  name: keyof typeof iconMap;
} & React.ComponentProps<'svg'>;

export function Icon({ name, ...props }: IconProps) {
  const SvgIcon = iconMap[name as keyof typeof iconMap];
  if (!SvgIcon) return null;
  return <SvgIcon {...props} />;
}
