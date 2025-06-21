import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App.jsx';

describe('App', () => {
  it('renders app component', () => {
    render(<App />);
    // Update this test based on your actual app content
    expect(document.querySelector('.app')).toBeInTheDocument();
  });
});
