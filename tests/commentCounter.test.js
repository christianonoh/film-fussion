import { ShowComment } from '../src/modules/comments.js';
import commentCounter from '../src/modules/commentCounter.js';

// Mock the ShowComment class and its getSeverData method
jest.mock('../src/modules/comments.js', () => ({
  ShowComment: jest.fn(),
}));

describe('commentCounter', () => {
  test('returns the correct comment count when comments exist', async () => {
    // Set up mock data to be returned by the ShowComment instance
    const movieComments = [
      { username: 'user1', comment: 'comment1', creation_date: '2022-01-01' },
      { username: 'user2', comment: 'comment2', creation_date: '2022-01-02' },
      { username: 'user3', comment: 'comment3', creation_date: '2023-01-02' },
    ];
    const getSeverDataMock = jest.fn().mockResolvedValue(movieComments);
    ShowComment.prototype.getSeverData = getSeverDataMock;

    // Call the commentCounter function with a valid index argument
    const commentCount = await commentCounter(123);

    // Verify that the ShowComment constructor was called with the correct arguments
    expect(ShowComment).toHaveBeenCalledWith();

    // Verify that the getSeverData method was called with the correct URL
    expect(getSeverDataMock).toHaveBeenCalledWith(
      'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/lA4aY26h8QYvNopssI0V/comments?item_id=123',
    );

    // Verify that the comment count is correct
    expect(commentCount).toBe(3);
  });

  test('returns zero when no comments exist', async () => {
    // Set up mock data to be returned by the ShowComment instance
    const movieComments = [];
    const getSeverDataMock = jest.fn().mockResolvedValue(movieComments);
    ShowComment.prototype.getSeverData = getSeverDataMock;

    // Call the commentCounter function with a valid index argument
    const commentCount = await commentCounter(456);

    // Verify that the ShowComment constructor was called with the correct arguments
    expect(ShowComment).toHaveBeenCalledWith();

    // Verify that the getSeverData method was called with the correct URL
    expect(getSeverDataMock).toHaveBeenCalledWith(
      'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/lA4aY26h8QYvNopssI0V/comments?item_id=456',
    );

    // Verify that the comment count is zero
    expect(commentCount).toBe(0);
  });
});