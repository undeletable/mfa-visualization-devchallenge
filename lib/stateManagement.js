const CUSTOM_EVENT_TARGET = document;

const getEventInstance = (eventId, payload) => {
    return new CustomEvent(eventId, {
        detail: payload
    });
};

const dispatchAction = (actionType, payload) => {
    const event = getEventInstance(actionType, payload);
    CUSTOM_EVENT_TARGET.dispatchEvent(event);
};

const handleAction = (actionType, handler) => {
    CUSTOM_EVENT_TARGET.addEventListener(actionType, (event) => {
        handler(event.detail);
    });
};

export { dispatchAction, handleAction };
