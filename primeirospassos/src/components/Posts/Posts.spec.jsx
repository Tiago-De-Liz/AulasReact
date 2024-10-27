import { render, screen } from "@testing-library/react";
import { Posts } from ".";

const props = {
    posts: [
        {
            title: 'Title 1',
            body: 'Body 1',
            id: 1,
            cover: 'img/img1.png'  
        },
        {
            title: 'Title2',
            body: 'Body2',
            id: 2,
            cover: 'img/img2.png'  
        },
        {
            title: 'Title 3',
            body: 'Body 3',
            id: 3,
            cover: 'img/img3.png'  
        }
    ]
}

describe('<Posts />', () => {
    it('shound render posts', () => {
        render(<Posts {...props}/>);
        expect(screen.getAllByRole('heading', {name: /title/i })).toHaveLength(3);
        expect(screen.getAllByRole('img', {name: /title/i })).toHaveLength(3);
        expect(screen.getAllByText(/body/i)).toHaveLength(3);

        expect(screen.getByRole('img', {name: /title 3/i })).toHaveAttribute('src', 'img/img3.png');
    });

    it('shound not render posts', () => {
        render(<Posts />);
        expect(screen.queryAllByRole('heading', {name: /title/i })).toHaveLength(0);
    });

    it('shound match snapshot', () => {
        const { container } = render(<Posts {...props}/>);
        expect(container.firstChild).toMatchSnapshot();
    });
})