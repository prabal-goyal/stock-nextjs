import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import Container, { ContainerProps } from '@/src/pages/components/Container';

export default {
  title: 'Components/Container',
  component: Container,
  argTypes: {
    newClassNames: { control: 'text' },
    children: { control: 'text' },
  },
} as Meta;

const Template: StoryFn<ContainerProps> = (args) => <Container {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'This is the default Container.',
};

export const WithAdditionalClassNames = Template.bind({});
WithAdditionalClassNames.args = {
  children: 'This Container has additional class names.',
  newClassNames: 'bg-gray-100 p-4 border rounded-lg',
};

export const EmptyContainer = Template.bind({});
EmptyContainer.args = {
  children: '',
  newClassNames: '',
};

export const CustomStyledContainer = Template.bind({});
CustomStyledContainer.args = {
  children: 'This Container has custom styles applied.',
  newClassNames: 'text-center bg-blue-50 p-6 shadow-lg',
};
