import moment from "moment";
import * as MailComposer from 'expo-mail-composer';

export const Capitalize = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1)
}

export const calculateTimeAgo = (datetime) => {
    const now = moment();
    const time = moment(datetime);
    const diffMinutes = now.diff(time, 'minutes');
    const diffHours = now.diff(time, 'hours');
    console.log(now)

    if (diffMinutes < 1) {
        return 'Just now';
    } else if (diffMinutes === 1) {
        return '1 min ago';
    } else if (diffHours < 1) {
        return `${diffMinutes} mins ago`;
    } else if (diffHours === 1) {
        return '1 hour ago';
    } else if (time.isSame(now, 'day')) {
        return `${diffHours} hours ago`;
    } else if (time.isSame(now.clone().subtract(1, 'days'), 'day')) {
        return 'Yesterday';
    } else {
        return `${moment(datetime).format("DD/MM/YYYY HH:MM")}`;
    }
};