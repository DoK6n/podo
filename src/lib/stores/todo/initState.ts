import { RemirrorJSON } from 'remirror';
import { Todo } from 'podote/interfaces';
import { v4 as uuidv4 } from 'uuid';

const content00: RemirrorJSON = {
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'done',
        },
      ],
    },
    {
      type: 'callout',
      attrs: {
        type: 'blank',
        emoji: '💡',
      },
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'BLANK',
            },
          ],
        },
      ],
    },
  ],
};
const content01: RemirrorJSON = {
  type: 'doc',
  content: [
    {
      type: 'heading',
      attrs: { level: 1 },
      content: [
        {
          type: 'text',
          text: 'Content01',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Simple ',
        },
        {
          type: 'text',
          marks: [{ type: 'italic' }],
          text: 'Todo Memo App',
        },
      ],
    },
    {
      type: 'callout',
      attrs: {
        type: 'info',
        emoji: '💡',
      },
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'INFO',
            },
          ],
        },
      ],
    },
  ],
};
const content02: RemirrorJSON = {
  type: 'doc',
  content: [
    {
      type: 'heading',
      attrs: { level: 1 },
      content: [
        {
          type: 'text',
          text: 'Content02',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Simple ',
        },
        {
          type: 'text',
          marks: [{ type: 'italic' }],
          text: 'Todo Memo App',
        },
      ],
    },
    {
      type: 'callout',
      attrs: {
        type: 'warning',
        emoji: '⚠️',
      },
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'WARNING',
            },
          ],
        },
      ],
    },
  ],
};
const content03: RemirrorJSON = {
  type: 'doc',
  content: [
    {
      type: 'heading',
      attrs: { level: 1 },
      content: [
        {
          type: 'text',
          text: 'Content03',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Simple ',
        },
        {
          type: 'text',
          marks: [{ type: 'italic' }],
          text: 'Todo Memo App',
        },
      ],
    },
    {
      type: 'callout',
      attrs: {
        type: 'error',
        emoji: '🚨',
      },
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'ERROR',
            },
          ],
        },
      ],
    },
  ],
};
const content04: RemirrorJSON = {
  type: 'doc',
  content: [
    {
      type: 'heading',
      attrs: { level: 1 },
      content: [
        {
          type: 'text',
          text: 'Content04',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Simple ',
        },
        {
          type: 'text',
          marks: [{ type: 'italic' }],
          text: 'Todo Memo App',
        },
      ],
    },
    {
      type: 'callout',
      attrs: {
        type: 'success',
        emoji: '✅',
      },
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'SUCCESS',
            },
          ],
        },
      ],
    },
  ],
};

export const initState: Todo[] = [
  { id: uuidv4(), content: content00, done: true, editable: false },
  { id: uuidv4(), content: content01, done: false, editable: false },
  { id: uuidv4(), content: content02, done: false, editable: false },
  { id: uuidv4(), content: content03, done: false, editable: false },
  { id: uuidv4(), content: content04, done: false, editable: false },
];
