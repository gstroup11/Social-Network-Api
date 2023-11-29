// thoughtsData.js

const thoughtsData = [
  {
    thoughtText: 'This is a sample thought.',
    username: 'user1',
    reactions: [
      { reactionBody: 'Like', username: 'user2' },
      { reactionBody: 'Love', username: 'user3' },
    ],
  },
  {
    thoughtText: 'Im enjoying learning new things!',
    username: 'user4',
    reactions: [
      { reactionBody: 'Like', username: 'user1' },
      { reactionBody: 'Haha', username: 'user2' },
    ],
  },
  {
    thoughtText: 'Just finished a great book. Any recommendations?',
    username: 'user2',
    reactions: [
      { reactionBody: 'Love', username: 'user4' },
      { reactionBody: 'Comment', username: 'user3' },
    ],
  },
  {
    thoughtText: 'Excited for the weekend! Any fun plans?',
    username: 'user3',
    reactions: [
      { reactionBody: 'Like', username: 'user1' },
      { reactionBody: 'Haha', username: 'user2' },
    ],
  },
  {
    thoughtText: 'Trying out a new recipe tonight. Fingers crossed!',
    username: 'user1',
    reactions: [
      { reactionBody: 'Love', username: 'user3' },
      { reactionBody: 'Comment', username: 'user4' },
    ],
  },
];

module.exports = thoughtsData;