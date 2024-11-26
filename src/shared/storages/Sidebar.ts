import { create } from 'zustand';

export const useSidebar = create((set, get) => ({
    isOpen: true,
    style: 'rotate-0',
    handleChangeToggle: () => {
        const isOpen = get().isOpen;
        const newStyle = isOpen ? 'rotate-180' : 'rotate-0';
        set({isOpen: !isOpen, style: newStyle});
        get().handleSetLocalStore();
    },
    handleSetLocalStore: () => {
        const { isOpen, style } = get();
        const sidebarState = JSON.stringify({ isOpen, style });
        localStorage.setItem('sidebar', sidebarState);
    },
    loadStateLocalStorage: () => {
        const savedState = localStorage.getItem('sidebar');
        if (savedState) {
            const {isOpen, style} = JSON.parse(savedState);
            set({isOpen: isOpen, style: style})
        }
    }
}));
