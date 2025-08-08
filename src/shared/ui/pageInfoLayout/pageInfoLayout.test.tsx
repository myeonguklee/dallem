import { render, screen } from '@testing-library/react';
import { PencilIcon } from '../icon';
import { PageInfoLayout } from './PageInfoLayout';

describe('PageInfoLayout 테스트', () => {
  beforeEach(() => {
    render(
      <PageInfoLayout
        infoImg={<PencilIcon />}
        title={'주제목'}
        subtitle={'소제목'}
      />,
    );
  });

  it('전달된 이미지가 렌더링되어야 한다', () => {
    expect(screen.getByRole('img', { hidden: true })).toBeInTheDocument();
  });
  it('제목 텍스트가 표시되어야 한다', () => {
    expect(screen.getByLabelText('주제목')).toBeInTheDocument();
  });
  it('부제목 텍스트가 표시되어야 한다', () => {
    expect(screen.getByLabelText('소제목')).toBeInTheDocument();
  });
});
