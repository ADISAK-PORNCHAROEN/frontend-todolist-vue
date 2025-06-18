import { notification } from 'ant-design-vue';

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface NotificationOptions {
    message: string;
    description?: string;
    duration?: number;
    placement?: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'top' | 'bottom';
}

export const useNotification = () => {
    const showNotification = (
        type: NotificationType,
        options: NotificationOptions
    ) => {
        notification[type]({
            message: options.message,
            description: options.description,
            placement: options.placement || 'topRight',
            duration: options.duration || 3,
        });
    };

    return {
        showNotification,
    };
};