import { TestWindow } from '@stencil/core/testing';
import { ImagePreview } from './image-preview';

describe('image-preview', () => {
  it('should build', () => {
    expect(new ImagePreview()).toBeTruthy();
  });

  describe('rendering', () => {
    let element: HTMLImagePreviewElement;
    let testWindow: TestWindow;
    beforeEach(async () => {
      testWindow = new TestWindow();
      element = await testWindow.load({
        components: [ImagePreview],
        html: '<image-preview></image-preview>'
      });
    });

    // See https://stenciljs.com/docs/unit-testing
    {cursor}

  });
});
