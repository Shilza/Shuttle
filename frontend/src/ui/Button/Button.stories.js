import React from 'react';
import Button from "./Button";

export default { title: 'Button' };

export const simple = () => <Button>Simple button</Button>;

export const disabled = () => <Button disabled>Disabled</Button>;

export const loading = () => <Button loading>Loading</Button>;

export const withTitle = () => <Button title='Sample'>Title on hover</Button>;
