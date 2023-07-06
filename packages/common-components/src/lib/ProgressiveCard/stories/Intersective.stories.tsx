import type { Meta, StoryObj } from '@storybook/react';
import { IntersectiveProgressiveCard } from '..';
import { decorators } from '../../common/story-utils';

const meta: Meta<typeof IntersectiveProgressiveCard> = {
    title: 'Components/ProgressiveCard/Intersective',
    component: IntersectiveProgressiveCard,
    decorators: [decorators.scrallable],
    args: {
        title: 'Title',
        content: 'test testtest test \r\n testtesttesttesttesttesttesttesttesttesttesttest',
        textAlign: 'left'
    },
    argTypes: {
        title: {
            control: 'text'
        },
        content: {
            control: 'text'
        },
        containerCls: {
            control: 'text'
        },
        textAlign: {
            description: '文字对齐方向',
            control: 'select',
            options: ['left', 'right']
        }
    }
};

export default meta;

type Story = StoryObj<typeof IntersectiveProgressiveCard>;

export const Intersective: Story = {
    render: (args) => <div style={{
        width: '400px',
        height: '200px',
        background: 'yellow'
    }}>
        <IntersectiveProgressiveCard {...args} />
    </div>
};