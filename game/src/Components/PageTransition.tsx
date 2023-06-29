import { CSSTransition, TransitionGroup } from 'react-transition-group';

export interface ITransitionParams {
    children: React.ReactNode,
    location: {
        key: string
    }
}

export const PageTransition: React.FC<ITransitionParams> = ({ children, location }) => {
    return (
        <TransitionGroup component={null}>
            <CSSTransition key={location.key} classNames="slide" timeout={500}  >
                {children}
            </CSSTransition>
        </TransitionGroup>
    );
}