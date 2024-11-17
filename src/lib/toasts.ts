import { type ModalSettings, type ToastSettings, getModalStore } from "@skeletonlabs/skeleton";

export function errToast(toastMessage: string, errCode?: string): ToastSettings {
    if (!errCode) {
        return {
            message: toastMessage,
            background: 'bg-gradient-to-tr from-error-600 via-error-500 to-error-400',
        };
    }

    return {
        message: toastMessage,
        background: 'bg-gradient-to-tr from-error-600 via-error-500 to-error-400',
        action: {
            label: "Details",
            response: () => {
                const modalStore = getModalStore();
                const modal: ModalSettings = {
                    type: 'alert',
                    title: 'Fehlerdetails',
                    body: errCode,
                };
                modalStore.trigger(modal);
            }
        }
    };
}

export function succToast(toastMessage: string): ToastSettings {
    return {
        message: toastMessage,
        background: 'bg-gradient-to-tr from-primary-600 via-primary-500 to-primary-400 text-white',
    };
}
