let activeRequestCount = 0;
const listeners = new Set();

const notify = () => {
  listeners.forEach((listener) => listener(activeRequestCount));
};

export const apiLoadingService = {
  start() {
    activeRequestCount += 1;
    notify();
  },

  finish() {
    activeRequestCount = Math.max(0, activeRequestCount - 1);
    notify();
  },

  getSnapshot() {
    return activeRequestCount;
  },

  subscribe(listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
};
