import { render, screen } from '@testing-library/react';
import { TextInput } from '.';
import userEvent from '@testing-library/user-event';

describe('<TextInput />', () => {
  it('should have a value of searchValue', () => {
    const fn = jest.fn();
    render(<TextInput handleChange={fn} searchValue={'testando'} />);
    const input = screen.getByPlaceholderText(/type your search/i);
    expect(input.value).toBe('testando');
  });

  it('should call handleChande function on each key pressed', () => {
    const fn = jest.fn();
    render(<TextInput handleChange={fn} searchValue={'o valor'} />);

    const input = screen.getByPlaceholderText(/type your search/i);

    const valueInput = 'o valor';

    userEvent.type(input, valueInput);

    expect(input.value).toBe(valueInput);
    expect(fn).toHaveBeenCalledTimes(valueInput.length);
  });

  it('should match snapshot ', () => {
    const fn = jest.fn();
    const { container } = render(<TextInput handleChange={fn} searchValue="" />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
