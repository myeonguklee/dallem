import { fireEvent, render, screen } from '@testing-library/react';
import { Dropdown, DropdownItem, DropdownList, DropdownTrigger } from '../dropdown';

describe('Dropdown 컴포넌트', () => {
  test('기본 렌더링', () => {
    render(
      <Dropdown>
        {({ isOpen, toggle }) => (
          <>
            <DropdownTrigger onClick={toggle}>메뉴 열기</DropdownTrigger>
            <DropdownList isOpen={isOpen}>
              <DropdownItem value="item1">아이템 1</DropdownItem>
              <DropdownItem value="item2">아이템 2</DropdownItem>
            </DropdownList>
          </>
        )}
      </Dropdown>,
    );
    expect(screen.getByText('메뉴 열기')).toBeInTheDocument();
  });

  test('트리거 클릭 시 리스트가 나타난다', () => {
    render(
      <Dropdown>
        {({ isOpen, toggle }) => (
          <>
            <DropdownTrigger onClick={toggle}>메뉴 열기</DropdownTrigger>
            <DropdownList isOpen={isOpen}>
              <DropdownItem value="item1">아이템 1</DropdownItem>
              <DropdownItem value="item2">아이템 2</DropdownItem>
            </DropdownList>
          </>
        )}
      </Dropdown>,
    );
    const trigger = screen.getByText('메뉴 열기');
    // 초기에는 리스트가 안 보여야 함
    expect(screen.queryByText('아이템 1')).not.toBeInTheDocument();

    fireEvent.click(trigger);

    // 클릭 후 리스트가 보여야 함
    expect(screen.getByText('아이템 1')).toBeInTheDocument();
  });

  test('아이템 클릭 시 동작 (콜백 호출) - 필요시', () => {
    const onSelect = jest.fn();
    render(
      <Dropdown>
        {({ isOpen, toggle }) => (
          <>
            <DropdownTrigger onClick={toggle}>메뉴 열기</DropdownTrigger>
            <DropdownList isOpen={isOpen}>
              <DropdownItem
                value="item1"
                selectedValue=""
                onSelect={onSelect}
              >
                아이템 1
              </DropdownItem>
            </DropdownList>
          </>
        )}
      </Dropdown>,
    );
    fireEvent.click(screen.getByText('메뉴 열기'));
    fireEvent.click(screen.getByText('아이템 1'));

    expect(onSelect).toHaveBeenCalledWith('item1');
  });
});
