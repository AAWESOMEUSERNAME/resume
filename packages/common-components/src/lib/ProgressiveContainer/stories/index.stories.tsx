import type { Meta, StoryObj } from '@storybook/react';
import ProgressiveContainer from '../';
import styles from './index.module.scss'

const meta: Meta<typeof ProgressiveContainer> = {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    title: 'Components/ProgressiveContainer',
    component: ProgressiveContainer,
    argTypes: {
        emergeFrom: {
            options: ['left', 'right'],
            control: { type: 'radio' },
        },
        containerCls: {
            control: { type: 'text' }
        }
    }
};

export default meta;

type Story = StoryObj<typeof ProgressiveContainer>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
    render: (args) => <div className={styles.scrollPage}>
        <ProgressiveContainer {...args}>
            <div style={{ height: '3em', background: 'yellow' }}>test</div>
        </ProgressiveContainer>
    </div>
};