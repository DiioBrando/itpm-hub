export const SideItems = ({ children }) => {
    return (
        <nav className={'w-full h-full flex flex-col border'}>
            {children}
        </nav>
    );
}