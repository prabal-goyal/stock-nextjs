import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import Button, { ButtonProps } from '@/pages/components/Button';

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    newclassNames: { control: 'text' },
    href: { control: 'text' },
    children: { control: 'text' },
  },
} as Meta;

const Template: StoryFn<ButtonProps> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Default Link',
  newclassNames: 'text-blue-500 hover:text-blue-700',
  href: '/',
};

export const Primary = Template.bind({});
Primary.args = {
  children: 'Primary Link',
  newclassNames: 'text-white bg-blue-500 hover:bg-blue-700 p-2 rounded',
  href: '/primary',
};

export const ExternalLink = Template.bind({});
ExternalLink.args = {
  children: 'External Link',
  newclassNames: 'text-green-500 hover:text-green-700',
  href: 'https://example.com',
};

export const CustomStyled = Template.bind({});
CustomStyled.args = {
  children: 'Custom Styled Link',
  newclassNames: 'text-red-500 underline hover:no-underline',
  href: '/custom',
};
