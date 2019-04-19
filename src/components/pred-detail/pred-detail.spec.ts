import { TestWindow } from '@stencil/core/testing';
import { PredDetail } from './pred-detail';

describe('pred-detail', () => {
  it('should build', () => {
    expect(new PredDetail()).toBeTruthy();
  });

  describe('rendering', () => {
    let element: HTMLPredDetailElement;
    let testWindow: TestWindow;
    beforeEach(async () => {
      testWindow = new TestWindow();
      element = await testWindow.load({
        components: [PredDetail],
        html: '<pred-detail></pred-detail>'
      });
    });

    // See https://stenciljs.com/docs/unit-testing
    {cursor}

  });
});
