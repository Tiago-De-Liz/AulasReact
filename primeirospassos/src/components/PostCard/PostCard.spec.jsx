import { render, screen } from "@testing-library/react";
import { PostCard } from ".";
import { postCardPorpsMock } from "./mock";

const props = postCardPorpsMock;

describe('<PostCard />', () => {
    it('should render PostCard correctly', () => {
       render(<PostCard {...props} />);

       expect(screen.getByRole('img', { name: 'Title1'})).toHaveAttribute('src', 'img/img.png');
       expect(screen.getByRole('heading', { name: 'Title1 1'})).toBeInTheDocument();
       expect(screen.getByText('Body1')).toBeInTheDocument();
    });

    it('should match snapshot', () => {
        const { container } = render(<PostCard {...props} />);
        expect(container.firstChild).toMatchSnapshot();
    });
});