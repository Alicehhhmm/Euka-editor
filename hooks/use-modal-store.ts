import { create } from "zustand";

export type ModalType = 'createOrganization' | 'invite' | 'renameBoard';

const defaultValue = {
    id: '',
    title: '',
}

interface ModalData {
    id?: string;
    title?: string;
}

interface ModalStore {
    type: ModalType | null;
    data: ModalData;
    isOpen: boolean;
    onOpen: (type: ModalType, params?: ModalData) => void;
    onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
    type: null,
    data: defaultValue,
    isOpen: false,
    onOpen: (type, params = {}) => set(() => ({ isOpen: true, type, data: params })),
    onClose: () => set(() => ({ type: null, isOpen: false })),
}))