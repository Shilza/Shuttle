import { configure } from '@storybook/react';
import '../src/styles/styles.css';

configure(require.context('../src', true, /\.stories\.js$/), module);
