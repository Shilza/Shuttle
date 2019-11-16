import '../src/styles/styles.css';
import '../src/styles/normalize.css';
import { configure } from '@storybook/react';

configure(require.context('../src', true, /\.stories\.js$/), module);
